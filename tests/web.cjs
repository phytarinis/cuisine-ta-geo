// Test du même dossier servi en HTTP, comme sur GitHub Pages, sans accès externe.
const { chromium } = require("playwright");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
};
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;
  const file = path.resolve(
    root,
    "." + (pathname === "/" ? "/index.html" : pathname),
  );
  if (!file.startsWith(root + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "text/plain",
    });
    res.end(data);
  });
});
(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1366, height: 768 },
      reducedMotion: "reduce",
    });
    const errors = [],
      external = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.route("**/*", (route) => {
      if (
        route
          .request()
          .url()
          .startsWith(url + "/")
      )
        return route.continue();
      external.push(route.request().url());
      return route.abort();
    });
    await page.goto(url);
    await page.screenshot({ path: "/tmp/cuisine-home.png" });
    for (const round of [3, 4]) {
      await page.evaluate((r) => {
        state = fresh();
        state.round = r;
        state.index = 1;
        state.screen = "correction";
        renderScreen();
      }, round);
      const img = page.locator(".map img");
      await img.evaluate((i) => i.decode());
      assert(await img.evaluate((i) => i.naturalWidth > 0));
      const imageBox = await img.boundingBox();
      const svgBox = await page.locator(".map svg").boundingBox();
      assert(
        Math.abs(imageBox.width - svgBox.width) < 1 &&
          Math.abs(imageBox.height - svgBox.height) < 1 &&
          Math.abs(imageBox.y - svgBox.y) < 1,
        "alignement carte/repères",
      );
      await page.screenshot({ path: `/tmp/cuisine-map-${round}.png` });
    }
    for (const width of [1366, 1024]) {
      await page.setViewportSize({ width, height: width === 1366 ? 768 : 600 });
      for (const round of [3, 4]) {
        await page.evaluate((r) => {
          state = fresh();
          state.round = r;
          state.screen = "correction";
          renderScreen();
        }, round);
        const imageBox = await page.locator(".map img").boundingBox(),
          svgBox = await page.locator(".map svg").boundingBox();
        assert(
          Math.abs(imageBox.width - svgBox.width) < 1 &&
            Math.abs(imageBox.height - svgBox.height) < 1 &&
            Math.abs(imageBox.y - svgBox.y) < 1,
          "alignement après redimensionnement",
        );
      }
    }
    await page.setViewportSize({ width: 1366, height: 768 });
    // Every GPS correction, including nearby cities, stays within its own map column.
    for (let i = 0; i < 6; i++) {
      await page.evaluate((i) => {
        state = fresh();
        state.reduce = true;
        state.round = 3;
        state.index = i;
        state.screen = "correction";
        renderScreen();
      }, i);
      const rects = await page.locator(".citylabel").evaluateAll((labels) =>
        labels.map((l) => {
          const r = l.getBoundingClientRect();
          return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
        }),
      );
      const map = await page.locator(".map").boundingBox();
      assert(
        rects.every(
          (r) => r.left >= map.x - 10 && r.right <= map.x + map.width + 90,
        ),
        "labels hors carte " + i,
      );
      for (let a = 0; a < rects.length; a++)
        for (let b = a + 1; b < rects.length; b++) {
          const x = rects[a],
            y = rects[b];
          assert(
            x.right <= y.left ||
              y.right <= x.left ||
              x.bottom <= y.top ||
              y.bottom <= x.top,
            "étiquettes superposées " + i,
          );
        }
    }
    // Keyboard map operation + reduced motion + returning focus to choices.
    await page.evaluate(() => {
      state = fresh();
      state.round = 3;
      beginCard();
      state.screen = "question";
      renderScreen();
    });
    await page.locator('[data-pin="2"]').focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate("state.answers.choice"), 2);
    await page.locator('[data-choice="choice"][data-value="1"]').focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page.evaluate("document.activeElement.dataset.value"),
      "1",
    );
    await page.locator('[data-action="motion"]').click();
    assert(
      await page
        .locator("body")
        .evaluate((b) => b.classList.contains("reduce")),
    );
    // Reload a saved intermediate selection, preserving team/joker/clues/scores.
    await page.evaluate(() => {
      state = fresh();
      state.round = 2;
      state.screen = "question";
      state.index = 2;
      state.clue = 2;
      state.answers.choice = 0;
      state.jokers.A = true;
      state.multiplier = 2;
      state.scores.A = 70;
      saveGame();
    });
    await page.reload();
    await page.locator('[data-action="restore"]').click();
    assert(
      await page.evaluate(
        "state.paused && state.round===2 && state.index===2 && state.clue===2 && state.answers.choice===0 && state.jokers.A && state.multiplier===2 && state.scores.A===70",
      ),
    );
    const cases = await page.evaluate(() => {
      let cases = 0;
      const check = (condition, label) => {
        if (!condition) throw new Error(label);
        cases++;
      };
      // Exhaustive scoring combinations against the canonical answer indexes.
      for (let i = 0; i < 6; i++)
        for (let clue = 0; clue < 3; clue++)
          for (const mult of [1, 2])
            for (let choice = -1; choice < 4; choice++) {
              state = fresh();
              state.round = 2;
              state.index = i;
              beginCard();
              state.screen = "question";
              state.clue = clue;
              state.multiplier = mult;
              state.answers.choice = choice;
              const q = card();
              submitAlternatingAnswer();
              check(
                state.scores[q.team] ===
                  (choice === q.answerIndex
                    ? D.points.indice_points_by_clue_index[clue] * mult
                    : 0),
                "sauce",
              );
              if (choice !== q.answerIndex) {
                const other = q.team === "A" ? "B" : "A";
                state.answers.choice = q.answerIndex;
                submitAlternatingAnswer();
                check(
                  state.scores[other] === 5 && state.screen === "correction",
                  "vol",
                );
              }
            }
      for (let i = 0; i < 6; i++)
        for (const mult of [1, 2])
          for (let pin = -1; pin < 4; pin++)
            for (let region = -1; region < 4; region++) {
              state = fresh();
              state.round = 3;
              state.index = i;
              beginCard();
              state.multiplier = mult;
              const q = card();
              state.answers.choice = pin;
              submitGPS();
              state.answers.choice = region;
              submitGPS();
              const expected =
                ((q.candidateCityIds[pin] === q.targetCityId ? 10 : 0) +
                  (region === q.regionAnswerIndex ? 5 : 0)) *
                mult;
              check(state.scores[q.team] === expected, "GPS");
            }
      for (let i = 0; i < 4; i++)
        for (let country = -1; country < 4; country++)
          for (let continent = -1; continent < 4; continent++) {
            state = fresh();
            state.round = 4;
            state.index = i;
            beginCard();
            const q = card();
            state.answers = { A: country, B: country };
            submitDuelAnswers();
            state.answers = { A: continent, B: continent };
            submitDuelAnswers();
            const expected =
              (country === q.countryAnswerIndex ? 10 : 0) +
              (continent === q.continentAnswerIndex ? 5 : 0);
            check(
              state.scores.A === expected && state.scores.B === expected,
              "monde",
            );
          }
      for (const t of ["A", "B"])
        for (let i = 0; i < 5; i++)
          for (let dep = 0; dep < 3; dep++)
            for (let reg = 0; reg < 3; reg++) {
              state = fresh();
              state.round = 5;
              state.finalOrder = t === "A" ? ["A", "B"] : ["B", "A"];
              state.index = i;
              state.screen = "question";
              state.answers = { department: dep, region: reg };
              const q = card();
              action("finalSubmit");
              action("finalSubmit"); // A second click cannot count the bon again.
              check(
                state.scores[t] ===
                  (dep === q.departmentAnswerIndex &&
                  reg === q.regionAnswerIndex
                    ? 10
                    : 0),
                "finale",
              );
            }
      state = fresh();
      state.round = 5;
      state.screen = "intro";
      state.scores = { A: 20, B: 10 };
      action("begin");
      check(active() === "B", "ordre finale");
      state = fresh();
      state.round = 2;
      beginCard();
      action("joker");
      state.round = 3;
      state.index = 1;
      beginCard();
      action("joker");
      check(state.multiplier === 1 && state.jokers.A, "joker unique");
      state = fresh();
      state.screen = "bonus";
      state.answers = { A: 0, B: 1 };
      submitDuelAnswers();
      check(
        state.scores.A === 10 && state.scores.B === 0 && state.bonusDone,
        "bonus départage",
      );
      return cases;
    });
    console.log(cases + " combinaisons de barème vérifiées.");
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    console.log(
      "PASS : mode HTTP statique, ressources locales, 6 cartes GPS sans étiquettes superposées, clavier, animations réduites et sauvegarde intermédiaire.",
    );
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  server.close();
  process.exit(1);
});
