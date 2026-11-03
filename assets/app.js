/* ==========================================================================
   Fullerton / Precinct 13099 Ballot Guide — renderer + hash router
   One view at a time. The nav bar is real navigation, not a scroll-spy.
   Footnote numbers are assigned once, up front, so a citation number means
   the same thing on every view.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------- utils */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  var money = function (n) {
    return n == null ? "not reported" : "$" + Math.round(n).toLocaleString("en-US");
  };

  /* ----------------------------------------------------- footnote registry */
  var refOrder = [];
  var refIndex = Object.create(null);

  function refNum(key) {
    if (!SOURCES[key]) return null;
    if (!(key in refIndex)) {
      refOrder.push(key);
      refIndex[key] = refOrder.length;
    }
    return refIndex[key];
  }

  /* Walk the data in display order once, so numbering is stable per view. */
  (function assignFootnotes() {
    var take = function (arr) { (arr || []).forEach(refNum); };
    take(PRECINCT.pollingS);
    take(PRECINCT.votingS);
    take(PRECINCT.ballotSize && PRECINCT.ballotSize.s);
    PRECINCT.districts.forEach(function (d) { take(d.s); });
    RACES.forEach(function (r) {
      take(r.seatNoteS); take(r.roleS); take(r.whyS); take(r.contextS);
      if (r.polling) {
        (r.polling.rows || []).forEach(function (row) { take(row.src); });
        take(r.polling.methodS);
      }
      r.candidates.forEach(function (c) {
        if (c.funding) take(c.funding.s);
      });
      r.candidates.forEach(function (c) {
        take(c.bioS); take(c.runningS); take(c.bioNoteS); take(c.stancesNoteS);
        (c.stances || []).forEach(function (x) { take(x.s); });
        (c.gaps || []).forEach(function (g) { take(g.s); });
        if (c.notice) take(c.notice.s);
        if (c.endorsements) take(c.endorsements.s);
        if (c.args) {
          (c.args.pro || []).forEach(function (a) { take(a.s); });
          (c.args.con || []).forEach(function (a) { take(a.s); });
        }
      });
      take(r.alsoNoteS); take(r.nameNoteS);
    });
    PROPS.forEach(function (p) {
      take(p.doesS); take(p.conflictS); take(p.passIfS); take(p.failIfS);
      take(p.fiscalS); take(p.moneyS);
      take(p.pro && p.pro.s); take(p.con && p.con.s);
      take(p.rebuttals && p.rebuttals.s);
    });
    var e = JUDICIAL.explain;
    take(e.whatS); take(e.termS); take(e.stakesS); take(e.districtS);
    take(e.howToReadS); take(e.gapS);
    JUDICIAL.items.forEach(function (j) {
      take(j.questionS); take(j.metaS); take(j.noteS);
    });
    NOT_ON_BALLOT.forEach(function (n) { take(n.s); });
    CAVEATS.forEach(function (c) { take(c.s); });
  })();

  function cite(keys) {
    if (!keys || !keys.length) return "";
    var parts = [];
    keys.forEach(function (k) {
      var n = refNum(k);
      if (!n) return;
      var s = SOURCES[k];
      parts.push('<a href="#view-sources" data-src="' + n + '" title="' +
        esc(s.pub + " — " + s.t) + '">' + n + "</a>");
    });
    if (!parts.length) return "";
    return '<sup class="ref">[' + parts.join(",") + "]</sup>";
  }

  /* --------------------------------------------------------------- device */
  /* Layout is responsive first — CSS media queries do the real work. This flag
     exists only for the handful of behaviours CSS cannot express: swapping the
     chip bar for a native picker, and the sticky bottom bar. It reads capability
     (coarse pointer, no hover) and viewport, never the user-agent string, so it
     stays correct on tablets, desktop touchscreens and browser resizing.        */
  var mqCoarse = window.matchMedia("(hover: none) and (pointer: coarse)");
  var mqNarrow = window.matchMedia("(max-width: 700px)");

  function isHandheld() { return mqNarrow.matches || (mqCoarse.matches && window.innerWidth < 1024); }

  function applyDevice() {
    var mobile = isHandheld();
    document.documentElement.setAttribute("data-device", mobile ? "mobile" : "desktop");
    document.documentElement.setAttribute("data-pointer", mqCoarse.matches ? "coarse" : "fine");
    return mobile;
  }
  applyDevice();

  /* ---------------------------------------------------------------- state */
  var LS_PICKS = "phballot.picks.v1";
  var LS_ISSUES = "phballot.issues.v1";
  var LS_DIRS = "phballot.dirs.v1";
  var LS_THEME = "phballot.theme.v1";

  function load(k, fb) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; }
    catch (e) { return fb; }
  }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var picks = load(LS_PICKS, {});
  var selectedIssues = load(LS_ISSUES, []);
  var userDirs = load(LS_DIRS, {});

  var DECIDED = {
    final: { cls: "today", label: "Decided today" },
    today: { cls: "today", label: "Decided today" },
    maybe: { cls: "maybe", label: "May be decided today" }
  };
  var TIER_LABEL = {
    top: "Watch this one",
    state: "Statewide office",
    nonpartisan: "Nonpartisan — all voters"
  };
  var SHORT = {
    governor: "Governor", ltgov: "Lt. Governor", sos: "Sec. of State",
    controller: "Controller", treasurer: "Treasurer", ag: "Atty. General",
    insurance: "Insurance Comm.", boe4: "Bd. of Equalization",
    spi: "Schools Supt.", ca45: "U.S. House 45", sd34: "State Senate 34",
    ad59: "Assembly 59", sup4: "County Supervisor 4"
  };

  /* ------------------------------------------------------------- routing */
  var ROUTES = ["view-overview"]
    .concat(RACES.map(function (r) { return "race-" + r.id; }))
    .concat(PROPS.map(function (p) { return "prop-" + p.num; }))
    .concat(["view-judicial", "view-notonballot", "view-picks", "view-method", "view-sources"]);

  var NAV = [{ id: "view-overview", label: "Overview" }]
    .concat(RACES.map(function (r) { return { id: "race-" + r.id, label: SHORT[r.id] || r.office }; }))
    .concat(PROPS.map(function (p) { return { id: "prop-" + p.num, label: "Prop " + p.num }; }))
    .concat([
      { id: "view-judicial", label: "Judges (17)" },
      { id: "view-notonballot", label: "Not yours" },
      { id: "view-method", label: "Method & caveats" },
      { id: "view-sources", label: "Sources" }
    ]);

  function currentRoute() {
    var h = (location.hash || "").replace(/^#/, "");
    return ROUTES.indexOf(h) > -1 ? h : "view-overview";
  }

  /* ------------------------------------------------------- theme + clock */
  (function theme() {
    var stored = load(LS_THEME, null);
    if (stored) document.documentElement.setAttribute("data-theme", stored);
    document.getElementById("themeToggle").addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var next;
      if (cur === "dark") next = "light";
      else if (cur === "light") next = "dark";
      else next = window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      save(LS_THEME, next);
    });
  })();

  (function clock() {
    var el = document.getElementById("clockValue");
    var box = document.getElementById("clock");
    var close = new Date(BUILD.pollsClose).getTime();
    function tick() {
      var diff = close - Date.now();
      if (diff <= 0) {
        box.classList.add("closed");
        el.textContent = "Polls closed";
        document.querySelector(".clock-label").textContent = "November 3, 2026";
        return;
      }
      var h = Math.floor(diff / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      el.textContent = h + "h " + String(m).padStart(2, "0") + "m " + String(s).padStart(2, "0") + "s";
    }
    tick();
    setInterval(tick, 1000);
    document.getElementById("builtAt").textContent =
      new Date(BUILD.builtAt).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" });
  })();

  /* ----------------------------------------------------------- fragments */
  function badge(cls, text) { return '<span class="badge ' + cls + '">' + text + "</span>"; }

  function prevNext(routeId) {
    var i = ROUTES.indexOf(routeId);
    var prev = i > 0 ? ROUTES[i - 1] : null;
    var next = i < ROUTES.length - 1 ? ROUTES[i + 1] : null;
    var label = function (id) {
      var m = NAV.filter(function (n) { return n.id === id; })[0];
      if (m) return m.label;
      if (id === "view-picks") return "My picks";
      return id;
    };
    return '<nav class="pager" aria-label="Move through the ballot">' +
      (prev ? '<a class="btn" href="#' + prev + '">← ' + esc(label(prev)) + "</a>" : "<span></span>") +
      (next ? '<a class="btn" href="#' + next + '">' + esc(label(next)) + " →</a>" : "<span></span>") +
      "</nav>";
  }

  function fundingChart(race) {
    var rows = race.candidates.map(function (c) {
      return {
        name: c.name,
        v: c.funding && c.funding.raised != null ? c.funding.raised : null,
        note: c.funding ? c.funding.note : "",
        s: c.funding ? c.funding.s : []
      };
    });
    var vals = rows.filter(function (r) { return r.v != null; }).map(function (r) { return r.v; });

    if (!vals.length) {
      return '<div class="fund"><h3>Money raised</h3>' +
        '<p class="poll-none">No comparable fundraising totals were available for this race in this build.</p>' +
        rows.filter(function (r) { return r.note; }).map(function (r) {
          return '<p class="fnote"><strong>' + esc(r.name) + ":</strong> " + esc(r.note) + cite(r.s) + "</p>";
        }).join("") + "</div>";
    }
    var max = Math.max.apply(null, vals);

    var bars = rows.map(function (r) {
      if (r.v == null) {
        return '<div class="frow"><div class="fname">' + esc(r.name) + "</div>" +
          '<div class="ftrack"><div class="fbar none" style="width:100%"></div>' +
          '<div class="fval" style="left:0">Not reported</div></div></div>';
      }
      var pct = Math.max((r.v / max) * 100, 1.5);
      var inside = pct > 42;
      return '<div class="frow" title="' + esc(r.name + " — " + money(r.v) + " raised") + '">' +
        '<div class="fname">' + esc(r.name) + "</div>" +
        '<div class="ftrack"><div class="fbar" style="width:' + pct.toFixed(1) + '%"></div>' +
        '<div class="fval" style="' +
        (inside ? "left:0;color:#fff" : "left:calc(" + pct.toFixed(1) + "% + 2px)") + '">' +
        money(r.v) + "</div></div></div>";
    }).join("");

    var table = "<details><summary>Show as a table, with the caveat on each figure</summary>" +
      '<div class="ftable-wrap"><table class="ftable"><thead><tr><th>Candidate</th><th>Raised</th>' +
      "<th>Cash on hand</th><th>Notes</th></tr></thead><tbody>" +
      race.candidates.map(function (c) {
        var f = c.funding || {};
        return "<tr><td>" + esc(c.name) + '</td><td class="num">' + money(f.raised) +
          '</td><td class="num">' + (f.cash != null ? money(f.cash) : "—") + "</td><td>" +
          esc(f.note || "—") + cite(f.s || []) + "</td></tr>";
      }).join("") + "</tbody></table></div></details>";

    return '<div class="fund"><h3>Money raised</h3><div class="fchart">' + bars + "</div>" +
      '<p class="fnote">Bars share one scale within this race only. Reporting periods and filing systems differ between races — see Method &amp; caveats.</p>' +
      table + "</div>";
  }

  function pollBlock(race) {
    var p = race.polling;
    if (!p) return "";
    var inner = "";
    if (p.rows && p.rows.length) {
      inner += '<div class="poll-rows">' + p.rows.map(function (r) {
        return '<div class="poll-row"><span class="pr-label">' + esc(r.label) + "</span>" +
          '<span class="pr-detail">' + esc(r.detail) + cite(r.src) + "</span></div>";
      }).join("") + "</div>";
    }
    if (p.note) inner += '<p class="poll-none">' + esc(p.note) + "</p>";
    if (p.method) inner += '<p class="poll-method">' + esc(p.method) + cite(p.methodS) + "</p>";
    return '<div class="poll-block"><h3>Polling</h3>' + inner + "</div>";
  }

  function alignTag(issueKey, stanceDir) {
    if (!ISSUES[issueKey] || !ISSUES[issueKey].dir) return "";
    if (userDirs[issueKey] === undefined || stanceDir === undefined) return "";
    return stanceDir === userDirs[issueKey]
      ? ' <span class="align-tag yes">matches you</span>'
      : ' <span class="align-tag no">differs</span>';
  }

  function compareTable(race) {
    var cols = race.candidates;
    var relevant = selectedIssues.filter(function (k) {
      return cols.some(function (c) {
        return (c.stances || []).some(function (s) { return s.i === k; });
      });
    });
    if (!selectedIssues.length) return "";
    if (!relevant.length) {
      return '<div class="cmp-empty">None of your selected issues has a recorded position from any ' +
        "candidate in this race. That silence is itself information — full detail for each " +
        "candidate is below.</div>";
    }
    return '<h3 class="cmp-title">Your issues, side by side</h3><div class="cmp-wrap"><table class="cmp">' +
      "<thead><tr><th>Issue</th>" +
      cols.map(function (c) { return "<th>" + esc(c.name) + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      relevant.map(function (k) {
        return "<tr><th>" + esc(ISSUES[k].label) + "</th>" +
          cols.map(function (c) {
            var st = (c.stances || []).filter(function (s) { return s.i === k; });
            var lab = ' data-label="' + esc(c.name) + '"';
            if (!st.length) return "<td" + lab + '><span class="nopos">No position found</span></td>';
            return "<td" + lab + ">" + st.map(function (s) {
              return '<span class="pos">' + esc(s.pos) + alignTag(k, s.dir) + "</span>" +
                '<span class="pd">' + esc(s.d) + cite(s.s) + "</span>";
            }).join("") + "</td>";
          }).join("") + "</tr>";
      }).join("") + "</tbody></table></div>";
  }

  /* Sourced arguments. Every point names who made it; an empty side states so. */
  function argBlock(args) {
    if (!args) return "";
    function side(kind, label, cls) {
      var list = args[kind] || [];
      var note = args[kind === "pro" ? "proNote" : "conNote"];
      if (!list.length) {
        return '<div class="arg-col ' + cls + '"><div class="arg-head">' + label + "</div>" +
          '<p class="arg-empty">' + esc(note || "No published argument on this side was found in the sources reviewed for this build.") + "</p></div>";
      }
      return '<div class="arg-col ' + cls + '"><div class="arg-head">' + label + "</div><ul>" +
        list.map(function (a) {
          return "<li>" + esc(a.d) + cite(a.s) +
            '<span class="arg-by">— ' + esc(a.by) + "</span></li>";
        }).join("") + "</ul></div>";
    }
    return '<div class="args"><div class="block-label">Arguments people actually made</div>' +
      '<div class="arg-grid">' + side("pro", "For", "arg-pro") + side("con", "Against", "arg-con") +
      "</div></div>";
  }

  function candCard(race, c) {
    var isPicked = picks[race.id] === c.slug;
    var badges = [];
    if (c.incumbent) badges.push(badge("inc", "Incumbent"));
    if (c.party === "R") badges.push(badge("", "Republican"));
    if (c.partyLean) badges.push(badge("", esc(c.partyLean)));
    if (c.age) badges.push(badge("", "Age " + c.age));
    if (selectedIssues.length) {
      var matched = selectedIssues.filter(function (k) {
        return (c.stances || []).some(function (s) { return s.i === k; });
      }).length;
      badges.unshift(badge(matched ? "advances" : "maybe",
        matched + " of " + selectedIssues.length + " of your issues on record"));
    }

    var stances = (c.stances || []).map(function (s) {
      var isSel = selectedIssues.indexOf(s.i) > -1;
      return '<li class="stance' + (isSel ? " match" : "") + '">' +
        '<div class="stance-top"><span class="stance-issue">' +
        esc((ISSUES[s.i] && ISSUES[s.i].short) || s.i) + "</span>" +
        '<span class="stance-pos">' + esc(s.pos) + alignTag(s.i, s.dir) + "</span></div>" +
        '<p class="stance-detail">' + esc(s.d) + cite(s.s) + "</p></li>";
    }).join("");

    var gaps = (c.gaps && c.gaps.length)
      ? '<div class="gaps"><div class="block-label">Not on the record</div><ul>' +
        c.gaps.map(function (g) {
          return "<li><b>" + esc(g.label) + ".</b> " + esc(g.d) + cite(g.s) + "</li>";
        }).join("") + "</ul></div>"
      : '<div class="gaps-none">No unanswered questionnaire items or declined interviews turned up ' +
        "for this candidate in the sources reviewed.</div>";

    var endorse = "";
    if (c.endorsements) {
      if (c.endorsements.list && c.endorsements.list.length) {
        endorse = '<div><div class="block-label">Endorsements</div><div class="endorse"><ul>' +
          c.endorsements.list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") +
          "</ul>" + cite(c.endorsements.s) + "</div></div>";
      } else if (c.endorsements.note) {
        endorse = '<div><div class="block-label">Endorsements</div><div class="endorse">' +
          esc(c.endorsements.note) + cite(c.endorsements.s) + "</div></div>";
      }
    }

    var site = c.site
      ? '<a class="btn" href="' + esc(c.site) + '" target="_blank" rel="noopener">Candidate page ↗</a>'
      : "";

    return '<article class="cand' + (isPicked ? " picked" : "") + '">' +
      '<div class="cand-head"><div><h3 class="cand-name">' + esc(c.name) + "</h3>" +
      '<p class="cand-role">' + esc(c.role || "") + "</p></div>" +
      '<div class="cand-badges">' + badges.join("") + "</div></div>" +
      '<p class="cand-bio">' + esc(c.bio) + cite(c.bioS) +
      (c.running ? " " + esc(c.running) + cite(c.runningS) : "") + "</p>" +
      (c.bioNote
        ? '<p class="fnote">' + esc(c.bioNote) + cite(c.bioNoteS) + "</p>"
        : "") +
      (c.notice
        ? '<div class="notice"><div class="block-label">' + esc(c.notice.title) + "</div>" +
          "<p>" + esc(c.notice.d) + cite(c.notice.s) + "</p></div>"
        : "") +
      '<div><div class="block-label">Where they stand</div>' +
      (c.stancesNote
        ? '<p class="arg-empty">' + esc(c.stancesNote) + cite(c.stancesNoteS) + "</p>"
        : "") +
      '<ul class="stance-list">' + stances + "</ul></div>" +
      gaps + endorse + argBlock(c.args) +
      '<div class="cand-foot"><button type="button" class="pick-btn" data-race="' + race.id +
      '" data-cand="' + c.slug + '" aria-pressed="' + isPicked + '">' +
      (isPicked ? "✓ Picked" : "Pick") + "</button>" + site + "</div></article>";
  }

  /* --------------------------------------------------------------- views */
  function precinctPanel() {
    var rows = PRECINCT.districts.map(function (d) {
      var val = d.race
        ? '<a href="#race-' + d.race + '">' + esc(d.value) + "</a>"
        : esc(d.value);
      return "<tr><th>" + esc(d.label) + "</th><td>" + val +
        '<span class="pd">' + esc(d.note) + cite(d.s) + "</span></td></tr>";
    }).join("");

    return '<div class="precinct-block"><h2>Precinct ' + esc(PRECINCT.number) + "</h2>" +
      '<div class="poll-place"><div><div class="block-label">Where you vote</div>' +
      "<strong>" + esc(PRECINCT.pollingPlace) + "</strong><br>" +
      '<a href="' + esc(PRECINCT.pollingMap) + '" target="_blank" rel="noopener">' +
      "Vote center locations and hours \u2197</a>" + cite(PRECINCT.pollingS) +
      '<span class="pd">' + esc(PRECINCT.pollingAddress) + "</span>" +
      '<span class="pd">' + esc(PRECINCT.votingNote) + cite(PRECINCT.votingS) + "</span>" +
      "</div></div>" +

      '<div class="race-why"><strong>How long this ballot is:</strong> ' +
      esc(PRECINCT.ballotSize.note) + cite(PRECINCT.ballotSize.s) + "</div>" +

      '<h3 class="cmp-title">Your districts, resolved from the county\'s own shapefiles</h3>' +
      '<div class="cmp-wrap"><table class="cmp districts"><tbody>' + rows + "</tbody></table></div>" +
      '<p class="fnote">Several rows above are the reason something is <em>missing</em> from your ' +
      "ballot. That is worth as much as knowing what is on it." +
      cite(["ocShapes", "ocvoteContests"]) + "</p></div>";
  }

  function viewOverview() {
    var glance = RACES.map(function (r) {
      var d = DECIDED[r.decided];
      var verify = r.onBallot === "verify" ? badge("verify", "Confirm your precinct") : "";
      return '<a class="glance-row" href="#race-' + r.id + '">' +
        '<span class="bar tier-' + r.tier + '"></span><span>' +
        '<span class="glance-office">' + esc(r.office) + "</span><br>" +
        '<span class="glance-meta">' + r.candidates.length + " candidates · " +
        TIER_LABEL[r.tier] + "</span></span>" +
        '<span class="glance-right">' + verify + badge(d.cls, d.label) + "</span></a>";
    }).join("");

    glance += PROPS.map(function (p) {
      return '<a class="glance-row" href="#prop-' + p.num + '">' +
        '<span class="bar tier-prop"></span><span>' +
        '<span class="glance-office">Proposition ' + esc(p.num) + " — " + esc(p.short) + "</span><br>" +
        '<span class="glance-meta">' + esc(p.kind) +
        (p.con.none ? " · no argument against was submitted" : "") +
        (p.conflict ? " · can conflict with another measure" : "") + "</span></span>" +
        '<span class="glance-right">' + badge("today", "Decided today") + "</span></a>";
    }).join("");

    glance += '<a class="glance-row" href="#view-judicial">' +
      '<span class="bar tier-judicial"></span><span>' +
      '<span class="glance-office">17 judicial retention questions</span><br>' +
      '<span class="glance-meta">Supreme Court (2) and Fourth Appellate District (15) · ' +
      'yes-or-no on each sitting justice</span></span>' +
      '<span class="glance-right">' + badge("today", "Decided today") + "</span></a>";

    var chips = issuesInPlay().map(function (k) {
      return '<button type="button" class="issue-chip" data-issue="' + k + '" aria-pressed="' +
        (selectedIssues.indexOf(k) > -1) + '">' + esc(ISSUES[k].label) + "</button>";
    }).join("");

    var dirIssues = selectedIssues.filter(function (k) { return ISSUES[k] && ISSUES[k].dir; });
    var dirPanel = dirIssues.length
      ? '<div class="dir-panel"><h3>Your side, on the issues with a clear split</h3>' +
        dirIssues.map(function (k) {
          return '<div class="dir-row"><span class="dir-q">' + esc(ISSUES[k].label) + "</span>" +
            '<span class="seg" data-issue="' + k + '">' +
            ISSUES[k].dir.map(function (o, idx) {
              return '<button type="button" data-side="' + idx + '" aria-pressed="' +
                (userDirs[k] === idx) + '">' + esc(o) + "</button>";
            }).join("") + "</span></div>";
        }).join("") + "</div>"
      : "";

    var status = selectedIssues.length
      ? selectedIssues.length + " issue" + (selectedIssues.length > 1 ? "s" : "") +
        " selected. Every race page now opens with a side-by-side on just those, and calls out " +
        '"No position found".'
      : "No issues selected — full detail is shown for every candidate.";

    return '<section class="view panel" id="view-overview">' +
      "<h2>What you will actually see</h2>" +
      '<p class="lede">This is a general election, so <strong>every one of the ' +
      (RACES.length + PROPS.length + JUDICIAL.items.length) +
      " decisions on your ballot is final today</strong> — there is no runoff. " +
      "It breaks into " + RACES.length + " contests, " + PROPS.length +
      " statewide propositions and " + JUDICIAL.items.length +
      " judicial retention questions. Three things on it are easy to miss: " +
      "<strong>Insurance Commissioner is two Democrats</strong>, " +
      "<strong>Assembly District 59 has no Democrat at all</strong>, and " +
      "<strong>Propositions 40, 41 and 42 can cancel each other out</strong>. " +
      "Pick anything from the menu above, or step through in ballot order.</p>" +
      '<div class="glance-grid">' + glance + "</div>" +
      '<div class="legend-key">' +
      '<span><i class="dot tier-top"></i> Watch this one</span>' +
      '<span><i class="dot tier-state"></i> Statewide office</span>' +
      '<span><i class="dot tier-nonpartisan"></i> Nonpartisan — all voters</span>' +
      '<span><i class="dot tier-prop"></i> Ballot measure</span>' +
      '<span><i class="dot tier-judicial"></i> Judicial retention</span></div>' +

      precinctPanel() +

      '<div class="helper-block"><h2 id="helper">Decision helper</h2>' +
      '<p class="lede">Pick the issues you actually vote on. Each race page will then lead with a ' +
      "side-by-side of just those issues — including which candidates have <em>no recorded " +
      "position</em>. On a few issues where coverage records a clear yes/no, you can mark your own " +
      "side and see who matches. <strong>This tool reports what candidates said; it does not " +
      "recommend anyone.</strong></p>" +
      '<div class="issue-picker" id="issuePicker">' + chips + "</div>" +
      '<div class="helper-actions"><button class="btn" id="clearIssues" type="button">Clear all</button>' +
      '<span class="helper-status">' + status + "</span></div>" +
      dirPanel + "</div>" +
      prevNext("view-overview") + "</section>";
  }

  function viewRace(r) {
    var d = DECIDED[r.decided];
    var verify = r.onBallot === "verify" ? " " + badge("verify", "Confirm your precinct") : "";
    var pick = picks[r.id]
      ? (r.candidates.filter(function (c) { return c.slug === picks[r.id]; })[0] || {}).name
      : null;

    return '<section class="view race tier-' + r.tier + '" id="race-' + r.id + '">' +
      '<div class="panel race-panel">' +
      '<div class="race-head"><div class="race-kicker"><span>' + TIER_LABEL[r.tier] + "</span>" +
      badge(d.cls, d.label) + verify + "</div><h2>" + esc(r.office) + "</h2>" +
      (r.role
        ? '<div class="role"><div class="block-label">What this office actually does</div>' +
          "<p>" + esc(r.role) + cite(r.roleS) + "</p></div>"
        : "") +
      '<p class="race-note">' + esc(r.seatNote) + cite(r.seatNoteS) + "</p></div>" +
      '<div class="race-why"><strong>Why it is on your ballot:</strong> ' +
      esc(r.whyOnBallot) + cite(r.whyS) + "</div>" +
      (r.important ? '<div class="race-important">⚠ ' + esc(r.important) + "</div>" : "") +
      (r.context ? '<p class="race-note">' + esc(r.context) + cite(r.contextS) + "</p>" : "") +
      (pick ? '<div class="race-picked">Your pick in this race: <strong>' + esc(pick) + "</strong></div>" : "") +
      pollBlock(r) + fundingChart(r) + compareTable(r) + "</div>" +
      '<div class="cand-grid' + (r.candidates.length % 2 === 0 ? " two" : "") + '">' +
      r.candidates.map(function (c) { return candCard(r, c); }).join("") + "</div>" +
      (r.alsoNote ? '<p class="fnote wide">' + esc(r.alsoNote) + cite(r.alsoNoteS) + "</p>" : "") +
      (r.nameNote ? '<p class="fnote wide">' + esc(r.nameNote) + cite(r.nameNoteS) + "</p>" : "") +
      prevNext("race-" + r.id) + "</section>";
  }

  /* ------------------------------------------------- propositions view */
  function viewProp(p) {
    var pid = "prop" + p.num;
    var mark = picks[pid];

    function argSide(side, label, cls) {
      var blk = p[side];
      if (blk.none) {
        return '<div class="arg-col ' + cls + '"><div class="arg-head">' + label + "</div>" +
          '<p class="arg-empty">' + esc(blk.note) + cite(blk.s) + "</p></div>";
      }
      return '<div class="arg-col ' + cls + '"><div class="arg-head">' + label + "</div><ul>" +
        blk.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        (blk.signers && blk.signers.length
          ? '<div class="arg-signers"><span class="arg-signers-label">Signed by</span><ul>' +
            blk.signers.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>"
          : "") +
        cite(blk.s) + "</div>";
    }

    var rebut = "";
    if (p.rebuttals && (p.rebuttals.hasFavor || p.rebuttals.hasAgainst)) {
      rebut = '<p class="fnote wide">Each side also filed a rebuttal to the other, printed in the ' +
        "official guide alongside these arguments." + cite(p.rebuttals.s) + "</p>";
    }

    return '<section class="view race tier-prop" id="prop-' + p.num + '">' +
      '<div class="panel race-panel">' +
      '<div class="race-head"><div class="race-kicker"><span>Statewide proposition</span>' +
      badge("today", "Decided today") + badge("", esc(p.kind)) + "</div>" +
      "<h2>Proposition " + esc(p.num) + " — " + esc(p.short) + "</h2>" +
      '<p class="prop-title">' + esc(p.title) + "</p>" +
      '<div class="role"><div class="block-label">What this actually does</div>' +
      "<p>" + esc(p.does) + cite(p.doesS) + "</p></div></div>" +
      (p.conflict
        ? '<div class="race-important">⚠ ' + esc(p.conflict) + cite(p.conflictS) + "</div>"
        : "") +
      '<div class="prop-outcomes">' +
      '<div class="outcome yes"><div class="block-label">If it passes</div><p>' +
      esc(p.passIf) + cite(p.passIfS) + "</p></div>" +
      '<div class="outcome no"><div class="block-label">If it fails</div><p>' +
      esc(p.failIf) + cite(p.failIfS) + "</p></div></div>" +
      '<div class="prop-meta">' +
      '<div><div class="block-label">Legislative Analyst on cost</div>' +
      (p.fiscal.indexOf("\u2022") > -1
        ? "<ul class=\"fiscal-list\">" + p.fiscal.split("\u2022").map(function (x) {
            return x.trim() ? "<li>" + esc(x.trim()) + "</li>" : "";
          }).join("") + "</ul>" + cite(p.fiscalS)
        : "<p>" + esc(p.fiscal) + cite(p.fiscalS) + "</p>") + "</div>" +
      '<div><div class="block-label">Who paid to campaign on it</div><p>' +
      esc(p.money) + cite(p.moneyS) + "</p></div></div>" +
      (mark ? '<div class="race-picked">Your mark on this measure: <strong>' + esc(mark.toUpperCase()) + "</strong></div>" : "") +
      "</div>" +
      '<div class="args wide-args">' +
      '<div class="block-label">The official arguments, in their own words</div>' +
      '<p class="fnote">These are the headline claims of the arguments printed in the Secretary of ' +
      "State's Voter Information Guide. The guide itself warns that arguments \u201care the opinions of " +
      'the authors and have not been checked for accuracy by any official agency.\u201d' + cite(["vig"]) + "</p>" +
      '<div class="arg-grid">' + argSide("pro", "Argument in favor", "arg-pro") +
      argSide("con", "Argument against", "arg-con") + "</div>" + rebut +
      '<div class="cand-foot prop-foot">' +
      '<button type="button" class="pick-btn" data-prop="' + p.num + '" data-mark="yes" aria-pressed="' +
      (mark === "yes") + '">' + (mark === "yes" ? "✓ Marked YES" : "Mark YES") + "</button>" +
      '<button type="button" class="pick-btn" data-prop="' + p.num + '" data-mark="no" aria-pressed="' +
      (mark === "no") + '">' + (mark === "no" ? "✓ Marked NO" : "Mark NO") + "</button>" +
      "</div></div>" +
      prevNext("prop-" + p.num) + "</section>";
  }

  /* ---------------------------------------------------- judicial view */
  function viewJudicial() {
    var e = JUDICIAL.explain;
    var rows = JUDICIAL.items.map(function (j) {
      var pid = "judge-" + j.name.replace(/[^A-Za-z]/g, "");
      var mark = picks[pid];
      return '<div class="judge' + (j.opposition ? " judge-flag" : "") + '">' +
        '<div class="judge-head"><div><h3>' + esc(j.name) + "</h3>" +
        '<p class="cand-role">' + esc(j.court) +
        (j.division ? ", Division " + esc(j.division) : "") + " · " + esc(j.role) + "</p></div>" +
        '<div class="cand-badges">' +
        (j.rating ? badge(j.rating.indexOf("Exceptionally") === 0 ? "advances" : "maybe",
          esc(j.rating) + " (" + esc(j.ratingYear) + ")") : "") +
        (j.appointedBy ? badge("", "Appointed by " + esc(j.appointedBy)) : "") +
        (j.opposition ? badge("verify", "Organized opposition") : "") +
        "</div></div>" +
        '<p class="judge-q">' + esc(j.question) + cite(j.questionS) + "</p>" +
        (j.currentTitle && j.currentTitle.indexOf("Justice") === -1
          ? '<p class="fnote">Currently: ' + esc(j.currentTitle) + cite(j.questionS) + "</p>" : "") +
        (j.note ? '<p class="fnote">' + esc(j.note) + cite(j.noteS) + "</p>" : "") +
        '<div class="cand-foot"><button type="button" class="pick-btn" data-judge="' + esc(pid) +
        '" data-mark="yes" aria-pressed="' + (mark === "yes") + '">' +
        (mark === "yes" ? "✓ YES" : "Mark YES") + "</button>" +
        '<button type="button" class="pick-btn" data-judge="' + esc(pid) +
        '" data-mark="no" aria-pressed="' + (mark === "no") + '">' +
        (mark === "no" ? "✓ NO" : "Mark NO") + "</button></div></div>";
    }).join("");

    return '<section class="view panel" id="view-judicial">' +
      "<h2>17 judicial retention questions</h2>" +
      '<p class="lede">' + esc(e.what) + cite(e.whatS) + "</p>" +
      '<div class="role"><div class="block-label">How long a term is</div><p>' + esc(e.term) + cite(e.termS) + "</p></div>" +
      '<div class="role"><div class="block-label">What your vote realistically does</div><p>' + esc(e.stakes) + cite(e.stakesS) + "</p></div>" +
      '<div class="role"><div class="block-label">Why you vote on San Diego and Riverside justices</div><p>' + esc(e.district) + cite(e.districtS) + "</p></div>" +
      '<div class="role"><div class="block-label">The one systematic measure available</div><p>' + esc(e.howToRead) + cite(e.howToReadS) + "</p></div>" +
      '<div class="race-important">⚠ ' + esc(e.gap) + cite(e.gapS) + "</div>" +
      '<div class="judge-grid">' + rows + "</div>" +
      prevNext("view-judicial") + "</section>";
  }

  function viewNot() {
    return '<section class="view panel" id="view-notonballot">' +
      "<h2>On the county's ballot, but not yours</h2>" +
      '<p class="lede">Knowing what you <em>won\'t</em> see is part of reading a ballot. Each of ' +
      "these exists in Orange County at this election but falls outside the districts that cover " +
      "precinct 13099 — or was settled back in June.</p>" +
      '<div class="not-list">' + NOT_ON_BALLOT.map(function (n) {
        return '<div class="not-item"><h3>' + esc(n.office) + "</h3><p>" + esc(n.why) + cite(n.s) + "</p></div>";
      }).join("") + "</div>" + prevNext("view-notonballot") + "</section>";
  }

  function viewPicks() {
    var entries = RACES.filter(function (r) { return picks[r.id]; });
    var propMarks = PROPS.filter(function (p) { return picks["prop" + p.num]; });
    var judgeKey = function (j) { return "judge-" + j.name.replace(/[^A-Za-z]/g, ""); };
    var judgeMarks = JUDICIAL.items.filter(function (j) { return picks[judgeKey(j)]; });
    var total = entries.length + propMarks.length + judgeMarks.length;

    var raceBody = entries.map(function (r) {
      var c = r.candidates.filter(function (x) { return x.slug === picks[r.id]; })[0];
      return '<div class="pick-item"><span><span class="pi-office">' + esc(r.office) +
        '</span><br><span class="pi-name">' + esc(c ? c.name : "—") + "</span></span>" +
        badge("today", "Decided today") + "</div>";
    }).join("");

    var propBody = propMarks.map(function (p) {
      var m = picks["prop" + p.num];
      return '<div class="pick-item"><span><span class="pi-office">Proposition ' + esc(p.num) +
        " — " + esc(p.short) + '</span><br><span class="pi-name">' + esc(m.toUpperCase()) +
        "</span></span>" + badge(m === "yes" ? "advances" : "maybe", esc(m.toUpperCase())) + "</div>";
    }).join("");

    var judgeBody = judgeMarks.map(function (j) {
      var m = picks[judgeKey(j)];
      return '<div class="pick-item"><span><span class="pi-office">' + esc(j.name) +
        '</span><br><span class="pi-name">Retain: ' + esc(m.toUpperCase()) + "</span></span>" +
        badge(m === "yes" ? "advances" : "maybe", esc(m.toUpperCase())) + "</div>";
    }).join("");

    var body = total
      ? raceBody +
        (propBody ? '<div class="pick-sep">Propositions</div>' + propBody : "") +
        (judgeBody ? '<div class="pick-sep">Judicial retention</div>' + judgeBody : "")
      : '<p class="pick-empty">Nothing marked yet. Your ballot has ' +
        (RACES.length + PROPS.length + JUDICIAL.items.length) +
        " decisions on it: " + RACES.length + " contests, " + PROPS.length +
        " propositions and " + JUDICIAL.items.length + " judicial retention questions. " +
        "Every one is settled today — there is no runoff. Open any of them and tap a mark.</p>";

    var missingRaces = RACES.filter(function (r) { return !picks[r.id]; });
    var missingProps = PROPS.filter(function (p) { return !picks["prop" + p.num]; });
    var nJudgeLeft = JUDICIAL.items.length - judgeMarks.length;
    var bits = [];
    if (missingRaces.length) {
      bits.push(missingRaces.map(function (r) {
        return '<a href="#race-' + r.id + '">' + esc(SHORT[r.id] || r.office) + "</a>";
      }).join(", "));
    }
    if (missingProps.length) {
      bits.push(missingProps.map(function (p) {
        return '<a href="#prop-' + p.num + '">Prop ' + esc(p.num) + "</a>";
      }).join(", "));
    }
    if (nJudgeLeft) {
      bits.push('<a href="#view-judicial">' + nJudgeLeft + " judicial question" +
        (nJudgeLeft > 1 ? "s" : "") + "</a>");
    }
    var todo = bits.length
      ? '<p class="fnote">Still undecided: ' + bits.join(" · ") + ".</p>"
      : '<p class="fnote">Every one of the ' + total + " decisions on your ballot has a mark.</p>";

    return '<section class="view panel" id="view-picks"><h2>My ballot</h2>' +
      '<p class="lede">Your cheat sheet, stored only in this browser — nothing is uploaded ' +
      "anywhere. Printing gives you the whole guide with your marks on it.</p>" +
      '<div class="pick-list">' + body + "</div>" + todo +
      '<div class="helper-actions">' +
      '<button class="btn primary" id="printPicks" type="button">Print / save cheat sheet</button>' +
      '<button class="btn" id="clearPicks" type="button">Clear marks</button></div>' +
      prevNext("view-picks") + "</section>";
  }

  function viewMethod() {
    return '<section class="view panel" id="view-method">' +
      "<h2>How this was built, and where it is weak</h2>" +
      '<div class="caveat-list">' + CAVEATS.map(function (c) {
        return '<div class="caveat"><h3>' + esc(c.title) + "</h3><p>" + esc(c.d) + cite(c.s) +
          (c.link ? ' <a href="' + esc(c.link) + '" target="_blank" rel="noopener">' +
            esc(c.linkLabel) + " ↗</a>" : "") + "</p></div>";
      }).join("") + "</div>" +
      '<details class="method-details" open><summary>Method notes</summary><ul>' +
      "<li>The ballot's contents come from the Orange County Registrar of Voters' own " +
      "188-page Contest/Candidate Proof List for this election and its Contests Qualified for " +
      "the Ballot page, not from a secondary summary. Every contest and candidate name here was " +
      "read out of that official roster.</li>" +
      "<li>District assignments were resolved geometrically. The precinct 13099 polygon was taken " +
      "out of the Registrar's OC_Precinct_2026_GE shapefile, a representative point inside it was " +
      "computed, and that point was tested against each official district layer the same office " +
      "publishes. That is how this guide can state that you are in Council District 1, Fullerton " +
      "School District Trustee Area 2 and NOCCCD Trustee Area 4 \u2014 and therefore that none of " +
      "those seats is on your ballot this year.</li>" +
      "<li>Proposition content comes from the Secretary of State's complete Voter Information " +
      "Guide. The neutral descriptions are drawn from the Legislative Analyst's analysis; the pro " +
      "and con points are the headline claims of the official arguments, with their signers named. " +
      "The guide's front quick-reference pages were deliberately not used, because their " +
      "multi-column layout does not extract reliably.</li>" +
      "<li>Judicial retention data comes from the Secretary of State's official list of judicial " +
      "ballot questions, with State Bar evaluation ratings and appointing governors from LAist's " +
      "appellate and Supreme Court guides.</li>" +
      "<li>Candidate bios, positions and endorsements come chiefly from the LAist and CalMatters " +
      "2026 voter guides, Ballotpedia, Voice of OC and local Orange County outlets. Funding figures " +
      "come from those sources and from Secretary of State ballot-measure filings; where two " +
      "sources disagree, both figures are shown.</li>" +
      "<li>Arguments for and against are only ever reported, never invented. Each one names the " +
      "person or organization that made it. Where a side produced no published argument \u2014 which " +
      "is true of Propositions 1 and 37, and of one side in several candidate races \u2014 this guide " +
      "says so instead of filling the space.</li>" +
      "<li>Gaps (\u201chasn't commented\u201d) are only listed where a source shows the omission: a " +
      "blank questionnaire item, a declined interview or survey, or a platform that does not address " +
      "the issue. Where the gap is in this guide's own research rather than in the campaign, it is " +
      "labeled that way.</li>" +
      "</ul></details>" + prevNext("view-method") + "</section>";
  }

  function viewSources() {
    return '<section class="view panel" id="view-sources"><h2>Sources</h2>' +
      '<p class="lede">' + refOrder.length + " sources, numbered in the order they first appear " +
      "across the guide. Every superscript number on any page links here. Sources marked " +
      '<span class="s-access">paywalled</span> or <span class="s-access">not directly ' +
      "retrievable</span> could not be opened in full while building this guide — what they " +
      "support came from headlines, standfirsts and search summaries, so treat those claims as " +
      "the softest on the page and read the original if it matters to your vote. Sources marked " +
      '<span class="s-access ok">full text reviewed</span> started in that category and have ' +
      "since been read in full and reconciled claim by claim.</p>" +
      '<ol class="source-list">' + refOrder.map(function (k, i) {
        var s = SOURCES[k];
        var flag = s.access === "paywalled"
          ? ' <span class="s-access">paywalled</span>'
          : s.access === "blocked" ? ' <span class="s-access">not directly retrievable</span>'
          : s.access === "fulltext" ? ' <span class="s-access ok">full text reviewed</span>' : "";
        return '<li id="src-' + (i + 1) + '"><span class="s-pub">' + esc(s.pub) + "</span> — " +
          '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.t) + "</a>" + flag + "</li>";
      }).join("") + "</ol>" + prevNext("view-sources") + "</section>";
  }

  function issuesInPlay() {
    var set = Object.create(null);
    RACES.forEach(function (r) {
      r.candidates.forEach(function (c) {
        (c.stances || []).forEach(function (s) { set[s.i] = true; });
      });
    });
    return Object.keys(ISSUES).filter(function (k) { return set[k]; });
  }

  /* --------------------------------------------------------------- render */
  function renderNav() {
    var route = currentRoute();
    var host = document.getElementById("tocLinks");
    host.innerHTML = NAV.map(function (n) {
      var isRace = n.id.indexOf("race-") === 0;
      return '<a href="#' + n.id + '"' + (n.id === route ? ' class="active"' : "") +
        (isRace ? "" : ' data-meta="1"') + ">" + esc(n.label) + "</a>";
    }).join("");
    /* keep the current section's chip visible in the scrolling nav */
    var active = host.querySelector("a.active");
    if (active) {
      var want = active.offsetLeft - (host.clientWidth - active.offsetWidth) / 2;
      host.scrollLeft = Math.max(want, 0);
    }

    /* the phone nav: a native picker beats a scrolling chip strip one-handed */
    var sel = document.getElementById("navSelect");
    sel.innerHTML = NAV.map(function (n) {
      var isRace = n.id.indexOf("race-") === 0;
      var r = isRace ? RACES.filter(function (x) { return "race-" + x.id === n.id; })[0] : null;
      var suffix = r && r.decided === "today" ? " — decided today" : "";
      return '<option value="' + n.id + '"' + (n.id === route ? " selected" : "") + ">" +
        esc(n.label) + esc(suffix) + "</option>";
    }).join("");

    var i = ROUTES.indexOf(route);
    document.getElementById("navPrev").disabled = i <= 0;
    document.getElementById("navNext").disabled = i >= ROUTES.length - 1;
  }

  function render() {
    var route = currentRoute();
    document.getElementById("viewHost").innerHTML =
      viewOverview() +
      RACES.map(viewRace).join("") +
      PROPS.map(viewProp).join("") +
      viewJudicial() +
      viewNot() + viewPicks() + viewMethod() + viewSources();

    Array.prototype.forEach.call(document.querySelectorAll(".view"), function (v) {
      v.hidden = v.id !== route;
    });
    var nPicks = RACES.filter(function (r) { return picks[r.id]; }).length +
      PROPS.filter(function (p) { return picks["prop" + p.num]; }).length +
      JUDICIAL.items.filter(function (j) {
        return picks["judge-" + j.name.replace(/[^A-Za-z]/g, "")];
      }).length;
    document.getElementById("pickCount").textContent = nPicks;
    document.getElementById("pickCountMobile").textContent = nPicks;
    renderNav();
  }

  /* Scroll so the active view starts just under the pinned nav.
     Never measure the nav's own position: it is position:sticky, so both
     getBoundingClientRect().top and offsetTop report where it is currently
     pinned rather than its place in the document — measure against it and you
     "scroll" to exactly where you already are, which is the bug this replaces.
     #viewHost is static, so its offsetTop is stable.                          */
  function scrollToViewTop() {
    var nav = document.getElementById("nav");
    var host = document.getElementById("viewHost");
    window.scrollTo({ top: Math.max(host.offsetTop - nav.offsetHeight - 4, 0), behavior: "auto" });
  }

  function go(route, opts) {
    render();
    var srcNum = opts && opts.srcNum;
    var keep = opts && opts.keepScroll;

    /* The browser also tries to scroll to the element matching the hash, and it
       does that after this handler — including for views that were hidden when
       it looked. Re-assert our position on the next two frames so the router,
       not the native anchor jump, decides where the page lands.               */
    function settle() {
      if (srcNum) {
        var li = document.getElementById("src-" + srcNum);
        if (li) { li.classList.add("flash"); li.scrollIntoView({ block: "center" }); }
      } else if (!keep) {
        scrollToViewTop();
      }
    }
    settle();
    requestAnimationFrame(function () {
      settle();
      requestAnimationFrame(settle);
    });
  }

  /* ---------------------------------------------------------------- wiring */
  var pendingSrc = null;

  document.addEventListener("click", function (e) {
    var srcLink = e.target.closest ? e.target.closest("sup.ref a") : null;
    if (srcLink) { pendingSrc = srcLink.dataset.src; return; }

    /* Tapping a link to the view you are already on fires no hashchange, so
       nothing would scroll. Handle those here (bottom bar "Ballot", mostly). */
    var hashLink = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (hashLink) {
      var want = hashLink.getAttribute("href").slice(1);
      if (ROUTES.indexOf(want) > -1 && want === currentRoute()) {
        e.preventDefault();
        go(want);
        return;
      }
    }

    var chip = e.target.closest ? e.target.closest(".issue-chip") : null;
    if (chip) {
      var k = chip.dataset.issue;
      var i = selectedIssues.indexOf(k);
      if (i > -1) selectedIssues.splice(i, 1); else selectedIssues.push(k);
      save(LS_ISSUES, selectedIssues);
      var y = window.scrollY;
      render();
      window.scrollTo(0, y);
      return;
    }

    var segBtn = e.target.closest ? e.target.closest(".seg button") : null;
    if (segBtn) {
      var key = segBtn.parentNode.dataset.issue;
      var side = Number(segBtn.dataset.side);
      if (userDirs[key] === side) delete userDirs[key]; else userDirs[key] = side;
      save(LS_DIRS, userDirs);
      var y2 = window.scrollY;
      render();
      window.scrollTo(0, y2);
      return;
    }

    var pickBtn = e.target.closest ? e.target.closest(".pick-btn") : null;
    if (pickBtn) {
      var rid, cid;
      if (pickBtn.dataset.prop) {
        rid = "prop" + pickBtn.dataset.prop; cid = pickBtn.dataset.mark;
      } else if (pickBtn.dataset.judge) {
        rid = pickBtn.dataset.judge; cid = pickBtn.dataset.mark;
      } else {
        rid = pickBtn.dataset.race; cid = pickBtn.dataset.cand;
      }
      if (picks[rid] === cid) delete picks[rid]; else picks[rid] = cid;
      save(LS_PICKS, picks);
      var y3 = window.scrollY;
      render();
      window.scrollTo(0, y3);
      return;
    }

    if (e.target.id === "clearIssues") {
      selectedIssues = []; userDirs = {};
      save(LS_ISSUES, selectedIssues); save(LS_DIRS, userDirs);
      render(); return;
    }
    if (e.target.id === "clearPicks") {
      picks = {}; save(LS_PICKS, picks); render(); return;
    }
    if (e.target.id === "printPicks") {
      document.body.classList.add("printing");
      window.print();
      setTimeout(function () { document.body.classList.remove("printing"); }, 500);
      return;
    }
  });

  document.getElementById("navSelect").addEventListener("change", function (e) {
    if (e.target.value === currentRoute()) go(e.target.value);
    else location.hash = "#" + e.target.value;
  });
  ["navPrev", "navNext"].forEach(function (id, idx) {
    document.getElementById(id).addEventListener("click", function () {
      var i = ROUTES.indexOf(currentRoute()) + (idx === 0 ? -1 : 1);
      if (i >= 0 && i < ROUTES.length) location.hash = "#" + ROUTES[i];
    });
  });

  /* re-evaluate the device flag on rotation or resize */
  var reflow;
  function onViewportChange() {
    clearTimeout(reflow);
    reflow = setTimeout(applyDevice, 120);
  }
  window.addEventListener("resize", onViewportChange);
  window.addEventListener("orientationchange", onViewportChange);
  if (mqCoarse.addEventListener) mqCoarse.addEventListener("change", applyDevice);
  if (mqNarrow.addEventListener) mqNarrow.addEventListener("change", applyDevice);

  window.addEventListener("hashchange", function () {
    var s = pendingSrc; pendingSrc = null;
    go(currentRoute(), { srcNum: s });
  });

  render();
  if (location.hash) go(currentRoute(), { srcNum: null });
})();
