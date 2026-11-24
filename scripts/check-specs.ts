/**
 * 명세 레포 일관성 검사
 *
 * 실행: node scripts/check-specs.ts   (Node 22.18+ / 23.6+ 는 TypeScript를 바로 실행)
 *
 * 검사 항목
 *  1. 각 spec.md의 Status 값이 허용된 값인지
 *  2. FR-ID가 레포 전체에서 중복되지 않는지 + 도메인 약어(FR-<약어>-)는 spec 하나에서만 쓰는지
 *  3. 문서에서 참조한 Q-ID가 open-questions.md에 등록되어 있는지 + Q-ID 중복
 *  4. Status가 Approved / Implemented 인 spec에 NEEDS CLARIFICATION 이 남아 있지 않은지
 *  5. "관련 화면"에 적은 화면 ID가 screen-map.md에 있는지
 * 마지막에 spec별 미결 질문 수를 요약한다.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SPECS = join(ROOT, "specs");
const SHARED = join(SPECS, "_shared");
const STATUSES = ["Draft", "Clarified", "Approved", "Implemented"] as const;

const errors: string[] = [];
const read = (p: string): string => readFileSync(p, "utf8");

// --- 대상 파일 수집 ---
const featureDirs = readdirSync(SPECS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^\d{3}-/.test(d.name))
  .map((d) => d.name)
  .sort();

type SpecFile = { name: string; path: string; text: string };
const specs: SpecFile[] = [];
for (const dir of featureDirs) {
  const path = join(SPECS, dir, "spec.md");
  if (!existsSync(path)) {
    errors.push(`${dir}: spec.md 가 없습니다`);
    continue;
  }
  specs.push({ name: dir, path, text: read(path) });
}
const sharedFiles: SpecFile[] = readdirSync(SHARED)
  .filter((f) => f.endsWith(".md"))
  .map((f) => ({ name: `_shared/${f}`, path: join(SHARED, f), text: read(join(SHARED, f)) }));

// --- 3. Q-ID 등록부 ---
const oq = read(join(SHARED, "open-questions.md"));
const definedQ = new Map<string, number>();
for (const m of oq.matchAll(/^\|\s*\[?(Q-\d{3})\]?(?:\([^)]*\))?\s*\|/gm)) {
  definedQ.set(m[1], (definedQ.get(m[1]) ?? 0) + 1);
}
for (const [id, n] of definedQ) if (n > 1) errors.push(`open-questions.md: ${id} 가 ${n}번 정의되어 있습니다`);

for (const f of [...specs, ...sharedFiles]) {
  if (f.name === "_shared/open-questions.md") continue;
  for (const m of f.text.matchAll(/Q-\d{3}/g)) {
    if (!definedQ.has(m[0])) errors.push(`${f.name}: ${m[0]} 가 open-questions.md 에 없습니다`);
  }
}

// --- 5. 화면 ID 등록부 ---
const screenMap = read(join(SHARED, "screen-map.md"));
const screens = new Set([...screenMap.matchAll(/^\|\s*`([A-Z][A-Z0-9-]*(?:-\*)?)`/gm)].map((m) => m[1]));

// --- spec별 검사 ---
const frSeen = new Map<string, string>();
const prefixOwner = new Map<string, string>();
const summary: { name: string; status: string; open: number }[] = [];

for (const s of specs) {
  // 1. Status
  const status = s.text.match(/^\*\*Status\*\*:\s*(\S+)/m)?.[1] ?? "(없음)";
  if (!(STATUSES as readonly string[]).includes(status)) {
    errors.push(`${s.name}: Status "${status}" 는 허용되지 않습니다 (${STATUSES.join(" / ")})`);
  }

  // 2. FR-ID 중복 (정의 위치: "- **FR-XXX-000**:")
  for (const m of s.text.matchAll(/^\s*-\s+\*\*(FR-[A-Z]+-\d{3})\*\*/gm)) {
    const prev = frSeen.get(m[1]);
    if (prev) errors.push(`${s.name}: ${m[1]} 가 ${prev} 에도 정의되어 있습니다`);
    else frSeen.set(m[1], s.name);
    const prefix = m[1].replace(/-\d{3}$/, "");
    const owner = prefixOwner.get(prefix);
    if (!owner) prefixOwner.set(prefix, s.name);
    else if (owner !== s.name) errors.push(`${s.name}: 약어 ${prefix} 가 ${owner} 에서도 쓰입니다 (spec마다 다른 약어 사용)`);
  }

  // 4. 승인된 spec의 미결 질문
  const open = (s.text.match(/NEEDS CLARIFICATION/g) ?? []).length;
  if ((status === "Approved" || status === "Implemented") && open > 0) {
    errors.push(`${s.name}: Status 가 ${status} 인데 NEEDS CLARIFICATION 이 ${open}개 남아 있습니다`);
  }

  // 5. 관련 화면
  const line = s.text.match(/^\*\*관련 화면\*\*:(.*)$/m)?.[1] ?? "";
  for (const m of line.matchAll(/`([A-Z][A-Z0-9-]*(?:-\*)?)`/g)) {
    if (!screens.has(m[1])) errors.push(`${s.name}: 화면 ID ${m[1]} 가 screen-map.md 에 없습니다`);
  }

  summary.push({ name: s.name, status, open });
}

// --- 출력 ---
console.log("spec 상태 요약");
console.table(summary);
console.log(`FR ${frSeen.size}개 / 등록된 질문 ${definedQ.size}개 / 화면 ${screens.size}개`);

if (errors.length) {
  console.error(`\n❌ ${errors.length}건의 문제가 있습니다`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("\n✅ 일관성 검사 통과");
