# Feature Specification: [기능 이름]

**Feature Branch**: `[###-feature-name]`

**Created**: [DATE]

**Status**: Draft

**Input**: "$ARGUMENTS" (요청 Issue: #[번호])

**관련 화면**: `[화면 ID]`, `[화면 ID]`

<!--
  Unplan 작성 규칙 (AGENTS.md, constitution.md)
  - 한국어로 쓴다. 용어·코드값은 specs/_shared/glossary.md 표기만 쓴다. 새 용어는 용어집에 먼저 추가한다.
  - 요구사항 ID는 FR-<도메인>-### 형식이다. <도메인>은 이 spec에만 쓰는 새 대문자 약어다 (기존 약어는 CONTRIBUTING.md "도메인 약어" 표).
  - 화면 ID는 specs/_shared/screen-map.md에 먼저 등록하고 "관련 화면"에 적는다.
  - 정해지지 않은 내용은 추측하지 않고 [NEEDS CLARIFICATION: Q-### 요약] 으로 표시한 뒤
    specs/_shared/open-questions.md 에 질문을 등록한다. 제안이 있으면 "제안:"으로 구분한다.
  - 기존 spec의 요구사항·공통 정책(POL-###)을 재사용할 때는 ID로 참조한다. 내용을 복사하지 않는다.
  - "무엇을, 왜"만 쓴다. 프레임워크·테이블·API 경로는 쓰지 않는다.
-->

## User Scenarios & Testing *(mandatory)*

<!--
  사용자 이야기는 중요도 순(P1, P2, P3)으로 쓴다.
  각 이야기는 그것만 구현해도 사용자가 가치를 얻을 수 있어야 하고, 따로 테스트할 수 있어야 한다.
-->

### User Story 1 - [짧은 제목] (Priority: P1)

[사용자 관점의 흐름을 쉬운 말로]

**Why this priority**: [이 우선순위인 이유]

**Independent Test**: [이 이야기만으로 어떻게 확인할 수 있는지]

**Acceptance Scenarios**:

1. **Given** [처음 상태], **When** [사용자 행동], **Then** [기대 결과]
2. **Given** [처음 상태], **When** [사용자 행동], **Then** [기대 결과]

---

### User Story 2 - [짧은 제목] (Priority: P2)

[사용자 관점의 흐름]

**Why this priority**: [이유]

**Independent Test**: [확인 방법]

**Acceptance Scenarios**:

1. **Given** [처음 상태], **When** [사용자 행동], **Then** [기대 결과]

---

### Edge Cases

- [경계 조건]일 때는?
- [오류 상황]일 때는? (공통 처리는 POL-006 참조)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-[도메인]-001**: 시스템은 [동작]해야 한다.
- **FR-[도메인]-002**: 사용자는 [행동]할 수 있어야 한다.
- **FR-[도메인]-003**: [항목]은 [수치 제한]이어야 한다. (FE·BE가 같은 값을 써야 하는 검증 규칙은 수치로 적는다)
- **FR-[도메인]-004**: [동작]: [NEEDS CLARIFICATION: Q-### 정해지지 않은 내용 요약]

### Key Entities *(데이터가 있을 때)*

- **[엔티티]**: [무엇인지, 주요 속성]. 기존 엔티티는 `specs/_shared/domain-model.md`를 참조하고, 새 엔티티·속성은 그 문서에도 추가한다.

## UI Notes *(디자인 소유)*

| 종류 | 문구 | 버튼 |
|---|---|---|
| Toast / Modal / 빈 상태 / Placeholder | [문구] | [버튼] |

- Figma: [링크] (프레임 이름 `[화면 ID] 화면명`)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-[도메인]-001**: [측정 가능한 결과. 기술 용어 없이]

## Assumptions

- [요청에 없어서 합리적으로 가정한 내용. 확인이 필요하면 질문으로 등록]

## Changelog

- [DATE]: 초안 작성 (Draft)
