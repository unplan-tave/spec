# Feature Specification: 알림 (알림 페이지 · 푸시 알림)

**Feature Branch**: `008-notification`

**Created**: 2026-11-24

**Status**: Draft

**Input**: 원본 기능명세서 R109~R116, R64~R73, IA R16·R60~R62

**관련 화면**: `NOTI-LIST`
(알림 권한 안내 모달은 003, 알림 수신 설정은 009)

> ⚠️ 원본에는 알림 **페이지의 껍데기**만 있고, 어떤 알림이 언제 만들어지는지가 없다. [NEEDS CLARIFICATION: Q-035]

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 받은 알림 모아 보기 (Priority: P2)

**Acceptance Scenarios**:

1. **Given** 홈, **When** 우측 상단 알림 버튼을 누르면, **Then** GNB 없이 `NOTI-LIST`가 열리고 헤더와 [전체] [완료] 탭이 보인다.
2. **Given** `NOTI-LIST`, **When** 완료 탭을 누르면, **Then** 일정 진행도 관련 알림만 보인다.
3. **Given** `NOTI-LIST`, **When** 뒤로가기 또는 완료 버튼을 누르면, **Then** 이전 화면으로 돌아간다.

---

### User Story 2 - 일정이 끝나면 완료 여부 묻기 (Priority: P2)

[NEEDS CLARIFICATION: Q-035] 아래는 원본 문구("일정 완료 확인, 컨디션 기록, 맞춤 일정 추천 알림")에서 추정한 **제안**이다.

**Acceptance Scenarios** (제안):

1. **Given** 일정 종료 알림 켜짐 + 진행도가 완료가 아닌 핀 카드, **When** 종료 시각이 되면, **Then** 일정 완료 여부를 묻는 푸시 알림이 온다.
2. **Given** 그 알림, **When** 누르면, **Then** 해당 카드 상세로 이동한다.

## Requirements *(mandatory)*

### Functional Requirements

**알림 페이지**

- **FR-NOTI-001**: 홈 알림 버튼으로 진입하며 GNB를 표시하지 않는다. (R109~R111, POL-001)
- **FR-NOTI-002**: 헤더에 뒤로가기와 완료 버튼을 표시한다. 두 버튼 모두 이전 화면으로 돌아간다. (R112, R113)
  - 같은 동작의 버튼 두 개를 유지하는 것이 의도인가: [NEEDS CLARIFICATION: Q-086]
- **FR-NOTI-003**: [전체] 탭은 모든 알림, [완료] 탭은 일정 진행도 관련 알림만 표시한다. (R114~R116)
- **FR-NOTI-004**: 알림 항목에 표시하는 정보(종류, 제목, 시각, 읽음 여부), 정렬, 빈 상태: [NEEDS CLARIFICATION: Q-035]
- **FR-NOTI-005**: 알림 항목을 누르면 이동하는 화면: [NEEDS CLARIFICATION: Q-035]
- **FR-NOTI-006**: 알림 보관 기간, 삭제 기능: [NEEDS CLARIFICATION: Q-035]
- **FR-NOTI-007**: 홈 알림 버튼에 안 읽은 알림 표시(배지) 여부: [NEEDS CLARIFICATION: Q-087]

**푸시 알림 종류** (모두 [NEEDS CLARIFICATION: Q-035])

| 종류 | 설정 키 | 발송 조건 | 문구 | 누르면 |
|---|---|---|---|---|
| 일정 종료 알림 | 일정 종료 알림 | ? (제안: 핀 카드 종료 시각, 미완료일 때) | ? | ? |
| 컨디션 기록 알림 | 컨디션 기록 알림 | ? (하루 몇 번, 몇 시?) | ? | ? |
| 추천 일정 알림 | 추천 일정 알림 | ? (빈 시간 시작 몇 분 전?) | ? | ? |

- **FR-NOTI-010**: 각 종류는 설정(009)의 해당 토글이 켜져 있고 OS 알림 권한이 허용된 경우에만 발송한다. (R71, R72)
- **FR-NOTI-011**: 알림 페이지에는 설정과 무관하게 모든 알림 기록을 남기는가: [NEEDS CLARIFICATION: Q-035]
- **FR-NOTI-012**: 방해 금지 시간(예: 수면 시간대)에는 발송하지 않는가: [NEEDS CLARIFICATION: Q-088]

### Key Entities

- **Notification**: `specs/_shared/domain-model.md`

## Changelog

- 2026-11-24: 원본 스프레드시트에서 이관 (Draft)
