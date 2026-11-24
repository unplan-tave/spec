# Feature Specification: 컨디션 (통계 · 컨디션 기록 · 수면 기록)

**Feature Branch**: `006-condition`

**Created**: 2026-11-24

**Status**: Draft

**Input**: 원본 기능명세서 R262~R272, R287~R333, IA R47~R54

**관련 화면**: `COND-MAIN`, `COND-HISTORY`, `COND-ENERGY`, `COND-SLEEP-INPUT`
(컨디션 기반 추천 `COND-REC`은 007)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 지금 컨디션 기록하기 (Priority: P1)

**Acceptance Scenarios**:

1. **Given** `COND-MAIN`, **When** 기록 추가/수정 버튼을 누르면, **Then** `COND-HISTORY`가 Body/Mind 탭, 오늘 날짜로 열린다.
2. **Given** `COND-HISTORY` Body/Mind 탭, 선택된 기록 없음, **When** 기록 추가를 누르면, **Then** `COND-ENERGY`가 열리고 사분면 가운데 기본 마커, 날짜·시각은 현재로 채워진다.
3. **Given** `COND-ENERGY`, **When** 그래프 위치를 누르고 완료하면, **Then** 기록이 저장되고 그 기록 날짜의 `COND-HISTORY`로 돌아간다.

---

### User Story 2 - 수면 기록하기 (Priority: P1)

**Acceptance Scenarios**:

1. **Given** Sleep 탭, **When** 기록 추가를 누르면, **Then** `COND-SLEEP-INPUT`이 열리고 완료 버튼은 비활성이다.
2. **Given** 시작 23:30(11/23), 종료 07:00(11/24) 입력, **When** 화면을 보면, **Then** 총 수면 시간 7시간 30분이 자동 계산된다.
3. **Given** 모든 필수값 유효, **When** 완료를 누르면, **Then** 저장되고 **수면 시작 날짜(11/23)** 의 Sleep 탭으로 이동한다.

---

### User Story 3 - 기록 고치기·지우기 (Priority: P2)

**Acceptance Scenarios**:

1. **Given** Body/Mind 그래프, **When** 마커를 누르면, **Then** 마커가 활성화되고 기록 시각이 보이며, 하단 버튼이 [기록 삭제] [기록 수정]으로 바뀐다.
2. **Given** 같은 위치에 기록 3개, **When** 그 마커를 누르면, **Then** 시각 목록이 오름차순으로 보이고 하나를 골라 활성화할 수 있다.
3. **Given** 활성화된 기록, **When** 그래프 바깥을 누르면, **Then** 선택이 풀리고 하단 버튼이 기록 추가로 돌아온다.
4. **Given** Sleep 탭에서 기록 하나 선택, **When** 기록 수정을 누르면, **Then** 기존 값이 채워진 `COND-SLEEP-INPUT`이 열린다.

---

### User Story 4 - 기간별 컨디션 보기 (Priority: P2)

**Acceptance Scenarios**:

1. **Given** `COND-MAIN`, **When** 들어오면, **Then** Daily View, 오늘 기준으로 총점, 멘트, 평균 그래프, Body·Mind·Sleep 그래프가 보인다.
2. **Given** 기록 없는 기간, **When** 보면, **Then** "컨디션 분석을 위해 에너지와 수면 데이터를 입력해주세요!"가 보인다.

---

### Edge Cases

- 수면 기록 저장 후 이동 날짜는 종료 날짜가 아니라 **시작 날짜**. (R333)
- 수면 기록끼리 겹침, 미래 시각: [NEEDS CLARIFICATION: Q-017]
- 낮잠·밤샘 동시 설정: [NEEDS CLARIFICATION: Q-015]
- 조회 실패: 조회 가능한 기본 화면 표시. (R262 등, POL-006)

## Requirements *(mandatory)*

### Functional Requirements

**컨디션 메인** (`COND-MAIN`)

- **FR-COND-001**: 보기 모드와 기준 날짜에 해당하는 컨디션 데이터를 표시한다. 기본 Daily View. (R262, R264)
- **FR-COND-002**: 보기 모드 전환 버튼은 Daily → Weekly → Monthly → Daily 순서로 순환한다. (R264) [NEEDS CLARIFICATION: Q-008 홈과 방식 다름]
- **FR-COND-003**: 날짜 버튼(`YYYY.MM.DD.요일`)을 누르면 날짜 선택 UI를 열고 고른 날짜·기간의 데이터를 표시한다. (R265, R266)
  - Weekly/Monthly에서 날짜 버튼에 표시하는 형식(기간): [NEEDS CLARIFICATION: Q-066]
- **FR-COND-004**: 선택 기간의 컨디션 총점을 표시한다. 기록이 없으면 계산하지 않는다. (R263) 계산식은 007.
- **FR-COND-005**: 컨디션 멘트를 표시한다. 데이터가 부족하면 상태를 단정하는 멘트를 쓰지 않는다. (R267)
- **FR-COND-006**: 평균 그래프, Body 그래프, Mind 그래프, Sleep 그래프를 표시한다. 각각 데이터가 없으면 데이터 없음 상태. 평균 그래프가 비면 "컨디션 분석을 위해 에너지와 수면 데이터를 입력해주세요!". (R268~R271)
  - 그래프 종류·축·집계 단위(일 평균? 기록별?): [NEEDS CLARIFICATION: Q-078]
- **FR-COND-007**: "컨디션 기반 추천 일정" 버튼 → 007. (R272)
- **FR-COND-008**: "기록 추가/수정" 버튼 → `COND-HISTORY`. (R287)

**컨디션 기록 내역** (`COND-HISTORY`)

- **FR-COND-010**: 헤더(뒤로 가기, 편집), Body/Mind·Sleep 탭, 날짜 슬라이더, 그래프, 하단 조작 버튼을 표시한다. 기본 탭 Body/Mind, 기본 날짜 오늘. (R288, R289)
- **FR-COND-011**: 편집 버튼의 동작: [NEEDS CLARIFICATION: Q-048] (R290)
- **FR-COND-012**: 탭을 바꿔도 날짜 슬라이더의 선택 날짜는 유지한다. (R291, R292, R312)
- **FR-COND-013**: 날짜 슬라이더를 좌우로 넘기면 가운데 날짜가 선택 날짜가 된다. (R292)

**Body/Mind 탭**

- **FR-COND-020**: 선택 날짜의 모든 Body/Mind 기록을 사분면 그래프에 표시한다. 같은 위치의 기록은 점 하나로 겹치고 개수를 표시한다. 없으면 빈 그래프. (R293)
- **FR-COND-021**: 마커를 누르면 활성화하고 기록 시각을 표시한다. 겹친 마커는 시각 목록(오름차순)을 보여 하나를 고르게 한다. (R294~R296)
- **FR-COND-022**: 바깥 영역을 누르면 선택을 해제한다. (R297)
- **FR-COND-023**: 선택된 기록이 없으면 [기록 추가], 있으면 [기록 삭제] [기록 수정]을 표시한다. (R298)
- **FR-COND-024**: 기록 삭제는 선택 기록을 지우고 그래프를 갱신한다. 확인 절차: [NEEDS CLARIFICATION: Q-079] (R300)
- **FR-COND-025**: 기록 수정은 선택 기록의 날짜·시각·위치가 채워진 `COND-ENERGY`를 연다. (R301)

**에너지 측정** (`COND-ENERGY`)

- **FR-COND-030**: 사분면 그래프와 날짜·시각 입력을 표시한다. 신규는 가운데 마커와 현재 일시가 기본값. (R302)
- **FR-COND-031**: 그래프를 누른 위치로 마커를 옮긴다. 기록당 마커 1개. (R303) [NEEDS CLARIFICATION: Q-049 값 범위·단위, 축 정의]
- **FR-COND-032**: 날짜·시각을 바꿀 수 있다. (R304, R305)
- **FR-COND-033**: 취소는 저장 없이 `COND-HISTORY`로 돌아간다. (R306)
- **FR-COND-034**: 완료는 검증 후 저장하고, 저장한 기록 날짜의 `COND-HISTORY`로 이동한다. 실패 시 입력 유지 + 안내. (R307, R308)

**Sleep 탭**

- **FR-COND-040**: 선택 날짜의 총 수면 시간, 개별 수면 기록 목록, 기록 추가 버튼을 표시한다. 없으면 빈 상태. (R309, R311)
- **FR-COND-041**: 총 수면 시간 = 그 날짜(시작 날짜 기준)에 귀속된 수면 기록의 수면 시간 합. (R313)
  - 낮잠도 합계에 포함하는가: [NEEDS CLARIFICATION: Q-015]
- **FR-COND-042**: 개별 기록: 유형, `HH:MM-HH:MM`, "N시간 M분", 수면 코멘트. (R314) 코멘트 로직은 007. [NEEDS CLARIFICATION: Q-015 밤샘 표시]
- **FR-COND-043**: 기록 하나를 선택하면 [기록 삭제] [기록 수정], 바깥을 누르면 [기록 추가]. (R315~R317)
- **FR-COND-044**: 기록 삭제는 선택 기록을 지우고 총 수면 시간과 목록을 갱신한다. (R319)

**수면 측정** (`COND-SLEEP-INPUT`)

- **FR-COND-050**: 수면 시작 날짜·시각, 종료 날짜·시각, 낮잠 토글, 밤샘 토글, 총 수면 시간, 취소·완료를 표시한다. 신규는 초기 상태 + 완료 비활성, 수정은 기존 값. (R320, R321)
  - 신규 기록의 초기값(빈 값? 어젯밤 23시?): [NEEDS CLARIFICATION: Q-080]
- **FR-COND-051**: 종료 일시는 시작 일시 이후여야 한다. (R325, R329)
- **FR-COND-052**: 시작·종료 일시로 총 수면 시간을 자동 계산한다. (R329)
- **FR-COND-053**: 사용자가 총 수면 시간을 직접 고칠 수 있고, 자동 계산값과 별도로 관리한다. (R330) [NEEDS CLARIFICATION: Q-016]
- **FR-COND-054**: 낮잠 토글 → 유형 낮잠, 밤샘 토글 → 유형 밤샘. (R327, R328) [NEEDS CLARIFICATION: Q-015]
- **FR-COND-055**: 시작 일시, 종료 일시, 총 수면 시간이 모두 유효할 때만 완료를 활성화한다. (R331)
- **FR-COND-056**: 완료 시 저장하고 **수면 시작 날짜**의 Sleep 탭으로 이동한다. 실패 시 입력 유지 + 안내. (R332, R333)
- **FR-COND-057**: 취소 시 저장 없이 `COND-HISTORY`로 돌아간다. (R322)

### Key Entities

- **ConditionRecord**, **SleepRecord**: `specs/_shared/domain-model.md`

## Success Criteria *(mandatory)*

- **SC-COND-001**: 컨디션 기록 1건을 3번 이하의 탭(기록 추가 → 위치 탭 → 완료)으로 저장할 수 있다.
- **SC-COND-002**: 자정을 넘긴 수면은 항상 시작 날짜에만 한 번 집계된다.

## Changelog

- 2026-11-24: 원본 스프레드시트에서 이관 (Draft)
