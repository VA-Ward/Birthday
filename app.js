/* ============================================================
   Birthday site — front end
   Everything on the page is driven by content.json.
   If content.json is missing, the defaults below are used.
   ============================================================ */
(function () {
  "use strict";

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HOVER = !window.matchMedia || window.matchMedia("(hover: hover)").matches;

  var DEFAULT = {
    name: "My Love",
    monogram: "M",
    eyebrow: "The third of August",
    birthday: "2026-08-03",
    age: 26,
    heroLine: "Twenty-six years of you, and the world has never once been the same.",
    letter: {
      greeting: "My love,",
      body: [
        "I have never been very good with occasions. Cards feel too small, flowers wilt by Thursday, and anything I say out loud comes out about a tenth as well as I meant it. So I built you this instead \u2014 somewhere quiet on the internet that belongs to no one but you.",
        "Twenty-six years ago the world got quietly luckier, and it took me a while to catch up to that. Now I get the ordinary version of you: the half-asleep one, the singing-in-the-car one, the one who steals my jumper and denies it. That version is the one I would choose every single time.",
        "So happy birthday. Eat too much cake. Let me carry the bags. And know that whatever this year decides to throw at us, I am standing right here, entirely and stubbornly yours."
      ],
      signature: "Yours, always"
    },
    photos: [
      { src: "", motif: "sprig", caption: "Add your photos here \u2014 they will appear in this wheel." },
      { src: "", motif: "moon", caption: "Every late night that turned into morning." },
      { src: "", motif: "rose", caption: "The one where you were laughing." },
      { src: "", motif: "swallow", caption: "Somewhere we said we would go back to." },
      { src: "", motif: "ring", caption: "And all the ones still to come." }
    ],
    quotes: [
      { text: "I did not fall in love with you. I walked in, and never once looked for the door.", source: "" },
      { text: "You pierce my soul.", source: "Jane Austen, Persuasion" },
      { text: "Of all the ordinary days there have ever been, the best one is the one with you in it.", source: "" },
      { text: "He's more myself than I am.", source: "Emily Bront\u00eb, Wuthering Heights" },
      { text: "Every road I ever took was quietly on its way to you.", source: "" },
      { text: "If loving you is a habit, then let me never be cured of it.", source: "" }
    ],
    reasonsTitle: "Twenty-six reasons",
    reasons: [
      "The way you laugh before the joke has even landed.",
      "How you say my name when you are half asleep.",
      "Your handwriting on shopping lists.",
      "The way you straighten my collar without a word.",
      "How you make any room we are in feel like home.",
      "Your terrible, wonderful taste in movies.",
      "The way you dance while you cook.",
      "How you remember all the small things I forget.",
      "Your patience with me on my worst days.",
      "The face you make at bad coffee.",
      "How you sing in the car \u2014 badly, gladly.",
      "The way you take my hand at the crossing.",
      "Your stubborn, unshakeable kindness.",
      "How you always know when to say nothing at all.",
      "The sound of you humming in the next room.",
      "Your courage, quiet and constant.",
      "The way you save the last bite for me.",
      "How you laugh at your own stories first.",
      "Your cold feet finding mine in winter.",
      "The way you look up when I walk in.",
      "How you make an ordinary Tuesday feel like something.",
      "Your honesty, even when it stings a little.",
      "The way you say \u201cwe\u201d without thinking about it.",
      "How safe the whole world feels beside you.",
      "The way you forgive me \u2014 completely, every time.",
      "That out of everyone there has ever been, it is you."
    ],
    story: [
      { when: "The beginning", title: "The day everything quietly changed", text: "Edit this in the admin page \u2014 put the day you met here, and what you remember about it." },
      { when: "Early days", title: "The first trip away", text: "A moment from your first year together. Where you went, what went wrong, why it was perfect anyway." },
      { when: "Somewhere along the way", title: "It stopped being new", text: "The point it turned from exciting into steady \u2014 and how much better steady turned out to be." },
      { when: "3 August", title: "Twenty-six", text: "And here we are. Same person, more years, more sure than ever." }
    ],
    wish: {
      lightHint: "Light it",
      blowHint: "Blow it out",
      lit: "Make a wish. I will help you keep it.",
      done: "Happy birthday. Here is to every year after this one."
    },
    locked: false,
    unlockAt: "",
    lockedLine: "Everything here is sealed until the day itself.",
    lockedNote: "Sealed until then",
    lockedCaption: "until it opens",
    closing: "Made by hand, for you.",
    music: { url: "", title: "Play music" },
    lock: {
      enabled: true,
      reveal: "2026-08-03T00:00",
      note: "There is a whole page behind this one \u2014 a letter, photographs, twenty-six reasons and a candle to blow out. It opens by itself the moment it turns to the third. Come back then."
    }
  };

  var MOTIFS = {
    sprig: '<path d="M50 92V26" /><path d="M50 44c-9-3-13-11-13-19 8 1 13 7 13 19zM50 44c9-3 13-11 13-19-8 1-13 7-13 19z"/><path d="M50 62c-10-3-15-11-15-20 9 1 15 8 15 20zM50 62c10-3 15-11 15-20-9 1-15 8-15 20z"/>',
    moon: '<path d="M62 22a34 34 0 100 68 40 40 0 010-68z"/><path d="M28 34l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM72 74l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/>',
    rose: '<path d="M50 96V54"/><circle cx="50" cy="38" r="16"/><path d="M50 30a8 8 0 018 8 8 8 0 01-16 0 8 8 0 018-8z"/><path d="M50 66c-11 0-16-6-17-14 10 0 16 5 17 14zM50 78c11 0 16-6 17-14-10 0-16 5-17 14z"/>',
    swallow: '<path d="M14 52c14-2 24-9 30-20 4 12 14 19 30 20-13 3-22 10-30 22-8-12-17-19-30-22z"/><path d="M44 74c4 6 8 10 12 12"/>',
    ring: '<circle cx="50" cy="58" r="24"/><path d="M50 34l-8-10h16z"/><path d="M42 24l8 10 8-10"/>'
  };

  function motifSvg(key) {
    var d = MOTIFS[key] || MOTIFS.sprig;
    return '<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<g fill="none" stroke="rgba(228,192,137,.55)" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">' +
      d + "</g></svg>";
  }

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function merge(base, over) {
    var out = {}, k;
    for (k in base) if (Object.prototype.hasOwnProperty.call(base, k)) out[k] = base[k];
    for (k in over) {
      if (!Object.prototype.hasOwnProperty.call(over, k)) continue;
      var v = over[k];
      if (v === null || v === undefined || v === "") continue;
      if (Array.isArray(v)) { if (v.length) out[k] = v; }
      else if (typeof v === "object") out[k] = merge(base[k] || {}, v);
      else out[k] = v;
    }
    return out;
  }

  /* ---------------- boot ---------------- */
  fetch("content.json?v=" + Date.now())
    .then(function (r) { if (!r.ok) throw new Error("no content"); return r.json(); })
    .then(function (json) { start(merge(DEFAULT, json)); })
    .catch(function () { start(DEFAULT); });

  function start(C) {
    document.title = "Happy Birthday, " + C.name;
    $("hero-name").textContent = C.name;
    $("hero-eyebrow").textContent = C.eyebrow;
    $("hero-line").textContent = C.heroLine;
    $("closing").textContent = C.closing;
    var initial = (C.monogram || C.name || "M").charAt(0).toUpperCase();
    $("seal-mono").textContent = initial;
    $("sealed-mono").textContent = initial;

    var preview = /(^|[?&#])preview\b/.test(location.search + location.hash);
    var unlockAt = unlockTime(C);
    var locked = C.locked === true && !!unlockAt && Date.now() < unlockAt.getTime() && !preview;

    if (preview && C.locked === true && unlockAt && Date.now() < unlockAt.getTime()) {
      $("preview-flag").hidden = false;
    }

    motes();

    if (locked) {
      document.body.classList.add("locked");
      $("hero-line").textContent = C.lockedLine || "Sealed until the day itself.";
      $("sealed-note").textContent = C.lockedNote || "Sealed until then";
      $("sealed").hidden = false;
      countdown(C, unlockAt, true, function () { unseal(C); });
    } else {
      countdown(C, unlockAt, false, null);
      openUp(C);
    }
  }

  /* everything below the hero — only built once the page is open */
  function openUp(C) {
    buildLetter(C);
    buildWheel(C);
    buildQuotes(C);
    buildReasons(C);
    buildStory(C);
    buildWish(C);
    buildMusic(C);
    revealSections();
  }

  function unseal(C) {
    document.body.classList.remove("locked");
    document.body.classList.add("unsealing");
    $("sealed").hidden = true;
    $("hero-line").textContent = C.heroLine;
    openUp(C);
    goldBurst();
  }

  /* the exact moment it opens: a set time if given, otherwise midnight on the day */
  function unlockTime(C) {
    if (C.unlockAt && /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/.test(C.unlockAt)) {
      var d = new Date(String(C.unlockAt).replace(" ", "T"));
      if (!isNaN(d.getTime())) return d;
    }
    var p = String(C.birthday || "").split("-");
    if (p.length < 3) return null;
    var b = new Date(+p[0], +p[1] - 1, +p[2], 0, 0, 0);
    return isNaN(b.getTime()) ? null : b;
  }

  /* ---------------- letter ---------------- */
  function buildLetter(C) {
    $("letter-greeting").textContent = C.letter.greeting;
    $("letter-body").innerHTML = (C.letter.body || []).map(function (p) {
      return "<p>" + esc(p) + "</p>";
    }).join("");
    $("letter-sign").textContent = C.letter.signature;

    var env = $("envelope"), paper = $("letter-paper");
    env.addEventListener("click", function () {
      env.classList.add("open");
      env.disabled = true;
      env.setAttribute("aria-expanded", "true");
      paper.hidden = false;
      setTimeout(function () {
        paper.setAttribute("tabindex", "-1");
        paper.focus({ preventScroll: true });
      }, REDUCED ? 0 : 500);
    }, { once: true });
  }

  /* ---------------- photo wheel ---------------- */
  function buildWheel(C) {
    var stage = $("wheel-stage"), wheel = $("wheel"), cap = $("wheel-caption");
    var photos = (C.photos || []).slice(0);
    if (!photos.length) photos = DEFAULT.photos.slice(0);

    var n = photos.length;
    var step = 360 / n;
    var angle = 0;        // current rotation, degrees
    var target = 0;       // where we are heading
    var index = 0;
    var radius = 0;
    var cards = [];

    photos.forEach(function (p, i) {
      var el = document.createElement("figure");
      el.className = "frame";
      el.innerHTML = p.src
        ? '<img src="' + esc(p.src) + '" alt="' + esc(p.caption || "A photo of us") + '" loading="lazy">'
        : motifSvg(p.motif);
      wheel.appendChild(el);
      cards.push(el);
    });

    function layout() {
      var w = stage.clientWidth;
      var cw = Math.max(140, Math.min(240, w * (w < 620 ? 0.42 : 0.19)));
      stage.style.setProperty("--cw", cw + "px");
      radius = n < 3 ? cw * 1.25 : (cw / 2) / Math.tan(Math.PI / n) + cw * 0.22;
      cards.forEach(function (el, i) {
        el.style.transform = "rotateY(" + (i * step) + "deg) translateZ(" + radius + "px)";
      });
    }

    function paint() {
      wheel.style.transform = "translateZ(-" + radius + "px) rotateY(" + (-angle) + "deg)";
      cards.forEach(function (el, i) {
        var rel = ((i * step - angle) % 360 + 540) % 360 - 180;
        var near = Math.abs(rel);
        el.classList.toggle("active", near < step / 2);
        el.classList.toggle("dim", near >= step / 2);
        el.classList.toggle("hidden-far", near > step * 2.2);
      });
    }

    function setCaption() {
      var text = photos[index] && photos[index].caption ? photos[index].caption : "";
      cap.style.opacity = 0;
      setTimeout(function () { cap.textContent = text; cap.style.opacity = 1; }, REDUCED ? 0 : 220);
    }

    function go(dir) {
      index = (index + dir + n) % n;
      target = Math.round(target / step) * step + dir * step;
      setCaption();
    }

    // idle drift + easing
    var dragging = false, lastX = 0, moved = 0, idle = 0;
    function tick() {
      if (!dragging) {
        idle += 1;
        if (!REDUCED && idle > 260) target += 0.06;       // slow ambient turn
        angle += (target - angle) * 0.075;
        var snapped = ((Math.round(target / step) * step) % 360 + 360) % 360;
        var i2 = Math.round(snapped / step) % n;
        if (i2 !== index && idle > 260) { index = i2; setCaption(); }
      }
      paint();
      requestAnimationFrame(tick);
    }

    stage.addEventListener("pointerdown", function (e) {
      dragging = true; idle = 0; moved = 0; lastX = e.clientX;
      stage.classList.add("dragging");
      stage.setPointerCapture && stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - lastX;
      lastX = e.clientX; moved += Math.abs(dx);
      angle += dx * -0.32;
      target = angle;
      paint();
    });
    function release() {
      if (!dragging) return;
      dragging = false; idle = 0;
      stage.classList.remove("dragging");
      target = Math.round(angle / step) * step;
      var snapped = ((target % 360) + 360) % 360;
      var i2 = Math.round(snapped / step) % n;
      if (i2 !== index) { index = i2; setCaption(); }
    }
    stage.addEventListener("pointerup", release);
    stage.addEventListener("pointercancel", release);
    stage.addEventListener("pointerleave", release);

    $("wheel-prev").addEventListener("click", function () { idle = 0; go(-1); });
    $("wheel-next").addEventListener("click", function () { idle = 0; go(1); });
    stage.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { idle = 0; go(-1); e.preventDefault(); }
      if (e.key === "ArrowRight") { idle = 0; go(1); e.preventDefault(); }
    });

    layout();
    setCaption();
    window.addEventListener("resize", function () { layout(); paint(); });
    requestAnimationFrame(tick);
  }

  /* ---------------- quotes ---------------- */
  function buildQuotes(C) {
    var list = C.quotes || [], i = 0, timer;
    var box = $("quote"), txt = $("quote-text"), src = $("quote-source"), dots = $("quote-dots");
    if (!list.length) return;

    list.forEach(function (q, k) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Quote " + (k + 1));
      b.addEventListener("click", function () { show(k); queue(); });
      dots.appendChild(b);
    });

    function show(k) {
      i = k;
      box.classList.add("fading");
      setTimeout(function () {
        txt.textContent = list[i].text;
        src.textContent = list[i].source || "";
        box.classList.remove("fading");
      }, REDUCED ? 0 : 400);
      Array.prototype.forEach.call(dots.children, function (d, x) {
        d.setAttribute("aria-current", x === i ? "true" : "false");
      });
    }
    function queue() {
      clearTimeout(timer);
      timer = setTimeout(function () { show((i + 1) % list.length); queue(); }, 7200);
    }
    show(0);
    queue();
  }

  /* ---------------- 26 reasons ---------------- */
  function buildReasons(C) {
    var grid = $("reasons-grid");
    $("reasons-title").textContent = C.reasonsTitle || DEFAULT.reasonsTitle;
    (C.reasons || []).forEach(function (r, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "reason";
      b.setAttribute("aria-label", "Reason " + (i + 1));
      b.innerHTML = '<span class="num">' + (i + 1) + '</span><span class="txt">' + esc(r) + "</span>";
      b.addEventListener("click", function () { b.classList.toggle("on"); });
      if (HOVER) {
        b.addEventListener("mouseenter", function () { b.classList.add("on"); });
        b.addEventListener("mouseleave", function () { b.classList.remove("on"); });
      }
      grid.appendChild(b);
    });
  }

  /* ---------------- timeline ---------------- */
  function buildStory(C) {
    var ol = $("timeline");
    (C.story || []).forEach(function (s) {
      var li = document.createElement("li");
      li.innerHTML = '<p class="when">' + esc(s.when) + "</p><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p>";
      ol.appendChild(li);
    });
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(ol.children, function (li) { li.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.25 });
    Array.prototype.forEach.call(ol.children, function (li) { io.observe(li); });
  }

  /* ---------------- candle ---------------- */
  function buildWish(C) {
    var candle = $("candle"), hint = $("candle-hint"), text = $("wish-text"), blow = $("blow");
    hint.textContent = C.wish.lightHint;
    candle.addEventListener("click", function () {
      if (candle.classList.contains("lit") || candle.dataset.done) return;
      candle.classList.add("lit");
      candle.setAttribute("aria-pressed", "true");
      hint.textContent = "";
      text.textContent = C.wish.lit;
      text.classList.add("in");
      blow.hidden = false;
    });
    blow.addEventListener("click", function () {
      candle.classList.remove("lit");
      candle.classList.add("puff");
      candle.dataset.done = "1";
      blow.hidden = true;
      text.classList.remove("in");
      setTimeout(function () {
        text.textContent = C.wish.done;
        text.classList.add("in");
      }, REDUCED ? 0 : 500);
      goldBurst();
    });
  }

  /* ---------------- music ---------------- */
  var STREAM = /youtu\.be|youtube\.com|spotify\.com|soundcloud\.com|music\.apple\.com|deezer\.com|tidal\.com/i;

  function buildMusic(C) {
    if (!C.music || !C.music.url) return;
    var btn = $("music-toggle"), label = $("music-label");
    var raw = String(C.music.url).trim();
    var title = C.music.title || "Play music";
    btn.hidden = false;
    label.textContent = title;

    // A link to a streaming page is a web page, not an audio file — nothing to play.
    if (STREAM.test(raw)) {
      label.textContent = "Needs an audio file";
      btn.title = "Streaming links cannot play here. Upload an .mp3 to the repo and use its path, e.g. music/our-song.mp3";
      return;
    }

    var audio = new Audio();
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = "metadata";
    audio.src = raw.replace(/ /g, "%20");   // spaces in filenames need escaping

    var problem = "";
    audio.addEventListener("error", function () {
      var code = audio.error && audio.error.code;
      problem = code === 3 ? "That file will not decode" : "Track not found at that path";
      btn.title = code === 3
        ? "Re-save it as a standard .mp3 and upload again."
        : "Check the path, and check the capitals — GitHub treats Music/ and music/ as different folders.";
      label.textContent = problem;
    });

    btn.addEventListener("click", function () {
      if (problem) { label.textContent = problem; return; }
      if (audio.paused) {
        audio.play().then(function () {
          btn.setAttribute("aria-pressed", "true");
          label.textContent = "Pause music";
        }).catch(function (err) {
          label.textContent = (err && err.name === "NotAllowedError") ? "Tap once more" : (problem || "Track will not play");
        });
      } else {
        audio.pause();
        btn.setAttribute("aria-pressed", "false");
        label.textContent = title;
      }
    });
  }

  /* ---------------- countdown ---------------- */
  function countdown(C, unlockAt, locked, onOpen) {
    var grid = $("counter-grid"), cap = $("counter-caption");
    var parts = String(C.birthday || "").split("-");
    var m = parseInt(parts[1], 10), d = parseInt(parts[2], 10);
    if (!m || !d) { if (!locked) { $("counter").hidden = true; return; } }

    function units(ms) {
      var days = Math.floor(ms / 864e5);
      var hrs = Math.floor(ms / 36e5) % 24;
      var min = Math.floor(ms / 6e4) % 60;
      var sec = Math.floor(ms / 1e3) % 60;
      return [[days, "days"], [hrs, "hours"], [min, "minutes"], [sec, "seconds"]];
    }
    function show(ms, caption) {
      grid.innerHTML = units(Math.max(0, ms)).map(function (u) {
        return '<div class="unit"><b>' + String(u[0]).padStart(2, "0") + "</b><span>" + u[1] + "</span></div>";
      }).join("");
      cap.className = "counter-caption";
      cap.textContent = caption;
    }
    function celebrate() {
      grid.innerHTML = "";
      cap.className = "counter-caption today";
      cap.textContent = "It is today. Happy birthday, " + C.name + ".";
      if (!cap.dataset.fired) { cap.dataset.fired = "1"; setTimeout(goldBurst, 700); }
    }

    function render() {
      var now = new Date();
      if (locked && unlockAt && now.getTime() >= unlockAt.getTime()) {
        locked = false;
        if (onOpen) onOpen();
      }
      if (locked) { show(unlockAt - now, C.lockedCaption || "until it opens"); return; }
      if (!m || !d) { $("counter").hidden = true; return; }
      if (now.getMonth() + 1 === m && now.getDate() === d) { celebrate(); return; }
      var y = now.getFullYear();
      var next = new Date(y, m - 1, d, 0, 0, 0);
      if (next < now) next = new Date(y + 1, m - 1, d, 0, 0, 0);
      show(next - now, "until the day itself");
    }
    render();
    setInterval(render, 1000);
  }

  /* ---------------- section reveals ---------------- */
  function revealSections() {
    var secs = document.querySelectorAll(".section");
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(secs, function (s) { s.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(secs, function (s) { io.observe(s); });
  }

  /* ---------------- ambient gold motes ---------------- */
  function motes() {
    var c = $("motes"), ctx = c.getContext("2d");
    var w, h, bits = [];
    function size() {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    }
    size();
    window.addEventListener("resize", size);
    var count = REDUCED ? 14 : 46;
    for (var i = 0; i < count; i++) {
      bits.push({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        vy: -(Math.random() * 0.16 + 0.03),
        vx: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.12
      });
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      bits.forEach(function (b) {
        if (!REDUCED) {
          b.y += b.vy; b.x += b.vx;
          if (b.y < -8) { b.y = h + 8; b.x = Math.random() * w; }
          if (b.x < -8) b.x = w + 8;
          if (b.x > w + 8) b.x = -8;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(228,192,137," + b.a + ")";
        ctx.fill();
      });
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ---------------- gold dust burst ---------------- */
  function goldBurst() {
    if (REDUCED) return;
    var c = $("dust"), ctx = c.getContext("2d");
    c.width = window.innerWidth; c.height = window.innerHeight;
    var bits = [], cx = window.innerWidth / 2, cy = window.innerHeight * 0.55;
    for (var i = 0; i < 130; i++) {
      var a = Math.random() * Math.PI * 2, s = Math.random() * 7 + 1.5;
      bits.push({
        x: cx, y: cy,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s - 2,
        r: Math.random() * 2.4 + 0.8, life: 1,
        col: Math.random() < 0.25 ? "235,214,220" : "228,192,137"
      });
    }
    function frame() {
      ctx.clearRect(0, 0, c.width, c.height);
      var alive = false;
      bits.forEach(function (b) {
        b.life -= 0.011;
        if (b.life <= 0) return;
        alive = true;
        b.vy += 0.085; b.vx *= 0.99;
        b.x += b.vx; b.y += b.vy;
        ctx.globalAlpha = Math.max(0, b.life);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + b.col + ",.9)";
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (alive) requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, c.width, c.height);
    }
    frame();
  }
})();
