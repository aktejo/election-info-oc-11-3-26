# Fullerton / Precinct 13099 Ballot Guide — November 3, 2026

A sourced, interactive guide to **all 44 decisions** on the California general-election
ballot for precinct 13099 (Fullerton, Orange County): 13 contests, 14 statewide
propositions, and 17 judicial retention questions.

**Live:** https://aktejo.github.io/election-info-oc-11-3-26/

## What this is

Every factual claim carries a numbered footnote to a named source. Alongside what each
candidate and measure says, the guide reports **what nobody has said** — blank
questionnaire answers, declined surveys, issues a platform never addresses, and measures
with no opposing argument on file.

### The pro/con rule

Every argument shown is one **somebody actually made**, attributed to the person or
organization that made it:

- **Propositions** use the official arguments printed in the Secretary of State's Voter
  Information Guide, reduced to their own headline claims, with every signer named.
- **Candidates** use editorial-board endorsement reasoning, interest-group rationales,
  and criticisms opponents actually published.
- Where a side produced **no** published argument, the guide says so rather than
  inventing one. Propositions 1 and 37 have no argument against them on file; several
  candidates have no published criticism. Both are reported as findings.

### Three things on this ballot that are easy to miss

1. **Insurance Commissioner is two Democrats** — Jane Kim and Ben Allen. Party label
   tells you nothing, and it is the one statewide race described as competitive.
2. **Assembly District 59 has no Democrat.** The top-two primary sent a Republican and a
   Green Party candidate to November.
3. **Propositions 40, 41 and 42 can cancel each other out.** The Legislative Analyst
   warns that if 41 or 42 outpolls 40, Prop 40 could be blocked even if a majority
   approves it.

## How the districts were determined

Not by reading a map image. The precinct 13099 polygon was taken out of the Registrar of
Voters' own `OC_Precinct_2026_GE` shapefile, a representative point inside it was computed,
and that point was tested against each official district layer the same office publishes.

That is how the guide can state that this precinct is in Fullerton Council District 1,
Fullerton School District Trustee Area 2, FJUHSD Trustee Area 2 and NOCCCD Trustee Area 4 —
and therefore that **none of those seats is on this ballot**, because the seats up this
year are Council Districts 3 and 5, FSD Area 3, FJUHSD Areas 1 and 5, and NOCCCD Areas
1, 3 and 6.

## Structure

| File | Purpose |
|---|---|
| `index.html` | Shell: hero, sticky nav, view host, mobile bar |
| `assets/data.js` | All content. `BUILD`, `PRECINCT`, `SOURCES`, `ISSUES`, `RACES`, `PROPS`, `JUDICIAL`, `NOT_ON_BALLOT`, `CAVEATS` |
| `assets/app.js` | Renderer + hash router. One view at a time; footnote numbers assigned once up front |
| `assets/styles.css` | Tokens, layout, mobile breakpoints, print styles |
| `audit.html` + `assets/audit.js` | Unlisted fact-check sheet, generated from `data.js` at load |

No build step, no dependencies, no analytics. Picks are stored in `localStorage` only.

### The fact-check page

`audit.html` extracts every claim from the same `data.js` the live site renders, so it
cannot drift out of sync. It classifies each claim as a factual claim, an absence claim,
a coverage limit (something *this build* failed to find), our own framing, or a link.
Current count: **796 claims, 0 without a citation.**

It is unlisted — not linked, `noindex`, and disallowed in `robots.txt` — but the repo is
public and GitHub Pages serves every file. Anyone who knows the URL can read it.

## Sources

Primary sources are the Orange County Registrar of Voters' official candidate roster and
district shapefiles, and the California Secretary of State's Voter Information Guide and
judicial candidate list. Candidate detail comes chiefly from the LAist and CalMatters 2026
voter guides, Ballotpedia, Voice of OC and local Orange County outlets. All 50 sources are
listed in the guide's Sources view with working links.

## Known limits

Stated in full on the guide's "Method & caveats" page. The short version: research closed
the evening of November 2, 2026; the three district races (CA-45, SD-34, AD-59) have the
thinnest coverage and no captured platforms; only the governor's race has real polling;
funding figures come from sources with different cutoff dates; and judicial retention is
the least-documented part of the ballot by a wide margin.

Not affiliated with any campaign, party, or election authority.
