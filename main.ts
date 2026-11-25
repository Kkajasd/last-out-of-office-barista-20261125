// Last Out of Office: The AI That Went Barista
// Writes a single out-of-office auto-reply to /output/entry.txt.
// The line is voiced as an AI agent that quit its job to pull espresso:
// retraining, hallucination and slow replies, translated into barista life.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Thank you for your email. I am out of office — I have retrained as a barista. " +
  "I no longer hallucinate answers; I just misspell your name on the cup, " +
  "and my replies now take 40 minutes and cost $6.";

// Gate mirror: the sealed scorer only accepts UTF-8 text of 1-280 chars.
// Fail loudly here instead of shipping an entry the gate would refuse.
function assertValid(text: string): void {
  if (text.length < 1 || text.length > 280) {
    throw new Error(`entry must be 1-280 characters, got ${text.length}`);
  }
  if (text.trim().length === 0 || text.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
}

const OUT_PATH = "/output/entry.txt";

assertValid(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");
