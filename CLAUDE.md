# CLAUDE.md

이 레포는 Unplan의 기획 명세 SSOT다. 코드가 아니라 명세 문서만 있다.

- 먼저 `.specify/memory/constitution.md`를 읽고 따른다.
- 문서는 한국어로 쓴다. 용어는 `specs/_shared/glossary.md` 표기만 쓴다.
- 정해지지 않은 내용을 추측해서 채우지 않는다. `[NEEDS CLARIFICATION: Q-### 요약]`으로 표시하고 `specs/_shared/open-questions.md`에 질문을 등록한다. 제안이 있으면 `제안:`으로 구분한다.
- 원본 시트에서 온 요구사항은 `(R###)` 출처를 유지한다. 원본은 `archive/`에 있다.
- 변경 후 `node scripts/check-specs.ts`를 실행해 통과를 확인한다.
