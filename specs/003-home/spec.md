# Feature Specification: 홈 (타임라인 · 보기 모드 · 날짜별 메모 · 홈 컨디션 · 알림 권한)

**Feature Branch**: `003-home`

**Created**: 2026-11-24

**Status**: Draft

**Input**: 원본 기능명세서 R52~R110, 초기 기능명세서 헤더·pin card 영역, IA R14~R23

**관련 화면**: `HOME-MAIN`, `HOME-EMPTY`, `HOME-NOTI-PERMISSION`, `HOME-DATE-PICKER`, `HOME-MEMO`, GNB

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 오늘 일정을 타임라인으로 보기 (Priority: P1)

**Acceptance Scenarios**:

1. **Given** 일정이 있는 사용자, **When** 홈에 들어오면, **Then** 기준 날짜(오늘)의 일정이 Daily View 타임라인으로 표시되고, 기준 날짜가 `YYYY.MM.DD.요일` 형식으로 표시된다.
2. **Given** 기준 날짜가 오늘인 Daily View, **When** 화면을 보면, **Then** 현재 시각 표시선이 타임라인의 현재 시각 위치에 보인다.
3. **Given** Daily View, **When** 좌우로 스와이프하면, **Then** 기준 날짜가 하루씩 바뀌고 해당 날짜 일정이 표시된다.

---

### User Story 2 - 주간·월간으로 넓혀 보기 (Priority: P2)

**Acceptance Scenarios**:

1. **Given** Daily View, **When** 화면을 축소(핀치 인)하면, **Then** Weekly View로, 다시 축소하면 Monthly View로 바뀐다.
2. **Given** Monthly View, **When** 확대하면, **Then** Weekly View → Daily View 순서로 바뀐다.
3. **Given** Weekly View, **When** 좌우 스와이프하면, **Then** 한 주(일~토) 단위로 이동한다.
4. **Given** Monthly View, **When** 화면을 보면, **Then** 달력의 앞뒤를 채우는 이전·다음 달 날짜가 반투명하게 표시된다.

---

### User Story 3 - 처음 쓰는 사용자의 홈 (Priority: P1)

**Acceptance Scenarios**:

1. **Given** 온보딩 직후, **When** 홈에 들어오면, **Then** 초기 홈화면 안내 문구와 "일정을 추가해 볼까요" 유도 카드가 표시된다.
2. **Given** 초기 홈화면, **When** 유도 카드를 누르면, **Then** 카드 편집(`EDIT-CARD`)이 핀 카드 기본값으로 열린다.
3. **Given** 알림 허용 안내에서 아직 선택하지 않은 사용자, **When** 초기 홈화면에 들어오면, **Then** 알림 허용 안내 모달이 표시된다.
4. **Given** 알림 허용 안내 모달, **When** "알림 허용"을 누르면, **Then** OS 알림 권한 요청이 뜨고, 허용하면 세부 알림 3종이 모두 켜진다.
5. **Given** 알림 허용 안내 모달, **When** "허용 안 함"을 누르면, **Then** 세부 알림 3종이 모두 꺼지고 모달이 닫힌다. 이후 다시 표시되지 않는다.

---

### User Story 4 - 날짜별 메모 (Priority: P3)

**Acceptance Scenarios**:

1. **Given** 메모가 없는 날짜, **When** 홈을 보면, **Then** 메모 버튼에 "날짜별 메모 작성"이 표시된다.
2. **Given** 메모가 2개 이상인 날짜, **When** 홈을 보면, **Then** 메모명과 "(1/n)"이 표시되고 2초마다 다음 메모로 바뀌며, 마지막 다음에는 처음으로 돌아간다.
3. **Given** `HOME-MEMO` 바텀시트, **When** 메모를 입력하고 엔터를 누르면, **Then** 목록에 추가되고 입력창이 비워진다. (저장은 완료 시)
4. **Given** `HOME-MEMO`에서 추가·수정·삭제를 한 상태, **When** 취소를 누르면, **Then** 변경 내용이 모두 버려진다.

---

### Edge Cases

- 알림 허용 안내 모달에서 선택하지 않고 앱을 끄면 → 다음 진입 때 다시 표시한다. (R63, R68)
- 자정을 넘기는 일정의 Daily View 표시 위치: [NEEDS CLARIFICATION: Q-042]
- 현재 시각이 일정 시작 시각과 겹칠 때 → 현재 시각 표시가 위에 보인다. (초기명세)
- 21자 이상 메모를 엔터로 추가 → 추가하지 않는다. 안내 방식: [NEEDS CLARIFICATION: Q-064]

## Requirements *(mandatory)*

### Functional Requirements

**GNB** (POL-001)

- **FR-HOME-001**: GNB는 홈, 카드리스트, 일정 추가, 컨디션, 설정 버튼을 제공해야 한다. (R52~R56)
- **FR-HOME-002**: GNB 홈 버튼은 데이터 상태에 맞는 홈(초기 홈화면 또는 일반 홈)으로 이동해야 한다. (R52)
- **FR-HOME-003**: GNB 일정 추가 버튼의 이동 대상: [NEEDS CLARIFICATION: Q-001 `ADD-SHEET` vs `EDIT-CARD`]

**초기 홈화면** (`HOME-EMPTY`)

- **FR-HOME-010**: 온보딩 직후 또는 저장된 일정·컨디션 데이터가 없을 때 초기 홈화면을 표시해야 한다. (R58, R59) [NEEDS CLARIFICATION: Q-040 한쪽만 있을 때]
- **FR-HOME-011**: 상단에 안내 문구 "오늘의 컨디션과 일정을 입력하고 / 나에게 맞는 추천을 받아보세요."를 표시해야 한다. (R60)
- **FR-HOME-012**: 일정이 없는 타임라인에 Daily View 카드 형식으로 "일정을 추가해 볼까요" 유도 카드를 표시해야 한다. (R61)
- **FR-HOME-013**: 유도 카드를 누르면 `EDIT-CARD`를 핀 카드 기본값으로 열어야 한다. (R62)

**알림 허용 안내** (`HOME-NOTI-PERMISSION`)

- **FR-HOME-020**: 초기 홈화면 진입 시 알림 안내 선택 완료 여부를 확인하고, 미완료면 모달을 표시해야 한다. (R63, R64)
  - 일반 홈(데이터 있음)으로 들어온 미선택 사용자에게도 표시하는가: [NEEDS CLARIFICATION: Q-065]
- **FR-HOME-021**: 모달 문구: "더 정확한 일정 추천을 위해 알림을 보내도 될까요? 일정 완료 확인, 컨디션 기록, 맞춤 일정 추천 알림을 보내드릴게요" + "알림 허용" / "허용 안 함" 버튼. (R64)
- **FR-HOME-022**: "알림 허용" 선택 시 선택 완료를 저장하고 OS 알림 권한을 요청해야 한다. (R65, R68, R69)
- **FR-HOME-023**: OS 권한 허용 시 일정 종료·컨디션 기록·추천 일정 알림을 모두 켜고, 거부 시 모두 꺼야 한다. (R70~R72)
- **FR-HOME-024**: "허용 안 함" 선택 시 선택 완료를 저장하고 세부 알림 3종을 모두 꺼야 한다. OS 권한은 요청하지 않는다. (R66, R67)
- **FR-HOME-025**: 선택하지 않고 앱을 종료하면 선택 완료로 저장하지 않는다. (R68)
- **FR-HOME-026**: 선택 처리 후 모달을 닫고 초기 홈화면을 보여야 한다. (R73)

**보기 모드**

- **FR-HOME-030**: Daily / Weekly / Monthly View 선택 버튼을 표시해야 한다. (R74~R77)
- **FR-HOME-031**: 축소 인터랙션은 Daily→Weekly→Monthly, 확대는 Monthly→Weekly→Daily 순서로 한 단계씩 바꾼다. 양 끝에서는 더 바뀌지 않는다. (R78, R79) [NEEDS CLARIFICATION: Q-008 컨디션 탭과 방식 다름]
- **FR-HOME-032**: 보기 모드를 다음 진입 때 복원하는지: [NEEDS CLARIFICATION: Q-009]
- **FR-HOME-033**: Weekly View는 일요일~토요일 7일을 표시한다. 어느 주인지: [NEEDS CLARIFICATION: Q-007 오늘 vs 기준 날짜]
- **FR-HOME-034**: Monthly View는 기준 날짜가 속한 달의 1일~말일을 달력으로 표시하고, 앞뒤를 채우는 인접 월 날짜는 반투명으로 표시해야 한다. (R77, R83, R84)
- **FR-HOME-035**: Weekly/Monthly View에 표시하는 항목과 개수: [NEEDS CLARIFICATION: Q-033]

**Daily View 타임라인**

- **FR-HOME-040**: 기준 날짜의 핀 카드를 타임라인으로 표시해야 한다. (R80)
- **FR-HOME-041**: 타임라인 길이 규칙: [NEEDS CLARIFICATION: Q-044 시간 비례 vs 카드 개수 기준(초기명세)]
- **FR-HOME-042**: 기준 날짜가 오늘일 때만 현재 시각 표시선을 노출하고, 시각 텍스트(예: 13:38)를 함께 표시해야 한다. (R81, 초기명세)
- **FR-HOME-043**: 타임라인의 카드 상태 표시(시작 전/진행 중/완료)와 진행도 변경 바텀시트(IA "일정 진행도", "일정 편집")의 동작은 004의 진행도 규칙을 따른다. [NEEDS CLARIFICATION: Q-005]
- **FR-HOME-044**: 타임라인 안의 추천 카드(초기명세 "recommendation card", IA "추천 일정") 표시 여부와 위치: [NEEDS CLARIFICATION: Q-019]

**날짜 이동**

- **FR-HOME-050**: 기준 날짜는 최초 진입 시 오늘이며 `YYYY.MM.DD.요일` 형식으로 표시한다. (R86)
- **FR-HOME-051**: 날짜 영역을 누르면 날짜 선택 달력(`HOME-DATE-PICKER`)을 열고, 고른 날짜를 기준 날짜로 바꿔야 한다. (R87, R88)
- **FR-HOME-052**: 좌우 스와이프로 보기 모드 단위(일/주/월)만큼 기준 날짜를 이동해야 한다. (R85, R89)

**날짜별 메모** (`HOME-MEMO`)

- **FR-HOME-060**: 메모가 없으면 "날짜별 메모 작성", 있으면 메모명을 버튼에 표시해야 한다. (R90)
- **FR-HOME-061**: 2개 이상이면 "(현재/전체)"를 함께 표시하고 2초마다 순환해야 한다. (R91, R92)
- **FR-HOME-062**: 버튼을 누르면 바텀시트에 취소·완료 버튼, 메모 목록, "메모 추가하기"를 표시해야 한다. (R93, R94)
- **FR-HOME-063**: 메모 추가: 입력 후 엔터로 목록에 추가하고 입력창을 비운다. (R97~R99)
- **FR-HOME-064**: 메모 수정: 메모 글자를 누르면 수정 상태가 된다. (R102, R103)
- **FR-HOME-065**: 메모 삭제: 항목 옆 X로 목록에서 뺀다. (R101)
- **FR-HOME-066**: 완료 시에만 추가·수정·삭제를 저장하고, 취소 시 모두 버린다. (R95, R96, POL-003)
- **FR-HOME-067**: 메모는 1~20자여야 하며, 범위를 벗어나면 추가·저장하지 않는다. (R96~R100, POL-005)
- **FR-HOME-068**: 최대 개수와 표시 순서: [NEEDS CLARIFICATION: Q-034]

**홈 컨디션 표시** (계산 로직은 007)

- **FR-HOME-070**: 기준 날짜의 컨디션 총점을 표시해야 한다. (R104)
- **FR-HOME-071**: Daily View에서만 Body / Mind / Sleep 세부 점수를 표시해야 한다. (R105)
- **FR-HOME-072**: 컨디션 상태에 맞는 "상태 진단 + 행동 권유" 멘트를 표시해야 한다. 기록이 없거나 밤샘한 경우의 예외 문구 포함. (R107, R108) [NEEDS CLARIFICATION: Q-018 로직 이관]
- **FR-HOME-073**: Weekly/Monthly View에서 총점은 어느 기간 기준인가: [NEEDS CLARIFICATION: Q-066]

**알림 진입**

- **FR-HOME-080**: 홈 우측 상단에 알림 버튼을 표시하고, 누르면 `NOTI-LIST`로 이동해야 한다. (R109, R110) → 008

## UI Notes *(디자인 소유)*

- 날짜 선택 달력의 형태(바텀시트/드롭다운) 확정 필요 (R87은 Bottom Sheet, 초기명세는 "달력 모달")

## Success Criteria *(mandatory)*

- **SC-HOME-001**: 홈 진입 후 오늘 일정과 컨디션 점수가 한 화면에 보인다.
- **SC-HOME-002**: 어떤 날짜든 2번 이하의 조작(날짜 탭 → 날짜 선택)으로 이동할 수 있다.

## Changelog

- 2026-11-24: 원본 스프레드시트에서 이관 (Draft)
