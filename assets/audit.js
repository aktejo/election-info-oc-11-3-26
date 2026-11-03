/* ==========================================================================
   Fact-check sheet — extracts every claim from data.js.
   Deliberately dumb and flat: no router, no state. If a claim exists on the
   live guide it is emitted here with its citation, or flagged as uncited.
   ========================================================================== */
(function () {
  "use strict";

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  var money = function (n) {
    return n == null ? "not reported" : "$" + Math.round(n).toLocaleString("en-US");
  };

  /* ------------------------------------------------------------- extract */
  var claims = [];
  var n = 0;

  /* kind:
       fact      — a claim about the world; must carry a source
       negative  — an absence claim about the world ("did not respond"); also must
       coverage  — a disclosure about the limits of THIS build's research; by
                   definition has no external source, and inventing one would be
                   worse than saying so plainly
       editorial — our own framing
       link      — an outbound URL to verify resolves                              */
  function add(section, subject, field, text, sources, kind) {
    if (text == null || text === "") return;
    claims.push({
      id: "C" + (++n),
      section: section,
      subject: subject,
      field: field,
      text: String(text),
      sources: (sources || []).filter(function (k) { return SOURCES[k]; }),
      kind: kind || "fact"
    });
  }

  /* --- precinct ---------------------------------------------------------- */
  add("Precinct " + PRECINCT.number, "Polling place", "location",
    PRECINCT.pollingPlace + " — " + PRECINCT.pollingAddress, PRECINCT.pollingS);
  PRECINCT.districts.forEach(function (d) {
    add("Precinct " + PRECINCT.number, d.label, "district assignment",
      d.value + ". " + d.note, d.s);
  });
  add("Precinct " + PRECINCT.number, "Voting logistics", "hours and deadlines",
    PRECINCT.votingNote, PRECINCT.votingS);
  if (PRECINCT.ballotSize) {
    add("Precinct " + PRECINCT.number, "Ballot length", "number of decisions",
      PRECINCT.ballotSize.note, PRECINCT.ballotSize.s);
  }

  /* --- races ------------------------------------------------------------- */
  RACES.forEach(function (r) {
    var sec = r.office;
    add(sec, "The office", "what this office does", r.role, r.roleS);
    add(sec, "The seat", "seat context", r.seatNote, r.seatNoteS);
    add(sec, "The seat", "why it is on this ballot", r.whyOnBallot, r.whyS);
    if (r.context) add(sec, "The race", "race context", r.context, r.contextS);
    if (r.important) add(sec, "The race", "editorial emphasis", r.important, [], "editorial");
    if (r.alsoNote) add(sec, "The race", "footnote", r.alsoNote, r.alsoNoteS);
    if (r.nameNote) add(sec, "The race", "name note", r.nameNote, r.nameNoteS);

    if (r.polling) {
      (r.polling.rows || []).forEach(function (row) {
        add(sec, "Polling", row.label, row.detail, row.src);
      });
      if (r.polling.method) add(sec, "Polling", "methodology", r.polling.method, r.polling.methodS);
      if (r.polling.note) {
        /* A polling note alongside actual poll rows qualifies those numbers.
           A polling note with no rows is a statement that we found no polling —
           a fact about our search, not about the race.                        */
        var hasRows = !!(r.polling.rows && r.polling.rows.length);
        add(sec, "Polling", hasRows ? "polling caveat" : "coverage: no polling found",
          r.polling.note, r.polling.methodS, hasRows ? "fact" : "coverage");
      }
    }

    r.candidates.forEach(function (c) {
      add(sec, c.name, "biography", c.bio, c.bioS);
      if (c.running) add(sec, c.name, "running mate", c.running, c.runningS);
      if (c.role) add(sec, c.name, "role/title line", c.role, c.bioS);
      if (c.age) add(sec, c.name, "age", "Age " + c.age, c.bioS);
      if (c.incumbent) add(sec, c.name, "incumbency", "Listed as the incumbent.", c.bioS);
      if (c.partyLean) add(sec, c.name, "party lean (nonpartisan race)", c.partyLean, c.bioS);

      if (c.funding) {
        var f = c.funding;
        var fig = [];
        if (f.raised != null) fig.push("raised " + money(f.raised));
        if (f.spent != null) fig.push("spent " + money(f.spent));
        if (f.cash != null) fig.push("cash on hand " + money(f.cash));
        if (f.asOf) fig.push("as of " + f.asOf);
        add(sec, c.name, "campaign finance",
          (fig.length ? fig.join(", ") + ". " : "") + (f.note || ""), f.s,
          f.raised == null ? (f.s && f.s.length ? "negative" : "coverage") : "fact");
      }

      (c.stances || []).forEach(function (st) {
        add(sec, c.name, "stance — " + ((ISSUES[st.i] && ISSUES[st.i].label) || st.i),
          st.pos + " — " + st.d, st.s);
      });

      if (c.bioNote) add(sec, c.name, "source conflict noted", c.bioNote, c.bioNoteS, "coverage");
      if (c.stancesNote) {
        add(sec, c.name, "coverage: no positions captured", c.stancesNote, c.stancesNoteS, "coverage");
      }

      (c.gaps || []).forEach(function (g) {
        add(sec, c.name, "gap — " + g.label, g.d, g.s, "negative");
      });

      if (c.args) {
        (c.args.pro || []).forEach(function (a) {
          add(sec, c.name, "argument for — attributed to " + a.by, a.d, a.s);
        });
        (c.args.con || []).forEach(function (a) {
          add(sec, c.name, "argument against — attributed to " + a.by, a.d, a.s);
        });
        if (!(c.args.pro || []).length && c.args.proNote) {
          add(sec, c.name, "coverage: no argument for found", c.args.proNote, [], "coverage");
        }
        if (!(c.args.con || []).length && c.args.conNote) {
          add(sec, c.name, "coverage: no argument against found", c.args.conNote, [], "coverage");
        }
      }

      if (c.notice) add(sec, c.name, "reported allegation notice", c.notice.d, c.notice.s);

      if (c.endorsements) {
        if (c.endorsements.list && c.endorsements.list.length) {
          add(sec, c.name, "endorsements",
            c.endorsements.list.join("; "), c.endorsements.s);
        } else if (c.endorsements.note) {
          add(sec, c.name, "coverage: no endorsements captured",
            c.endorsements.note, c.endorsements.s, "coverage");
        }
      }
      if (c.site) {
        var siteKey = Object.keys(SOURCES).filter(function (k) {
          return SOURCES[k].url === c.site;
        })[0];
        add(sec, c.name, "candidate link", c.site, siteKey ? [siteKey] : [], "link");
      }
    });
  });

  /* --- propositions ------------------------------------------------------- */
  PROPS.forEach(function (p) {
    var sec = "Proposition " + p.num;
    add(sec, "Official title", "ballot title", p.title, p.doesS);
    add(sec, "Measure type", "classification", p.kind, p.doesS);
    add(sec, "What it does", "neutral description", p.does, p.doesS);
    add(sec, "If it passes", "plain-language outcome", p.passIf, p.passIfS);
    add(sec, "If it fails", "plain-language outcome", p.failIf, p.failIfS);
    add(sec, "Fiscal impact", "Legislative Analyst estimate", p.fiscal, p.fiscalS);
    add(sec, "Campaign funding", "contribution totals", p.money, p.moneyS,
      /No (funding total|total was reported)/.test(p.money) ? "coverage" : "fact");
    if (p.conflict) add(sec, "Conflict with another measure", "interaction warning", p.conflict, p.conflictS);
    (p.pro.points || []).forEach(function (x, i) {
      add(sec, "Argument in favor", "official argument point " + (i + 1), x, p.pro.s);
    });
    (p.pro.signers || []).forEach(function (x) {
      add(sec, "Argument in favor", "signatory", x, p.pro.s);
    });
    if (p.con.none) {
      add(sec, "Argument against", "no argument submitted", p.con.note, p.con.s, "negative");
    } else {
      (p.con.points || []).forEach(function (x, i) {
        add(sec, "Argument against", "official argument point " + (i + 1), x, p.con.s);
      });
      (p.con.signers || []).forEach(function (x) {
        add(sec, "Argument against", "signatory", x, p.con.s);
      });
    }
  });

  /* --- judicial retention ------------------------------------------------- */
  (function () {
    var sec = "Judicial retention";
    var e = JUDICIAL.explain;
    add(sec, "How retention works", "process", e.what, e.whatS);
    add(sec, "Term length", "process", e.term, e.termS);
    add(sec, "Historical outcome", "process", e.stakes, e.stakesS);
    add(sec, "District coverage", "process", e.district, e.districtS);
    add(sec, "Available evaluation", "process", e.howToRead, e.howToReadS);
    add(sec, "Slate-wide positions", "process", e.blanket, e.blanketS);
    add(sec, "Source conflict", "coverage limit", e.conflict, e.conflictS, "coverage");
    add(sec, "Information limits", "coverage limit", e.gap, e.gapS, "coverage");
    JUDICIAL.items.forEach(function (j) {
      add(sec, j.name, "ballot question", j.question, j.questionS);
      add(sec, j.name, "court and seat",
        j.court + (j.division ? ", Division " + j.division : "") + " — " + j.role, j.questionS);
      if (j.currentTitle) add(sec, j.name, "current title", j.currentTitle, j.questionS);
      if (j.rating) {
        add(sec, j.name, "State Bar evaluation", j.rating + " (" + j.ratingYear + ")", j.metaS);
      }
      if (j.appointedBy) add(sec, j.name, "appointing governor", j.appointedBy, j.metaS);
      if (j.note) add(sec, j.name, "note", j.note, j.noteS);
      if (j.args) {
        (j.args.pro || []).forEach(function (a) {
          add(sec, j.name, "argument for retention — " + a.by, a.d, a.s);
        });
        (j.args.con || []).forEach(function (a) {
          add(sec, j.name, "argument against retention — " + a.by, a.d, a.s);
        });
        if (j.args.conNote) {
          add(sec, j.name, "no argument against found", j.args.conNote,
            j.args.conNoteS || [], "negative");
        }
      }
    });
  })();

  /* --- not on ballot / caveats -------------------------------------------- */
  NOT_ON_BALLOT.forEach(function (x) {
    add("Not on this ballot", x.office, "why it is excluded", x.why, x.s);
  });
  CAVEATS.forEach(function (c) {
    add("Method & caveats", c.title, "stated limitation", c.d, c.s || [], "editorial");
  });

  /* --------------------------------------------------------------- render */
  var KIND_LABEL = {
    fact: "factual claim",
    negative: "absence claim",
    coverage: "coverage limit",
    editorial: "our framing",
    link: "link"
  };

  function accessFlag(s) {
    if (s.access === "paywalled") return ' <span class="a-access">paywalled — you will hit a wall</span>';
    if (s.access === "blocked") return ' <span class="a-access">not directly retrievable when built</span>';
    if (s.access === "fulltext") return ' <span class="a-access ok">full text reviewed and reconciled</span>';
    return "";
  }

  function claimBlock(c, showSection) {
    var NOTE = {
      editorial: "No citation — this is our framing, not a sourced fact.",
      coverage: "No citation, and none is possible — this discloses what this build " +
                "did not find, so the thing to check is whether it is still true: " +
                "search for what we say is missing, and if it exists, the guide is wrong.",
      link: "No citation — verify the URL resolves and belongs to this candidate."
    };
    var srcs = c.sources.length
      ? '<ul class="a-src">' + c.sources.map(function (k) {
          var s = SOURCES[k];
          return '<li><span class="a-pub">' + esc(s.pub) + "</span> — " + esc(s.t) +
            accessFlag(s) +
            '<br><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.url) + "</a></li>";
        }).join("") + "</ul>"
      : '<div class="a-nosrc' + (NOTE[c.kind] ? " soft" : "") + '">' +
        (NOTE[c.kind] || "No citation attached — <strong>needs one.</strong>") + "</div>";

    return '<article class="a-claim" id="' + c.id + '">' +
      '<div class="a-meta"><a class="a-id" href="#' + c.id + '">' + c.id + "</a>" +
      (showSection ? '<span class="a-sec">' + esc(c.section) + "</span>" : "") +
      '<span class="a-subj">' + esc(c.subject) + "</span>" +
      '<span class="a-field">' + esc(c.field) + "</span>" +
      '<span class="a-kind k-' + c.kind + '">' + KIND_LABEL[c.kind] + "</span></div>" +
      '<p class="a-text">' + esc(c.text) + "</p>" + srcs + "</article>";
  }

  /* stats ---------------------------------------------------------------- */
  var used = {};
  claims.forEach(function (c) { c.sources.forEach(function (k) { used[k] = (used[k] || 0) + 1; }); });
  var sourceKeys = Object.keys(SOURCES);
  var unusedSources = sourceKeys.filter(function (k) { return !used[k]; });
  var needCite = claims.filter(function (c) {
    return !c.sources.length && c.kind !== "editorial" && c.kind !== "link" && c.kind !== "coverage";
  });

  document.getElementById("stats").innerHTML = [
    ["Claims extracted", claims.length],
    ["Distinct sources cited", Object.keys(used).length],
    ["Sources defined but unused", unusedSources.length],
    ["Claims with no citation", needCite.length],
    ["Absence claims about candidates", claims.filter(function (c) { return c.kind === "negative"; }).length],
    ["Coverage limits disclosed", claims.filter(function (c) { return c.kind === "coverage"; }).length],
    ["Sources not readable in full", sourceKeys.filter(function (k) {
      return SOURCES[k].access && SOURCES[k].access !== "fulltext";
    }).length],
    ["Reconciled against full text", sourceKeys.filter(function (k) { return SOURCES[k].access === "fulltext"; }).length],
    ["Contests covered", RACES.length],
    ["Candidates covered", RACES.reduce(function (a, r) { return a + r.candidates.length; }, 0)],
    ["Propositions covered", PROPS.length],
    ["Judicial questions covered", JUDICIAL.items.length]
  ].map(function (row) {
    return '<div class="a-stat"><span class="a-num">' + row[1] + "</span>" +
      "<span>" + row[0] + "</span></div>";
  }).join("");

  /* uncited -------------------------------------------------------------- */
  document.getElementById("unsourced").innerHTML =
    "<h2>Claims with no citation</h2>" +
    (needCite.length
      ? '<p class="a-lede">These assert something factual and carry no source. Fix or delete.</p>' +
        needCite.map(function (c) { return claimBlock(c, true); }).join("")
      : '<p class="a-ok">None. Every claim about the world — including every ' +
        "“did not respond” and “no position found” — carries at least one citation.</p>" +
        '<p class="a-lede">Three kinds of block are uncited by design, and are listed in ' +
        "page order below rather than here: <strong>our framing</strong> (editorial " +
        "emphasis, stated caveats), <strong>outbound links</strong>, and " +
        "<strong>coverage limits</strong> — statements about what this build failed to " +
        "find. That last group is the one worth attacking: each is a claim that " +
        "something does not exist, and the way to falsify it is to go find the thing.</p>") +
    (unusedSources.length
      ? '<p class="a-lede">Defined in the source registry but not cited anywhere — dead weight: ' +
        unusedSources.map(function (k) { return "<code>" + esc(k) + "</code>"; }).join(", ") + ".</p>"
      : "");

  /* by source ------------------------------------------------------------- */
  var bySource = Object.keys(used).sort(function (a, b) { return used[b] - used[a]; });
  document.getElementById("by-source").innerHTML =
    "<h2>Check by source</h2>" +
    '<p class="a-lede">Grouped so you open each source once and clear every claim resting on it. ' +
    "Ordered by how much of the guide depends on it — the top entries are where an error would " +
    "do the most damage.</p>" +
    bySource.map(function (k) {
      var s = SOURCES[k];
      var mine = claims.filter(function (c) { return c.sources.indexOf(k) > -1; });
      return '<details class="a-srcgroup"' + (used[k] >= 8 ? " open" : "") + ">" +
        "<summary><span class='a-count'>" + used[k] + "</span> " +
        "<span class='a-pub'>" + esc(s.pub) + "</span> — " + esc(s.t) + accessFlag(s) + "</summary>" +
        '<p class="a-srcurl"><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
        esc(s.url) + "</a></p>" +
        mine.map(function (c) { return claimBlock(c, true); }).join("") +
        "</details>";
    }).join("");

  /* fragility -------------------------------------------------------------- */
  var soloBySource = {};
  claims.forEach(function (c) {
    if (c.sources.length === 1) {
      (soloBySource[c.sources[0]] = soloBySource[c.sources[0]] || []).push(c);
    }
  });
  var fragile = Object.keys(soloBySource).sort(function (a, b) {
    return soloBySource[b].length - soloBySource[a].length;
  });
  var riskiest = fragile.filter(function (k) {
    var acc = SOURCES[k].access;
    return acc && acc !== "fulltext" && soloBySource[k].length >= 3;
  });

  document.getElementById("by-source").insertAdjacentHTML("beforebegin",
    '<section class="a-section" id="fragility"><h2>Where a single bad source would do the most damage</h2>' +
    '<p class="a-lede">Claims resting on exactly one citation. If that source is wrong, ' +
    "nothing else on the page catches it — so these are the highest-value things to check " +
    "first, and the most valuable places to add a second source.</p>" +
    (riskiest.length
      ? '<div class="a-alert"><strong>Check these first.</strong> These sources are both ' +
        "sole support for several claims <em>and</em> could not be read in full when the guide " +
        "was built — what they support came from headlines and search summaries:<ul>" +
        riskiest.map(function (k) {
          return "<li><strong>" + soloBySource[k].length + " claims</strong> rest only on " +
            esc(SOURCES[k].pub) + " — " + esc(SOURCES[k].t) + accessFlag(SOURCES[k]) + "</li>";
        }).join("") + "</ul></div>"
      : "") +
    fragile.map(function (k) {
      var s = SOURCES[k];
      return '<details class="a-srcgroup"><summary><span class="a-count">' +
        soloBySource[k].length + '</span> <span class="a-pub">' + esc(s.pub) + "</span> — " +
        esc(s.t) + accessFlag(s) + "</summary>" +
        '<p class="a-srcurl"><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
        esc(s.url) + "</a></p>" +
        soloBySource[k].map(function (c) { return claimBlock(c, true); }).join("") +
        "</details>";
    }).join("") + "</section>");

  /* by claim -------------------------------------------------------------- */
  var sections = [];
  claims.forEach(function (c) { if (sections.indexOf(c.section) < 0) sections.push(c.section); });
  document.getElementById("by-claim").innerHTML =
    "<h2>Every claim, in page order</h2>" +
    '<p class="a-lede">The same claims arranged the way a reader meets them.</p>' +
    sections.map(function (sec) {
      return '<details class="a-secgroup" open><summary>' + esc(sec) + " <span class='a-count'>" +
        claims.filter(function (c) { return c.section === sec; }).length + "</span></summary>" +
        claims.filter(function (c) { return c.section === sec; })
          .map(function (c) { return claimBlock(c, false); }).join("") + "</details>";
    }).join("");

  document.getElementById("builtAt").textContent =
    new Date(BUILD.builtAt).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" });
})();
