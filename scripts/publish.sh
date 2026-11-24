#!/usr/bin/env bash
# main의 명세 문서만 골라 `published` 브랜치에 커밋한다.
# FE·BE 레포는 이 브랜치를 submodule로 연결하므로, 에이전트 지침(AGENTS.md, CLAUDE.md),
# 스킬(.claude/, .agents/), spec-kit 설정(.specify/), CI(.github/)는 들어가지 않는다.
#
# 사용: scripts/publish.sh [--push]
#   저장소 루트(main 체크아웃)에서 실행한다. --push 가 없으면 커밋까지만 하고 push하지 않는다.
set -euo pipefail

BRANCH=published
ROOT="$(git rev-parse --show-toplevel)"
OUT="$(mktemp -d)"
SRC_SHA="$(git -C "$ROOT" rev-parse HEAD)"
SRC_SHORT="$(git -C "$ROOT" rev-parse --short HEAD)"
SRC_SUBJECT="$(git -C "$ROOT" log -1 --format=%s)"

cleanup() { git -C "$ROOT" worktree remove --force "$OUT" >/dev/null 2>&1 || rm -rf "$OUT"; }
trap cleanup EXIT

# 1. 기존 published 브랜치를 이어받거나, 없으면 새로 만든다 (main 이력과 섞이지 않는 독립 브랜치)
rmdir "$OUT"
if git -C "$ROOT" ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  git -C "$ROOT" fetch --quiet --depth 1 origin "$BRANCH"
  git -C "$ROOT" worktree add --quiet --detach "$OUT" FETCH_HEAD
else
  git -C "$ROOT" worktree add --quiet --detach "$OUT" HEAD
  git -C "$OUT" checkout --quiet --orphan "$BRANCH"
fi

# 2. 내용을 비우고 허용한 경로만 복사한다
find "$OUT" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R "$ROOT/specs" "$OUT/specs"
cp -R "$ROOT/archive" "$OUT/archive"
cp "$ROOT/.specify/memory/constitution.md" "$OUT/constitution.md"

cat > "$OUT/README.md" <<EOF
# Unplan Spec (published)

> **자동 생성 브랜치입니다. 직접 수정하지 마세요.**
> 명세를 바꾸려면 [unplan-tave/spec](https://github.com/unplan-tave/spec) \`main\`에 Issue나 PR을 올립니다.

- 원본: \`main\` @ [\`${SRC_SHORT}\`](https://github.com/unplan-tave/spec/commit/${SRC_SHA}) — ${SRC_SUBJECT}
- 이 브랜치에는 명세 문서만 있습니다: \`specs/\`, \`archive/\`, \`constitution.md\`
- FE·BE 레포에서 \`spec/\` 폴더는 **읽기 전용 참고 자료**입니다.
EOF

cat > "$OUT/published.json" <<EOF
{
  "source_repository": "unplan-tave/spec",
  "source_branch": "main",
  "source_commit": "${SRC_SHA}"
}
EOF

# 3. 바뀐 게 있을 때만 커밋한다
cd "$OUT"
git add -A
if git diff --cached --quiet && git rev-parse --verify --quiet HEAD >/dev/null; then
  echo "변경 없음: published 는 이미 main@${SRC_SHORT} 와 같습니다"
  exit 0
fi
git -c user.name="github-actions[bot]" \
    -c user.email="41898282+github-actions[bot]@users.noreply.github.com" \
    commit --quiet -m "publish: main@${SRC_SHORT}" -m "${SRC_SUBJECT}" -m "Source: ${SRC_SHA}"
echo "커밋: $(git log -1 --format='%h %s')"

if [[ "${1:-}" == "--push" ]]; then
  git push --quiet origin "HEAD:refs/heads/${BRANCH}"
  echo "push 완료: ${BRANCH}"
fi
