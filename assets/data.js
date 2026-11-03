/* ============================================================================
   Fullerton / Precinct 13099 Ballot Guide — November 3, 2026 California General
   Data layer. Every factual claim carries one or more source keys (s: [...]).
   Built 2026-11-02. See index.html "How this was built" for methodology.

   Pro/con rule for this build: every argument shown is one somebody actually
   made, attributed to the person or organization that made it. Where a side
   produced no published argument, that silence is reported, not filled in.
   ========================================================================== */

const BUILD = {
  builtAt: "2026-11-02T21:00:00-08:00",
  place: "Fullerton, Orange County, California",
  precinct: "13099",
  registration: "Registered Democrat",
  pollsClose: "2026-11-03T20:00:00-08:00",
  pollsOpen: "2026-11-03T07:00:00-08:00"
};

/* -------------------------------------------------------------- PRECINCT */
/* Precinct 13099 — the districts below were resolved by taking the precinct
   polygon out of the county's own 2026 General Election precinct shapefile
   and testing a point inside it against each official district layer
   published by the Registrar of Voters. Method and caveats are in CAVEATS.  */
const PRECINCT = {
  number: "13099",
  pollingPlace: "Any vote center in Orange County",
  pollingAddress: "Orange County runs vote centers, not assigned precinct polling places. Any of the county's vote centers will print your precinct 13099 ballot.",
  pollingMap: "https://ocvote.gov/votecenter",
  pollingS: ["ktlaCenters", "laistVoteFAQ"],
  votingNote: "Vote centers are open 7 a.m. to 8 p.m. on Election Day. If you are returning a mail ballot instead, it must be in a drop box by 8 p.m. or postmarked by today.",
  votingS: ["laistVoteFAQ", "ktlaCenters"],
  districts: [
    { label: "U.S. House", value: "District 45", note: "Precinct 13099 falls inside the 45th Congressional District polygon. These are the post-Proposition 50 lines, redrawn in 2025 — the 45th's boundaries are not the ones used in 2024.", s: ["ocShapes", "bpNews45"], race: "ca45" },
    { label: "State Senate", value: "District 34", note: "Open seat — Tom Umberg is termed out and is running for the Board of Equalization instead.", s: ["ocShapes", "voiceSD34"], race: "sd34" },
    { label: "State Assembly", value: "District 59", note: "Held by Republican Phillip Chen. The only other candidate who made the runoff is a Green Party nominee — there is no Democrat in this contest.", s: ["ocShapes", "candlog"], race: "ad59" },
    { label: "County Supervisor", value: "District 4", note: "Open seat — incumbent Doug Chaffee is not on the ballot.", s: ["ocShapes", "candlog"], race: "sup4" },
    { label: "Board of Equalization", value: "District 4", note: "BOE District 4 covers Orange, Riverside, San Diego and Imperial counties.", s: ["ocShapes", "bpBOE"], race: "boe4" },
    { label: "City of Fullerton", value: "Council District 1", note: "District 1 is not up this year. Only Fullerton Council Districts 3 and 5 are on the November ballot, so you have no city council race.", s: ["ocShapes", "ocvoteContests"] },
    { label: "Fullerton School District", value: "Trustee Area 2", note: "Only Trustee Area 3 is up this year, so this seat is not on your ballot.", s: ["ocShapes", "ocvoteContests"] },
    { label: "Fullerton Joint Union High School District", value: "Trustee Area 2", note: "Only Trustee Areas 1 and 5 are up this year.", s: ["ocShapes", "ocvoteContests"] },
    { label: "North Orange County Community College District", value: "Trustee Area 4", note: "Only Trustee Areas 1, 3 and 6 are up this year.", s: ["ocShapes", "ocvoteContests"] },
    { label: "Orange County Board of Education", value: "Trustee Area 4", note: "No Board of Education seat appears on the 2026 general election ballot in Orange County.", s: ["ocShapes", "candlog"] },
    { label: "Local ballot measures", value: "None", note: "Fifteen local measures (A through O) are on Orange County ballots, but every one belongs to another city or school district. There is no countywide measure, and Fullerton's proposed half-cent sales tax was not placed on this ballot.", s: ["ocvoteContests", "laistMeasures"] }
  ],
  ballotSize: {
    total: 44,
    note: "Your ballot has 44 decisions on it: 11 voter-nominated contests, 2 nonpartisan offices, 14 statewide propositions, and 17 judicial retention questions.",
    s: ["candlog", "vig", "sosJudicial"]
  }
};

/* ---------------------------------------------------------------- SOURCES */
const SOURCES = {
  /* -- official election administration -- */
  ocvoteContests: { pub: "Orange County Registrar of Voters", t: "Contests Qualified for the Ballot for the 2026 General Election", url: "https://ocvote.gov/elections/contests-qualified-for-the-ballot-for-the-2026-general-election" },
  candlog: { pub: "Orange County Registrar of Voters", t: "Contest/Candidate Proof List, General Election 11/3/2026 (official 188-page candidate roster)", url: "https://ocvote.gov/fileadmin/user_upload/data/candlog/GEN2026/candlog.pdf" },
  ocShapes: { pub: "Orange County Registrar of Voters", t: "District and precinct shapefiles (OC_Precinct_2026_GE and district layers)", url: "https://ocvote.gov/bin/maps/shapefiles/" },
  ocvoteCenter: { pub: "Orange County Registrar of Voters", t: "Vote Center locations and hours", url: "https://ocvote.gov/votecenter" },
  ocvoteDrop: { pub: "Orange County Registrar of Voters", t: "Ballot drop box locations", url: "https://ocvote.gov/dropbox" },
  vig: { pub: "California Secretary of State", t: "Official Voter Information Guide, November 3, 2026 General Election (complete guide, 176pp)", url: "https://vig.cdn.sos.ca.gov/2026/general/pdf/complete-vig.pdf" },
  sosJudicial: { pub: "California Secretary of State", t: "List of Judicial Candidates with Headings and Ballot Questions, General Election November 3, 2026", url: "https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/judicial.pdf" },
  sosCertList: { pub: "California Secretary of State", t: "Official Certified List of Candidates, November 3, 2026 General Election", url: "https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf" },
  sosContribs: { pub: "California Secretary of State", t: "2026 Ballot Measure Contribution Totals", url: "https://www.sos.ca.gov/campaign-lobbying/helpful-resources/measure-contributions/2026-ballot-measure-contribution-totals" },

  /* -- voter guides and journalism -- */
  laistGov: { pub: "LAist", t: "California governor: Who's running and why it matters", url: "https://laist.com/news/politics/voter-guides/2026-election-california-general-governor" },
  laistIns: { pub: "LAist", t: "California insurance commissioner: Who's running and why it matters", url: "https://laist.com/news/politics/voter-guides/2026-election-california-general-insurance-commissioner" },
  laistAG: { pub: "LAist", t: "California attorney general: Who's running and why it matters", url: "https://laist.com/news/politics/voter-guides/2026-election-california-general-attorney-general" },
  laistLtGov: { pub: "LAist", t: "California lieutenant governor: Who's running and why it matters", url: "https://laist.com/news/politics/voter-guides/2026-election-california-general-lieutenant-governor" },
  laistBOE: { pub: "LAist", t: "California Board of Equalization District 4: Who's running and why it matters", url: "https://laist.com/news/politics/voter-guides/2026-election-california-general-board-of-equalization-district-4" },
  laistSup4: { pub: "LAist", t: "Orange County Supervisor, District 4: Who's running on Nov. 3 and why it matters", url: "https://laist.com/news/politics/voter-guides/2026-election-california-general-orange-county-supervisor-district-4" },
  laistVoteFAQ: { pub: "LAist", t: "How do I vote in person in Los Angeles and Orange County?", url: "https://laist.com/news/politics/voter-guides/2026-election-california-general-laist-voter-game-plan-faq-how-do-i-vote-in-person-in-los-angeles-and-orange-county" },
  laistMeasures: { pub: "LAist", t: "OC voters finally know what measures did — and did not — make it to the 2026 general election ballot", url: "https://laist.com/news/politics/oc-voters-finally-know-what-measures-did-and-did-not-make-it-to-the-2026-general-election-ballot" },
  cmSPI: { pub: "CalMatters", t: "2026 Voter Guide: Superintendent of Public Instruction", url: "https://calmatters.org/california-voter-guide-2026/superintendent-of-public-instruction/" },
  cmController: { pub: "CalMatters", t: "2026 Voter Guide: Controller", url: "https://calmatters.org/california-voter-guide-2026/controller/" },
  cmSOS: { pub: "CalMatters", t: "2026 Voter Guide: Secretary of State", url: "https://calmatters.org/california-voter-guide-2026/secretary-of-state/" },
  cmTreasurer: { pub: "CalMatters", t: "2026 Voter Guide: Treasurer", url: "https://calmatters.org/california-voter-guide-2026/treasurer/" },
  cmGov: { pub: "CalMatters", t: "2026 Voter Guide: Who are the 2026 California governor candidates?", url: "https://calmatters.org/california-voter-guide-2026/governor/" },

  /* -- race-specific reporting -- */
  bpCA45: { pub: "Ballotpedia", t: "California's 45th Congressional District election, 2026", url: "https://ballotpedia.org/California's_45th_Congressional_District_election,_2026" },
  bpNews45: { pub: "Ballotpedia News", t: "Tran (D) and Vo (R) running in California's redrawn 45th Congressional District on November 3", url: "https://news.ballotpedia.org/2026/08/03/tran-d-and-vo-r-running-in-californias-redrawn-45th-congressional-district-on-november-3/" },
  bpInsFirst: { pub: "Ballotpedia News", t: "First time two Democrats appear in the general election for California commissioner of insurance", url: "https://news.ballotpedia.org/2026/09/10/first-time-two-democrats-appear-in-the-general-election-for-california-commissioner-of-insurance/" },
  bpMoney: { pub: "Ballotpedia News", t: "With $798.9 million in contributions and counting, 2026 is the most expensive ballot measure election cycle in California", url: "https://news.ballotpedia.org/2026/10/26/with-798-9-million-in-contributions-and-counting-2026-is-the-most-expensive-ballot-measure-election-cycle-in-california/" },
  bpBOE: { pub: "Ballotpedia", t: "2026 California State Board of Equalization elections", url: "https://ballotpedia.org/California_State_Board_of_Equalization_elections,_2026" },
  bpHernandez: { pub: "Ballotpedia", t: "Victor Hernandez (California)", url: "https://ballotpedia.org/Victor_Hernandez_(California)" },
  voiceSD34: { pub: "Voice of OC", t: "Primary Election Night Results: California Senate District 34", url: "https://voiceofoc.org/2026/06/primary-election-night-results-california-senate-district-34/" },
  voiceSup: { pub: "Voice of OC", t: "Democrats Pull Ahead in Orange County Supervisor Races", url: "https://voiceofoc.org/2026/06/democrats-pull-ahead-in-orange-county-supervisor-races/" },
  ocIndShaw: { pub: "OC Independent", t: "Shaw Picks Up Backing Of Fullerton Mayor Fred Jung, OC Taxpayers Assoc. PAC In 4th District Supervisor Race", url: "https://ocindependent.com/2026/09/shaw-picks-up-backing-of-fullerton-mayor-fred-jung-oc-taxpayers-assoc-pac-in-4th-district-supervisor-race/" },
  liberalOC: { pub: "The Liberal OC", t: "Connor Traut Outraises Opponent By 4-To-1 Margin In Race For OC Supervisor", url: "https://theliberaloc.com/2026/09/25/connor-traut-outraises-opponent-by-4-to-1-margin-in-race-for-oc-supervisor/" },
  ballotbook59: { pub: "The Ballot Book", t: "59th Assembly District — 2026 Primary Election Results", url: "https://theballotbook.com/election_reports/2026/primary/26290683" },
  sfStandardIns: { pub: "The San Francisco Standard", t: "How an insurance fight between two Democrats became California's most competitive race", url: "https://sfstandard.com/2026/10/30/election-democrats-california-insurance-commissioner-jane-kim-ben-allen/" },
  cadem: { pub: "California Democratic Party", t: "California Democratic Party Endorses Insurance Commissioner and Statewide Ballot Measures Ahead of 2026 General Election", url: "https://cadem.org/california-democratic-party-endorses-insurance-commissioner-and-statewide-ballot-measures-ahead-of-2026-general-election/" },
  fullObs: { pub: "Fullerton Observer", t: "Fullerton Cuts Its Way to a Balanced Budget as Orange County Cities Search for a Way Out", url: "https://fullertonobserver.com/2026/08/23/fullerton-cuts-its-way-to-a-balanced-budget-as-orange-county-cities-search-for-a-way-out/" },
  ktlaCenters: { pub: "KTLA", t: "Nearly 170 Orange County vote centers are open for in-person voting through Election Day", url: "https://digital-release.ktla.com/news/election-guide/nearly-170-orange-county-vote-centers-are-open-for-in-person-voting-through-election-day/amp" },

  /* -- polling -- */
  ppic: { pub: "Public Policy Institute of California", t: "PPIC Statewide Survey: Californians and Their Government, October 2026", url: "https://www.ppic.org/publication/ppic-statewide-survey-californians-and-their-government-october-2026/" },
  courthousePoll: { pub: "Courthouse News Service", t: "Poll gives Becerra 27-point lead over Hilton in California governor race", url: "https://www.courthousenews.com/poll-gives-becerra-27-point-lead-over-hilton-in-california-governor-race/" },
  activote: { pub: "ActiVote", t: "CA Governor poll, Oct 31, 2026", url: "https://www.activote.net/polls/2026/ca-governor/2026-10-31/" },

  /* -- endorsements with stated reasoning -- */
  sfChronGov: { pub: "San Francisco Chronicle (editorial board)", t: "Endorsement: California's governor race is a choice between unelectable and underwhelming", url: "https://www.sfchronicle.com/opinion/editorials/article/endorsement-california-governor-race-22494871.php" },
  mcclatchyGov: { pub: "McClatchy Media (editorial board)", t: "McClatchy Media's endorsement in the race to succeed Gavin Newsom as California governor", url: "https://www.yahoo.com/news/politics/articles/mcclatchy-media-endorsement-race-succeed-120000864.html" },
  caPostGov: { pub: "The California Post (editorial board)", t: "Vote Hilton for California governor over establishment hack Becerra for real change", url: "https://www.foxnews.com/opinion/ca-post-editorial-board-vote-hilton-california-governor-establishment-hack-becerra-real-change" },
  enviroVoters: { pub: "California Environmental Voters", t: "Best California Governor on Climate: EnviroVoters' Endorsement", url: "https://envirovoters.org/california-governor-2026/" },
  ijAction59: { pub: "IJ Action", t: "Assembly District 59 recommendation", url: "https://ijaction.org/ad-59-2026/" },
  laistCourts: { pub: "LAist", t: "California Courts of Appeal for LA and OC: What you need to know", url: "https://laist.com/news/politics/voter-guides/2026-election-california-general-courts-appeal-justice-la-orange-county" },
  laistSupreme: { pub: "LAist", t: "California Supreme Court justices: What you need to know", url: "https://laist.com/news/politics/voter-guides/2026-election-california-general-state-supreme-court-evans-groban" },
  sfChronCourts: { pub: "San Francisco Chronicle (editorial board)", t: "Yes or no? The Chronicle's endorsements for California Supreme and appeals court", url: "https://www.sfchronicle.com/opinion/editorials/article/supreme-court-judge-california-22431608.php" },
  cmSupreme: { pub: "CalMatters", t: "Which CA Supreme Court justices are up for election in 2026?", url: "https://calmatters.org/california-voter-guide-2026/supreme-court/" },
  trellis4th: { pub: "Trellis Law", t: "Fourth District Court of Appeal Retention Votes 2026", url: "https://intelligence.trellis.law/california-judges-2026/court-of-appeal/fourth-district/" }
};

/* ----------------------------------------------------------------- ISSUES */
const ISSUES = {
  affordability: { label: "Cost of living & affordability", short: "Affordability" },
  housing:       { label: "Housing & homebuilding", short: "Housing" },
  homeless:      { label: "Homelessness", short: "Homelessness" },
  insurance:     { label: "Home & wildfire insurance", short: "Insurance" },
  healthcare:    { label: "Health care", short: "Health care" },
  education:     { label: "Public schools", short: "Schools" },
  climate:       { label: "Climate & energy", short: "Climate" },
  immigration:   { label: "Immigration enforcement", short: "Immigration" },
  publicsafety:  { label: "Public safety & criminal justice", short: "Public safety" },
  taxes:         { label: "Taxes & state spending", short: "Taxes" },
  democracy:     { label: "Elections & voting rights", short: "Elections" },
  trump:         { label: "Relationship with the Trump administration", short: "Trump" },
  consumer:      { label: "Consumer protection", short: "Consumer" },
  transport:     { label: "Transportation & infrastructure", short: "Transportation" },
  tech:          { label: "Tech, AI & kids online", short: "Tech" },
  prop40:        { label: "Proposition 40 (one-time billionaire tax)", short: "Prop 40", dir: ["Oppose", "Support"] }
};

/* ------------------------------------------------------------------ RACES */
const RACES = [
  /* =================================================== 1. GOVERNOR ======= */
  {
    id: "governor",
    office: "Governor",
    tier: "top",
    onBallot: "yes",
    decided: "final",
    role: "California's chief executive, and the office LAist calls \"the most powerful elected official in the nation's most populous state, commanding a $300 billion budget.\" The governor signs or vetoes legislation, writes and balances the budget, appoints agency leaders, commissioners and judges, grants pardons and commutations, and declares emergencies. The office cannot close borders, force cities to build or not build housing on its own, or raise taxes without the Legislature.",
    roleS: ["laistGov"],
    seatNote: "Gavin Newsom is termed out. This is an open seat, and the winner serves a four-year term.",
    seatNoteS: ["cmGov", "laistGov"],
    whyOnBallot: "Statewide — on every California ballot.",
    whyS: ["candlog", "sosCertList"],
    polling: {
      note: "Public polling in the final two weeks was consistent and lopsided. Treat it as a description of the race, not a reason to skip voting — the same ballot carries 43 other decisions.",
      rows: [
        { label: "PPIC, October 2026", detail: "Becerra 61% – Hilton 37% among likely voters; independents 54–41 for Becerra", src: ["ppic"] },
        { label: "Emerson College, reported Oct. 21", detail: "Becerra 60% – Hilton 33%, 7% undecided (up from an 18-point lead in August)", src: ["courthousePoll"] },
        { label: "ActiVote, fielded Oct. 17–31", detail: "Becerra 63.2% – Hilton 36.8%; 400 likely voters, ±4.9 points", src: ["activote"] }
      ],
      method: "Three independent surveys taken in the final weeks. Margins run roughly 24 to 27 points.",
      methodS: ["ppic", "courthousePoll", "activote"]
    },
    candidates: [
      {
        name: "Xavier Becerra",
        slug: "becerra",
        party: "D",
        role: "Former U.S. Health and Human Services Secretary; former California Attorney General",
        bio: "Represented Los Angeles in Congress for more than two decades, became state attorney general in 2017, then served as Health and Human Services secretary under Biden, steering the administration through the COVID-19 vaccine rollout.",
        bioS: ["laistGov"],
        funding: { note: "No fundraising total was captured for this build. LAist's governor guide carries a \"Follow the money\" section with no figures in it, and no other source reviewed gave a campaign total.", s: ["laistGov"] },
        stances: [
          { i: "affordability", pos: "Emergency declaration to freeze utility and insurance rates", d: "Would declare a state of emergency to freeze utility and insurance rates and crack down on price gouging.", s: ["laistGov"] },
          { i: "housing", pos: "Fund 40,000 approved units; push cities to zone", d: "Would use state resources to fund 40,000 units of already-approved affordable housing, push cities to zone for more homes, and expand down payment assistance.", s: ["laistGov"] },
          { i: "homeless", pos: "Ongoing rental assistance and a public dashboard", d: "Would create ongoing state funding for rental assistance and a public dashboard tracking state-funded units.", s: ["laistGov"] },
          { i: "healthcare", pos: "Expand state coverage rather than single-payer", d: "Shifted from single-payer support to expanding state coverage, with plans to cut insurer administrative costs and recruit health care workers.", s: ["laistGov"] },
          { i: "climate", pos: "Keeps clean energy goals, open to revising them", d: "Supports clean energy goals but is \"open to revising them if they make gas and energy unaffordable.\"", s: ["laistGov"] },
          { i: "trump", pos: "Confrontational", d: "Would take a confrontational stance, citing his record of suing Trump more than 100 times during Trump's first term.", s: ["laistGov"] },
          { i: "publicsafety", pos: "Voted for Prop 36 and would fully fund it; backs the sanctuary law", d: "Voted for Proposition 36 and would fully fund it. Supports California's sanctuary law.", s: ["laistGov"] },
          { i: "taxes", pos: "Progressive income tax; opposes Prop 40", dir: 0, d: "Supports a progressive income tax and opposes Proposition 40, the one-time billionaire tax on this same ballot. He has not ruled out raising taxes.", s: ["laistGov"] },
          { i: "tech", pos: "Ban under-16 social media; AI transparency in hiring", d: "Supports banning children under 16 from social media and wants AI transparency in employment decisions.", s: ["laistGov"] }
        ],
        gaps: [
          { label: "Education policy", d: "LAist's guide states he \"has not released any major education policy proposals\" — the one major issue area where his opponent has a detailed platform and he does not.", s: ["laistGov"] },
          { label: "A final-weeks interview", d: "His campaign declined a sit-down interview in the final months of the race, which his opponent accepted.", s: ["cmGov"] }
        ],
        endorsements: { list: ["California Faculty Association", "Equality California", "Planned Parenthood California", "California Environmental Voters", "San Francisco Chronicle editorial board", "McClatchy Media editorial boards (Sacramento, Modesto and Fresno Bees)"], s: ["laistGov", "enviroVoters", "sfChronGov", "mcclatchyGov"] },
        args: {
          pro: [
            { d: "He has the experience to keep the state running. The Chronicle's board endorsed him as the candidate with the experience to keep the lights on.", by: "San Francisco Chronicle editorial board", s: ["sfChronGov"] },
            { d: "He offers steadier, more substantive leadership while the state is under federal pressure.", by: "McClatchy Media editorial boards", s: ["mcclatchyGov"] },
            { d: "He is the strongest candidate in the race on climate.", by: "California Environmental Voters", s: ["enviroVoters"] }
          ],
          con: [
            { d: "The Chronicle endorsed him while criticizing how he ran his campaign, and headlined the race itself \"a choice between unelectable and underwhelming\" — its endorsement is explicitly a reluctant one.", by: "San Francisco Chronicle editorial board", s: ["sfChronGov"] },
            { d: "He is \"simply an empty suit\" and an establishment pick.", by: "The California Post editorial board", s: ["caPostGov"] },
            { d: "He has released no major education policy proposals.", by: "LAist voter guide", s: ["laistGov"] }
          ]
        }
      },
      {
        name: "Steve Hilton",
        slug: "hilton",
        party: "R",
        role: "Former Fox News host; former senior adviser to UK Prime Minister David Cameron",
        bio: "Served as a senior adviser to David Cameron from 2010 to 2012, co-founded a political crowdfunding platform in Silicon Valley, wrote books on decentralizing power, and hosted a weekly show on Fox News from 2017 to 2023. He has not previously held elected office in the United States.",
        bioS: ["laistGov"],
        funding: { note: "No fundraising total was captured for this build from the sources reviewed.", s: ["laistGov"] },
        stances: [
          { i: "taxes", pos: "No income tax on the first $150,000; halve the gas tax; opposes Prop 40", dir: 0, d: "Would eliminate state income tax on the first $150,000 of earnings, use a flat rate above that, and halve the gas tax. Also opposes Proposition 40.", s: ["laistGov"] },
          { i: "affordability", pos: "Deregulation; scrap the $800 registration fee", d: "Supports deregulation, wants to curb labor and environmental laws used against businesses, and would eliminate the $800 company registration fee.", s: ["laistGov"] },
          { i: "housing", pos: "\"Bring back the starter home\"", d: "Wants to cut fees and regulations, create a first-time buyer loan program, and limit CEQA lawsuits.", s: ["laistGov"] },
          { i: "homeless", pos: "Police-led encampment clearing; sober housing", d: "Says camping is illegal, wants police involved in clearing encampments, and prefers funding sober housing over low-barrier shelters.", s: ["laistGov"] },
          { i: "climate", pos: "Roll back clean energy mandates", d: "Would roll back clean energy mandates, end solar and wind purchase requirements, and allow more natural gas production.", s: ["laistGov"] },
          { i: "immigration", pos: "Overturn the sanctuary law", d: "Would overturn California's sanctuary law limiting police cooperation with ICE.", s: ["laistGov"] },
          { i: "publicsafety", pos: "Reopen prisons; reduce early release; loosen gun limits", d: "Would reopen closed prisons, reduce early release, and reduce firearm restrictions.", s: ["laistGov"] },
          { i: "healthcare", pos: "End Medi-Cal coverage for undocumented immigrants", d: "Would end state-funded Medi-Cal coverage for undocumented immigrants.", s: ["laistGov"] },
          { i: "education", pos: "Phonics; third-grade retention; public funds for private options", d: "Supports phonics, would hold back third graders not reading at grade level, and supports using public funds for private school options in underperforming districts.", s: ["laistGov"] },
          { i: "trump", pos: "Expects a cooperative relationship", d: "Expects a \"positive, cooperative relationship\" with Trump and believes it will bring more federal help to California.", s: ["laistGov"] }
        ],
        gaps: [
          { label: "A published endorsement list", d: "LAist notes Hilton \"does not list endorsements on his site.\"", s: ["laistGov"] },
          { label: "Concrete health care proposals", d: "Beyond ending Medi-Cal coverage for undocumented immigrants, LAist reports he has not proposed concrete steps on health care.", s: ["laistGov"] },
          { label: "Tech regulation", d: "He has expressed concern about children on social media and AI inequality but opposes regulations or bans, leaving no stated remedy.", s: ["laistGov"] }
        ],
        endorsements: { list: ["President Donald Trump", "Nisei Farmers League", "Israeli-American Civic Action Network", "The California Post editorial board"], s: ["laistGov", "caPostGov"] },
        args: {
          pro: [
            { d: "His positions on taxes, gas prices and housing amount to real change rather than an establishment continuation.", by: "The California Post editorial board", s: ["caPostGov"] },
            { d: "A cooperative relationship with the Trump administration would bring California more federal help than a confrontational one.", by: "Steve Hilton (campaign position)", s: ["laistGov"] }
          ],
          con: [
            { d: "The Chronicle's endorsement headline framed him as the \"unelectable\" half of the choice.", by: "San Francisco Chronicle editorial board", s: ["sfChronGov"] },
            { d: "Three independent final-stretch polls put him 24 to 27 points behind.", by: "PPIC, Emerson College and ActiVote surveys", s: ["ppic", "courthousePoll", "activote"] }
          ]
        }
      }
    ]
  },

  /* ============================================ 2. LIEUTENANT GOVERNOR === */
  {
    id: "ltgov",
    office: "Lieutenant Governor",
    tier: "state",
    onBallot: "yes",
    decided: "final",
    role: "Next in line for governor, and the officeholder stands in when the governor leaves California. LAist calls it often \"a ceremonial role,\" but it carries real seats: the lieutenant governor is a voting member of the University of California, California State University and California Community College boards, and chairs the State Lands Commission every three years, which oversees leasing of state-owned land including offshore drilling. Senate tie-breaking votes are rare — the last was in 1996. The office has a budget of nearly $3 million.",
    roleS: ["laistLtGov"],
    seatNote: "Open seat — incumbent Eleni Kounalakis is running for Treasurer instead. In California the lieutenant governor is elected separately from the governor, so the two offices can split between parties.",
    seatNoteS: ["laistLtGov", "cmTreasurer"],
    whyOnBallot: "Statewide — on every California ballot.",
    whyS: ["candlog"],
    polling: { note: "No public polling of this race surfaced in this build.", rows: [], s: [] },
    candidates: [
      {
        name: "Fiona Ma", slug: "ma", party: "D",
        role: "California State Treasurer since 2019",
        bio: "State treasurer since 2019, an office LAist notes oversees the world's fourth-largest economy. Previously served on the Board of Equalization from 2014 to 2018, as a San Francisco supervisor, and four terms in the state Assembly.",
        bioS: ["laistLtGov"],
        funding: { note: "No fundraising figures appear in LAist's guide for this race, and none were captured elsewhere in this build.", s: ["laistLtGov"] },
        stances: [],
        stancesNote: "No policy positions are described on LAist's lieutenant governor guide for Ma. This is a gap in the available coverage, not a sign that she holds no positions.",
        stancesNoteS: ["laistLtGov"],
        gaps: [{ label: "Published policy positions for this office", d: "LAist's guide, the most detailed voter guide found for this race, describes her background but states no policy positions for her.", s: ["laistLtGov"] }],
        endorsements: { list: ["California Labor Federation", "State Building and Construction Trades Council", "AFSCME"], s: ["laistLtGov"] },
        args: {
          pro: [{ d: "She has held statewide office for two terms and served on the Board of Equalization, the Assembly and a county board — the most directly relevant executive experience in the race.", by: "LAist candidate profile (record as described)", s: ["laistLtGov"] }],
          con: [],
          conNote: "No published criticism of Ma in this race was found in the sources reviewed for this build."
        }
      },
      {
        name: "Gloria Romero", slug: "romero", party: "R",
        role: "Former California State Senate Majority Leader",
        bio: "A former state senator who spent nearly 12 years in the Legislature, first as a Democrat. She was Senate majority leader from 2005 to 2008, the first woman to hold that role, and became a registered Republican in 2024. Gubernatorial candidate Steve Hilton asked her to join his ticket.",
        bioS: ["laistLtGov"],
        funding: { note: "No fundraising figures appear in LAist's guide for this race.", s: ["laistLtGov"] },
        stances: [
          { i: "education", pos: "School choice", d: "LAist states she \"differs with Democrats on school choice, COVID-19 policies and gender identity.\" Her campaign plan is linked from that guide but its contents are not summarized there.", s: ["laistLtGov"] }
        ],
        gaps: [{ label: "Detail behind her stated positions", d: "The only description of her platform found is a one-sentence summary of three areas of disagreement with Democrats. The underlying plan was not summarized in the coverage reviewed.", s: ["laistLtGov"] }],
        endorsements: { list: ["California Republican Party", "Reform California"], s: ["laistLtGov"] },
        args: {
          pro: [{ d: "She led the state Senate as majority leader and brings legislative experience from both parties' perspectives, having served as a Democrat before changing registration.", by: "LAist candidate profile (record as described)", s: ["laistLtGov"] }],
          con: [],
          conNote: "No published criticism of Romero in this race was found in the sources reviewed for this build."
        }
      }
    ]
  },

  /* ============================================= 3. SECRETARY OF STATE === */
  {
    id: "sos",
    office: "Secretary of State",
    tier: "state",
    onBallot: "yes",
    decided: "final",
    role: "The office \"oversees the administration of all federal and state elections in California.\" It also handles corporate business filings, maintains the state archives, and manages lobbyist registration and the campaign finance disclosure databases.",
    roleS: ["cmSOS"],
    seatNote: "Incumbent Shirley Weber is seeking a second full term. Her opponent is an Orange County supervisor, which makes this a statewide race with a local figure on the ballot.",
    seatNoteS: ["cmSOS", "candlog"],
    whyOnBallot: "Statewide — on every California ballot.",
    whyS: ["candlog"],
    polling: { note: "No public polling of this race surfaced in this build.", rows: [], s: [] },
    candidates: [
      {
        name: "Shirley N. Weber", slug: "weber", party: "D", incumbent: true,
        role: "Secretary of State since 2021",
        bio: "The daughter of Arkansas sharecroppers, she served eight years in the Assembly and became the first Black secretary of state in California history by appointment in 2021, then won a full four-year term in 2022.",
        bioS: ["cmSOS"],
        funding: { note: "CalMatters' guide carries donor and outside-spending charts, but no figures were retrievable for this build.", s: ["cmSOS"] },
        stances: [
          { i: "democracy", pos: "Expand access, transparency and election cybersecurity", d: "Pledges to expand voting access, improve transparency in election filings, and strengthen cybersecurity.", s: ["cmSOS"] }
        ],
        gaps: [{ label: "Response to the voter-ID question", d: "Proposition 39 on this same ballot would require government-issued ID to vote. No statement from Weber on Prop 39 was captured in this build, though the measure would be administered by her office.", s: ["cmSOS", "vig"] }],
        endorsements: { list: ["California Democratic Party", "California Federation of Teachers", "SEIU California"], s: ["cmSOS"] },
        args: {
          pro: [{ d: "She has run the office through two statewide election cycles and is campaigning on expanding access and hardening election cybersecurity.", by: "CalMatters voter guide (record and platform as described)", s: ["cmSOS"] }],
          con: [{ d: "Her opponent criticizes the state's slow ballot counting, which the Secretary of State's office oversees.", by: "Don Wagner (campaign position)", s: ["cmSOS"] }]
        }
      },
      {
        name: "Donald P. (Don) Wagner", slug: "wagner", party: "R",
        role: "Orange County Supervisor; former mayor of Irvine and state assemblymember",
        bio: "A former mayor of Irvine and former state assemblymember, now an Orange County supervisor. He is running on a platform of election integrity.",
        bioS: ["cmSOS"],
        funding: { note: "No figures were retrievable from CalMatters' campaign finance section for this build.", s: ["cmSOS"] },
        stances: [
          { i: "democracy", pos: "Voter ID at the polls; faster counting", d: "Supports requiring voter ID at the polls and criticizes the state's slow ballot counting. As a supervisor he pushed for releasing voter information to the U.S. Department of Justice over claimed voting irregularities.", s: ["cmSOS"] }
        ],
        gaps: [{ label: "Non-elections duties of the office", d: "No positions were captured on the office's other major functions — business filings, the state archives, and the campaign finance disclosure system.", s: ["cmSOS"] }],
        endorsements: { list: ["California Republican Party", "Reform California", "California Republican Assembly"], s: ["cmSOS"] },
        args: {
          pro: [{ d: "He argues California's slow ballot counting and its voter-roll practices need stricter oversight, and would require ID at the polls.", by: "Don Wagner (campaign position)", s: ["cmSOS"] }],
          con: [{ d: "As a supervisor he pushed to release sensitive voter information to the U.S. Department of Justice over claimed voting irregularities — a use of voter data his opponent's platform of expanded access and transparency runs against.", by: "CalMatters voter guide (record as described)", s: ["cmSOS"] }]
        }
      }
    ]
  },

  /* ==================================================== 4. CONTROLLER ==== */
  {
    id: "controller",
    office: "Controller",
    tier: "state",
    onBallot: "yes",
    decided: "final",
    role: "The state's chief accountant. CalMatters puts the job plainly: whoever is elected \"will be in charge of auditing the state's finances and paying government employees.\"",
    roleS: ["cmController"],
    seatNote: "Incumbent Malia Cohen, controller since 2023, is seeking re-election.",
    seatNoteS: ["cmController"],
    whyOnBallot: "Statewide — on every California ballot.",
    whyS: ["candlog"],
    polling: { note: "No public polling of this race surfaced in this build.", rows: [], s: [] },
    candidates: [
      {
        name: "Malia M. Cohen", slug: "cohen", party: "D", incumbent: true,
        role: "State Controller since 2023",
        bio: "Controller since 2023, running on transparency, efficiency and fairness. During recent budget talks she urged state leaders to spend cautiously.",
        bioS: ["cmController"],
        funding: { note: "CalMatters lists campaign finance sections for this race, but no dollar figures were retrievable for this build.", s: ["cmController"] },
        stances: [{ i: "taxes", pos: "Cautious spending; transparency and efficiency", d: "Running on transparency, efficiency and fairness, and urged state leaders to spend cautiously during recent budget talks.", s: ["cmController"] }],
        gaps: [{ label: "Detailed second-term agenda", d: "The coverage reviewed describes her governing posture but no specific proposals for a second term.", s: ["cmController"] }],
        endorsements: { list: ["California Democratic Party", "California Labor Federation", "Equality California"], s: ["cmController"] },
        args: {
          pro: [{ d: "She has held the office since 2023 and urged caution on spending during recent budget negotiations.", by: "CalMatters voter guide (record as described)", s: ["cmController"] }],
          con: [{ d: "Her opponent's central pitch is that the office is not doing enough to expose government fraud.", by: "Herb Morgan (campaign position)", s: ["cmController"] }]
        }
      },
      {
        name: "Herb W. Morgan", slug: "morgan", party: "R",
        role: "Chief investment officer",
        bio: "A chief investment officer who founded a San Diego investment firm later acquired by Cantor Fitzgerald Investment Advisors. He is running on a pledge to expose government fraud, as the Trump administration levels fraud accusations at California.",
        bioS: ["cmController"],
        funding: { note: "No dollar figures were retrievable for this build.", s: ["cmController"] },
        stances: [{ i: "taxes", pos: "Expose government fraud", d: "Running on a pledge to expose government fraud.", s: ["cmController"] }],
        gaps: [{ label: "The payroll side of the job", d: "No positions were captured on the controller's other core duty, paying state employees, or on specific audits he would run.", s: ["cmController"] }],
        endorsements: { list: ["California Republican Party", "California Republican Assembly", "Unity Party of California"], s: ["cmController"] },
        args: {
          pro: [{ d: "An investment professional from outside government would bring independent scrutiny to state finances and pursue fraud.", by: "Herb Morgan (campaign position)", s: ["cmController"] }],
          con: [],
          conNote: "No published criticism of Morgan in this race was found in the sources reviewed for this build."
        }
      }
    ]
  },

  /* ===================================================== 5. TREASURER ==== */
  {
    id: "treasurer",
    office: "Treasurer",
    tier: "state",
    onBallot: "yes",
    decided: "final",
    role: "The state's chief banker. The office invests unspent taxpayer money, manages state borrowing and debt, and can shape policy through new financial initiatives or by influencing where the state puts its spare cash.",
    roleS: ["cmTreasurer"],
    seatNote: "Open seat — incumbent Fiona Ma is running for lieutenant governor.",
    seatNoteS: ["cmTreasurer", "laistLtGov"],
    whyOnBallot: "Statewide — on every California ballot.",
    whyS: ["candlog"],
    polling: { note: "No public polling of this race surfaced in this build.", rows: [], s: [] },
    candidates: [
      {
        name: "Eleni Kounalakis", slug: "kounalakis", party: "D",
        role: "Lieutenant Governor of California",
        bio: "Two terms as lieutenant governor, with seats on the UC Board of Regents and the CSU Board of Trustees, where she repeatedly opposed tuition increases. She entered politics through fundraising and was named ambassador to Hungary under President Obama.",
        bioS: ["cmTreasurer"],
        funding: { note: "CalMatters' fundraising tables did not load for this build, so no totals are reported here.", s: ["cmTreasurer"] },
        stances: [{ i: "education", pos: "Opposed tuition increases", d: "On the UC Board of Regents and CSU Board of Trustees she repeatedly opposed tuition increases.", s: ["cmTreasurer"] }],
        gaps: [{ label: "Treasury-specific proposals", d: "The coverage reviewed describes her record on university boards but no specific plans for state investment, borrowing or debt management.", s: ["cmTreasurer"] }],
        endorsements: { list: ["California Labor Federation", "Teamsters California", "National Union of Healthcare Workers"], s: ["cmTreasurer"] },
        args: {
          pro: [{ d: "Two terms as lieutenant governor gave her seats on state financial and university governing boards, where she voted repeatedly against tuition increases.", by: "CalMatters voter guide (record as described)", s: ["cmTreasurer"] }],
          con: [{ d: "Her opponent's central argument is that a career in elected office is itself a disqualification for a watchdog role over state money.", by: "Jennifer Hawks (campaign position)", s: ["cmTreasurer"] }]
        }
      },
      {
        name: "Jennifer Hawks", slug: "hawks", party: "R",
        role: "Retired; former school executive team member",
        bio: "A Silicon Valley retiree who most recently served on the executive team at Sacred Heart Schools, a Catholic school in Atherton, and is a local Republican Party activist. She has never held elected office and highlights that fact.",
        bioS: ["cmTreasurer"],
        funding: { note: "No totals were retrievable for this build.", s: ["cmTreasurer"] },
        stances: [{ i: "taxes", pos: "Independence from state government", d: "Argues that never having held elected office gives her the independence to act as a check on state government.", s: ["cmTreasurer"] }],
        gaps: [{ label: "Specific treasury policy", d: "No positions were captured on state borrowing, debt management or investment policy — the office's actual work.", s: ["cmTreasurer"] }],
        endorsements: { list: ["California Republican Party", "California Republican Assembly", "Reform California"], s: ["cmTreasurer"] },
        args: {
          pro: [{ d: "Having never held elected office gives her independence to check state government rather than defend it.", by: "Jennifer Hawks (campaign position)", s: ["cmTreasurer"] }],
          con: [],
          conNote: "No published criticism of Hawks in this race was found in the sources reviewed for this build."
        }
      }
    ]
  },

  /* ============================================== 6. ATTORNEY GENERAL ==== */
  {
    id: "ag",
    office: "Attorney General",
    tier: "state",
    onBallot: "yes",
    decided: "final",
    role: "California's top law enforcement officer, carrying out the governor's law enforcement directives. The job also covers the environment, the tech sector and consumer protection, and the office has led high-profile lawsuits defending California policy against both Trump administrations.",
    roleS: ["laistAG"],
    seatNote: "Incumbent Rob Bonta is seeking a second full term.",
    seatNoteS: ["laistAG"],
    whyOnBallot: "Statewide — on every California ballot.",
    whyS: ["candlog"],
    polling: { note: "No public polling of this race surfaced in this build.", rows: [], s: [] },
    candidates: [
      {
        name: "Rob Bonta", slug: "bonta", party: "D", incumbent: true,
        role: "Attorney General since 2021",
        bio: "Appointed attorney general in 2021 and elected to a four-year term in 2022, after serving as an assemblymember representing parts of the East Bay.",
        bioS: ["laistAG"],
        funding: { note: "LAist's guide includes no campaign finance figures for this race.", s: ["laistAG"] },
        stances: [
          { i: "housing", pos: "Enforce state housing law against cities", d: "Spent much of his first term enforcing housing and criminal justice laws, including laws compelling recalcitrant cities to build new housing.", s: ["laistAG"] },
          { i: "trump", pos: "Litigation", d: "Since Trump's reelection he has filed or joined more than 50 lawsuits against the administration.", s: ["laistAG"] }
        ],
        gaps: [{ label: "Consumer and tech enforcement plans", d: "The office's consumer-protection and tech portfolios are named as part of the job, but no specific second-term plans in those areas were captured.", s: ["laistAG"] }],
        endorsements: { list: ["California Democratic Party", "California Teachers Association", "California Environmental Voters"], s: ["laistAG"] },
        args: {
          pro: [{ d: "He has used the office to enforce state housing law against cities that refused to build, and has filed or joined more than 50 suits against the current federal administration.", by: "LAist voter guide (record as described)", s: ["laistAG"] }],
          con: [{ d: "His opponent built a career fighting exactly that housing enforcement, arguing Huntington Beach should not be compelled by the state to build more affordable housing.", by: "Michael Gates (record and campaign position)", s: ["laistAG"] }]
        }
      },
      {
        name: "Michael E. Gates", slug: "gates", party: "R",
        role: "Huntington Beach City Attorney",
        bio: "A former trial attorney who served a decade as Huntington Beach city attorney. In 2025 he was appointed a deputy assistant attorney general in the U.S. Department of Justice's Civil Rights Division, then left that job in November to return to the Huntington Beach city attorney's office.",
        bioS: ["laistAG"],
        bioNote: "LAist's page header lists his title as \"Deputy United States Attorney,\" which conflicts with the biography on the same page. The discrepancy is in the source and is reproduced here rather than resolved.",
        bioNoteS: ["laistAG"],
        funding: { note: "LAist's \"Follow the money\" section for this race has no content.", s: ["laistAG"] },
        stances: [
          { i: "publicsafety", pos: "Against state criminal justice policy", d: "Challenged what he viewed as lenient criminal justice policy coming from the state capital.", s: ["laistAG"] },
          { i: "housing", pos: "Fought state affordable-housing mandates", d: "Fought state housing laws that would have required Huntington Beach to build more affordable housing.", s: ["laistAG"] }
        ],
        gaps: [{ label: "Environmental and consumer enforcement", d: "No positions were captured on two of the office's named responsibilities, the environment and consumer protection.", s: ["laistAG"] }],
        endorsements: { list: ["California Republican Party", "California Parents Union", "California Rifle & Pistol Association"], s: ["laistAG"] },
        args: {
          pro: [{ d: "He has a decade of experience as a city attorney litigating against state mandates he viewed as overreach, and served in the U.S. Justice Department's Civil Rights Division.", by: "LAist voter guide (record as described)", s: ["laistAG"] }],
          con: [{ d: "The record he runs on is largely resisting state housing and criminal justice law — the same laws the attorney general's office is charged with enforcing.", by: "LAist voter guide (record as described)", s: ["laistAG"] }]
        }
      }
    ]
  },

  /* ========================================= 7. INSURANCE COMMISSIONER === */
  {
    id: "insurance",
    office: "Insurance Commissioner",
    tier: "top",
    onBallot: "yes",
    decided: "final",
    important: "Two Democrats. This is the one contest on your ballot where party label tells you nothing — and the only statewide race described as genuinely competitive.",
    role: "Regulates the state's largest property and casualty insurance market, including homeowners and auto coverage, and approves or rejects the rates insurers want to charge. LAist quotes a former commissioner calling it the \"second-hardest job in the state behind the governor.\"",
    roleS: ["laistIns"],
    seatNote: "Incumbent Ricardo Lara is termed out. Both candidates who advanced from the June 2 primary are Democrats — the first time two Democrats have appeared in a general election for this office. Kim took about 27% of the primary vote and Allen about 20%.",
    seatNoteS: ["bpInsFirst", "sfStandardIns"],
    whyOnBallot: "Statewide — on every California ballot.",
    whyS: ["candlog"],
    context: "California's top-two primary sends the two highest finishers to November regardless of party, which is how a Democrat-versus-Democrat general election happens. The San Francisco Standard called this the only competitive statewide race on the ballot.",
    contextS: ["bpInsFirst", "sfStandardIns"],
    polling: { note: "No public polling of this race surfaced in this build, despite it being widely described as the most competitive statewide contest.", rows: [], s: ["sfStandardIns"] },
    candidates: [
      {
        name: "Jane Kim", slug: "kim", party: "D",
        role: "Former San Francisco supervisor; consumer advocate and attorney",
        bio: "A former San Francisco supervisor for District 6, and a consumer advocate and attorney. She is credited with securing free community college for San Francisco residents, the state's first $15 minimum wage ordinance, and a tenant-protection ordinance.",
        bioS: ["laistIns"],
        funding: { note: "No fundraising totals were captured for either candidate in this build; LAist's guide does not cover funding for this race.", s: ["laistIns"] },
        stances: [
          { i: "insurance", pos: "State-run \"natural disaster insurance for all\"", d: "Would create a state-run authority funded by premiums paid to insurance companies that would guarantee wildfire and flood coverage for every Californian.", s: ["laistIns", "sfStandardIns"] },
          { i: "consumer", pos: "Expand low-cost auto insurance to every driver", d: "Would expand the state's low-cost auto insurance program to every California driver, and tie home insurance availability to an insurer's ability to sell auto insurance in the state.", s: ["laistIns"] },
          { i: "consumer", pos: "Freeze rates on claimants; penalize delay", d: "Would freeze rates when a policyholder files a claim, penalize insurers that delay claims, and publish a public dashboard of insurers' claims records.", s: ["laistIns"] },
          { i: "climate", pos: "Require disclosure of fossil fuel financing", d: "Would require insurers to disclose whether they financially support the fossil fuel industry.", s: ["laistIns"] },
          { i: "housing", pos: "Avoid building in high-risk areas, but expects risk to spread", d: "Agrees on avoiding development in high-fire-risk areas, and adds that more areas will likely become high risk over time.", s: ["laistIns"] }
        ],
        gaps: [{ label: "Cost of the state-run program", d: "No figure was captured for what her proposed state disaster insurance authority would cost or how premiums would be set.", s: ["laistIns"] }],
        endorsements: { list: ["SEIU California", "California Teachers Association", "California Faculty Association", "California Labor Federation", "Sen. Bernie Sanders", "Working Families Party"], s: ["laistIns", "cadem"] },
        args: {
          pro: [
            { d: "Only a guaranteed, state-run disaster insurance program will keep wildfire and flood coverage available as private insurers retreat.", by: "Jane Kim (campaign position)", s: ["laistIns", "sfStandardIns"] },
            { d: "Labor backed her: SEIU California, the California Teachers Association, the California Faculty Association and the California Labor Federation endorsed her, as did Sen. Bernie Sanders and the Working Families Party.", by: "SEIU California, CTA, CFA, California Labor Federation, Bernie Sanders, Working Families Party", s: ["laistIns", "cadem"] }
          ],
          con: [
            { d: "Expanding eligibility for the low-cost auto insurance program to everyone \"could hurt the low-income drivers who really need it.\"", by: "Ben Allen", s: ["laistIns"] }
          ]
        }
      },
      {
        name: "Ben Allen", slug: "allen", party: "D",
        role: "California State Senator, District 24",
        bio: "A state senator since 2014 representing District 24. He authored the law that largely restricts plastic straws and single-use plastics, and wrote Proposition 4, the 2024 climate bond. His district was hit by the January 2025 Palisades Fire, after which he pushed bills to give the insurance department more enforcement power and to create a wildfire resilience loan program.",
        bioS: ["laistIns"],
        funding: { note: "No fundraising totals were captured for either candidate in this build.", s: ["laistIns"] },
        stances: [
          { i: "insurance", pos: "Strengthen the existing department; faster rate reviews", d: "Would add department staff to handle consumer complaints and has pledged to shorten Department of Insurance rate reviews from years to months, building on regulations that account for wildfire catastrophe modeling.", s: ["laistIns", "sfStandardIns"] },
          { i: "consumer", pos: "Real-time claim reporting; in-house consumer advocate", d: "Would require insurers to report claim delays and outstanding claims in real time after disasters and explain denials, and would appoint a consumer advocate within the department.", s: ["laistIns"] },
          { i: "insurance", pos: "More oversight of the FAIR Plan", d: "Would increase oversight of the FAIR Plan, the state's last-resort fire insurer.", s: ["laistIns"] },
          { i: "climate", pos: "Mitigation first; avoid high-risk development", d: "Focuses on mitigation and on avoiding development in high-fire-risk areas.", s: ["laistIns"] },
          { i: "consumer", pos: "Against universal low-cost auto eligibility", dir: 0, d: "Warns that expanding eligibility for the low-cost auto insurance program to everyone could hurt the low-income drivers who really need it. This is the sharpest disagreement between the two.", s: ["laistIns"] }
        ],
        gaps: [{ label: "What happens if private insurers keep withdrawing", d: "His approach strengthens the existing department rather than creating a guaranteed public program; no captured statement addresses what he would do if private coverage keeps shrinking despite faster rate reviews.", s: ["laistIns"] }],
        endorsements: { list: ["California Democratic Party", "California Environmental Voters", "California Professional Firefighters", "Sierra Club California", "San Francisco Chronicle editorial board"], s: ["laistIns", "cadem"] },
        args: {
          pro: [
            { d: "Rate reviews that take years are the bottleneck; shortening them to months and adding enforcement power fixes the market faster than building a new state authority.", by: "Ben Allen (campaign position)", s: ["laistIns", "sfStandardIns"] },
            { d: "He has a legislative record on this specific problem, including bills to expand the insurance department's enforcement power and a wildfire resilience loan program after the Palisades Fire hit his district.", by: "LAist voter guide (record as described)", s: ["laistIns"] },
            { d: "The California Democratic Party endorsed him, as did California Environmental Voters, California Professional Firefighters and Sierra Club California.", by: "California Democratic Party and listed organizations", s: ["cadem", "laistIns"] }
          ],
          con: [],
          conNote: "LAist reports no direct attacks between the two candidates; the only criticism it records runs from Allen toward Kim's auto insurance proposal, not the other way. No published criticism of Allen by Kim was captured in this build."
        }
      }
    ]
  },

  /* ================================= 8. BOARD OF EQUALIZATION, DIST. 4 === */
  {
    id: "boe4",
    office: "Member, State Board of Equalization, 4th District",
    tier: "state",
    onBallot: "yes",
    decided: "final",
    role: "A narrow but real tax office. The board advises county assessors, sets the taxable value of property owned by utilities and railroads, and hears some taxpayer appeals. Lawmakers stripped the agency of its broader authority in 2017, so it does far less than its name suggests.",
    roleS: ["laistBOE", "bpBOE"],
    seatNote: "District 4 covers Orange, Riverside, San Diego and Imperial counties. Two Orange County figures emerged from a crowded primary.",
    seatNoteS: ["bpBOE"],
    whyOnBallot: "Precinct 13099 sits in Board of Equalization District 4.",
    whyS: ["ocShapes", "bpBOE"],
    polling: {
      note: "No general-election polling surfaced. The June primary result is the only hard number available, and it was lopsided in Bilodeau's favor.",
      rows: [
        { label: "June 2026 primary (unofficial)", detail: "Bilodeau 970,842 votes (45.1%); Umberg 445,969 (20.7%)", src: ["bpBOE"] }
      ],
      method: "Secretary of State unofficial primary returns, pending certification July 10, 2026.",
      methodS: ["bpBOE"]
    },
    candidates: [
      {
        name: "Tom Umberg", slug: "umberg", party: "D",
        role: "California State Senator (District 34), termed out",
        bio: "A sitting state senator representing District 34 — the same Senate district precinct 13099 is in — who is termed out of the Legislature this year and is running for this board instead.",
        bioS: ["bpBOE", "voiceSD34"],
        funding: { raised: 2364520, approx: true, note: "≈$2.36M in contributions, per a third-party tracker. Treat as approximate and single-sourced — see the funding caveat.", s: ["bpBOE"] },
        stances: [],
        stancesNote: "No policy positions specific to the Board of Equalization were captured for either candidate in the sources reviewed. This race got very little substantive coverage.",
        stancesNoteS: ["laistBOE", "bpBOE"],
        gaps: [{ label: "Any stated agenda for this board", d: "No positions on utility and railroad property valuation, assessor guidance, or taxpayer appeals — the board's actual duties — were found for him.", s: ["laistBOE", "bpBOE"] }],
        endorsements: { list: ["SEIU California", "California Teachers Association", "Equality California"], s: ["bpBOE"] },
        args: {
          pro: [{ d: "He authored Proposition 4 on this ballot and has served in the state Senate, including as chair of a Senate committee — the more extensive public record of the two in state tax and budget matters.", by: "Ballotpedia and Secretary of State records (as described)", s: ["bpBOE", "vig"] }],
          con: [{ d: "He lost the June primary to Bilodeau by more than 24 points, 45.1% to 20.7%.", by: "Secretary of State primary returns", s: ["bpBOE"] }]
        }
      },
      {
        name: "Denis Bilodeau", slug: "bilodeau", party: "R",
        role: "Orange County Water District board member; former Orange city councilmember",
        bio: "Sits on the board of the Orange County Water District and has served as its president, and is a former Orange city councilmember. LAist's listing describes his ballot designation as Taxpayer Association president and Orange city council member — the sources differ on how to describe him.",
        bioS: ["laistBOE", "bpBOE"],
        funding: { raised: 75850, approx: true, note: "≈$75,850 in contributions plus $100,000 in loans, per a third-party tracker — roughly a thirtieth of Umberg's reported contributions. Treat as approximate and single-sourced.", s: ["bpBOE"] },
        stances: [],
        stancesNote: "No policy positions specific to the Board of Equalization were captured.",
        stancesNoteS: ["laistBOE", "bpBOE"],
        gaps: [{ label: "Any stated agenda for this board", d: "No positions on the board's actual duties were found for him either.", s: ["laistBOE", "bpBOE"] }],
        endorsements: { list: ["California Republican Party", "Reform California"], s: ["bpBOE"] },
        args: {
          pro: [{ d: "He led the June primary field with 45.1% of the vote, more than double his opponent's share, and has served on a water district board including as its president.", by: "Secretary of State primary returns; Ballotpedia profile", s: ["bpBOE"] }],
          con: [{ d: "His reported contributions are roughly a thirtieth of his opponent's, and he has relied partly on $100,000 in loans.", by: "Third-party campaign finance tracker cited by Ballotpedia", s: ["bpBOE"] }]
        }
      }
    ]
  },

  /* ============================ 9. SUPERINTENDENT OF PUBLIC INSTRUCTION = */
  {
    id: "spi",
    office: "Superintendent of Public Instruction",
    tier: "nonpartisan",
    onBallot: "yes",
    decided: "final",
    important: "This office is about to change shape. Starting in 2027 a governor-appointed education commissioner runs the Department of Education, and many of the superintendent's duties move to the state school board.",
    role: "A nonpartisan statewide office whose formal power is limited — CalMatters notes \"local school districts in California largely control their own budgets and curriculum decisions.\" A new law shifts authority further: from 2027 a governor-appointed education commissioner will run the Department of Education. What remains is a statewide platform affecting nearly 6 million public school students.",
    roleS: ["cmSPI"],
    seatNote: "Open seat. Both candidates advanced from the June 2 primary. The office is formally nonpartisan, but the two candidates' endorsements fall cleanly along party lines.",
    seatNoteS: ["cmSPI"],
    whyOnBallot: "Statewide — on every California ballot.",
    whyS: ["candlog"],
    polling: { note: "No public polling of this race surfaced in this build.", rows: [], s: [] },
    candidates: [
      {
        name: "Richard Barrera", slug: "barrera",
        role: "President, San Diego Unified school board",
        bio: "President of the San Diego Unified school board, and, as CalMatters puts it, \"little known outside San Diego\" until he won the California Teachers Association endorsement. He calls himself a Sacramento outsider.",
        bioS: ["cmSPI"],
        funding: { note: "CalMatters includes campaign finance and outside spending sections for this race, but no dollar figures were retrievable for this build.", s: ["cmSPI"] },
        stances: [
          { i: "education", pos: "More school funding; early childhood; easier path to teaching", d: "Focuses on boosting school funding, early childhood education, and easing the path to becoming a teacher.", s: ["cmSPI"] }
        ],
        gaps: [{ label: "The 2027 restructuring", d: "No statement was captured on how he would operate once a governor-appointed commissioner takes over the department in 2027 — the central fact about the job he is seeking.", s: ["cmSPI"] }],
        endorsements: { list: ["California Teachers Association", "United Domestic Workers", "California Charter School Advocates"], s: ["cmSPI"] },
        args: {
          pro: [{ d: "He runs a large urban school board and is backed by the state's largest teachers union along with charter school advocates — an unusual pairing.", by: "California Teachers Association and California Charter School Advocates", s: ["cmSPI"] }],
          con: [],
          conNote: "CalMatters lists no criticisms of Barrera, and none were found elsewhere in this build."
        }
      },
      {
        name: "Sonja Shaw", slug: "shaw-sonja",
        role: "President, Chino Valley school board",
        bio: "President of the Chino Valley School Board. In 2023 she presided over a meeting where then-State Superintendent Tony Thurmond was escorted out during a debate over transgender student rights.",
        bioS: ["cmSPI"],
        funding: { note: "No dollar figures were retrievable for this build.", s: ["cmSPI"] },
        stances: [
          { i: "education", pos: "Back to academic basics; against transgender student protections", d: "An outspoken opponent of protections for transgender students. Supports moving away from what she calls radical ideologies in classrooms and returning to academic basics.", s: ["cmSPI"] }
        ],
        gaps: [{ label: "School funding and the teacher pipeline", d: "No positions were captured on school funding levels, early childhood education or teacher recruitment — the areas her opponent centers.", s: ["cmSPI"] }],
        endorsements: { list: ["California Republican Party", "Moms for Liberty", "California Rifle and Pistol Association"], s: ["cmSPI"] },
        args: {
          pro: [{ d: "She argues classrooms should return to academic basics and move away from what she describes as radical ideologies.", by: "Sonja Shaw (campaign position)", s: ["cmSPI"] }],
          con: [{ d: "CalMatters presents her opposition to transgender student protections, and the 2023 meeting where the sitting state superintendent was escorted out, as the controversies defining her candidacy.", by: "CalMatters voter guide", s: ["cmSPI"] }]
        }
      }
    ]
  },

  /* ============================================ 10. U.S. HOUSE, CA-45 === */
  {
    id: "ca45",
    office: "U.S. Representative, 45th District",
    tier: "top",
    onBallot: "yes",
    decided: "final",
    role: "One of 435 seats in the U.S. House. Representatives write and vote on federal law, originate all revenue bills, control federal spending, and the House alone holds the power of impeachment. Terms are two years, so this seat is on the ballot every cycle.",
    roleS: ["bpCA45"],
    seatNote: "Derek Tran is the Democratic incumbent, elected in 2024. These are new district lines: redistricting after Proposition 50 changed the 45th's boundaries from the ones used in 2024, so this is not the same electorate that elected him.",
    seatNoteS: ["bpNews45", "bpCA45"],
    whyOnBallot: "Precinct 13099 sits inside the redrawn 45th Congressional District.",
    whyS: ["ocShapes", "bpNews45"],
    polling: {
      note: "No district-level horserace poll surfaced. What exists are forecaster ratings and a model estimate — weaker evidence than a poll, and labeled as such.",
      rows: [
        { label: "Forecaster ratings, as of August 2026", detail: "Rated Likely Democratic, Lean Democratic, or Tilt Democratic by major forecasters", src: ["bpCA45"] },
        { label: "Primary result, June 2026", detail: "Tran 52.5%; Vo and four other Republicans took a combined 47.5%", src: ["bpCA45"] }
      ],
      method: "Forecaster ratings compiled by Ballotpedia, plus certified primary returns. Note that the primary result is not a head-to-head: the Republican vote was split five ways.",
      methodS: ["bpCA45"]
    },
    candidates: [
      {
        name: "Derek Tran", slug: "tran", party: "D", incumbent: true,
        role: "U.S. Representative since 2025; attorney and U.S. Army veteran",
        bio: "Won this seat in 2024. An attorney and Army veteran, and the son of Vietnamese refugees.",
        bioS: ["bpCA45", "bpNews45"],
        funding: { raised: 4980000, approx: true, note: "$4.98M raised as of June 30, 2026, per Ballotpedia; a separate tracker lists $6.0M from FEC filings through a later date. Roughly ten times his opponent's total either way. Treat the exact figure as approximate — see the funding caveat.", s: ["bpCA45"] },
        stances: [],
        stancesNote: "No issue-by-issue positions for this race were captured in the sources reviewed for this build. This is a real gap: the research for this guide reached the official candidate list, Ballotpedia and district reporting, but not a questionnaire or voter guide covering his 2026 platform.",
        stancesNoteS: ["bpCA45", "bpNews45"],
        gaps: [{ label: "A captured 2026 platform", d: "This build did not locate a published issue questionnaire or detailed platform for either candidate in this race. The gap is in this guide's research, not necessarily in the campaigns.", s: ["bpCA45"] }],
        endorsements: { list: [], note: "No endorsement list was captured for this race in this build.", s: [] },
        args: {
          pro: [{ d: "He is the incumbent, led the June primary with 52.5% against a five-way Republican field, has raised roughly ten times his opponent's total, and every major forecaster rates the seat as favoring him.", by: "Ballotpedia race summary and forecaster ratings", s: ["bpCA45"] }],
          con: [],
          conNote: "No published criticism of Tran in this race was captured in this build."
        }
      },
      {
        name: "Chuong V. Vo", slug: "vo", party: "R",
        role: "Retired Torrance police officer; former Cerritos city councilmember",
        bio: "A retired Torrance police officer and former Cerritos City Council member.",
        bioS: ["bpCA45"],
        funding: { raised: 496000, approx: true, note: "$496,000 raised as of June 30, 2026, per Ballotpedia; a separate tracker lists $937,000 from FEC filings through a later date. Treat as approximate.", s: ["bpCA45"] },
        stances: [],
        stancesNote: "No issue-by-issue positions for this race were captured in the sources reviewed.",
        stancesNoteS: ["bpCA45"],
        gaps: [{ label: "A captured 2026 platform", d: "As with his opponent, no published issue questionnaire or detailed platform was located for this build.", s: ["bpCA45"] }],
        endorsements: { list: [], note: "No endorsement list was captured for this race in this build.", s: [] },
        args: {
          pro: [{ d: "He brings law enforcement and city council experience, and runs in a district whose lines were redrawn after 2024, so the incumbent faces a different electorate.", by: "Ballotpedia profile and redistricting reporting", s: ["bpCA45", "bpNews45"] }],
          con: [{ d: "He took a fraction of the June primary vote in a five-way Republican field and has raised roughly a tenth of the incumbent's money.", by: "Ballotpedia race summary", s: ["bpCA45"] }]
        }
      }
    ]
  },

  /* ========================================== 11. STATE SENATE, SD-34 === */
  {
    id: "sd34",
    office: "State Senator, 34th District",
    tier: "state",
    onBallot: "yes",
    decided: "final",
    role: "One of 40 seats in the California State Senate. Senators write state law, pass the state budget, and confirm the governor's appointees. Senate terms are four years.",
    roleS: ["voiceSD34"],
    seatNote: "Open seat — incumbent Tom Umberg is termed out and is running for the Board of Equalization, also on your ballot.",
    seatNoteS: ["voiceSD34", "bpBOE"],
    whyOnBallot: "Precinct 13099 sits in State Senate District 34.",
    whyS: ["ocShapes"],
    polling: {
      note: "No general-election polling surfaced. The primary margin is the only number available.",
      rows: [
        { label: "June 2026 primary (early count)", detail: "Valencia about 63%; Shader about 37%", src: ["voiceSD34"] }
      ],
      method: "Voice of OC's primary-night tally from Secretary of State initial counts, taken at 8:25 p.m. — an early count, so the final primary margin may differ.",
      methodS: ["voiceSD34"]
    },
    candidates: [
      {
        name: "Avelino Valencia", slug: "valencia", party: "D",
        role: "California State Assemblymember (68th District)",
        bio: "A sitting assemblymember representing the 68th District, running for this open Senate seat. The Secretary of State's certified list gives his ballot designation as California Assemblymember.",
        bioS: ["sosCertList", "voiceSD34"],
        funding: { note: "No fundraising figures for this race were captured in this build.", s: ["voiceSD34"] },
        stances: [],
        stancesNote: "No issue-by-issue positions for this race were captured in the sources reviewed.",
        stancesNoteS: ["voiceSD34"],
        gaps: [{ label: "A captured platform for this race", d: "No published questionnaire or issue platform was located for either candidate in this contest.", s: ["voiceSD34"] }],
        endorsements: { list: [], note: "No endorsement list was captured for this race in this build.", s: [] },
        args: {
          pro: [{ d: "He led the June primary by roughly 63% to 37% and already serves in the Legislature's lower house.", by: "Voice of OC primary tally; Secretary of State certified list", s: ["voiceSD34", "sosCertList"] }],
          con: [],
          conNote: "No published criticism of Valencia in this race was captured in this build."
        }
      },
      {
        name: "Rhonda Shader", slug: "shader", party: "R",
        role: "Former mayor of Placentia; small business owner",
        bio: "A former Placentia mayor. The Secretary of State's certified list gives her ballot designation as local small businesswoman.",
        bioS: ["sosCertList", "voiceSD34"],
        funding: { note: "No fundraising figures for this race were captured in this build.", s: ["voiceSD34"] },
        stances: [],
        stancesNote: "No issue-by-issue positions for this race were captured in the sources reviewed.",
        stancesNoteS: ["voiceSD34"],
        gaps: [{ label: "A captured platform for this race", d: "No published questionnaire or issue platform was located.", s: ["voiceSD34"] }],
        endorsements: { list: [], note: "No endorsement list was captured for this race in this build.", s: [] },
        args: {
          pro: [{ d: "She has served as mayor of Placentia, giving her executive experience in a city inside this district.", by: "Voice of OC and Secretary of State certified list (record as described)", s: ["voiceSD34", "sosCertList"] }],
          con: [{ d: "She trailed by roughly 26 points in the June primary.", by: "Voice of OC primary tally", s: ["voiceSD34"] }]
        }
      }
    ]
  },

  /* ======================================== 12. STATE ASSEMBLY, AD-59 === */
  {
    id: "ad59",
    office: "Member of the State Assembly, 59th District",
    tier: "state",
    onBallot: "yes",
    decided: "final",
    important: "There is no Democrat in this race. The top-two primary sent a Republican and a Green Party candidate to November, so a registered Democrat's choice here is between those two or leaving it blank.",
    role: "One of 80 seats in the California State Assembly. Assemblymembers write state law and pass the budget; all revenue bills must originate in the Assembly. Terms are two years.",
    roleS: ["ballotbook59"],
    seatNote: "Incumbent Republican Phillip Chen is seeking re-election. His only opponent is a Green Party nominee — one of the very few minor-party candidates to reach a California general election this cycle.",
    seatNoteS: ["candlog", "bpHernandez"],
    whyOnBallot: "Precinct 13099 sits in Assembly District 59.",
    whyS: ["ocShapes"],
    context: "California's top-two primary advances the two highest finishers regardless of party. In this district no Democrat finished in the top two, which is why the general election has no Democratic option.",
    contextS: ["candlog", "ballotbook59"],
    polling: {
      note: "No general-election polling surfaced. The primary was lopsided.",
      rows: [
        { label: "June 2, 2026 primary", detail: "Chen 66.3%; Hernandez 33.7%", src: ["ballotbook59"] }
      ],
      method: "The Ballot Book's compilation of certified primary returns.",
      methodS: ["ballotbook59"]
    },
    candidates: [
      {
        name: "Phillip Chen", slug: "chen", party: "R", incumbent: true,
        role: "California State Assemblymember, 59th District",
        bio: "The incumbent assemblymember for this district. One tracker credits him as lead author of 35 bills in the 2025–2026 session, seven of which were signed into law.",
        bioS: ["candlog", "ballotbook59"],
        funding: { note: "No fundraising figures for this race were captured in this build.", s: ["ballotbook59"] },
        stances: [],
        stancesNote: "No issue-by-issue positions for this race were captured in the sources reviewed.",
        stancesNoteS: ["ballotbook59"],
        gaps: [{ label: "A captured platform for this race", d: "No published questionnaire or issue platform was located for either candidate in this contest.", s: ["ballotbook59"] }],
        endorsements: { list: [], note: "No endorsement list was captured for this race in this build.", s: [] },
        args: {
          pro: [{ d: "He won the June primary with 66.3% and was lead author of 35 bills in the 2025–2026 session, seven of them signed into law.", by: "The Ballot Book compilation", s: ["ballotbook59"] }],
          con: [{ d: "IJ Action recommended voting against him, citing his voting record, and graded him an F.", by: "IJ Action", s: ["ijAction59"] }]
        }
      },
      {
        name: "Victor Hernandez", slug: "hernandez", party: "G",
        partyLean: "Green Party",
        role: "Account sales manager, Brea",
        bio: "A Green Party candidate and account sales manager from Brea. He has not previously served in the California Legislature or Congress.",
        bioS: ["bpHernandez"],
        funding: { note: "No fundraising figures for this race were captured in this build.", s: ["bpHernandez"] },
        stances: [],
        stancesNote: "No issue-by-issue positions for this race were captured in the sources reviewed.",
        stancesNoteS: ["bpHernandez"],
        gaps: [{ label: "A captured platform for this race", d: "No published questionnaire or issue platform was located.", s: ["bpHernandez"] }],
        endorsements: { list: ["IJ Action"], s: ["ijAction59"] },
        args: {
          pro: [{ d: "IJ Action recommended him over the incumbent, citing the incumbent's voting record.", by: "IJ Action", s: ["ijAction59"] }],
          con: [{ d: "He took 33.7% in the June primary and has never held legislative office.", by: "The Ballot Book compilation; Ballotpedia profile", s: ["ballotbook59", "bpHernandez"] }]
        }
      }
    ]
  },

  /* ===================================== 13. COUNTY SUPERVISOR, DIST 4 == */
  {
    id: "sup4",
    office: "Orange County Supervisor, 4th District",
    tier: "nonpartisan",
    onBallot: "yes",
    decided: "final",
    important: "The most consequential local office on your ballot. One of five supervisors controlling roughly $11 billion in annual county spending.",
    role: "Adopts the county's annual budget, covering about $11 billion in yearly spending, and oversees departments including the Health Care Agency and Public Works. Sets policy for jails, juvenile halls, foster care and the Sheriff's Department, and sits on boards such as CalOptima and the Orange County Transportation Authority. Acts as the city council for unincorporated areas. Has little say over housing and development inside the county's 34 incorporated cities — including Fullerton.",
    roleS: ["laistSup4"],
    seatNote: "Open seat — incumbent Doug Chaffee is not on the ballot. The office is formally nonpartisan, but the runoff sorts almost entirely along party lines. Traut finished first in the June primary with about 33.3% to Shaw's 31.3%; Shaw led on election night before late mail ballots moved Traut ahead in the certified count.",
    seatNoteS: ["laistSup4", "voiceSup", "candlog"],
    whyOnBallot: "Precinct 13099 sits in Supervisorial District 4.",
    whyS: ["ocShapes", "candlog"],
    polling: {
      note: "No general-election polling surfaced. The primary was effectively a tie, which makes this the closest contest on your ballot.",
      rows: [
        { label: "June 2026 primary (certified)", detail: "Traut about 33.3%; Shaw about 31.3% — Shaw led on election night until late mail ballots were counted", src: ["voiceSup"] }
      ],
      method: "Voice of OC's reporting on the certified primary count.",
      methodS: ["voiceSup"]
    },
    candidates: [
      {
        name: "Connor Traut", slug: "traut",
        partyLean: "Democrat",
        role: "Mayor of Buena Park; attorney",
        bio: "On the Buena Park City Council since 2018 and currently mayor. Served on the Centralia Elementary School District board from 2014 to 2018 and works as an attorney at his family's personal injury firm.",
        bioS: ["laistSup4"],
        funding: { raised: 116687, note: "$116,687 raised in the reporting period covered, against his opponent's $29,469 — roughly four to one. Labor unions are supporting his campaign.", s: ["liberalOC", "laistSup4"] },
        stances: [
          { i: "affordability", pos: "Lower housing and health care costs", d: "Centers lowering housing and health care costs.", s: ["laistSup4"] },
          { i: "housing", pos: "Senior and workforce housing near jobs and transit", d: "Would build senior and workforce housing near jobs and transit, and expand housing vouchers and accessory dwelling units. Supports tenant protections and code enforcement against landlords.", s: ["laistSup4"] },
          { i: "transport", pos: "More Measure M road money for District 4", d: "Wants a larger share of Measure M road funding directed to District 4.", s: ["laistSup4"] },
          { i: "healthcare", pos: "More staff to keep people enrolled in CalOptima", d: "Would add staff to keep residents enrolled in CalOptima, the county's public health plan.", s: ["laistSup4"] }
        ],
        gaps: [{ label: "Homelessness approach", d: "No position on homelessness was captured for him, though his opponent has a stated approach.", s: ["laistSup4"] }],
        endorsements: { list: ["Orange County Democratic Party", "Buena Park Police Association", "National Union of Healthcare Workers", "Supervisor Doug Chaffee", "Supervisor Katrina Foley", "Supervisor Vicente Sarmiento"], s: ["laistSup4", "voiceSup"] },
        args: {
          pro: [
            { d: "Three sitting supervisors — Chaffee, Foley and Sarmiento — endorsed him, along with the Buena Park Police Association and the National Union of Healthcare Workers.", by: "Supervisors Chaffee, Foley and Sarmiento; Buena Park Police Association; NUHW", s: ["laistSup4"] },
            { d: "He outraised his opponent roughly four to one, $116,687 to $29,469.", by: "The Liberal OC, reporting campaign finance filings", s: ["liberalOC"] }
          ],
          con: [{ d: "LAist's profile notes a controversy of his own: a complaint he made about a Buena Park police chaplain.", by: "LAist voter guide", s: ["laistSup4"] }]
        }
      },
      {
        name: "Tim Shaw", slug: "shaw-tim",
        partyLean: "Republican",
        role: "Orange County Board of Education trustee; former La Habra councilmember",
        bio: "Three and a half terms on the La Habra City Council and one and a half on the Orange County Board of Education, where he is in his second term. He works as government affairs director for the Pacific West Association of Realtors and teaches political science at Rio Hondo College. He lost the 2018 supervisor race to Doug Chaffee, so this is his second run for the seat.",
        bioS: ["laistSup4", "voiceSup"],
        funding: { raised: 29469, note: "$29,469 raised in the reporting period covered, against his opponent's $116,687.", s: ["liberalOC"] },
        stances: [
          { i: "publicsafety", pos: "Fund public safety first", d: "A fiscal conservative focused on public safety, transportation infrastructure and school choice. On the budget, he says to fund public safety first and \"trim the sails\" elsewhere.", s: ["laistSup4"] },
          { i: "housing", pos: "Local control, with density near transit", d: "Supports local control on housing, but says high-density housing can work near transit.", s: ["laistSup4"] },
          { i: "homeless", pos: "Treatment-first; audit what works", d: "Would emphasize mental health and substance abuse treatment and review which homeless-services funding is actually working.", s: ["laistSup4"] },
          { i: "education", pos: "School choice", d: "Names school choice among his priorities.", s: ["laistSup4"] }
        ],
        notice: {
          title: "A connection worth knowing about",
          d: "Shaw worked for Supervisor Janet Nguyen and under her chief of staff, Andrew Do, who later pleaded guilty to a felony bribery charge. Asked about it, Shaw said he \"never saw one single thing that seemed fishy to me.\" He has not been accused of wrongdoing; this is reported because it is in his record, not as an allegation against him.",
          s: ["laistSup4"]
        },
        gaps: [{ label: "LAist's candidate survey", d: "He did not answer LAist's written candidate survey, though he did give an interview. His opponent's survey answers are therefore more complete on the record.", s: ["laistSup4"] }],
        endorsements: { list: ["Republican Party of Orange County", "California Republican Assembly", "Rep. Young Kim", "Supervisor Don Wagner", "Sheriff Don Barnes", "Fullerton Mayor Fred Jung", "OCTax PAC (Orange County Taxpayers Association)"], s: ["laistSup4", "ocIndShaw"] },
        args: {
          pro: [
            { d: "Fullerton Mayor Fred Jung — who ran against Shaw in the June primary — endorsed him afterward, as did OCTax PAC, the Orange County Taxpayers Association's political arm.", by: "Fullerton Mayor Fred Jung; OCTax PAC", s: ["ocIndShaw"] },
            { d: "Sheriff Don Barnes, Rep. Young Kim and Supervisor Don Wagner endorsed him, and he has held local office across three and a half council terms plus the county Board of Education.", by: "Sheriff Don Barnes; Rep. Young Kim; Supervisor Don Wagner", s: ["laistSup4"] }
          ],
          con: [
            { d: "He worked under Andrew Do, who later pleaded guilty to felony bribery, and said he \"never saw one single thing that seemed fishy to me.\"", by: "LAist voter guide", s: ["laistSup4"] },
            { d: "He declined LAist's written candidate survey, and was outraised roughly four to one.", by: "LAist voter guide; The Liberal OC", s: ["laistSup4", "liberalOC"] }
          ]
        }
      }
    ]
  }
];

/* -------------------------------------------------------------- PROPS */
/* The 14 statewide propositions. "pro" and "con" points are the headline
   claims of the official arguments printed in the Secretary of State's
   Voter Information Guide, in the proponents' and opponents' own words,
   with the people who signed each argument listed beside them.          */
const PROPS = [
  {
    num: "1",
    short: "An $11.25 billion housing bond",
    title: "AUTHORIZES BONDS FOR HOUSING AFFORDABILITY PROGRAMS.",
    kind: "Legislative Statute",
    does: "Lets the state borrow $11.25 billion by selling general obligation bonds for housing: $10 billion for state housing programs repaid out of the General Fund, plus $1.25 billion for veterans' home loans repaid by veterans' own loan payments.", doesS: ["vig"],
    passIf: "The state starts borrowing and spending the money — about $7.2 billion of it to acquire, build or renovate rental housing, with the rest spread across homeownership help, veterans' loans, farmworker and student housing, and local programs. Repayment comes out of the General Fund, the same account that pays for schools, health care and prisons, at roughly $500–600 million a year for about 25 years. No tax is raised to pay for it.", passIfS: ["vig"],
    failIf: "The state does not borrow the money and these housing programs get no new bond funding.", failIfS: ["vig"],
    fiscal: "Increased state cost of $500 million to $600 million annually for about 25 years to repay the housing bond.", fiscalS: ["vig"],
    money: "Building a Better California registered in support. No total was reported for this measure in the coverage reviewed.", moneyS: ["sosContribs", "bpMoney"],
    pro: { points: ["YES ON PROP. 1: AFFORDABLE HOMES FOR VETERANS, SENIORS, PEOPLE WITH DISABILITIES AND WORKING FAMILIES—WITHOUT RAISING TAXES", "PROP. 1 HONORS OUR VETERANS", "PROP. 1 BUILDS HOMES LOW- AND MIDDLE-INCOME FAMILIES CAN AFFORD", "NO NEW TAXES—STRICT ACCOUNTABILITY AND TRANSPARENCY", "PROP. 1 HELPS SENIORS, VETERANS & OUR MOST VULNERABLE", "PROP. 1 INVESTS IN COMMUNITIES & ESSENTIAL WORKERS", "YES ON PROP. 1: SUPPORTED BY VETERANS, SENIORS, TEACHERS, FIREFIGHTERS, AND AFFORDABLE HOUSING ADVOCATES"], signers: ["Anni Chung, President — Self-Help for the Elderly", "Jeffery Freitas, President — California Federation of Teachers", "John H. Ing, Chief Financial Officer — US Vets"], s: ["vig"] },
    con: { none: true, note: "No argument against this measure was submitted for the official Voter Information Guide. The guide prints \u201cNO ARGUMENT AGAINST PROPOSITION 1 WAS SUBMITTED.\u201d That is not the same as nobody opposing it \u2014 it means no opponent filed an argument by the deadline.", points: [], signers: [], s: ["vig"] },
    rebuttals: { hasFavor: false, hasAgainst: false, s: ["vig"] }
  },
  {
    num: "2",
    short: "A bigger rainy day fund",
    title: "INCREASES STATE’S RAINY DAY FUND.",
    kind: "Legislative Constitutional Amendment",
    does: "Requires the state to keep saving into its rainy day fund until the fund reaches 20% of General Fund taxes instead of today's 10%, with extra-large deposits in boom years, and extends required extra debt payments from 2030 out to 2040.", doesS: ["vig"],
    passIf: "The state saves more and pays down debt for longer. Deposits stop counting toward the state appropriations limit, and the money set aside for extra debt payments can also be used to make required payments to schools and community colleges and to repay state and federal borrowing. Reserves go up, which means less money available to spend in any given budget year.", passIfS: ["vig"],
    failIf: "The savings target stays at 10% and the extra debt payments end in 2030.", failIfS: ["vig"],
    fiscal: "State budget reserves would be higher.", fiscalS: ["vig"],
    money: "No primary ballot measure committee registered either to support or to oppose this measure.", moneyS: ["sosContribs", "bpMoney"],
    pro: { points: ["VOTE YES ON PROPOSITION 2 TO PROTECT SCHOOLS, HEALTHCARE, PUBLIC SAFETY AND CALIFORNIA’S FINANCIAL FUTURE.", "STOP SACRAMENTO POLITICIANS FROM OVERSPENDING", "GUARANTEE EDUCATION FUNDING IS PROTECTED IN THE STATE CONSTITUTION"], signers: ["Darrell Roberts, President — California Professional Firefighters", "Jesse Gabriel, Chair — California State Assembly Budget Committee", "Maria S. Salinas, CEO — Los Angeles Area Chamber of Commerce"], s: ["vig"] },
    con: { points: ["PROP. 2 CREATES A SLUSH FUND FOR SACRAMENTO POLITICIANS", "PROP. 2 CANCELS YOUR TAX REBATE", "PROP. 2 ALLOWS FOR MORE WASTEFUL SPENDING", "PROP. 2 MAKES OUR BUDGET MORE VOLATILE", "PROP. 2 IS OPPOSED BY TRUSTED BUDGET WATCHDOGS"], signers: ["David Tangipa, Vice Chair — Assembly Budget Committee", "Steven Choi, Vice Chair — Senate Elections and Constitutional Amendment", "Committee", "Carl DeMaio, Chairman — Reform California"], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  },
  {
    num: "3",
    short: "Makes the Prop 30 high-income tax permanent",
    title: "PROVIDES PERMANENT FUNDING FOR SCHOOLS AND HEALTH CARE BY EXTENDING EXISTING TAX ON HIGH INCOMES.",
    kind: "Initiative Constitutional Amendment",
    does: "Makes the higher income tax rates on high earners, first established by Proposition 30, permanent instead of letting them expire in 2031.", doesS: ["vig"],
    passIf: "Nothing changes for any taxpayer right now — the rates already in effect simply never expire. The state keeps $5 billion to $15 billion a year in revenue it would otherwise lose in 2031. Roughly 40% of that flows to schools and community colleges under the state's school funding guarantee, with the rest going to other state programs.", passIfS: ["vig"],
    failIf: "The higher rates expire as scheduled in 2031 and the state loses that revenue from then on.", failIfS: ["vig"],
    fiscal: "Maintains $5 billion to $15 billion of annual state income tax revenue by making a temporary tax increase on high-income earners permanent instead of letting it expire in 2031.", fiscalS: ["vig"],
    money: "Support: more than $74.8 million across 7 committees. Opposition: $5,500 from one committee — one of the most lopsided funding gaps on the ballot.", moneyS: ["sosContribs", "bpMoney"],
    pro: { points: ["PROPOSITION 3 PROTECTS OUR SCHOOLS, HEALTHCARE AND OUR COMMUNITIES WITHOUT RAISING YOUR TAXES.", "PROP. 3 PREVENTS BILLIONS IN CUTS TO OUR SCHOOLS AND HEALTHCARE.", "PROP. 3 ONLY EXTENDS THE CURRENT TAX RATES ON THE WEALTHIEST TOP 2%.", "GUARANTEES THE MONEY REACHES THE CLASSROOM— NOT SACRAMENTO.", "PROP. 3 SECURES OUR CHILDREN’S FUTURE.", "PROP. 3 IS SUPPORTED BY TEACHERS, NURSES, AND HEALTHCARE WORKERS."], signers: ["David Goldberg, President — California Teachers Association", "Katie Nilsson, RN, President — California School Nurses Organization", "Jodi Hicks, President — Planned Parenthood Affiliates of California"], s: ["vig"] },
    con: { points: ["PROP. 3—TURNS “TEMPORARY” TAXES INTO PERMANENT HIGHER INCOME TAXES", "PROP. 3—HIGHER INCOME TAXES = HIGHER COST OF LIVING", "PROP. 3—VOTERS DESERVE REAL RESULTS, NOT BROKEN PROMISES", "NO ON PROP. 3—STOP WASTEFUL SPENDING", "NO ON PROP. 3—FIX SACRAMENTO’S SPENDING PROBLEM BEFORE RAISING TAXES", "STOP WASTEFUL SPENDING. NO NEW TAXES. NO ON PROP. 3."], signers: ["Robert Gutierrez, President — California Taxpayers Association", "Robert Rivinius, President — Family Business Association of California", "Julian Canete, President — California Hispanic Chambers of Commerce"], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  },
  {
    num: "4",
    short: "Allows publicly funded campaigns",
    title: "REPEALS PROHIBITION AGAINST PUBLIC FUNDING OF ELECTION CAMPAIGNS.",
    kind: "Legislative Statute",
    does: "Repeals the existing ban on using public money to pay for political candidates' campaigns, which lets state and local governments create public campaign financing programs later if they choose. It does not create any such program itself.", doesS: ["vig"],
    passIf: "The ban lifts, and nothing else happens automatically. No public financing program exists the day after. State and local governments may each decide whether to build one. The measure sets outer limits for any future program: money meant for education, transportation or public safety cannot be used; candidates must show broad-based support in their district and accept spending limits; and public funds cannot pay legal defense fees. The Fair Political Practices Commission would spend a few hundred thousand dollars a year answering questions about such programs.", passIfS: ["vig"],
    failIf: "The ban stays, and no California government can create a public campaign financing program.", failIfS: ["vig"],
    fiscal: "Ongoing costs to the state of a few hundred thousand dollars each year for the Fair Political Practices Commission to answer questions from state and local governments about public campaign finance programs.", fiscalS: ["vig"],
    money: "No funding total for this measure was captured in this build.", moneyS: ["sosContribs", "bpMoney"],
    pro: { points: ["YES ON PROPOSITION 4, THE CALIFORNIA FAIR ELECTIONS ACT: ELECTIONS SHOULD BE WON, NOT BOUGHT", "PROP. 4 HELPS QUALIFIED CANDIDATES COMPETE", "PROP. 4 CHANGES THE WAY WE FINANCE ELECTION CAMPAIGNS", "PROP. 4 BUILDS ON A PROVEN MODEL", "PROP. 4 GIVES LOCAL COMMUNITIES A CHOICE", "PROP. 4 PROTECTS TAXPAYERS", "PROP. 4 CRACKS DOWN ON ILLEGAL FOREIGN MONEY", "PROP. 4 IS SUPPORTED BY LEADERS ACROSS CALIFORNIA", "PROP. 4 GIVES CALIFORNIANS THE OPPORTUNITY TO RECLAIM THEIR ELECTIONS"], signers: ["Lorrel Plimier, Co-President — League of Women Voters of California", "Catherine Kennedy, President — California Nurses Association", "Tom Umberg, California State Senator"], s: ["vig"] },
    con: { points: ["Prop. 4 repeals a voter-approved law that prohibits politicians from using public taxpayer funds for their own campaigns", "There is no limit on the number of candidates who can receive taxpayer money and no limit on how much they can get — “Proposition 4 is a BLANK CHECK”", "There is no limit on how much they can spend either: more negative ads, more junk mail, more text messages", "It is so poorly written it could allow every state or local “candidate” to get public funding without even qualifying for the ballot, including candidates for county political party committees", "It claims to require “strict criteria” but gives no details — and no current statute, ordinance or charter sets any criteria, so the same politicians seeking the funds would set them", "It does not get rid of special interest money: under Prop. 4 candidates can raise money from special interests AND receive public funding too", "Opposed by the California Taxpayers Association, the Howard Jarvis Taxpayers Association, the Family Business Association of California, United Latinos Action and former members of the Fair Political Practices Commission"], signers: ["Dan Schnur, Former Chair — Fair Political Practices Commission", "Colleen McAndrews, Former Commissioner — Fair Political Practices Commission", "Julian Canete, President — California Hispanic Chambers of Commerce"], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  },
  {
    num: "5",
    short: "Removes the replacement question from recalls",
    title: "CHANGES RECALL ELECTION PROCESS FOR STATEWIDE OFFICERS.",
    kind: "Legislative Constitutional Amendment",
    does: "Takes the second question — who should replace the official — off statewide recall ballots. Voters would decide only whether to remove the officeholder.", doesS: ["vig"],
    passIf: "A recall becomes a single yes-or-no vote on removal. If a majority votes yes, the office becomes vacant and is filled by the ordinary vacancy rules: a Senate or Assembly seat by special election, most other statewide offices by the governor's appointment. If the governor is recalled, the lieutenant governor takes over. Nobody can win an office on a recall ballot with a small plurality while the recall itself passes narrowly.", passIfS: ["vig"],
    failIf: "Recall ballots keep both questions, and a replacement can win the office with far less than a majority.", failIfS: ["vig"],
    fiscal: "Net fiscal effect unknown. Possible state and local government savings or costs of millions of dollars to administer recall elections. These costs or savings would be rare, and depend on the office recalled and how often recalls occur.", fiscalS: ["vig"],
    money: "No primary ballot measure committee registered either to support or to oppose this measure.", moneyS: ["sosContribs", "bpMoney"],
    pro: { points: ["The recall should allow removal of an official who is corrupt or abusing power, and should never be used as a tactic to ‘redo’ an election as a partisan scheme", "Linking the two questions creates a dangerous loophole: an official can be removed by a narrow majority, and a replacement can then win the office with far less than 50% of the votes cast", "The 2021 gubernatorial recall cost taxpayers more than $200 million and simply reconfirmed what voters had already decided; nearly 70% of likely voters called it a waste of taxpayer money", "Had that recall succeeded, the leading replacement candidate would have taken office with support from only about 28% of all recall voters", "Prop. 5 makes a single change — it removes the second question, and vacancies are then filled under the existing vacancy rules", "In most states with recalls, vacancies are already filled by succession or a separate election, not a same-day replacement contest"], signers: ["Lorrel Plimier, Co-President — League of Women Voters of California", "Darius L. Kemp, MPA, Executive Director — California Common Cause", "Dan Schnur, Former Chair — California Fair Political Practices Commission"], s: ["vig"] },
    con: { points: ["Prop. 5 keeps the removal question but eliminates your ability to vote for a replacement — in many cases politicians, not voters, would choose who fills the vacancy", "In other cases the seat would sit vacant until another costly election months later, funded by taxpayers", "The official you just removed would be allowed to run in that next election to regain the seat", "For over 100 years the current process has let voters, not politicians, choose the replacement — why fix a system that isn’t broken?", "The author of the proposal was himself recalled by California voters after voting to raise gas taxes having promised not to, and now wants to rewrite the rules"], signers: ["Brian W. Jones, Senate Minority Leader", "Joe Patterson, Assemblymember"], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  },
  {
    num: "37",
    short: "$25 billion in down payment loans for middle-income buyers",
    title: "CREATES LOAN PROGRAM FOR MIDDLE-INCOME BUYERS OF QUALIFIED NEW HOMES.",
    kind: "Initiative Statute",
    does: "Lets CalHFA, the state housing finance agency, sell up to $25 billion in revenue bonds to fund a “middle-class homeownership loan” covering up to 17% of a home's price for qualifying buyers of qualifying new homes.", doesS: ["vig"],
    passIf: "CalHFA decides how much of the $25 billion to issue and when. Buyers put down at least 3% themselves, borrow up to 17% more through the program, and their monthly payments repay the bonds and the program's administrative costs. Eligibility is capped: a buyer must be a California resident with household income no more than double the typical income for their area. Because buyers repay the bonds, the Legislative Analyst finds no direct state or local cost.", passIfS: ["vig"],
    failIf: "No such loan program is created.", failIfS: ["vig"],
    fiscal: "No direct state or local costs.", fiscalS: ["vig"],
    money: "Building a Better California registered in support. No total was reported for this measure in the coverage reviewed.", moneyS: ["sosContribs", "bpMoney"],
    pro: { points: ["COST TO TAXPAYERS.", "KEEPING HOMEOWNERSHIP WITHIN REACH.", "BUILDS MORE HOMES, CREATES GOOD JOBS.", "ZERO COST TO TAXPAYERS.", "STRICT ACCOUNTABILITY AND CONSUMER PROTECTIONS.", "BROAD, BIPARTISAN SUPPORT"], signers: ["Danny Curtin, Director — California Conference of Carpenters", "Fiona Ma, Boardmember — California Housing Finance Agency (CalHFA)", "David West, Chair — California State Commanders Veterans Council"], s: ["vig"] },
    con: { none: true, note: "No argument against this measure was submitted for the official Voter Information Guide. The guide prints \u201cNO ARGUMENT AGAINST PROPOSITION 37 WAS SUBMITTED.\u201d That is not the same as nobody opposing it \u2014 it means no opponent filed an argument by the deadline.", points: [], signers: [], s: ["vig"] },
    rebuttals: { hasFavor: false, hasAgainst: false, s: ["vig"] }
  },
  {
    num: "38",
    short: "An $8.4 billion immunology research bond",
    title: "AUTHORIZES BONDS FOR IMMUNOLOGY MEDICAL RESEARCH.",
    kind: "Initiative Statute",
    does: "Authorizes an $8.4 billion general obligation bond for immunology and immunotherapy research, with at least $4.2 billion required to go to research on cancer, heart disease and Alzheimer's disease.", doesS: ["vig"],
    passIf: "The state borrows and spends the money. About half goes to a single research institute specializing in immunology and immunotherapy, selected by the California Department of Public Health; no more than 2% may go to state administrative costs. Repayment comes from the General Fund at roughly $500–600 million a year for about 20 years. The Legislative Analyst notes the state could recover part or all of that cost later, presumably through returns on the research.", passIfS: ["vig"],
    failIf: "The bond is not issued and this research receives no new state funding.", failIfS: ["vig"],
    fiscal: "bonds for immunology and immunotherapy research NET STATE AND LOCAL GOVERNMENT FISCAL IMPACT: (technologies that use body’s immune system to • Increased state cost of $500 million to $600 milliontreat disease), with half dedicated to cancer, heart annually for about 20 years to repay the medical disease, and Alzheimer’s disease. research bond. The state could recover part or all • Allocates funds equally between (1) a single of this cost in subsequent decades if the funded University of California-affiliated nonprofit medical research leads to discoveries that generate revenue. research institute, and (2) research grants for public 38 or nonprofit universities and institutions. • Requires funding recipients to sell technology and drugs derived from research in California for 20% below national average price. • Appropriates money from General Fund to repay bonds; General Fund receives 10% of licensing royalties until bonds are repaid.", fiscalS: ["vig"],
    money: "Support: $71.3 million from a single committee. Opposition: just over $9,900.", moneyS: ["sosContribs", "bpMoney"],
    pro: { points: ["PATIENT ADVOCATES, DOCTORS, NURSES AND MEDICAL RESEARCHERS URGE YES ON PROP. 38", "YES ON PROP. 38—TO CURE AND PREVENT DISEASES THROUGH LIFE-SAVING IMMUNOLOGY RESEARCH", "HELPS OFFSET FEDERAL FUNDING CUTS TO MEDICAL RESEARCH", "LOWERS HEALTHCARE COSTS FOR CALIFORNIANS", "STRONG ACCOUNTABILITY & TAXPAYER PROTECTIONS", "YES ON PROP. 38: SUPPORTED BY DOCTORS, NURSES AND PATIENT ADVOCATES"], signers: ["Susan Disney Lord, Board Chair — Alzheimer’s Los Angeles", "Eugene P. Brandon, Ph.D., Board of Trustees — ALS Association", "Dr. Brian Shuch, M.D., Board of Directors Member — Kidney Cancer Association"], s: ["vig"] },
    con: { points: ["Research priorities should be set by scientific review and public health planning, not by election campaigns — “ballot-box science” favors the most visible topics over the greatest need", "California has already created separate ballot-driven funding programs for stem cell research and precision medicine; this adds another narrow one", "Borrowing is the wrong way to finance research: bonds suit long-lived infrastructure, while discoveries often take decades and many lines of investigation never produce a treatment", "The assumption that discoveries will generate revenue to offset state costs is unrealistic — universities rarely commercialize therapies themselves, and the gains generally do not flow back to the state treasury", "Requiring state-supported therapies to be sold at discounted prices in California could push companies to prioritize other states", "A better option exists: a state research agency modeled on the NIH and NSF, setting priorities by expert review — proposed by Sen. Scott Wiener with support from the University of California, the United Auto Workers and the Union of American Physicians and Dentists", "A “No” vote does not reject science — it rejects an inefficient financing mechanism and a fragmented approach to priorities"], signers: ["Robert M Kaplan, Ph.D."], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  },
  {
    num: "39",
    short: "Voter ID and citizenship verification",
    title: "PROHIBITS CITIZENS FROM VOTING UNLESS THEY PRESENT GOVERNMENT-ISSUED IDENTIFICATION.",
    kind: "Initiative Constitutional Amendment",
    does: "Requires voters to provide additional identifying information every time they cast a ballot, requires mail voters to select a government-issued ID in their registration, and requires elections officials to use government data on a “best efforts” basis to verify that registered voters are U.S. citizens.", doesS: ["vig"],
    passIf: "Every California voter has to provide identifying information at every election, and elections officials must verify identity before counting a ballot. Mail voters must have a government-issued ID recorded in their registration. Counties must report each year what share of their registered voters have had citizenship verified. The Legislative Analyst puts the cost at tens of millions to low hundreds of millions of dollars a year, with the exact amount depending on later decisions by the Legislature and local governments.", passIfS: ["vig"],
    failIf: "California's current registration and identity rules stay as they are.", failIfS: ["vig"],
    fiscal: "State and local government costs of between tens of millions of dollars and low hundreds of millions of dollars each year to implement new voting requirements. Costs depend on future decisions by the Legislature, state departments, local governments, and voters.", fiscalS: ["vig"],
    money: "Support: $39.5 million across 2 committees. Opposition: $33.3 million across 10 committees — the most evenly matched funding of any measure on this ballot.", moneyS: ["sosContribs", "bpMoney"],
    pro: { points: ["VOTER ID: A BIPARTISAN WAY TO INCREASE TRUST IN OUR ELECTIONS", "PROP. 39 KEEPS VOTING ACCESSIBLE AND GUARANTEES A FREE VOTER ID", "VOTER ID INCREASES PARTICIPATION", "PROP. 39 INCLUDES AUDITS AND CITIZENSHIP VERIFICATION", "YES ON PROP. 39: FOR A NON-PARTISAN SOLUTION TO VOTER ID"], signers: ["Margit Whitlock, Democratic Coalition Chair — Californians for Voter ID", "Tafa Jefferson, Republican Coalition Chair — Californians for Voter ID", "Joe Green, Independent Coalition Chair — Californians for Voter ID"], s: ["vig"] },
    con: { points: ["STOP TRUMP’S POWER GRAB — the measure is cast as an effort by Trump and his allies to rig California elections and hold onto power", "WASTES HUNDREDS OF MILLIONS OF DOLLARS chasing election conspiracy theories while Californians are struggling", "PUTS YOUR IDENTITY AT RISK — every mail voter would have to put personal details on the return envelope, making them easy targets for identity theft", "BLOCKS CITIZENS FROM VOTING — a personal ID number on the envelope must exactly match state records; one wrong digit, an out-of-date address or a misspelled name could get a valid ballot thrown out", "If you don’t take extra steps to tell officials which ID you want to use, you may not get a mail ballot at all", "PUSHES OUT VOTERS — “free” state IDs still cost transportation, time off work, childcare and document fees, hitting seniors, students, low-income workers, voters of color and women who changed their names at marriage hardest"], signers: ["David Trujillo, Executive Director — ACLU California Action", "Darius Kemp, California State Director — Common Cause", "Lorrel Plimier, Co-President — League of Women Voters of California"], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  },
  {
    num: "40",
    short: "A one-time 5% tax on billionaires' wealth",
    title: "IMPOSES ONE-TIME TAX ON CERTAIN TAXPAYERS.",
    kind: "Initiative Constitutional Amendment and Statute",
    does: "Imposes a one-time state tax equal to 5% of net worth on billionaires who were California residents on January 1, 2026, due in 2027, with most of the money required to be spent on health care.", doesS: ["vig"],
    passIf: "Affected billionaires owe 5% of net worth in 2027, and may spread payments over five years at a higher total cost. Real estate, pensions and retirement accounts are generally excluded. The Legislative Analyst estimates tens of billions of dollars over several years, plus a possible ongoing loss of under $1 billion a year in regular income tax as some billionaires leave or restructure. The Legislature decides how and when to spend it, within the health care restriction.", passIfS: ["vig"],
    failIf: "No wealth tax is imposed.", failIfS: ["vig"],
    fiscal: "Temporary state revenue increase from a new wealth tax on billionaires. These wealth tax revenues probably would add up to tens of billions of dollars spread over several years. • Possible ongoing decrease of less than $1 billion per year in state income tax revenue collected from billionaires.", fiscalS: ["vig"],
    money: "Secretary of State filings show roughly $33.4 million in support and $130.3 million in opposition. Ballotpedia reports opponents outraised proponents four to one. Props 40, 41 and 42 together drew more than $360 million.", moneyS: ["sosContribs", "bpMoney"],
    conflict: "Watch this one. The Legislative Analyst warns that if Proposition 41 or Proposition 42 — both on this same ballot — receive more yes votes than Proposition 40, then Proposition 40 could be stopped from becoming law even if a majority of voters approve it, because courts could find the measures conflict.", conflictS: ["vig"],
    pro: { points: ["YES ON PROP. 40 TO TAX BILLIONAIRES", "FUND HEALTHCARE, NOT BILLIONAIRE TAX BREAKS", "BILLIONAIRES SHOULD PAY THEIR FAIR SHARE", "BERNIE SANDERS SUPPORTS PROP. 40", "DON’T BELIEVE THE BILLIONAIRES’ LIES", "SAVE LIVES. TAX BILLIONAIRES."], signers: ["Suzanne Jimenez, Chief of Staff — SEIU-United Healthcare Workers West", "Victoria Barron, Patient Access Specialist — Planned Parenthood of Pacific Southwest", "Denise Robb, Ph.D., Member of American Federation of Teachers — Local 1521", "Los Angeles College Faculty Guild"], s: ["vig"] },
    con: { points: ["No on 40—FLAWED WEALTH TAX “EXPERIMENT” HURTS ALL CALIFORNIANS", "PROP. 40 WILL COST CALIFORNIA $25 BILLION IN LOST REVENUE FOR HEALTHCARE, EDUCATION", "PROP. 40 IS WRITTEN TO GIVE POLITICIANS NEW POWER TO EXPAND THE TAX", "PROP. 40 TAXES RETIREMENT ACCOUNTS FOR THE FIRST TIME", "PROP. 40 IS A RECIPE FOR MORE WASTEFUL SPENDING", "AUTHORS ADMIT THE ONE-TIME TAX IS AN EXPERIMENT", "PROP. 40 IS OPPOSED BY LABOR AND BUSINESS, DEMOCRATS AND REPUBLICANS, TEACHERS AND FIREFIGHTERS"], signers: ["René Bravo, M.D., President", "California Medical Association", "Francisco Silva, CEO — California Primary Care Association", "Dr. Debra Schade, President — California School Boards Association"], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  },
  {
    num: "41",
    short: "Audits before special-tax initiatives, and spending-limit rules",
    title: "PROHIBITS NEW STATE TAXES THAT EXCLUDE REVENUES FROM STATE SPENDING LIMIT. REQUIRES AUDITS FOR NEW STATE SPECIAL TAXES.",
    kind: "Initiative Constitutional Amendment",
    does: "Requires the State Auditor to review any program that would be funded by a new or increased special tax proposed by voter initiative, once supporters gather 25% of the needed signatures, and bars new state taxes that exclude their revenues from the state spending limit.", doesS: ["vig"],
    passIf: "Any citizen initiative proposing a special tax triggers a State Auditor review partway through signature gathering — before anyone knows whether the measure will even qualify. The audit must identify ways to cut the program's annual costs by 10%, and the Auditor's summary gets printed in the official voter guide if the measure reaches the ballot. If voters then approve the tax, the audit's cost is paid from the new revenue.", passIfS: ["vig"],
    failIf: "No pre-ballot audit is required and the spending-limit rule does not change.", failIfS: ["vig"],
    fiscal: "Unknown net fiscal effect. Increased costs for the California State Auditor to implement new one-time and ongoing audit requirements of programs funded by special taxes. These costs would be mostly paid from the new revenues collected from the special taxes. Possible savings associated with implementing recommendations from the audits.", fiscalS: ["vig"],
    money: "Props 40, 41 and 42 together drew more than $360 million in contributions. No separate total for Prop 41 was reported in the coverage reviewed.", moneyS: ["sosContribs", "bpMoney"],
    conflict: "If this measure receives more yes votes than Proposition 40, it could block Proposition 40 from taking effect even if Prop 40 also passes.", conflictS: ["vig"],
    pro: { points: ["CALIFORNIANS DESERVE BETTER RESULTS FOR OUR TAX DOLLARS", "PUBLIC AUDITS TO PROVIDE ACCOUNTABILITY, TRANSPARENCY AND OVERSIGHT", "PROP. 41: INDEPENDENT, PUBLIC INFORMATION FOR VOTERS ON PROPOSED TAXES", "PROP. 41: A BETTER DEAL FOR TAXPAYERS"], signers: ["Denise LeDuc Froemming, CPA, President — California Society of Certified Public Accountants (CalCPAs)", "Tom Hayes, Fmr. California State Auditor", "Robert Gutierrez, President — California Taxpayers Association (CalTax)"], s: ["vig"] },
    con: { points: ["PROP. 41 WOULD CANCEL OUT THE BILLIONAIRE TAX", "PROP. 41 WAS FUNDED BY BILLIONAIRES WHO WANT YOU TO PAY MORE FOR HEALTHCARE", "VOTE NO ON PROP. 41 IF YOU SUPPORT THE BILLIONAIRE TAX"], signers: ["Suzanne Jimenez, Chief of Staff — SEIU-United Healthcare Workers West"], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  },
  {
    num: "42",
    short: "Bans wealth and personal property taxes, and most retroactive taxes",
    title: "PROHIBITS NEW STATE PERSONAL PROPERTY TAXES AND CERTAIN RETROACTIVE STATE TAXES.",
    kind: "Initiative Constitutional Amendment",
    does: "Prohibits new state taxes on the ownership of financial assets or other personal property, and limits when the Legislature or a ballot measure can impose a tax retroactively.", doesS: ["vig"],
    passIf: "California cannot create a tax on owning financial assets or other personal property — which includes the kind of wealth tax Proposition 40 proposes. Retroactive taxes become sharply limited. The Legislative Analyst's only fiscal finding is the possibility that tax revenues will not rise as much in the future.", passIfS: ["vig"],
    failIf: "The Legislature and voters keep their current authority to tax personal property and to act retroactively.", failIfS: ["vig"],
    fiscal: "Possibility that tax revenues will not go up as much in the future.", fiscalS: ["vig"],
    money: "Props 40, 41 and 42 together drew more than $360 million in contributions. No separate total for Prop 42 was reported in the coverage reviewed.", moneyS: ["sosContribs", "bpMoney"],
    conflict: "This is the most direct conflict on the ballot: if Proposition 42 receives more yes votes than Proposition 40, Proposition 40 could be stopped from becoming law even if a majority votes for it.", conflictS: ["vig"],
    pro: { points: ["YES ON PROP. 42: PROTECT YOUR RETIREMENT AND LIFE SAVINGS FROM STATE TAXES", "CALIFORNIA CONSTITUTION CURRENTLY ALLOWS DOUBLE TAXATION", "PROP. 42 PROHIBITS TAXES ON RETIREMENT AND SAVINGS", "PROP. 42 PROTECTS ALL FORMS OF RETIREMENT FUNDS AND SAVINGS FROM NEW TAXES", "PROP. 42 PROHIBITS UNFAIR RETROACTIVE TAXES"], signers: ["Michael Hedges, President — California Small Business Association", "Shelley Huff, Commander", "AMVETS, Department of California", "Jennifer Yoder, Board Member — California Senior Alliance"], s: ["vig"] },
    con: { points: ["PROP. 42 WOULD CANCEL OUT THE BILLIONAIRE TAX", "PROP. 42 WAS FUNDED BY BILLIONAIRES WHO WANT YOU TO PAY MORE FOR HEALTHCARE", "VOTE NO ON PROP. 42 IF YOU SUPPORT THE BILLIONAIRE TAX"], signers: ["Suzanne Jimenez, Chief of Staff — SEIU-United Healthcare Workers West"], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  },
  {
    num: "43",
    short: "Two-thirds vote for voter-proposed local special taxes",
    title: "LIMITS VOTERS’ ABILITY TO RAISE REVENUES FOR LOCAL GOVERNMENT SERVICES.",
    kind: "Legislative Constitutional Amendment",
    does: "Requires any new, increased or extended local special tax proposed by voters themselves to pass by a two-thirds vote starting January 1, 2027. Recent court decisions had allowed such citizen-proposed special taxes to pass with a simple majority.", doesS: ["vig"],
    passIf: "Citizen initiatives for local special taxes — for a specific purpose such as roads, parks or public safety — need two-thirds approval rather than a simple majority. Measures put on the ballot by a city council or district already need two-thirds; this closes the gap for voter-initiated ones. The Legislative Analyst notes local tax revenues may not rise as much in the future as a result.", passIfS: ["vig"],
    failIf: "Voter-proposed local special taxes keep passing by simple majority.", failIfS: ["vig"],
    fiscal: "Possibility that local government tax revenues will not go up as much in the future due to a higher vote threshold for certain taxes.", fiscalS: ["vig"],
    money: "No funding total for this measure was captured in this build.", moneyS: ["sosContribs", "bpMoney"],
    pro: { points: ["VOTE YES ON PROP. 43: THE LOCAL TAXPAYER PROTECTION ACT", "PROP. 43 RESTORES PROPOSITION 13 TAXPAYER PROTECTIONS", "PROP. 43 MAKES IT HARDER TO RAISE YOUR TAXES", "PROP. 43 PROTECTS HOMEOWNERS FROM COSTLY NEW REAL ESTATE TAXES", "PROP. 43 STOPS THE BAIT-AND-SWITCH TAX TRICKS", "PROP. 43 PUTS VOTERS BACK IN CHARGE"], signers: ["Robert Gutierrez, President — California Taxpayers Association", "Robert Rivinius, President — Family Business Association of California", "Julian Canete, President — California Hispanic Chambers of Commerce"], s: ["vig"] },
    con: { points: ["PROPOSITION 43 LIMITS VOTERS’ ABILITY TO FUND ESSENTIAL LOCAL SERVICES.", "PROP. 43 MAKES IT HARDER TO FUND FIRE AND POLICE SERVICES.", "PROP. 43 MAKES IT HARDER TO FIX ROADS, FUND SCHOOLS, AND PROTECT HEALTHCARE.", "PROP. 43 EMPOWERS 33.4% OF VOTERS OVER THE WILL OF THE MAJORITY.", "CORPORATE DONORS BENEFIT. NOT TAXPAYERS."], signers: ["Darrell Roberts, President — California Professional Firefighters", "Chris Harkins, Executive Director — Nurse Alliance of SEIU California", "Adam Weinberger, President — California School Employees Association"], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  },
  {
    num: "44",
    short: "Requires nonprofit clinics to spend 90% of revenue on care",
    title: "REQUIRES COMMUNITY HEALTH CLINICS SPEND 90% OF REVENUE ON PROGRAM SERVICES.",
    kind: "Initiative Statute",
    does: "Requires private nonprofit safety net clinics to spend at least 90% of their total annual revenue on providing health care services, capping everything else — administration included — at 10%.", doesS: ["vig"],
    passIf: "Affected clinics must hit the 90% threshold or pay a penalty to the state. The Attorney General defines which expenses count as health care services, starting from clinics' existing federal reports. Clinics can request a temporary waiver in some cases. Enforcement costs the state in the low tens of millions of dollars a year, recovered through fees charged to the clinics themselves.", passIfS: ["vig"],
    failIf: "No minimum care-spending ratio applies to these clinics.", failIfS: ["vig"],
    fiscal: "Increased state costs in the low tens of millions of dollars per year to enforce the new requirements on certain private nonprofit health care clinics, covered by fees charged to the affected clinics.", fiscalS: ["vig"],
    money: "No funding total for this measure was captured in this build.", moneyS: ["sosContribs", "bpMoney"],
    pro: { points: ["VOTE YES ON PROP. 44 TO PUT PATIENTS FIRST AND HOLD CLINICS ACCOUNTABLE.", "WHY PROP. 44 IS NEEDED", "PROP. 44 DIRECTS HEALTHCARE DOLLARS TO PATIENT CARE", "PROP. 44 HOLDS CLINICS ACCOUNTABLE", "VOTE YES ON PROP. 44 TO PUT PATIENTS FIRST."], signers: ["Shawna Brown, Initiative Proponent", "Brisa J. Barrera, Community Clinic Worker"], s: ["vig"] },
    con: { points: ["VOTE NO ON PROP. 44: STOP THE ATTACK ON PATIENTS & COMMUNITY HEALTH CLINICS", "PROP. 44 ARBITRARILY RESTRICTS SPENDING ON VITAL PATIENT SERVICES", "PROP. 44 DECIMATES THE HEALTH CARE SYSTEM AND HURTS ALL PATIENTS", "PROP. 44 IS UNNECESSARY. COMMUNITY CLINICS ARE STRICTLY REGULATED.", "PROP. 44 OPPOSED BY PATIENTS, NURSES, DOCTORS AND COMMUNITY LEADERS"], signers: ["Eric Ball, MD, FAAP, President", "American Academy of Pediatrics, California", "Katie Nilsson, RN, President — California School Nurses Organization", "René Bravo, M.D., President", "California Medical Association"], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  },
  {
    num: "45",
    short: "Faster environmental review for “essential” projects",
    title: "MODIFIES ENVIRONMENTAL REVIEW FOR CERTAIN PROJECTS.",
    kind: "Initiative Statute",
    does: "Creates an optional alternative review track under the California Environmental Quality Act for projects it defines as “essential” — housing, water systems, clean energy, health facilities, fire and police stations, wildfire risk reduction, broadband, schools and transportation — tightening deadlines for review, permits and court challenges.", doesS: ["vig"],
    passIf: "Applicants for those project types may choose the new faster procedures or stay with existing ones. The new track shortens time limits for CEQA review, permits and lawsuits, changes parts of the review process, and changes how courts handle CEQA challenges. Delta conveyance facilities, nuclear power and high-speed rail are specifically excluded. State and local governments face initial costs likely in the high tens of millions a year, potentially over $100 million, partly covered by fees on applicants and litigants.", passIfS: ["vig"],
    failIf: "All projects stay under the existing CEQA process and timelines.", failIfS: ["vig"],
    fiscal: "Initial costs for state and local governments, likely in the high tens of millions of dollars annually—potentially exceeding $100 million annually—to implement new project review and court challenge procedures for eligible projects. Fees paid by project applicants and people filing lawsuits would partly cover these costs. • In the longer term, uncertain, but potentially more significant positive or negative fiscal effects for state and local governments. The overall effect depends, in part, on how the new procedures change the number of eligible projects that get built and whether those projects have different environmental impacts.", fiscalS: ["vig"],
    money: "Roughly $38.6 million in support and $31.2 million in opposition per Secretary of State filings. Wendy Schmidt alone gave $10 million to the No side.", moneyS: ["sosContribs", "bpMoney"],
    pro: { points: ["LENGTHY DELAYS AND RED TAPE ARE BLOCKING ESSENTIAL PROJECTS & DRIVING UP OUR COST OF LIVING.", "PROP. 45 LOWERS OUR HIGH COST OF LIVING BY MAKING IT FASTER & LESS EXPENSIVE TO BUILD ESSENTIAL PROJECTS.", "PROP. 45 STREAMLINES CALIFORNIA’S MOST-PRESSING ESSENTIAL PROJECTS — water quality and supply, hospitals and healthcare facilities, housing, wildfire prevention, schools, roads, bridges and transit, and clean energy", "PROP. 45 WILL cut delays and reduce frivolous lawsuits for those projects", "CREATE GOOD-PAYING JOBS AND STRENGTHEN OUR ECONOMY.", "PROP. 45 MAINTAINS CALIFORNIA’S STRONGEST-IN-THE-NATION ENVIRONMENTAL PROTECTIONS.", "PROP. 45 PROTECTS COMMUNITY INPUT AND LOCAL DECISION MAKING.", "AFFORDABLE HOUSING ADVOCATES, HEALTHCARE PROFESSIONALS, EDUCATORS, WATER PROVIDERS, CLEAN ENERGY LEADERS AND CIVIL RIGHTS LEADERS SUPPORT PROP. 45.", "YES ON PROP. 45 TO BUILD A MORE AFFORDABLE CALIFORNIA."], signers: ["Ann-Louise Kuhns, President — California Children’s Hospital Association", "Jennifer Capitolo, Executive Director — California Water Association", "Jenna Abbott, Executive Director — California Council on Affordable Housing"], s: ["vig"] },
    con: { points: ["PROPOSITION 45 LIMITS ENVIRONMENTAL AND PUBLIC REVIEW OF PROJECTS BUILT IN YOUR COMMUNITY. VOTE NO ON PROP. 45 TO PROTECT WATER, AIR QUALITY AND PUBLIC HEALTH.", "PROP. 45 WEAKENS CRITICAL PROTECTIONS FOR AIR AND WATER QUALITY BY GUTTING THE CALIFORNIA ENVIRONMENTAL QUALITY ACT (CEQA).", "PROP. 45 CUTS THE PUBLIC OUT OF DECISIONS THAT AFFECT YOUR FAMILY.", "THEY POLLUTE. YOU PAY.", "PROP. 45 WON’T LOWER YOUR COSTS.", "WHO’S BEHIND PROP. 45?", "JOIN A BROAD COALITION OF PUBLIC HEALTH, ENVIRONMENTAL AND COMMUNITY GROUPS OPPOSING PROP. 45"], signers: ["Joe Lyou, President — Coalition for Clean Air", "Jennifer Clary, California Director — Clean Water Action", "Matt Abularach-Macias, Political Director — California Environmental Voters"], s: ["vig"] },
    rebuttals: { hasFavor: true, hasAgainst: true, s: ["vig"] }
  }
];

/* ----------------------------------------------------------- JUDICIAL */
/* 17 retention questions. These are not contests between candidates: each is
   a yes-or-no vote on whether to keep a sitting justice. Retention is by
   APPELLATE DISTRICT, not division — Orange County is in the Fourth District,
   so you vote on every Fourth District justice regardless of division.      */
const JUDICIAL = {
  explain: {
    what: "Appellate justices do not run against each other. The governor appoints them, the Commission on Judicial Appointments confirms them, and then voters get a plain yes-or-no question on whether to keep each one. LAist puts it simply: \u201cRetention elections are \u2018yes\u2019 or \u2018no\u2019 questions on whether you want to keep a justice on the bench.\u201d",
    whatS: ["laistCourts"],
    term: "An appellate justice's term is 12 years, and there are no term limits. A justice who takes over a predecessor's unexpired term may serve less than 12 years on that first go-round.",
    termS: ["laistCourts"],
    stakes: "No California appellate justice has lost a retention election since the system began in the 1930s, and sitting justices are nearly always retained. LAist's framing is that your vote here is \u201clargely about sending a signal on whether you support what they\u2019ve done.\u201d",
    stakesS: ["laistCourts"],
    district: "The Fourth Appellate District covers Orange, Imperial, Inyo, Riverside, San Bernardino and San Diego counties. You vote on all of its justices, including ones seated in San Diego and Riverside who may never hear an Orange County case.",
    districtS: ["sosJudicial", "laistCourts"],
    howToRead: "The State Bar evaluates every nominee before appointment and publishes a rating. Those ratings, shown below, are the only systematic third-party assessment available for most of these justices. Neither Supreme Court justice has any disciplinary citation in the Commission on Judicial Performance's database.",
    howToReadS: ["laistCourts", "laistSupreme", "sfChronCourts"],
    gap: "This is the thinnest-information part of your ballot, and that is a real finding rather than a shortcoming of this guide. For most of these justices no published record review, endorsement, or organized campaign exists at all. Where something does exist \u2014 a State Bar rating, an organized opposition campaign \u2014 it is shown. Where nothing does, nothing is shown.",
    gapS: ["laistCourts", "laistSupreme"]
  },
  items: [
    {
      name: "Joshua Groban",
      court: "Supreme Court of California",
      division: null,
      role: "Associate Justice",
      currentTitle: "Associate Justice of the Supreme Court",
      question: "Shall Associate Justice of the Supreme Court JOSHUA GROBAN be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2018", appointedBy: "Jerry Brown", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Kelli M. Evans",
      court: "Supreme Court of California",
      division: null,
      role: "Associate Justice",
      currentTitle: "Associate Justice of the Supreme Court",
      question: "Shall Associate Justice of the Supreme Court KELLI M. EVANS be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Well qualified", ratingYear: "2022", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      note: "A political action committee funded by the Peace Officers Research Association of California, one of the state's largest law enforcement organizations, launched a “No On Kelli Evans” effort late in the cycle. LAist reports the PAC did not state its reason. This is the only organized opposition to any justice on your ballot.", noteS: ["laistSupreme"],
      opposition: true
    },
    {
      name: "Julia C. Kelety",
      court: "Court of Appeal, Fourth Appellate District",
      division: "One",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice JULIA C. KELETY be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2022", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Jose S. Castillo",
      court: "Court of Appeal, Fourth Appellate District",
      division: "One",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice JOSE S. CASTILLO be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Well qualified", ratingYear: "2022", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Truc T. Do",
      court: "Court of Appeal, Fourth Appellate District",
      division: "One",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice TRUC T. DO be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2020", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "William S. Dato",
      court: "Court of Appeal, Fourth Appellate District",
      division: "One",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice WILLIAM S. DATO be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2023", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      note: "One third-party judicial tracker lists Dato's State Bar rating as “Well qualified (2026)” rather than the rating shown here. The sources disagree; LAist's complete table is used throughout this section for consistency.", noteS: ["laistCourts"],
      opposition: false
    },
    {
      name: "Eran M. Bermudez",
      court: "Court of Appeal, Fourth Appellate District",
      division: "One",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice ERAN M. BERMUDEZ be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2026", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Lisa Rodriguez",
      court: "Court of Appeal, Fourth Appellate District",
      division: "One",
      role: "Associate Justice",
      currentTitle: "San Diego County Superior Court Judge",
      question: "Shall San Diego County Superior Court Judge LISA RODRIGUEZ be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2025", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      note: "Not currently an appellate justice. Confirmed to fill a seat and, if retained, would begin a 12-year term in January.", noteS: ["laistCourts"],
      opposition: false
    },
    {
      name: "David M. Rubin",
      court: "Court of Appeal, Fourth Appellate District",
      division: "One",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice DAVID M. RUBIN be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2023", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Corey G. Lee",
      court: "Court of Appeal, Fourth Appellate District",
      division: "Two",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice COREY G. LEE be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2023", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Michael J. Raphael",
      court: "Court of Appeal, Fourth Appellate District",
      division: "Two",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice MICHAEL J. RAPHAEL be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2018", appointedBy: "Jerry Brown", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Joanne Motoike",
      court: "Court of Appeal, Fourth Appellate District",
      division: "Three",
      role: "Presiding Justice",
      currentTitle: "Presiding Justice",
      question: "Shall Presiding Justice JOANNE MOTOIKE be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2022", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Thomas A. Delaney",
      court: "Court of Appeal, Fourth Appellate District",
      division: "Three",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice THOMAS A. DELANEY be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Well qualified", ratingYear: "2021", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Nathan R. Scott",
      court: "Court of Appeal, Fourth Appellate District",
      division: "Three",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice NATHAN R. SCOTT be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2022", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Deborah C. Servino",
      court: "Court of Appeal, Fourth Appellate District",
      division: "Three",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice DEBORAH C. SERVINO be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2023", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Martha K. Gooding",
      court: "Court of Appeal, Fourth Appellate District",
      division: "Three",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice MARTHA K. GOODING be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Exceptionally well qualified", ratingYear: "2022", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      opposition: false
    },
    {
      name: "Juliet O. MacAulay",
      court: "Court of Appeal, Fourth Appellate District",
      division: "Three",
      role: "Associate Justice",
      currentTitle: "Associate Justice",
      question: "Shall Associate Justice JULIET O. MACAULAY be elected to the office for the term provided by law?", questionS: ["sosJudicial"],
      rating: "Well qualified", ratingYear: "2026", appointedBy: "Gavin Newsom", metaS: ["laistCourts", "laistSupreme"],
      note: "Not currently an appellate justice. Confirmed to fill a seat and, if retained, would begin a 12-year term in January.", noteS: ["laistCourts"],
      opposition: false
    }
  ]
};

/* ------------------------------------------------------ NOT ON BALLOT */
const NOT_ON_BALLOT = [
  { office: "Fullerton City Council", why: "Precinct 13099 is in Council District 1, which is not up in 2026. Only Districts 3 and 5 are on the November ballot.", s: ["ocShapes", "ocvoteContests"] },
  { office: "Fullerton city sales tax measure", why: "The City Council considered a half-cent sales tax for roads but chose not to place it on the November ballot, pushing any new revenue to 2028.", s: ["fullObs", "laistMeasures"] },
  { office: "Fullerton School District trustee", why: "You are in Trustee Area 2. Only Trustee Area 3 is up this year.", s: ["ocShapes", "ocvoteContests"] },
  { office: "Fullerton Joint Union High School District trustee", why: "You are in Trustee Area 2. Only Trustee Areas 1 and 5 are up this year.", s: ["ocShapes", "ocvoteContests"] },
  { office: "North Orange County Community College District trustee", why: "You are in Trustee Area 4. Only Trustee Areas 1, 3 and 6 are up this year.", s: ["ocShapes", "ocvoteContests"] },
  { office: "Orange County Board of Education", why: "No Board of Education seat appears anywhere on Orange County's 2026 general election ballot. Supervisor candidate Tim Shaw's listed title as a Board of Education trustee is his ballot designation, not a contest you vote in.", s: ["candlog"] },
  { office: "Sheriff, District Attorney, Assessor and county judges", why: "These Orange County offices were settled in the June 2026 primary and do not return in November.", s: ["candlog", "ocvoteContests"] },
  { office: "U.S. Senate", why: "Neither of California's Senate seats is up in 2026.", s: ["sosCertList"] },
  { office: "The other 14 local measures (A through O)", why: "Every one belongs to another city or school district — Laguna Beach, Westminster, Costa Mesa, Irvine, Lake Forest, Los Alamitos, Newport Beach, Orange, Placentia, San Clemente, Santa Ana and Fountain Valley. There is no countywide measure on this ballot.", s: ["ocvoteContests"] },
  { office: "Other congressional, Senate and Assembly districts", why: "Orange County ballots carry eight congressional districts, five state Senate districts and eleven Assembly districts between them. You vote only in CA-45, SD-34 and AD-59.", s: ["candlog", "ocShapes"] }
];

/* ------------------------------------------------------------ CAVEATS */
const CAVEATS = [
  {
    title: "How your districts were determined",
    d: "Precinct 13099 was located in the Registrar of Voters' own OC_Precinct_2026_GE shapefile, and a point inside that precinct polygon was tested against each official district layer published by the same office. That is a geometric answer from the county's own data, not a guess from a map image. It is still worth a 30-second check against your own sample ballot, because a precinct can be split and because a data file can lag a boundary change.",
    s: ["ocShapes"]
  },
  {
    title: "Why the pro and con arguments look the way they do",
    d: "For the 14 propositions, the pro and con points are the headline claims of the official arguments printed in the Secretary of State's Voter Information Guide, in the proponents' and opponents' own words, with the people who signed each argument named beside them. They are advocacy, not findings — the guide itself prints the warning that “Arguments printed on this page are the opinions of the authors and have not been checked for accuracy by any official agency.” The separate “What this actually does” and “If it passes” sections come from the Legislative Analyst's neutral analysis instead.",
    s: ["vig"]
  },
  {
    title: "Two measures have no argument against them",
    d: "Propositions 1 and 37 carry no opposing argument because nobody filed one by the deadline. The official guide prints “NO ARGUMENT AGAINST PROPOSITION 1 WAS SUBMITTED” and the same for 37. That is a fact about the filing process, not evidence that no one opposes them. Neither measure is uncontroversial by virtue of that silence.",
    s: ["vig"]
  },
  {
    title: "Propositions 40, 41 and 42 can cancel each other out",
    d: "This is the least obvious thing on your ballot. The Legislative Analyst warns that if Proposition 41 or Proposition 42 receives more yes votes than Proposition 40, then Proposition 40 could be stopped from becoming law even if a majority of voters approve it, because a court could find the measures conflict. A yes on 41 or 42 is therefore also a potential no on 40, whatever you mark for 40 itself.",
    s: ["vig"]
  },
  {
    title: "Where candidate coverage runs out",
    d: "The three district races on your ballot — CA-45, Senate District 34 and Assembly District 59 — have the thinnest coverage of anything here. This build reached the official candidate list, Ballotpedia, and local reporting, but did not locate a published issue questionnaire or detailed platform for any of those six candidates. Those gaps are labeled on each card as gaps in this guide's research. The same is true of the Board of Equalization race, where neither candidate has a captured position on what the board actually does.",
    s: ["bpCA45", "voiceSD34", "ballotbook59", "laistBOE"]
  },
  {
    title: "Funding figures are approximate and uneven",
    d: "Campaign finance totals here come from different sources with different cutoff dates, and several races have no captured figures at all. Where two sources disagree — as they do for both CA-45 candidates — both numbers are given. Ballot measure totals reflect filings submitted by October 22, 2026, and the overall cycle figure was $798.9 million across 44 committees, the most on record. Treat every dollar amount as approximate.",
    s: ["bpCA45", "bpMoney", "sosContribs"]
  },
  {
    title: "No polling exists for most of this ballot",
    d: "Only the governor's race has real public polling. For everything else, what appears under “Polling” is either a primary result or a forecaster rating, both labeled as such. A primary result is not a head-to-head: in CA-45, five Republicans split the opposing vote. The Insurance Commissioner race is widely described as the most competitive statewide contest and has no public polling at all.",
    s: ["ppic", "bpCA45", "sfStandardIns"]
  },
  {
    title: "One source conflict was left visible rather than resolved",
    d: "LAist's attorney general page lists Michael Gates's title in its header as “Deputy United States Attorney,” which contradicts the biography on the same page describing him as having left the Justice Department to return to the Huntington Beach city attorney's office. The contradiction is in the source and is reproduced rather than silently picked. A third-party judicial tracker also lists a different State Bar rating for Justice William Dato than LAist does.",
    s: ["laistAG", "trellis4th", "laistCourts"]
  },
  {
    title: "What a retention vote is not",
    d: "The 17 judicial questions are not contests. Each is a yes-or-no on keeping a sitting justice for a 12-year term, and no California appellate justice has lost one since the 1930s. For most of these justices there is no published record review or organized campaign of any kind. The one exception is Justice Kelli Evans, who faces an organized opposition effort funded by a law enforcement association.",
    s: ["laistCourts", "laistSupreme"]
  },
  {
    title: "This guide was built the night before the election",
    d: "Research closed on the evening of November 2, 2026. Anything that moved after that — a late endorsement, a final poll, a correction — is not in here. Where this guide says no source was found, that means none was found in this build, which is a weaker claim than none existing.",
    s: []
  }
];
