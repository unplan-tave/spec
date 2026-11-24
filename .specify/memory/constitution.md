# Unplan Spec Constitution

이 문서는 Unplan 명세 레포(SSOT)의 최상위 규칙이다. 모든 `spec.md`, 공통 문서, FE/BE 구현은 이 문서를 따른다.
이 문서와 다른 문서가 충돌하면 이 문서가 우선한다.

## Core Principles

### I. 명세가 단일 진실 공급원(SSOT)이다

- 디자인, FE, BE는 이 레포의 `main` 브랜치에 있는 명세만 근거로 작업한다.
- Google Sheets, Notion, Figma 코멘트, 메신저 대화는 근거가 아니다. 그곳에서 결정된 내용은 이 레포에 PR로 반영된 뒤에만 유효하다.
- 원본 스프레드시트는 `archive/`에 읽기 전용으로 보관한다. 이후 수정하지 않는다.

### II. 명세 먼저, 코드는 그다음 (Spec First)

- 명세에 없는 동작은 구현하지 않는다.
- 구현 중 명세와 다른 점이나 빠진 점을 발견하면, 코드에서 임의로 처리하지 않고 이 레포에 Issue(`clarification`) 또는 PR을 먼저 올린다.
- 명세 변경 PR이 머지된 뒤에 해당 코드를 변경한다. 급한 경우에도 명세 PR 링크 없이 코드 PR을 머지하지 않는다.

### III. 모호함은 숨기지 않고 표시한다

- 정해지지 않은 내용은 추측해서 채우지 않고 `[NEEDS CLARIFICATION: Q-### 요약]` 으로 표시한다.
- 모든 Q-ID는 `specs/_shared/open-questions.md`에 등록되어야 한다.
- 제안값이 있으면 `제안:`으로 함께 적되, 승인 전까지는 확정이 아니다.

### IV. 하나의 용어, 하나의 의미

- 화면 이름, 상태 이름, 데이터 이름은 `specs/_shared/glossary.md`에 정의된 표기만 사용한다.
- 새 용어가 필요하면 용어집을 먼저 수정한다. 같은 개념을 다른 이름으로 부르지 않는다. (예: 진행도 상태를 `미완료`와 `시작 전`으로 혼용 금지)

### V. 추적 가능성 (Traceability)

- 모든 요구사항은 전역에서 유일한 ID를 가진다: `FR-<도메인>-<번호>` (예: `FR-CARD-012`)
- 모든 화면은 `specs/_shared/screen-map.md`의 화면 ID를 가진다 (예: `EDIT-CARD`)
- 원본 시트에서 옮겨온 요구사항은 원본 행 번호를 `(R183)` 형식으로 남긴다.
- FE/BE 커밋·PR·테스트 이름에는 관련 FR-ID를 포함한다. Figma 프레임 이름에는 화면 ID를 포함한다.

### VI. 기술 중립적인 요구사항

- `spec.md`는 "무엇을, 왜"만 다룬다. 프레임워크, 테이블 구조, API 경로는 FE/BE 레포의 `plan.md`·계약 문서에서 다룬다.
- 단, FE와 BE가 반드시 같은 값을 써야 하는 검증 규칙(글자 수, 개수 제한, 시간 단위 등)은 `spec.md`에 수치로 명시한다.

## 문서 계층과 소유권

| 계층 | 위치 | 소유 | 수정 규칙 |
|---|---|---|---|
| 헌법 | `.specify/memory/constitution.md` | 기획 | 기획 + 각 파트 리드 1인 이상 승인 |
| 공통 정책, 용어집, 도메인 모델, 화면 맵 | `specs/_shared/` | 기획 | 기획 승인 필수 |
| 기능 요구사항 | `specs/###-*/spec.md` | 기획 | 기획 승인 필수 |
| 화면 상태·문구·Figma 링크 | `spec.md` 내 `UI Notes` 섹션 | 디자인 | 디자인 승인 필수 |
| 구현 계획, 데이터 모델, API 계약 | FE/BE 레포 (`plan.md`, `contracts/`) | FE/BE | 각 레포 규칙을 따름. 요구사항과 충돌 시 이 레포에 Issue |

## 명세 상태 (Status)

각 `spec.md` 상단의 `Status`는 다음 중 하나다.

| 상태 | 의미 | 구현 착수 |
|---|---|---|
| `Draft` | 작성 중. `NEEDS CLARIFICATION` 남아 있음 | 불가 |
| `Clarified` | 모든 질문이 결정됨. 리뷰 대기 | 불가 |
| `Approved` | 기획·디자인·FE·BE 리뷰 완료 | 가능 |
| `Implemented` | FE/BE 구현 및 검수 완료 | - |

- `Approved` 이상인 spec에는 `NEEDS CLARIFICATION`이 남아 있으면 안 된다 (CI가 검사한다).
- `Approved` 이후 요구사항을 바꾸면 해당 spec은 다시 `Clarified`로 내리고, 변경 내용을 `Changelog`에 남긴다.

## Governance

- 모든 변경은 PR로만 한다. `main` 직접 push 금지.
- PR은 `.github/pull_request_template.md`의 영향 범위 체크리스트를 채운다.
- 이 헌법의 개정은 버전을 올리고(MAJOR: 원칙 삭제/변경, MINOR: 원칙 추가, PATCH: 문구 수정) 하단 날짜를 갱신한다.

**Version**: 1.0.0 | **Ratified**: 2026-11-24 | **Last Amended**: 2026-11-24
