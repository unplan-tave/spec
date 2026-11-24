# Feature Specification: 온보딩 (앱 소개 · 추천 개인화)

**Feature Branch**: `002-onboarding`

**Created**: 2026-11-24

**Status**: Draft

**Input**: 원본 기능명세서 R21~R50, R58, IA R7~R12

**관련 화면**: `ONB-WELCOME`, `ONB-INTRO-QUEUE`, `ONB-INTRO-PIN`, `ONB-INTRO-PERSONAL`, `ONB-RECOVERY`, `ONB-SLEEP-ZONE`, `ONB-ACTIVITY`, `ONB-TRANSPORT`

> ⚠️ 온보딩 단계 구성이 IA와 명세에서 다르다. 이 문서는 **명세 기준**으로 작성했다. [NEEDS CLARIFICATION: Q-010]

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 앱 소개 보기 (Priority: P2)

신규 사용자가 큐 카드와 핀 카드의 차이를 이해하고 개인화 설정으로 넘어간다.

**Acceptance Scenarios**:

1. **Given** 온보딩 미완료 사용자, **When** 로그인을 마치면, **Then** `ONB-WELCOME`("만나서 반가워요!")이 표시된다.
2. **Given** 앱 소개 화면, **When** 다음으로 넘기면, **Then** `ONB-INTRO-QUEUE`("할 일은 큐 카드로 담고") → `ONB-INTRO-PIN`("정해진 일정은 핀 카드로") → `ONB-INTRO-PERSONAL`(개인화 추천 안내) 순서로 표시된다.
   - 넘기는 방식(버튼/스와이프), 건너뛰기 버튼 유무: [NEEDS CLARIFICATION: Q-060]

---

### User Story 2 - 추천 개인화 정보 입력 (Priority: P1)

사용자가 회복 방법, 수면 구간, 하루 활동 패턴, 이동 방식을 입력하면 이후 추천에 쓰인다.

**Why this priority**: 추천 기능(007)의 입력값이다.

**Independent Test**: 4단계를 마치고 설정 탭(009)에서 같은 값이 보이는지 확인한다.

**Acceptance Scenarios**:

1. **Given** `ONB-RECOVERY`, **When** 회복 방법을 하나도 고르지 않으면, **Then** 확인 버튼이 비활성이다.
2. **Given** `ONB-RECOVERY`에서 1개 이상 선택, **When** 확인을 누르면, **Then** `ONB-SLEEP-ZONE`으로 이동한다.
3. **Given** `ONB-SLEEP-ZONE` 첫 진입, **When** 화면이 열리면, **Then** 기본 구간(위험 0~3h / 부족 3~6h / 적정 6~9h / 과다 9h 초과)과 목표 수면 7시간 30분이 표시되고 확인 버튼이 활성이다.
4. **Given** `ONB-ACTIVITY`, **When** 수면 시간대가 1시간 이상 설정되지 않았으면, **Then** 확인 버튼이 비활성이다.
5. **Given** `ONB-TRANSPORT`, **When** 확인 또는 "이동 방식 설정 건너뛰기"를 누르면, **Then** 온보딩 완료가 저장되고 초기 홈화면(`HOME-EMPTY`)으로 이동한다.

---

### Edge Cases

- 구간 경계선을 다른 경계선과 30분 미만으로 붙이려 하면 → 각 구간 최소 30분을 유지하며 더 이동하지 않는다. (R35)
- 12시간 초과 수면 → 화면 표시 범위를 넘으므로 시스템에서 과다 구간으로 분류한다. (R37, R38)
- 온보딩 중 앱 종료, 뒤로 가기: [NEEDS CLARIFICATION: Q-012]
- 직접 입력 항목을 추가하고 내용을 비운 채 확인: [NEEDS CLARIFICATION: Q-014]

## Requirements *(mandatory)*

### Functional Requirements

**앱 소개**

- **FR-ONB-001**: 온보딩 미완료 사용자가 로그인을 마치면 `ONB-WELCOME`을 표시해야 한다. (R21, R22) [NEEDS CLARIFICATION: Q-011 판단 기준]
- **FR-ONB-002**: 앱 소개는 환영 → 큐 카드 소개 → 핀 카드 소개 → 개인화 추천 안내 순서로 표시해야 한다. (R22~R25)

**컨디션 회복 방법** (`ONB-RECOVERY`)

- **FR-ONB-010**: 기본 회복 방법 5개를 복수 선택·해제할 수 있어야 한다: 짧은 낮잠, 음악 감상, 가벼운 산책, 스트레칭, 음식/간식. (R27) [NEEDS CLARIFICATION: Q-013 설정 탭과 항목명 불일치, 순서 규칙]
- **FR-ONB-011**: 사용자가 직접 입력 항목을 **최대 1개** 추가할 수 있어야 한다. (R28)
- **FR-ONB-012**: 직접 입력 항목의 내용을 입력·수정하고, 선택·해제할 수 있어야 한다. (R29, R30) [NEEDS CLARIFICATION: Q-014 글자 수, 빈 값]
- **FR-ONB-013**: 1개 이상 선택되었을 때만 확인 버튼을 활성화해야 한다. (R31)
- **FR-ONB-014**: 확인을 누르면 `ONB-SLEEP-ZONE`으로 이동해야 한다. (R32)

**수면 시간별 컨디션** (`ONB-SLEEP-ZONE`)

- **FR-ONB-020**: 첫 진입 시 기본값을 표시해야 한다: 위험 0~3시간, 부족 3~6시간, 적정 6~9시간, 과다 9시간 초과, 목표 수면 7시간 30분. (R34)
  - 경계값이 정확히 3시간·6시간·9시간일 때 어느 구간인지: [NEEDS CLARIFICATION: Q-061]
- **FR-ONB-021**: 구간 경계선을 움직여 4개 구간을 설정할 수 있어야 한다. 경계선은 **30분 단위**로만 움직이고, 각 구간은 **최소 30분**이다. (R35)
- **FR-ONB-022**: 화면의 표시 범위는 0~12시간이며, 12시간 초과 수면은 과다 구간으로 분류해야 한다. (R37, R38)
- **FR-ONB-023**: 목표 수면 시간을 지정할 수 있어야 한다. (R36) [NEEDS CLARIFICATION: Q-056 단위·범위]
- **FR-ONB-024**: 기본값이 있으므로 변경 없이도 확인 버튼이 활성이어야 한다. (R39)
- **FR-ONB-025**: 확인을 누르면 `ONB-ACTIVITY`로 이동해야 한다. (R40)

**하루 활동 패턴** (`ONB-ACTIVITY`)

- **FR-ONB-030**: 집중 잘되는 시간, 졸린 시간, 수면 시간을 각각 설정·해제할 수 있어야 한다. 0~24시 범위, **1시간 단위**, 떨어진 여러 구간 설정 가능. (R42~R44)
- **FR-ONB-031**: 수면 시간은 필수이며, 합계 1시간 이상일 때만 확인 버튼을 활성화해야 한다. (R44, R45)
- **FR-ONB-032**: 같은 시간대를 집중·졸림·수면 중 둘 이상에 동시에 지정할 수 있는가: [NEEDS CLARIFICATION: Q-062]
- **FR-ONB-033**: 자정을 넘는 수면 시간대(예: 23~07시) 입력 방식: [NEEDS CLARIFICATION: Q-062]
- **FR-ONB-034**: 확인을 누르면 `ONB-TRANSPORT`로 이동해야 한다. (R46)

**선호 이동방식** (`ONB-TRANSPORT`)

- **FR-ONB-040**: 도보, 자전거, 대중교통, 자동차 중 복수 선택·해제할 수 있어야 한다. (R48)
  - 0개 선택 상태에서 확인 버튼 활성 여부: [NEEDS CLARIFICATION: Q-063]
- **FR-ONB-041**: 확인 또는 "이동 방식 설정 건너뛰기"를 누르면 온보딩 완료를 저장하고 `HOME-EMPTY`로 이동해야 한다. (R49, R50, R57)

**공통**

- **FR-ONB-050**: 온보딩에서 입력한 값은 설정 > 추천 개인화 설정(009)의 초기값이 되어야 한다.
- **FR-ONB-051**: 이동 방식과 집중/졸린 시간이 어떤 기능에 쓰이는지 007에 정의되어야 한다. [NEEDS CLARIFICATION: Q-019]

### Key Entities

- **UserPreference**: `specs/_shared/domain-model.md` 참조.

## UI Notes *(디자인 소유)*

- 문구: 환영 "만나서 반가워요!", 큐 카드 "할 일은 큐 카드로 담고", 핀 카드 "정해진 일정은 핀 카드로"
- 개인화 추천 안내 문구: TBD

## Success Criteria *(mandatory)*

- **SC-ONB-001**: 기본값을 그대로 쓰는 사용자는 회복 방법 1개 선택 + 수면 시간대 입력만으로 온보딩을 마칠 수 있다.
- **SC-ONB-002**: 온보딩에서 입력한 모든 값이 설정 탭에서 동일하게 보인다.

## Assumptions

- 알림 권한 요청은 온보딩이 아니라 초기 홈화면의 모달(003)에서 한다. (명세 기준, IA와 다름)

## Changelog

- 2026-11-24: 원본 스프레드시트에서 이관 (Draft)
