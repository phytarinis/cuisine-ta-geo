"use strict";
const D = window.CUISINE_TA_GEO_DATA,
  KEY = "cuisine-ta-geo-v1",
  VERSION = 1;
// Explicit order: data object property order is not part of the game rules.
const rounds = [
    D.rounds["1_apero_local"],
    D.rounds["2_a_quelle_sauce"],
    D.rounds["3_gps_en_pls"],
    D.rounds["4_passeport_gourmand"],
    D.rounds["5_coup_de_feu"],
  ],
  titles = [
    "",
    "🥂 L’apéro local",
    "🥘 À quelle sauce ?",
    "🧭 Le GPS est en PLS !",
    "🌍 Passeport gourmand",
    "🔥 Le coup de feu !",
  ];
const rules = [
  "",
  "Deux ardoises : enregistrez les deux réponses, puis révélez. +10 par bonne réponse.",
  "Une région actuelle à retrouver. Trois indices : 20, 15 puis 10 points. Une erreur ouvre un vol à +5.",
  "Repérez la ville (+10), puis sa région (+5). Pas de chrono ni de vol.",
  "Duel : pays (+10), puis continent (+5). Les deux scores sont indépendants.",
  "Cinq bons par brigade, 90 secondes chacune. Département ET région corrects : +10. Aucun bonus vitesse.",
];
const $ = (s) => document.querySelector(s),
  esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
let state = null,
  stored = null,
  storageIssue = "",
  lastTick = 0;
// Only a compatible, structurally valid save is offered on the home screen.
function valid(s) {
  return (
    s &&
    s.version === VERSION &&
    [
      "home",
      "config",
      "intro",
      "prepare",
      "question",
      "correction",
      "between",
      "finalReady",
      "seriesEnd",
      "finalCorrection",
      "results",
      "debrief",
      "bonus",
    ].includes(s.screen) &&
    Number.isInteger(s.round) &&
    s.round >= 1 &&
    s.round <= 5 &&
    Number.isInteger(s.index) &&
    s.index >= 0 &&
    s.index < 6 &&
    s.scores &&
    ["A", "B"].every(
      (t) =>
        Number.isInteger(s.scores[t]) &&
        s.scores[t] >= 0 &&
        typeof s.names?.[t] === "string" &&
        s.names[t].length <= 20 &&
        typeof s.jokers?.[t] === "boolean",
    ) &&
    Array.isArray(s.history) &&
    s.history.every((h) => typeof h === "string") &&
    s.awarded &&
    typeof s.awarded === "object" &&
    s.answers &&
    typeof s.answers === "object" &&
    [0, 1, 2].includes(s.clue) &&
    [0, 1].includes(s.step) &&
    [1, 2].includes(s.multiplier) &&
    typeof s.paused === "boolean" &&
    typeof s.steal === "boolean" &&
    typeof s.reduce === "boolean" &&
    typeof s.bonusDone === "boolean" &&
    [0, 1].includes(s.series) &&
    Array.isArray(s.finalOrder) &&
    (s.round !== 5 ||
      s.screen === "intro" ||
      (s.finalOrder.length === 2 &&
        new Set(s.finalOrder).size === 2 &&
        s.finalOrder.every((t) => ["A", "B"].includes(t)))) &&
    s.index < (s.round === 4 ? 4 : s.round === 5 ? 5 : 6) &&
    Number.isFinite(s.remaining) &&
    s.remaining >= 0 &&
    s.remaining <= 90
  );
}
function readSaved() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    return valid(s) ? s : null;
  } catch {
    return null;
  }
}
stored = readSaved();
function fresh() {
  return {
    version: VERSION,
    screen: "home",
    round: 1,
    index: 0,
    names: { ...D.teams },
    scores: { A: 0, B: 0 },
    jokers: { A: false, B: false },
    answers: {},
    clue: 0,
    step: 0,
    steal: false,
    multiplier: 1,
    history: [],
    awarded: {},
    paused: false,
    remaining: 90,
    finalOrder: [],
    series: 0,
    bonusDone: false,
    reduce: false,
  };
}
state = fresh();
function saveGame() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    storageIssue = "";
  } catch {
    storageIssue = "Sauvegarde indisponible : gardez cet onglet ouvert.";
  }
}
function restoreGame() {
  const s = readSaved();
  if (!s) return;
  state = s;
  state.paused = true;
  lastTick = 0;
  renderScreen();
  saveGame();
}
function btn(label, action, disabled = false, cls = "") {
  return `<button data-action="${action}" ${disabled ? "disabled" : ""} class="${cls}">${label}</button>`;
}
function active() {
  return state.round === 5 ? state.finalOrder[state.series] : card()?.team;
}
function card() {
  return state.round === 5
    ? rounds[4][active()]?.[state.index]
    : rounds[state.round - 1][state.index];
}
function team(t) {
  return `${t} · ${esc(state.names[t])}`;
}
// A unique key per question/component/team makes repeated validation harmless.
function awardPoints(t, n, key, label) {
  if (state.awarded[key]) return;
  state.awarded[key] = true;
  state.scores[t] += n;
  state.history.push(`${label} — ${t} : +${n}`);
}
function options(opts, group, pass = true) {
  return `<div class="options" role="group" aria-label="${esc(group)}">${[...opts, ...(pass ? ["Passe"] : [])].map((o, i) => `<button data-choice="${group}" data-value="${i === opts.length ? -1 : i}" aria-pressed="${state.answers[group] === (i === opts.length ? -1 : i)}" class="${state.answers[group] === (i === opts.length ? -1 : i) ? "selected" : ""}">${i < opts.length ? String.fromCharCode(65 + i) + " · " : ""}${esc(o)}</button>`).join("")}</div>`;
}
function dual(opts) {
  return `<p>Ardoises révélées ensemble ? Enregistrez les deux choix avant la correction.</p><div class="grid">${["A", "B"].map((t) => `<section class="card"><h2>Réponse ${team(t)}</h2>${options(opts, t)}</section>`).join("")}</div>${btn("Révéler", "duel", state.answers.A === undefined || state.answers.B === undefined, "primary")}`;
}
// Same projection and viewBox as assets/france.svg: resizing cannot move pins.
function mapFrance(q, reveal = false) {
  return `<div class="map"><img src="assets/france.svg" alt="France métropolitaine et Corse"><svg viewBox="0 0 640 660" aria-label="Repères géographiques">${q.candidateCityIds
    .map((id, i) => {
      const c = D.cities[id],
        x = (c.lon + 5.5) * 40,
        y = (51.5 - c.lat) * 60;
      return `<g ${!reveal ? 'data-pin="' + i + '" tabindex="0" role="button" aria-label="Repère ' + String.fromCharCode(65 + i) + '"' : ""}><circle class="pin ${reveal && id === q.targetCityId ? "target" : ""}" cx="${x}" cy="${y}" r="24"/><text class="pintext" text-anchor="middle" x="${x}" y="${y + 8}">${String.fromCharCode(65 + i)}</text>${reveal ? `<text class="citylabel" text-anchor="${x > 470 ? "end" : "start"}" x="${x > 470 ? x - 25 : x + 25}" y="${y + 5}">${esc(c.name)}</text>` : ""}</g>`;
    })
    .join("")}</svg></div>`;
}
// Keep geographic pins fixed; move only correction labels, with leader lines.
// Actual SVG text bounds account for the system font and long city names.
function arrangeMapLabels() {
  const svg = document.querySelector(".map:not(.world) svg");
  if (!svg) return;
  const placed = [];
  const pins = [...svg.querySelectorAll("circle")].map((c) => ({
    x: Number(c.getAttribute("cx")) - 25,
    y: Number(c.getAttribute("cy")) - 25,
    width: 50,
    height: 50,
  }));
  const overlap = (a, b) =>
    a.x < b.x + b.width + 6 &&
    a.x + a.width + 6 > b.x &&
    a.y < b.y + b.height + 6 &&
    a.y + a.height + 6 > b.y;
  svg.querySelectorAll(".citylabel").forEach((label, index) => {
    const x = Number(label.getAttribute("x")),
      y = Number(label.getAttribute("y"));
    let box = label.getBBox();
    const shift = Math.max(0, 5 - box.x) - Math.max(0, box.x + box.width - 635);
    label.setAttribute("x", x + shift);
    for (const offset of [0, -44, 44, -88, 88, -132, 132, -176, 176]) {
      label.setAttribute("y", y + offset);
      box = label.getBBox();
      if (
        box.y >= 4 &&
        box.y + box.height <= 656 &&
        !placed.some((other) => overlap(box, other)) &&
        !pins.some((other, i) => i !== index && overlap(box, other))
      )
        break;
    }
    placed.push({ x: box.x, y: box.y, width: box.width, height: box.height });
    if (Number(label.getAttribute("y")) !== y || shift) {
      const circle = label.parentElement.querySelector("circle");
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      for (const [key, value] of Object.entries({
        x1: circle.getAttribute("cx"),
        y1: circle.getAttribute("cy"),
        x2: label.getAttribute("x"),
        y2: Number(label.getAttribute("y")) - 12,
        stroke: "#152c42",
        "stroke-width": 2,
      }))
        line.setAttribute(key, value);
      label.before(line);
    }
  });
}
const countries = {
  Japon: [138, 37],
  Maroc: [-7, 32],
  Mexique: [-102, 23],
  Pologne: [19, 52],
};
function world(q) {
  const [lon, lat] = countries[q.country];
  return `<div class="map world"><img src="assets/monde.svg" alt="Carte du monde"><svg viewBox="0 0 720 360" role="img" aria-label="${esc(q.country)} localisé"><circle cx="${(lon + 180) * 2}" cy="${(90 - lat) * 2}" r="7" fill="#b82e44" stroke="white" stroke-width="2"/><text x="${(lon + 180) * 2}" y="${(90 - lat) * 2 - 13}" text-anchor="middle" class="citylabel">${esc(q.country)}</text></svg></div>`;
}
function renderQuestion() {
  const q = card(),
    r = state.round;
  let html = `<div class="eyebrow">Manche ${r}/5 · Défi ${state.index + 1}/${r === 4 ? 4 : r === 5 ? 5 : 6} · ${r === 1 || r === 4 ? "Duel" : team(active())}</div>`;
  if (r === 1) return html + `<h2>${esc(q.prompt)}</h2>` + dual(q.options);
  if (r === 2)
    return (
      html +
      `<h2>Dans quelle région actuelle associe-t-on cette spécialité ?</h2><span class="badge">${state.steal ? "Vol : 5" : D.points.indice_points_by_clue_index[state.clue] * state.multiplier} points · ${team(state.steal ? (q.team === "A" ? "B" : "A") : q.team)}</span><ol class="clues">${q.clues
        .slice(0, state.clue + 1)
        .map((c) => `<li>${esc(c)}</li>`)
        .join(
          "",
        )}</ol>${options(q.options, "choice")}<div class="actions">${btn("Valider la réponse", "alternating", state.answers.choice === undefined, "primary")}${!state.steal ? btn("Révéler un indice", "clue", state.clue >= 2) : ""}</div>`
    );
  if (r === 3)
    return (
      html +
      `<h2>${esc(q.delivery)}</h2><div class="grid"><section>${mapFrance(q)}</section><section class="card"><h2>${state.step === 0 ? "1 · Quel repère ? (+10)" : "2 · Quelle région ? (+5)"}</h2>${options(state.step === 0 ? ["Repère A", "Repère B", "Repère C", "Repère D"] : q.regionOptions, "choice")}<div class="actions">${btn("Valider", "gps", state.answers.choice === undefined, "primary")}</div></section></div>`
    );
  if (r === 4)
    return (
      html +
      `<h2>${esc(q.dish)} · ${state.step === 0 ? "À quel pays associe-t-on ce plat ?" : "Sur quel continent se trouve ce pays ?"}</h2>` +
      dual(state.step === 0 ? q.countryOptions : q.continentOptions)
    );
  return (
    html +
    `<div class="timer" role="timer" aria-label="Temps restant"><span id="seconds">${Math.ceil(state.remaining)}</span> s</div><h2>${esc(q.order)} · ${esc(D.cities[q.targetCityId].name)}</h2><p role="status">${state.index ? "Bon envoyé !" : ""}</p><div class="grid"><section><h2>Département</h2>${options(q.departmentOptions, "department", false)}</section><section><h2>Région</h2>${options(q.regionOptions, "region", false)}</section></div><div class="actions">${btn("Valider le bon", "finalSubmit", state.answers.department === undefined || state.answers.region === undefined, "primary")}${btn("Passer", "finalPass")}</div>`
  );
}
function correction() {
  const q = card(),
    r = state.round;
  let answer = "";
  if (r === 1) answer = esc(q.options[q.answerIndex]);
  if (r === 2)
    answer = `${esc(q.dish)} → ${esc(q.options[q.answerIndex])}<p>${esc(q.associatedCity)} · ${esc(q.associatedDepartment)}</p>`;
  if (r === 3) {
    const c = D.cities[q.targetCityId];
    answer = `${esc(c.name)} → ${esc(c.department)} → ${esc(c.region)}`;
  }
  if (r === 4) answer = `${esc(q.country)} → ${esc(q.continent)}`;
  return `<div class="eyebrow">Correction · ${q.id}</div><div class="${r >= 3 ? "grid" : ""}">${r === 3 ? mapFrance(q, true) : r === 4 ? world(q) : ""}<section class="card correction"><h2>${answer}</h2><p>${esc(q.explanation)}</p><p>${state.history
    .filter((h) => h.startsWith(q.id + " "))
    .map(esc)
    .join(
      "<br>",
    )}</p>${btn("Défi suivant", "next", false, "primary")}</section></div>`;
}
function finalTable() {
  return `<h2>Les dix commandes · correction</h2><table><thead><tr><th>Brigade</th><th>Ville → département → région</th><th>Points</th></tr></thead><tbody>${[
    "A",
    "B",
  ]
    .flatMap((t) =>
      rounds[4][t].map(
        (q) =>
          `<tr><td>${t}</td><td>${esc(q.explanation)}</td><td>${esc(
            state.history
              .find((h) => h.startsWith(q.id + " "))
              ?.split(": ")
              .pop() || "+0 (non traité)",
          )}</td></tr>`,
      ),
    )
    .join(
      "",
    )}</tbody></table>${btn("Voir le classement", "results", false, "primary")}`;
}
function renderScreen() {
  $("#scores").innerHTML =
    `<div class="team A">${team("A")} <strong>${state.scores.A}</strong><small>Sauce piquante : ${state.jokers.A ? "utilisée" : "disponible"}</small></div><div class="brand">CUISINE TA GÉO<br>LE BATTLE DES SAVEURS</div><div class="team B">${team("B")} <strong>${state.scores.B}</strong><small>Sauce piquante : ${state.jokers.B ? "utilisée" : "disponible"}</small></div>`;
  let html = "";
  const s = state.screen;
  if (state.paused)
    html = `<div class="center card"><h1>⏸ Partie en pause</h1><p>Les réponses et le chrono sont suspendus.</p>${btn("Reprendre", "pause", false, "primary")}</div>`;
  else if (s === "home")
    html = `<div class="center"><div class="eyebrow">E2C Coutras · Géographie à partager</div><h1>Cuisine ta Géo</h1><h2>Le Battle des Saveurs</h2><p>Deux brigades, un seul territoire à conquérir !</p><div class="trucks"><div class="truck">🥘<span>A · BRIGADE BLEUE</span></div><div class="truck red">🌮<span>B · BRIGADE ROUGE</span></div></div><p>5 manches · 32 défis · 2 ardoises · 1 écran</p><div class="actions">${btn("LANCER LA BATAILLE DES SAVEURS", "configure", false, "primary")}${stored ? btn("Reprendre la partie", "restore") : ""}</div></div>`;
  else if (s === "config")
    html = `<h1>Préparez vos brigades</h1><div class="grid">${["A", "B"].map((t) => `<section class="card"><label for="name${t}">Nom de l’équipe ${t}</label><input id="name${t}" maxlength="20" value="${esc(state.names[t])}"></section>`).join("")}</div><details><summary>Comment jouer ?</summary><ol><li>Deux ardoises pour les duels, un seul écran.</li><li>Discutez, puis donnez une réponse au formateur.</li><li>Chaque bonne réponse rapporte des points, sans pénalité.</li><li>Un joker x2 par brigade, avant un défi des manches 2 ou 3.</li><li>La finale accorde 90 secondes par brigade ; la pause reste disponible.</li></ol></details><div class="actions">${btn("Commencer", "start", false, "primary")}</div>`;
  else if (s === "intro")
    html = `<div class="center card"><div class="eyebrow">Manche ${state.round}/5</div><h1>${titles[state.round]}</h1><p>${rules[state.round]}</p>${btn("C’est parti", "begin", false, "primary")}</div>`;
  else if (s === "prepare")
    html = `<div class="center card"><div class="eyebrow">Préparation · Défi ${state.index + 1}/6</div><h1>Au tour de ${team(active())}</h1><p>Choisissez votre joker avant de découvrir la question.</p><div class="actions">${btn(state.multiplier === 2 ? "🌶 Joker activé · points ×2" : "🌶 Sauce piquante · activer ×2", "joker", state.jokers[active()])}${btn("Afficher le défi", "show", false, "primary")}</div></div>`;
  else if (s === "question") html = renderQuestion();
  else if (s === "correction") html = correction();
  else if (s === "between")
    html = `<div class="center card"><h1>Manche terminée !</h1><p>Bravo aux deux brigades. Prochaine étape :</p><h2>${titles[state.round + 1]}</h2>${btn("Manche suivante", "roundNext", false, "primary")}</div>`;
  else if (s === "finalReady" || s === "seriesEnd")
    html = `<div class="center card"><h1>${s === "seriesEnd" ? "Série terminée !" : "À vos bons de livraison !"}</h1><h2>${team(active())} · 90 secondes</h2><p>Le chrono démarrera uniquement au clic. Les corrections attendent la fin des deux séries.</p>${btn("Démarrer les 90 secondes", "finalStart", false, "primary")}</div>`;
  else if (s === "finalCorrection") html = finalTable();
  else if (s === "results") {
    const tie = state.scores.A === state.scores.B;
    html = `<div class="center card"><div class="eyebrow">Le classement des saveurs</div><h1>${tie ? "Égalité ! Deux brigades au top." : "🏆 Bravo " + team(state.scores.A > state.scores.B ? "A" : "B") + " !"}</h1><p>${team("A")} : ${state.scores.A} points · ${team("B")} : ${state.scores.B} points</p><p>Commune → département → région → pays → continent</p><p>Merci aux deux brigades pour cette bataille collective !</p><div class="actions">${btn("Bilan / Débrief", "debrief")}${tie && !state.bonusDone ? btn("Question bonus facultative", "bonus") : ""}${btn("Rejouer", "reset")}</div></div>`;
  } else if (s === "debrief")
    html = `<h1>Le goût de la géographie</h1><div class="card"><p>1. Quelle différence entre une ville, un département, une région, un pays et un continent ?</p><p>2. Comment avez-vous utilisé les repères de la carte et décidé ensemble ?</p><p>3. Quand ces repères sont-ils utiles : stage, transport, rendez-vous, emploi ?</p><p>Une commune est une unité administrative ; « ville » n’en est pas toujours un synonyme strict. Le score du jeu ne valide aucun palier UP2C.</p></div>${btn("Retour aux résultats", "results")}`;
  else if (s === "bonus")
    html = `<h1>Quelle est la préfecture de la Gironde ?</h1>${dual(["Bordeaux", "Libourne", "Arcachon"])}`;
  $("#app").innerHTML = html;
  arrangeMapLabels();
  document.body.classList.toggle("reduce", state.reduce);
  $("#controls").innerHTML =
    btn(
      state.paused ? "Reprendre" : "⏸ Pause",
      "pause",
      s === "home" || s === "config",
    ) +
    btn("Corriger le score / historique", "admin", s === "home") +
    btn("Nouvelle partie", "reset") +
    btn(
      state.reduce ? "Animations réduites ✓" : "Réduire les animations",
      "motion",
    ) +
    (storageIssue ? `<span role="alert">${storageIssue}</span>` : "");
}
function clearCard() {
  state.answers = {};
  state.step = 0;
  state.clue = 0;
  state.steal = false;
  state.multiplier = 1;
}
function beginCard() {
  clearCard();
  state.screen =
    state.round === 2 || state.round === 3 ? "prepare" : "question";
}
function submitDuelAnswers() {
  if (state.answers.A === undefined || state.answers.B === undefined) return;
  if (state.screen === "bonus") {
    ["A", "B"].forEach((t) =>
      awardPoints(
        t,
        state.answers[t] === 0 ? 10 : 0,
        "bonus" + t,
        "Bonus Bordeaux",
      ),
    );
    state.bonusDone = true;
    state.screen = "results";
    return;
  }
  const q = card(),
    r = state.round;
  ["A", "B"].forEach((t) =>
    awardPoints(
      t,
      state.answers[t] ===
        (r === 1
          ? q.answerIndex
          : state.step === 0
            ? q.countryAnswerIndex
            : q.continentAnswerIndex)
        ? r === 1 || state.step === 0
          ? 10
          : 5
        : 0,
      `${q.id}-${state.step}-${t}`,
      q.id +
        " " +
        (r === 1 ? "réponse" : state.step === 0 ? "pays" : "continent"),
    ),
  );
  if (r === 4 && state.step === 0) {
    state.step = 1;
    state.answers = {};
  } else state.screen = "correction";
}
function submitAlternatingAnswer() {
  if (state.answers.choice === undefined) return;
  const q = card(),
    ok = state.answers.choice === q.answerIndex,
    t = state.steal ? (q.team === "A" ? "B" : "A") : q.team;
  awardPoints(
    t,
    ok
      ? state.steal
        ? 5
        : D.points.indice_points_by_clue_index[state.clue] * state.multiplier
      : 0,
    q.id + "-" + t,
    q.id + " " + (state.steal ? "vol" : "région"),
  );
  if (!ok && !state.steal) {
    state.steal = true;
    state.answers = {};
  } else state.screen = "correction";
}
function submitGPS() {
  if (state.answers.choice === undefined) return;
  const q = card(),
    part = state.step === 0,
    ok = part
      ? q.candidateCityIds[state.answers.choice] === q.targetCityId
      : state.answers.choice === q.regionAnswerIndex;
  awardPoints(
    q.team,
    ok ? (part ? 10 : 5) * state.multiplier : 0,
    q.id + "-" + state.step,
    q.id + " " + (part ? "ville" : "région"),
  );
  if (part) {
    state.step = 1;
    state.answers = {};
  } else state.screen = "correction";
}
function nextCard() {
  const total = state.round === 4 ? 4 : 6;
  if (++state.index === total) {
    state.index = 0;
    state.screen = "between";
  } else beginCard();
}
function endSeries() {
  state.remaining = 0;
  lastTick = 0;
  if (state.series === 0) {
    state.series = 1;
    state.index = 0;
    state.remaining = 90;
    state.screen = "seriesEnd";
    state.answers = {};
  } else state.screen = "finalCorrection";
}
// Measure elapsed time rather than interval ticks, including background tabs.
// Restoring a save always pauses, so time offline is never charged.
function updateTimer() {
  if (state.screen !== "question" || state.round !== 5 || state.paused) {
    lastTick = 0;
    return;
  }
  const now = performance.now();
  if (lastTick)
    state.remaining = Math.max(0, state.remaining - (now - lastTick) / 1000);
  lastTick = now;
  if (state.remaining <= 0) {
    endSeries();
    saveGame();
    renderScreen();
  } else {
    const el = $("#seconds");
    if (el) el.textContent = Math.ceil(state.remaining);
    saveGame();
  }
}
function pauseTimer() {
  updateTimer();
  state.paused = true;
  lastTick = 0;
}
function resumeTimer() {
  state.paused = false;
  lastTick = performance.now();
}
function resetGame() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    storageIssue = "Sauvegarde indisponible.";
  }
  stored = null;
  state = fresh();
  lastTick = 0;
  renderScreen();
}
function action(a) {
  if (state.paused && !["pause", "reset", "admin", "motion"].includes(a))
    return;
  const s = state.screen;
  if (a === "configure") {
    state.screen = "config";
  } else if (a === "restore") {
    restoreGame();
    return;
  } else if (a === "start" && s === "config") {
    ["A", "B"].forEach(
      (t) =>
        (state.names[t] =
          $("#name" + t)
            .value.trim()
            .slice(0, 20) || D.teams[t]),
    );
    state.screen = "intro";
  } else if (a === "begin" && s === "intro") {
    if (state.round === 5) {
      state.finalOrder =
        state.scores.A <= state.scores.B ? ["A", "B"] : ["B", "A"];
      state.screen = "finalReady";
    } else beginCard();
  } else if (a === "joker" && s === "prepare" && !state.jokers[active()]) {
    state.jokers[active()] = true;
    state.multiplier = 2;
  } else if (a === "show" && s === "prepare") state.screen = "question";
  else if (
    a === "clue" &&
    s === "question" &&
    state.round === 2 &&
    !state.steal
  )
    state.clue = Math.min(2, state.clue + 1);
  else if (
    a === "duel" &&
    ((s === "question" && [1, 4].includes(state.round)) || s === "bonus")
  )
    submitDuelAnswers();
  else if (a === "alternating" && s === "question" && state.round === 2)
    submitAlternatingAnswer();
  else if (a === "gps" && s === "question" && state.round === 3) submitGPS();
  else if (a === "next" && s === "correction") nextCard();
  else if (a === "roundNext" && s === "between") {
    state.round++;
    state.screen = "intro";
    clearCard();
  } else if (a === "finalStart" && ["finalReady", "seriesEnd"].includes(s)) {
    state.screen = "question";
    state.remaining = 90;
    state.answers = {};
    lastTick = performance.now();
  } else if (
    ["finalSubmit", "finalPass"].includes(a) &&
    s === "question" &&
    state.round === 5
  ) {
    updateTimer();
    if (state.screen !== "question") return;
    const q = card();
    if (
      a === "finalSubmit" &&
      (state.answers.department === undefined ||
        state.answers.region === undefined)
    )
      return;
    const ok =
      a === "finalSubmit" &&
      state.answers.department === q.departmentAnswerIndex &&
      state.answers.region === q.regionAnswerIndex;
    awardPoints(active(), ok ? 10 : 0, q.id, q.id + " bon");
    state.answers = {};
    if (++state.index === 5) {
      state.index = 0;
      endSeries();
    }
  } else if (a === "results") state.screen = "results";
  else if (a === "debrief" && s === "results") state.screen = "debrief";
  else if (a === "bonus" && s === "results" && !state.bonusDone) {
    state.answers = {};
    state.screen = "bonus";
  } else if (a === "pause") {
    state.paused ? resumeTimer() : pauseTimer();
  } else if (a === "motion") state.reduce = !state.reduce;
  else if (a === "reset") {
    $("#reset").showModal();
    return;
  } else if (a === "admin") {
    showAdmin();
    return;
  }
  if (!["home", "config"].includes(state.screen)) saveGame();
  renderScreen();
}
function showAdmin() {
  $("#adjustments").innerHTML = ["A", "B"]
    .map(
      (t) =>
        `<p>${team(t)}</p><div class="actions">${[-10, -5, 5, 10].map((n) => `<button data-adjust="${t}" data-delta="${n}">${n > 0 ? "+" : ""}${n}</button>`).join("")}</div>`,
    )
    .join("");
  $("#history").innerHTML = state.history
    .map((h) => `<li>${esc(h)}</li>`)
    .join("");
  if (!$("#admin").open) $("#admin").showModal();
}
document.addEventListener("click", (e) => {
  const focusGroup = e.target.closest("[data-choice]")?.dataset.choice,
    focusValue = e.target.closest("[data-choice]")?.dataset.value;
  const choice = e.target.closest("[data-choice]"),
    pin = e.target.closest("[data-pin]"),
    b = e.target.closest("[data-action]"),
    adjust = e.target.closest("[data-adjust]");
  if (b && !b.disabled) action(b.dataset.action);
  else if (!state.paused && state.screen === "question" && choice) {
    state.answers[choice.dataset.choice] = Number(choice.dataset.value);
    saveGame();
    renderScreen();
  } else if (!state.paused && state.screen === "bonus" && choice) {
    state.answers[choice.dataset.choice] = Number(choice.dataset.value);
    saveGame();
    renderScreen();
  } else if (
    pin &&
    !state.paused &&
    state.screen === "question" &&
    state.round === 3 &&
    state.step === 0
  ) {
    state.answers.choice = Number(pin.dataset.pin);
    saveGame();
    renderScreen();
  } else if (adjust) {
    const t = adjust.dataset.adjust,
      old = state.scores[t];
    state.scores[t] = Math.max(0, old + Number(adjust.dataset.delta));
    state.history.push(
      `Correction manuelle — ${t} : ${state.scores[t] - old >= 0 ? "+" : ""}${state.scores[t] - old}`,
    );
    saveGame();
    renderScreen();
    showAdmin();
  }
  if (focusGroup)
    document
      .querySelector(
        `[data-choice="${focusGroup}"][data-value="${focusValue}"]`,
      )
      ?.focus();
  else if (b && !["admin", "reset"].includes(b.dataset.action))
    $("#app").focus();
});
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-pin]")) {
    e.preventDefault();
    e.target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  }
});
$("#closeAdmin").onclick = () => $("#admin").close();
$("#cancelReset").onclick = () => $("#reset").close();
$("#confirmReset").onclick = () => {
  $("#reset").close();
  resetGame();
};
window.addEventListener("pagehide", () => {
  if (state.screen !== "home") {
    updateTimer();
    saveGame();
  }
});
setInterval(updateTimer, 250);
renderScreen();
