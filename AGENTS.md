# AGENTS.md

AI 코딩 에이전트(Claude Code, Codex 등)가 이 레포에서 작업할 때 따르는 **공통 지침**이다.
`CLAUDE.md`는 이 파일을 그대로 불러온다. 지침을 바꿀 때는 이 파일만 고친다.

## 이 레포

- Unplan의 기획 명세 SSOT다. 앱 코드는 없고 명세 문서만 있다.
- 최상위 규칙은 `.specify/memory/constitution.md`다. 작업 전에 읽고 따른다.
- 사람용 작업 안내는 `CONTRIBUTING.md`에 있다.

## 작성 규칙

- 문서는 한국어로 쓴다.
- 용어와 코드값은 `specs/_shared/glossary.md` 표기만 쓴다. 새 용어가 필요하면 용어집을 먼저 고친다.
- 정해지지 않은 내용을 추측해서 채우지 않는다. `[NEEDS CLARIFICATION: Q-### 요약]`으로 표시하고 `specs/_shared/open-questions.md`에 질문을 등록한다. 제안이 있으면 `제안:`으로 구분한다.
- 원본 시트에서 온 요구사항은 `(R###)` 출처를 유지한다. `archive/`는 읽기 전용이다. 수정하지 않는다.
- ID 형식: 요구사항 `FR-<도메인>-###`(전역 유일), 화면 `screen-map.md`의 화면 ID, 정책 `POL-###`, 질문 `Q-###`.
- 새 요구사항 번호는 해당 spec의 마지막 번호 다음을 쓴다. 지운 번호는 다시 쓰지 않는다.
- `spec.md`에는 "무엇을, 왜"만 쓴다. 프레임워크·테이블·API 경로 같은 구현 방식은 쓰지 않는다.

## 질문(Q)이 결정되었을 때

사용자가 "Q-004는 B안으로 결정" 같은 지시를 주면 한 PR 안에서 모두 처리한다.

1. 관련 spec에서 `[NEEDS CLARIFICATION: Q-004 …]`를 찾아 결정된 요구사항으로 바꾼다. (`grep -rn "Q-004" specs/`)
2. 결정이 용어·정책·데이터·화면에 영향을 주면 `_shared/` 문서도 함께 고친다.
3. `open-questions.md`의 해당 행 "결정" 열을 채운다. 행은 지우지 않는다.
4. 그 spec에 `NEEDS CLARIFICATION`이 하나도 남지 않으면 `Status`를 `Clarified`로 올리고 `Changelog`에 한 줄 남긴다.
5. PR 본문에 `Closes #<이슈 번호>`를 쓴다. 이슈 번호는 `open-questions.md`의 Q-ID 링크에 있다.

결정 내용이 모호하거나 다른 요구사항과 충돌하면 고치지 말고 사용자에게 먼저 묻는다.

## 변경 절차

- `main`에 직접 커밋·push하지 않는다. 브랜치를 만들고 PR을 올린다.
- PR 본문은 `.github/pull_request_template.md`의 항목을 채운다.
- `Status`가 `Approved` 이상인 spec의 요구사항을 바꾸면 `Clarified`로 내리고 `Changelog`에 이유를 쓴다.
- 커밋 전에 검사를 돌려 통과를 확인한다:

  ```bash
  node scripts/check-specs.ts
  ```

## spec-kit 명령

spec-kit 스킬이 두 에이전트용으로 설치되어 있다. 내용은 같고 호출 방식만 다르다.

| 용도 | Claude Code (`.claude/skills/`) | Codex (`.agents/skills/`) |
|---|---|---|
| 남은 질문을 하나씩 물어 spec에 반영 | `/speckit-clarify` | `$speckit-clarify` |
| 요구사항 품질 체크리스트 | `/speckit-checklist` | `$speckit-checklist` |
| 새 기능 spec 초안 | `/speckit-specify` | `$speckit-specify` |
| 헌법 개정 | `/speckit-constitution` | `$speckit-constitution` |
| spec·plan·tasks 일관성 점검 | `/speckit-analyze` | `$speckit-analyze` |

`plan`, `tasks`, `implement`는 FE/BE 레포에서 쓴다. 이 레포에서는 실행하지 않는다.

스킬은 `.specify/`가 관리한다. 직접 고치지 말고 spec-kit을 업데이트할 때 함께 갱신한다:

```bash
uvx --from git+https://github.com/github/spec-kit.git specify integration upgrade claude
```

```bash
uvx --from git+https://github.com/github/spec-kit.git specify integration upgrade codex
```
