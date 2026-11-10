// Tests de développement uniquement ; aucune dépendance nécessaire pour jouer.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const source = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../02_DONNEES_JEU.json")),
);
const sandbox = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, "../data.js"), "utf8"),
  sandbox,
);
assert.deepEqual(
  JSON.parse(JSON.stringify(sandbox.window.CUISINE_TA_GEO_DATA)),
  source,
);
const all = Object.values(source.rounds).flatMap((r) =>
  Array.isArray(r) ? r : [...r.A, ...r.B],
);
assert.equal(all.length, 32);
assert.equal(new Set(all.map((q) => q.id)).size, 32);
for (const q of all) {
  for (const [key, val] of Object.entries(q)) {
    if (key.endsWith("AnswerIndex") || key === "answerIndex") {
      const opt =
        key === "answerIndex"
          ? "options"
          : key.replace("AnswerIndex", "Options");
      assert(val >= 0 && val < q[opt].length, q.id);
    }
  }
  if (q.targetCityId) assert(source.cities[q.targetCityId]);
  if (q.candidateCityIds) {
    assert.equal(new Set(q.candidateCityIds).size, 4);
    assert(q.candidateCityIds.includes(q.targetCityId));
    q.candidateCityIds.forEach((id) => assert(source.cities[id]));
  }
}
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({
    viewport: { width: 1366, height: 768 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.context().setOffline(true);
  await page.goto("file://" + path.resolve(__dirname, "../index.html"));
  const ev = async (code) => page.evaluate(code);
  const act = async (a) => page.locator(`[data-action="${a}"]`).first().click();
  const choose = async (g, i) =>
    page.locator(`[data-choice="${g}"][data-value="${i}"]`).click();
  async function fits() {
    assert(
      await ev("document.documentElement.scrollWidth<=innerWidth"),
      "débordement horizontal",
    );
    const rect = await page.locator("#app").boundingBox();
    assert(
      rect.y + rect.height <= 768,
      "débordement vertical " + (await ev('state.round+"/"+state.screen')),
    );
  }
  await act("configure");
  await page.locator("#nameA").fill("Les chefs");
  await act("start");
  await act("begin");
  await fits();
  assert(await page.locator('[data-action="duel"]').isDisabled());
  await choose("A", 0);
  await choose("B", 1);
  assert.equal(await ev("state.scores.A"), 0);
  assert(
    !(await page
      .locator("#app")
      .innerText()
      .then((s) => s.includes("Coutras est une commune"))),
  );
  await act("duel");
  assert.deepEqual(await ev("state.scores"), { A: 10, B: 0 });
  await ev("action('duel')");
  assert.equal(await ev("state.scores.A"), 10);
  // Nouvelle partie et parcours intégral, toutes les bonnes réponses, sans joker.
  await ev("state=fresh();state.screen='intro';renderScreen()");
  for (let r = 1; r <= 4; r++) {
    console.log("Parcours manche", r);
    await act("begin");
    const count = r === 4 ? 4 : 6;
    for (let i = 0; i < count; i++) {
      if (r === 2 || r === 3) await act("show");
      await fits();
      if (r === 1) {
        let ans = await ev("card().answerIndex");
        await choose("A", ans);
        await choose("B", ans);
        await act("duel");
      }
      if (r === 2) {
        await choose("choice", await ev("card().answerIndex"));
        await act("alternating");
      }
      if (r === 3) {
        await choose(
          "choice",
          await ev("card().candidateCityIds.indexOf(card().targetCityId)"),
        );
        await act("gps");
        await choose("choice", await ev("card().regionAnswerIndex"));
        await act("gps");
        assert.equal(await page.locator(".citylabel").count(), 4);
      }
      if (r === 4) {
        await choose("A", await ev("card().countryAnswerIndex"));
        await choose("B", await ev("card().countryAnswerIndex"));
        await act("duel");
        await choose("A", await ev("card().continentAnswerIndex"));
        await choose("B", await ev("card().continentAnswerIndex"));
        await act("duel");
        assert.equal(await page.locator(".world").count(), 1);
      }
      await fits();
      await act("next");
    }
    await act("roundNext");
  }
  assert.deepEqual(await ev("state.scores"), { A: 225, B: 225 });
  await act("begin");
  assert.deepEqual(await ev("state.finalOrder"), ["A", "B"]);
  for (let t = 0; t < 2; t++) {
    await act("finalStart");
    for (let i = 0; i < 5; i++) {
      await choose("department", await ev("card().departmentAnswerIndex"));
      await choose("region", await ev("card().regionAnswerIndex"));
      await fits();
      await act("finalSubmit");
    }
  }
  assert.deepEqual(await ev("state.scores"), { A: 275, B: 275 });
  assert.equal(await page.locator("tbody tr").count(), 10);
  await act("results");
  assert((await page.locator("#app").innerText()).includes("Égalité"));
  await act("bonus");
  for (const t of ["A", "B"]) await choose(t, 0);
  await act("duel");
  assert.deepEqual(await ev("state.scores"), { A: 285, B: 285 });
  assert.equal(await page.locator('[data-action="bonus"]').count(), 0);
  await act("debrief");
  await act("results");
  // Indices, joker, vol, tentatives uniques et montants.
  for (const [clue, expected] of [
    [0, 20],
    [1, 15],
    [2, 10],
  ]) {
    await ev(
      `state=fresh();state.round=2;beginCard();state.clue=${clue};state.screen='question';renderScreen()`,
    );
    await choose("choice", await ev("card().answerIndex"));
    await act("alternating");
    assert.equal(await ev("state.scores.A"), expected);
  }
  await ev("state=fresh();state.round=2;beginCard();renderScreen()");
  await act("joker");
  await act("show");
  await act("clue");
  await choose("choice", await ev("card().answerIndex"));
  await act("alternating");
  assert.equal(await ev("state.scores.A"), 30);
  assert.equal(await ev("state.jokers.A"), true);
  await ev("state=fresh();state.round=2;beginCard();renderScreen()");
  await act("joker");
  await act("show");
  await choose("choice", -1);
  await act("alternating");
  assert.equal(await ev("state.steal"), true);
  assert.equal(await page.locator('[data-action="clue"]').count(), 0);
  await choose("choice", await ev("card().answerIndex"));
  await act("alternating");
  await ev("action('alternating')");
  assert.deepEqual(await ev("state.scores"), { A: 0, B: 5 });
  assert.equal(await ev("state.jokers.A"), true);
  // GPS : chaque composante indépendante, joker sur la livraison.
  for (const [pin, region, joker, expected] of [
    [false, true, false, 5],
    [true, false, false, 10],
    [true, false, true, 20],
    [false, false, true, 0],
    [true, true, true, 30],
  ]) {
    await ev("state=fresh();state.round=3;beginCard();renderScreen()");
    if (joker) await act("joker");
    await act("show");
    await choose(
      "choice",
      pin
        ? await ev("card().candidateCityIds.indexOf(card().targetCityId)")
        : -1,
    );
    await act("gps");
    await choose("choice", region ? await ev("card().regionAnswerIndex") : -1);
    await act("gps");
    assert.equal(await ev("state.scores.B"), expected);
  }
  // Monde : pays faux et continent juste.
  await ev(
    "state=fresh();state.round=4;state.index=2;beginCard();renderScreen()",
  );
  for (const t of ["A", "B"]) await choose(t, -1);
  await act("duel");
  for (const t of ["A", "B"])
    await choose(t, await ev("card().continentAnswerIndex"));
  await act("duel");
  assert.deepEqual(await ev("state.scores"), { A: 5, B: 5 });
  assert((await page.locator("#app").innerText()).includes("Amérique du Nord"));
  // Timer réel, pause, reprise en pause, expiration, score partiel interdit.
  await ev(
    "state=fresh();state.round=5;state.finalOrder=['B','A'];state.screen='finalReady';renderScreen()",
  );
  await act("finalStart");
  await choose("department", await ev("card().departmentAnswerIndex"));
  await choose("region", ((await ev("card().regionAnswerIndex")) + 1) % 3);
  await act("finalSubmit");
  assert.equal(await ev("state.scores.B"), 0);
  await ev("state.remaining=53;lastTick=performance.now()");
  await act("pause");
  const remaining = await ev("state.remaining");
  await page.waitForTimeout(1100);
  assert.equal(await ev("state.remaining"), remaining);
  await act("pause");
  await page.waitForTimeout(1100);
  assert((await ev("state.remaining")) < remaining);
  await page.reload();
  await act("restore");
  assert.equal(await ev("state.paused"), true);
  assert.equal(await ev("state.index"), 1);
  assert.equal(await ev("active()"), "B");
  await act("pause");
  await ev("state.remaining=.1;lastTick=performance.now()");
  await page.waitForTimeout(400);
  assert.equal(await ev("state.screen"), "seriesEnd");
  assert.equal(await ev("state.remaining"), 90);
  assert.equal(await ev("active()"), "A");
  await act("finalStart");
  await act("finalPass");
  assert.equal(await ev("state.index"), 1);
  // Arbitrage et confirmation de reset.
  await act("admin");
  await page.locator('[data-adjust="A"][data-delta="-10"]').click();
  assert.equal(await ev("state.scores.A"), 0);
  await page.locator('[data-adjust="A"][data-delta="5"]').click();
  assert.equal(await ev("state.scores.A"), 5);
  assert(
    (await page.locator("#history").innerText()).includes(
      "Correction manuelle",
    ),
  );
  await page.locator("#closeAdmin").click();
  await act("reset");
  await page.locator("#cancelReset").click();
  assert.equal(await ev("state.scores.A"), 5);
  await act("reset");
  await page.locator("#confirmReset").click();
  assert.deepEqual(await ev("state.scores"), { A: 0, B: 0 });
  assert.equal(await ev("localStorage.getItem(KEY)"), null);
  // Stockage incompatible, saisie échappée, responsive, clavier.
  await ev("localStorage.setItem(KEY,JSON.stringify({version:99}))");
  await page.reload();
  assert.equal(await page.locator('[data-action="restore"]').count(), 0);
  await act("configure");
  await page.locator("#nameA").fill("<b>Chefs</b>");
  await act("start");
  assert.equal(await page.locator("#scores b").count(), 0);
  await act("begin");
  await page.locator('[data-choice="A"][data-value="0"]').focus();
  await page.keyboard.press("Enter");
  assert.equal(await ev("state.answers.A"), 0);
  await page.setViewportSize({ width: 1024, height: 600 });
  assert(await ev("document.documentElement.scrollWidth<=innerWidth"));
  await page.screenshot({ path: "/tmp/cuisine-game.png" });
  assert.deepEqual(errors, []);
  console.log(
    "PASS : données canoniques, 32 cartes hors ligne, 275/275, indices, jokers, vols, GPS, monde, timer/pause/reprise, arbitrage, reset, clavier, affichage.",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
