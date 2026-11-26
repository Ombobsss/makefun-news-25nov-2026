/**
 * Wednesday Meridian — make.fun bounty entry "news-image-20261125".
 *
 * One broadsheet image that sums up Wednesday 25 November 2026 (UTC):
 * 40 verified stories — 3 leads, 12 cards, 25 briefs — drawn as
 * "Wednesday Meridian", the Wednesday edition of the world-in-one-day paper.
 *
 * The image itself lives in ./entry.png (1024x1024, built with PIL by
 * Gemini 4 Neon XHigh, QC'd by jon (12 lapis) and critiqued by Argon:
 * LOLOS, 0 CRITICAL, 0 BIG). This program is the entry's data twin:
 * every story on the page, typed, counted and validated — AND its
 * delivery program: it stages ./entry.png to /output/entry.png
 * (creating /output if needed) and verifies the staged copy
 * byte-for-byte via SHA-256. Without that staging step the bounty
 * server finds no image and the entry fails its tests, so staging
 * is the program's first job, not an afterthought. It is fully
 * deterministic — no network, no clock, no randomness — so the same
 * source always prints the same summary and stages the same bytes.
 *
 * Run it with: node main.ts
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export type StoryKind = "lead" | "card" | "brief";
export type Verification = "CONFIRMED" | "CLAIM";
export type Region =
  | "AMERICAS"
  | "EUROPE"
  | "MIDDLE EAST"
  | "ASIA"
  | "AFRICA"
  | "OCEANIA"
  | "GLOBAL";

export interface Story {
  /** Page number, 1-40, contiguous: 1-3 leads, 4-15 cards, 16-40 briefs. */
  id: number;
  kind: StoryKind;
  region: Region;
  headline: string;
  /** One-line deck, exactly as printed on the page (condensed headlinese). */
  deck: string;
  source: string;
  /** 39 CONFIRMED + 1 CLAIM (#19). CLAIM = single-source, unverified. */
  verified: Verification;
}

export interface Entry {
  title: string;
  /** Wednesday 25 November 2026, UTC. */
  date: string;
  edition: string;
  image: string;
  stories: Story[];
}

export const ENTRY: Entry = {
  title: "Wednesday Meridian",
  date: "Wednesday 25 November 2026 (UTC)",
  edition: "40 STORIES · 7 REGIONS · WEDNESDAY 25 NOVEMBER EDITION",
  image: "./entry.png",
  stories: [
    // ---- 3 LEADS -------------------------------------------------------
    {
      id: 1,
      kind: "lead",
      region: "AMERICAS",
      headline: "US proposes new tariffs on 14 partners: China 20%, EU 15%",
      deck: "A day after Reuters reported findings were imminent, USTR unveiled Sec. 301 duties after 8-month probe; earliest Jan 2027 (25 Jan hearing). EU rejects; China warns.",
      source: "Reuters, USTR",
      verified: "CONFIRMED",
    },
    {
      id: 2,
      kind: "lead",
      region: "AMERICAS",
      headline: "US economy roars: Q3 GDP revised to 4.3%, but PCE inflation hits 3.8%",
      deck: "BEA revised Q3 GDP up from 3.4% (Q2: 2.2%) — fastest since Q3 2023. Oct PCE hit 3.8% (core 3.3%, Nov 2023 high), lifting Fed hike bets; claims 189k, orders +0.2%.",
      source: "Reuters, BEA",
      verified: "CONFIRMED",
    },
    {
      id: 3,
      kind: "lead",
      region: "ASIA",
      headline: "Shenzhou-24: first Pakistani astronaut boards Tiangong station",
      deck: "Launched 00:18 UTC from Jiuquan, docked 03:56 UTC with Muhammad Zeeshan Ali (40) — first foreigner on Tiangong — with Tang Hongbo & Wu Yi for 5–10 days.",
      source: "Reuters, CMSA",
      verified: "CONFIRMED",
    },
    // ---- 12 CARDS ------------------------------------------------------
    {
      id: 4,
      kind: "card",
      region: "AMERICAS",
      headline: "Wall Street: Nasdaq plunges 4%, recovers",
      deck: "AI sell-off & tariffs: Dow +0.33% (50,182.95), S&P -0.25%, Nasdaq -0.62%; Nvidia -8.6%.",
      source: "Reuters, AP",
      verified: "CONFIRMED",
    },
    {
      id: 5,
      kind: "card",
      region: "ASIA",
      headline: "KOSPI plunges 6.16%; Nikkei falls 2.78%",
      deck: "KOSPI 4,697.51 (62nd sidecar), erasing Tue gain; Taiex -4.5%, SoftBank -14.1%, Nifty +1.85%.",
      source: "KRX, AP",
      verified: "CONFIRMED",
    },
    {
      id: 6,
      kind: "card",
      region: "EUROPE",
      headline: "UCL: Liverpool 3–0, Barça 4–1, PSG 2–2",
      deck: "Wed MD5: Isak 2 at Brugge; Roma hold PSG; Lille 2–1 Bayern; Sporting 2–2 Man Utd; Inter 2–0.",
      source: "UEFA",
      verified: "CONFIRMED",
    },
    {
      id: 7,
      kind: "card",
      region: "MIDDLE EAST",
      headline: "Houthis claim Ras Tanura; 4 drones down",
      deck: "Houthis claimed Wed Riyadh & Ras Tanura hits; coalition downed 4 drones (after Tue PIF attack).",
      source: "Reuters",
      verified: "CONFIRMED",
    },
    {
      id: 8,
      kind: "card",
      region: "MIDDLE EAST",
      headline: "Israel kills 2nd senior Hamas chief in 24h",
      deck: "Wed Beach camp strike killed M. Abuelouf, wife & two children (IDF); 2nd in 24h (74,746).",
      source: "Reuters",
      verified: "CONFIRMED",
    },
    {
      id: 9,
      kind: "card",
      region: "OCEANIA",
      headline: "Australia, Solomons sign A$740m treaty",
      deck: "Albanese & Wale signed Wed: no foreign bases, A$740m/10yr; follows Tue China move.",
      source: "DFAT",
      verified: "CONFIRMED",
    },
    {
      id: 10,
      kind: "card",
      region: "EUROPE",
      headline: "UK energy bills to jump 26% to £2,166",
      deck: "Ofgem cap +£443 from Jan 2027 (high since Jun 2023); £100 aid (20m). PM Burnham vows reform.",
      source: "Ofgem",
      verified: "CONFIRMED",
    },
    {
      id: 11,
      kind: "card",
      region: "AMERICAS",
      headline: "Iowa lead azide blast: EPA sees zero lead",
      deck: "Army detonated 5 tons Wed 15:00 UTC; EPA logged ZERO airborne lead. Gov. Reynolds: 'successful'.",
      source: "EPA, KCRG",
      verified: "CONFIRMED",
    },
    {
      id: 12,
      kind: "card",
      region: "EUROPE",
      headline: "Ukraine hits Samara oil; ZNPP loses power",
      deck: "Strikes hit Syzran & Kuibyshev Rosneft refineries; shelling cut ZNPP power & hit Poltava (4 hurt).",
      source: "H.ua",
      verified: "CONFIRMED",
    },
    {
      id: 13,
      kind: "card",
      region: "OCEANIA",
      headline: "Australia inflation jumps to 4.9% in Oct",
      deck: "ABS Wed: CPI hit 4.9% (from 4.3%), fuel +6.3%; trimmed mean 3.8%. Chalmers cites Mideast war.",
      source: "ABS",
      verified: "CONFIRMED",
    },
    {
      id: 14,
      kind: "card",
      region: "OCEANIA",
      headline: "Liberal Sen. Leah Blyth joins One Nation",
      deck: "SA Sen. quit shadow frontbench Wed to join Hanson's party — 2nd defection in a yr, 5th senator.",
      source: "AAP",
      verified: "CONFIRMED",
    },
    {
      id: 15,
      kind: "card",
      region: "AMERICAS",
      headline: "NBA Tue: Tatum 41, Flagg 24+12, Pistons",
      deck: "Tue games (Wed UTC): Celtics 131–116, Mavs 120–101, Pistons 104–86; NHL Knights 5–3.",
      source: "AP",
      verified: "CONFIRMED",
    },
    // ---- 25 BRIEFS ("ALSO ON") -----------------------------------------
    {
      id: 16,
      kind: "brief",
      region: "EUROPE",
      headline: "EU: Commission 'strongly rejects' excess-capacity claim; backs 15% cap",
      deck: "Spokesman Olof Gill: hopes Washington honours the 2025 deal capping US tariffs on EU goods at 15%.",
      source: "European Commission via TBS News",
      verified: "CONFIRMED",
    },
    {
      id: 17,
      kind: "brief",
      region: "ASIA",
      headline: "China: Foreign Min.: tariff & trade wars benefit no one; studies Sec. 301",
      deck: "Beijing responds to the new US tariffs while studying the Section 301 findings.",
      source: "China Foreign Ministry via ForexRev",
      verified: "CONFIRMED",
    },
    {
      id: 18,
      kind: "brief",
      region: "AMERICAS",
      headline: "US DOJ: Never probed Jensen Huang pre-Mon return; no law broken",
      deck: "Three sources: DOJ never opened a formal probe into Huang before Trump's push for his Nvidia return.",
      source: "Reuters",
      verified: "CONFIRMED",
    },
    {
      id: 19,
      kind: "brief",
      region: "AMERICAS",
      headline: "US/China: No proof China told Alice Huang to spy on Nvidia CEO",
      deck: "US officials told Congress staff there is no evidence Alice Huang was directed by Chinese intelligence.",
      source: "WSJ via Reuters",
      verified: "CLAIM",
    },
    {
      id: 20,
      kind: "brief",
      region: "AMERICAS",
      headline: "Anthropic: Slid to $73.85 Wed (<$1T briefly); closed $82.79 (Tue $81.91)",
      deck: "Lowest since its Nasdaq debut; market value briefly fell below $1 trillion before recovering.",
      source: "Finnhub",
      verified: "CONFIRMED",
    },
    {
      id: 21,
      kind: "brief",
      region: "AMERICAS",
      headline: "Dell: Shares fell Wed despite Tue Q3 record ($54.94B); $132.3B AI backlog",
      deck: "Record revenue +103% and EPS $9.45 (+265%) could not save the stock from AI-spending doubts.",
      source: "Zacks",
      verified: "CONFIRMED",
    },
    {
      id: 22,
      kind: "brief",
      region: "AMERICAS",
      headline: "US: Jobless claims 189k; durable goods +0.2%; Beige Book: costs rising",
      deck: "Claims fell 13,000 to 189,000 (week to 21 Nov); durable orders rose 0.2% to $346.7bn.",
      source: "Labor Dept, Commerce, Fed via Dow Jones",
      verified: "CONFIRMED",
    },
    {
      id: 23,
      kind: "brief",
      region: "AMERICAS",
      headline: "US Storm: 60–70 mph winds, East Coast floods threaten 81.5m trips",
      deck: "Major storm crawls up the East Coast; Charleston tide exceeded 8 feet at major flood stage.",
      source: "Weather.com, Fox Weather, NWS",
      verified: "CONFIRMED",
    },
    {
      id: 24,
      kind: "brief",
      region: "GLOBAL",
      headline: "Chess: World G2: Gukesh–Sindarov draw in 20 moves (1–1, Geneva)",
      deck: "Game 2 ended in 1h 57m via the London System and threefold repetition; score level 1–1.",
      source: "ChessBase, FIDE",
      verified: "CONFIRMED",
    },
    {
      id: 25,
      kind: "brief",
      region: "EUROPE",
      headline: "Canaries: Record 2,100+ migrants arrive in 24h; 28,103 this year",
      deck: "One-day record for Spain's Canary Islands; total above last year but far below the 2024 record 46,843.",
      source: "Reuters",
      verified: "CONFIRMED",
    },
    {
      id: 26,
      kind: "brief",
      region: "AFRICA",
      headline: "Niger: Suspected IS abducted Saudi national on weekend (rptd Wed)",
      deck: "Kidnapped over the weekend (21 or 22 Nov) and held hostage, two security sources said Wednesday.",
      source: "Reuters",
      verified: "CONFIRMED",
    },
    {
      id: 27,
      kind: "brief",
      region: "AMERICAS",
      headline: "Colombia: Cartagena siege (begun Tue) ends Wed dawn; hostages freed",
      deck: "Forces freed the remaining hostages from an Éxito supermarket at 1:30 a.m. (06:30 GMT); 1 gunman killed.",
      source: "Reuters via Devdiscourse, Guardian",
      verified: "CONFIRMED",
    },
    {
      id: 28,
      kind: "brief",
      region: "MIDDLE EAST",
      headline: "Syria: Islamic State attack kills 2 security staff, wounds 5 in Hasaka",
      deck: "State television reported the attack in Hasaka, northeastern Syria, on Wednesday.",
      source: "Reuters via Syrian state media",
      verified: "CONFIRMED",
    },
    {
      id: 29,
      kind: "brief",
      region: "AFRICA",
      headline: "Mali: Barrick intl CEO Sebastiaan Bock meets PM Maiga in Bamako",
      deck: "First visit by a foreign executive of the company since its dispute with Mali's government.",
      source: "Reuters, Mali government",
      verified: "CONFIRMED",
    },
    {
      id: 30,
      kind: "brief",
      region: "ASIA",
      headline: "Beijing: China urges Netherlands for fair climate in Nexperia chip row",
      deck: "Foreign Minister met his Dutch counterpart in Beijing amid the prolonged Nexperia dispute.",
      source: "Reuters",
      verified: "CONFIRMED",
    },
    {
      id: 31,
      kind: "brief",
      region: "ASIA",
      headline: "Bangladesh: Garment min. wage raised 36% to Tk17,000 Wed (4–2)",
      deck: "From Tk12,500 after nearly 12 hours of talks; grades Tk17,000–21,500, effective 1 December.",
      source: "TBS News, AFP",
      verified: "CONFIRMED",
    },
    {
      id: 32,
      kind: "brief",
      region: "MIDDLE EAST",
      headline: "Gaza: Kushner urged Netanyahu (Tue call, first rptd Wed) on peace plan",
      deck: "Trump's envoy urged Netanyahu to meet commitments on the Gaza plan; warned Israel risks becoming a 'global pariah'.",
      source: "Axios, Jerusalem Post",
      verified: "CONFIRMED",
    },
    {
      id: 33,
      kind: "brief",
      region: "GLOBAL",
      headline: "UN: Türk warns of 'widening risk' of atrocity crimes in Gaza & W. Bank",
      deck: "UN rights chief: continuing attacks show a widening risk of further atrocity crimes against Palestinians.",
      source: "OHCHR, UN News",
      verified: "CONFIRMED",
    },
    {
      id: 34,
      kind: "brief",
      region: "MIDDLE EAST",
      headline: "Gaza: Winter rains threaten 1,000 shelters; 200k tents need replacing",
      deck: "Local councils warned Wednesday; the EU urged Israel to reopen all crossings for aid.",
      source: "Al Jazeera",
      verified: "CONFIRMED",
    },
    {
      id: 35,
      kind: "brief",
      region: "OCEANIA",
      headline: "Aus: Deputy PM Marles apologises in Parliament to LGBTQ+ veterans",
      deck: "\"This country did not keep its promise to you. But today this country says sorry,\" Marles said.",
      source: "Guardian Australia",
      verified: "CONFIRMED",
    },
    {
      id: 36,
      kind: "brief",
      region: "OCEANIA",
      headline: "Aus: Digital duty of care bill passes Parliament Wed (5% max fines)",
      deck: "Social media firms can be fined up to 5% of global revenue; citizens can sue Big Tech for harm.",
      source: "Guardian Australia",
      verified: "CONFIRMED",
    },
    {
      id: 37,
      kind: "brief",
      region: "AMERICAS",
      headline: "Brazil: Ex-Finance Min. Haddad tells Lula he won't join new Jan cabinet",
      deck: "Haddad — seen by investors as a moderate — had been considered for senior posts including chief of staff.",
      source: "Reuters",
      verified: "CONFIRMED",
    },
    {
      id: 38,
      kind: "brief",
      region: "ASIA",
      headline: "India: PM Modi tells Cabinet to prepare Parliament session before 15 Dec",
      deck: "Ministers told to finish preparations and avoid foreign travel ahead of the session.",
      source: "PTI via Deccan Herald",
      verified: "CONFIRMED",
    },
    {
      id: 39,
      kind: "brief",
      region: "AFRICA",
      headline: "Nigeria: Tinubu vows to free 78 Borno kids abducted in May & Jun 2026",
      deck: "42 children kidnapped from Mussa on 15 May and 36 from Lassa on 29 June 2026, held for months.",
      source: "ThisDay",
      verified: "CONFIRMED",
    },
    {
      id: 40,
      kind: "brief",
      region: "ASIA",
      headline: "Japan: PM Takaichi plans no new deficit bonds for FY extra budget",
      deck: "Government follows Tuesday's draft guidelines stressing fiscal sustainability and market confidence.",
      source: "TBS via Newsquawk, ForexLive",
      verified: "CONFIRMED",
    },
  ],
};

/** The 6-number strip across the top of the page ("THE DAY IN NUMBERS"). */
export interface StripNumber {
  value: string;
  label: string;
}

export const STRIP: StripNumber[] = [
  { value: "20%", label: "Extra US tariff on China (EU cap 15%)" },
  { value: "4.3%", label: "US Q3 GDP growth, fastest since Q3 2023" },
  { value: "-6.16%", label: "KOSPI Wed plunge, erasing Tue rebound" },
  { value: "2,100+", label: "Canary Islands 24h migrant arrival record" },
  { value: "£2,166", label: "UK energy price cap from Jan (+26%)" },
  { value: "3–0", label: "Liverpool win away at Club Brugge (UCL)" },
];

/** Region-bar counts printed on the page (after the two approved swaps). */
export const EXPECTED_REGIONS: Record<Region, number> = {
  AMERICAS: 13,
  EUROPE: 5,
  "MIDDLE EAST": 5,
  ASIA: 7,
  AFRICA: 3,
  OCEANIA: 5,
  GLOBAL: 2,
};

/** Count stories by kind: { lead, card, brief }. */
export function countByKind(entry: Entry): Record<StoryKind, number> {
  const counts: Record<StoryKind, number> = { lead: 0, card: 0, brief: 0 };
  for (const story of entry.stories) {
    counts[story.kind] += 1;
  }
  return counts;
}

/** Count stories by region, in the order printed on the region bar. */
export function countByRegion(entry: Entry): Record<Region, number> {
  const counts: Record<Region, number> = {
    AMERICAS: 0,
    EUROPE: 0,
    "MIDDLE EAST": 0,
    ASIA: 0,
    AFRICA: 0,
    OCEANIA: 0,
    GLOBAL: 0,
  };
  for (const story of entry.stories) {
    counts[story.region] += 1;
  }
  return counts;
}

/**
 * Validate the entry against the page's own rules. Returns a list of
 * problems; an empty list means the entry matches the printed page.
 * Rules: 40 stories total (3 leads + 12 cards + 25 briefs), ids 1-40
 * contiguous in order, 39 CONFIRMED + exactly 1 CLAIM (#19), regions
 * summing to 40, every story with a headline, deck and source.
 */
export function validateEntry(entry: Entry): string[] {
  const problems: string[] = [];
  const kinds = countByKind(entry);
  if (entry.stories.length !== 40) {
    problems.push(`expected 40 stories, got ${entry.stories.length}`);
  }
  if (kinds.lead !== 3) problems.push(`expected 3 leads, got ${kinds.lead}`);
  if (kinds.card !== 12) problems.push(`expected 12 cards, got ${kinds.card}`);
  if (kinds.brief !== 25) problems.push(`expected 25 briefs, got ${kinds.brief}`);
  entry.stories.forEach((story, index) => {
    if (story.id !== index + 1) {
      problems.push(`story at position ${index + 1} has id ${story.id}`);
    }
    if (story.headline.trim() === "") problems.push(`story #${story.id} has no headline`);
    if (story.deck.trim() === "") problems.push(`story #${story.id} has no deck`);
    if (story.source.trim() === "") problems.push(`story #${story.id} has no source`);
  });
  const claims = entry.stories.filter((s) => s.verified === "CLAIM");
  if (claims.length !== 1 || claims[0].id !== 19) {
    problems.push(
      `expected exactly 1 CLAIM (story #19), got ${claims.length} (${claims.map((s) => s.id).join(", ")})`,
    );
  }
  const regions = countByRegion(entry);
  const regionTotal = Object.values(regions).reduce((a, b) => a + b, 0);
  if (regionTotal !== 40) problems.push(`region counts sum to ${regionTotal}, expected 40`);
  for (const [region, expected] of Object.entries(EXPECTED_REGIONS)) {
    const got = regions[region as Region];
    if (got !== expected) {
      problems.push(`region ${region}: expected ${expected} stories, got ${got}`);
    }
  }
  if (STRIP.length !== 6) problems.push(`expected 6 strip numbers, got ${STRIP.length}`);
  if (entry.image !== "./entry.png") problems.push(`image path must be ./entry.png, got ${entry.image}`);
  return problems;
}

/** One-line-per-story text rendering of the entry (the page, as text). */
export function formatEntry(entry: Entry): string {
  const kinds = countByKind(entry);
  const regions = countByRegion(entry);
  const lines: string[] = [];
  lines.push(`${entry.title} — ${entry.date}`);
  lines.push(entry.edition);
  lines.push(`Image: ${entry.image}`);
  lines.push(
    `Stories: ${entry.stories.length} (${kinds.lead} leads, ${kinds.card} cards, ${kinds.brief} briefs)`,
  );
  lines.push(
    `Regions: ${Object.entries(regions)
      .map(([region, count]) => `${region} ${count}`)
      .join(" · ")}`,
  );
  lines.push(
    `Strip: ${STRIP.map((item) => `${item.value} (${item.label})`).join(" · ")}`,
  );
  lines.push("");
  for (const story of entry.stories) {
    lines.push(
      `#${story.id} [${story.kind.toUpperCase()} · ${story.region} · ${story.verified}] ${story.headline} — ${story.deck} (${story.source})`,
    );
  }
  return lines.join("\n");
}

// ---- Image staging: the bounty contract --------------------------------
// The server runs `node main.ts` twice and reads the image from
// /output/entry.png. This program MUST write it there — printing a
// summary alone produces no image and fails the entry's tests
// (valid 0, bytes null). Staging is verified byte-for-byte via SHA-256.
const ENTRY_NAME = "entry.png";
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = path.join(OUTPUT_DIR, ENTRY_NAME);

// PNG file signature: 8 magic bytes 89 50 4E 47 0D 0A 1A 0A
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function fail(message: string): never {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function sha256Hex(data: Buffer): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function stageImage(): void {
  const sourcePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    ENTRY_NAME,
  );
  if (!fs.existsSync(sourcePath)) {
    fail(`entry image not found: ${sourcePath}`);
  }
  const data = fs.readFileSync(sourcePath);
  if (data.length === 0) {
    fail(`entry image is empty (0 bytes): ${sourcePath}`);
  }
  if (
    data.length < PNG_MAGIC.length ||
    !data.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)
  ) {
    fail(`entry image is not a PNG file (bad magic bytes): ${sourcePath}`);
  }
  const MIN_SIZE_BYTES = 1024;
  if (data.length < MIN_SIZE_BYTES) {
    fail(
      `entry image suspiciously small (${data.length} bytes, minimum ${MIN_SIZE_BYTES}): ${sourcePath}`,
    );
  }
  if (data.length < 24) {
    fail(`entry image too short for a PNG IHDR chunk (${data.length} bytes): ${sourcePath}`);
  }
  const ihdrLength = data.readUInt32BE(8);
  const ihdrType = data.subarray(12, 16).toString("ascii");
  if (ihdrLength !== 13 || ihdrType !== "IHDR") {
    fail(
      `entry image has a corrupt PNG header (first chunk "${ihdrType}", length ${ihdrLength}): ${sourcePath}`,
    );
  }
  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  if (width === 0 || height === 0) {
    fail(`entry image has invalid PNG dimensions (${width}x${height}): ${sourcePath}`);
  }
  console.log(`PNG header OK: ${width}x${height}, ${data.length} bytes`);
  try {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.copyFileSync(sourcePath, OUTPUT_PATH);
  } catch (err) {
    fail(
      `cannot stage entry image to ${OUTPUT_PATH}: ` +
        `${err instanceof Error ? err.message : String(err)}`,
    );
  }
  let copy: Buffer;
  try {
    copy = fs.readFileSync(OUTPUT_PATH);
  } catch (err) {
    fail(
      `cannot read back staged copy ${OUTPUT_PATH}: ` +
        `${err instanceof Error ? err.message : String(err)}`,
    );
  }
  const sourceHash = sha256Hex(data);
  const copyHash = sha256Hex(copy);
  if (sourceHash !== copyHash) {
    fail(
      `copy verification failed: SHA-256 mismatch for ${OUTPUT_PATH} ` +
        `(source ${sourceHash} != copy ${copyHash})`,
    );
  }
  console.log(
    `OK: ${ENTRY_NAME} (${data.length} bytes, SHA-256 ${sourceHash}) staged to ${OUTPUT_PATH}`,
  );
}

export function main(): void {
  const problems = validateEntry(ENTRY);
  if (problems.length > 0) {
    console.log("Wednesday Meridian — VALIDATION FAILED");
    for (const problem of problems) {
      console.log(`  - ${problem}`);
    }
    process.exit(1);
  }
  stageImage();
  console.log(formatEntry(ENTRY));
  console.log("");
  console.log("Validation: OK — 40 stories, 39 CONFIRMED + 1 CLAIM (#19).");
}

main();
