# Feature Specification: 인증 (스플래시 · 소셜 로그인 · 약관)

**Feature Branch**: `001-auth`

**Created**: 2026-11-24

**Status**: Draft

**Input**: 원본 기능명세서 R2~R19, IA R2~R5

**관련 화면**: `AUTH-SPLASH`, `AUTH-LOGIN`, `AUTH-TERMS`, `AUTH-TERMS-SERVICE`, `AUTH-TERMS-PRIVACY`, `AUTH-DONE`

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 처음 쓰는 사용자의 소셜 로그인 (Priority: P1)

처음 앱을 설치한 사용자가 Apple, Google, Kakao 중 하나로 로그인하면 계정이 만들어지고 온보딩으로 이어진다.

**Why this priority**: 모든 기능의 전제 조건이다.

**Independent Test**: 신규 소셜 계정으로 로그인했을 때 계정이 생성되고 `ONB-WELCOME`이 표시되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** 로그인한 적 없는 사용자, **When** 앱을 실행하면, **Then** `AUTH-SPLASH` 다음에 `AUTH-LOGIN`이 표시된다.
2. **Given** `AUTH-LOGIN`, **When** 사용자가 Apple/Google/Kakao 버튼 중 하나를 누르면, **Then** 해당 소셜 인증 절차가 시작된다.
3. **Given** 소셜 인증 성공 + 연결된 Unplan 계정 없음, **When** 인증 결과를 받으면, **Then** 새 계정이 만들어지고 `AUTH-DONE` 다음 `ONB-WELCOME`으로 이동한다.

---

### User Story 2 - 기존 사용자의 재로그인과 자동 로그인 (Priority: P1)

**Acceptance Scenarios**:

1. **Given** 로그인 상태가 유지된 사용자 + 온보딩 완료, **When** 앱을 실행하면, **Then** `AUTH-LOGIN`을 거치지 않고 홈으로 이동한다.
2. **Given** 로그아웃된 기존 사용자, **When** 같은 소셜 계정으로 로그인하면, **Then** 기존 계정으로 로그인되고, 온보딩 완료 여부에 따라 홈 또는 온보딩으로 이동한다.
3. **Given** 로그인 상태가 유지된 사용자 + 온보딩 미완료, **When** 앱을 실행하면, **Then** [NEEDS CLARIFICATION: Q-012 온보딩을 처음부터 다시 하는지, 이어서 하는지]

---

### User Story 3 - 약관 확인 (Priority: P2)

**Acceptance Scenarios**:

1. **Given** `AUTH-LOGIN`, **When** 하단의 약관 동의 간주 문구를 누르면, **Then** `AUTH-TERMS` 바텀시트가 열린다.
2. **Given** `AUTH-TERMS`, **When** 서비스 이용약관 / 개인정보 수집 및 이용약관을 누르면, **Then** 해당 약관 전문이 표시된다.
3. **Given** `AUTH-TERMS`, **When** 뒤로가기 아이콘을 누르면, **Then** 바텀시트가 닫힌다.

---

### Edge Cases

- 소셜 인증 화면에서 사용자가 취소하면? → `AUTH-LOGIN`에 머문다. (제안)
- 소셜 인증 실패·네트워크 오류 → POL-006에 따라 안내하고 `AUTH-LOGIN`에 머문다. (제안)
- 저장된 로그인 정보가 만료되었으면 → `AUTH-LOGIN`으로 이동한다. (제안)
- 다른 소셜 계정으로 같은 사람이 로그인하면? [NEEDS CLARIFICATION: Q-039 계정 연결 정책]

## Requirements *(mandatory)*

### Functional Requirements

- **FR-AUTH-001**: 앱 실행 시 스플래시 화면을 표시해야 한다. (R2)
- **FR-AUTH-002**: 스플래시에서 저장된 로그인 상태를 확인해 로그인 화면 또는 다음 화면을 결정해야 한다. (R3, R4)
- **FR-AUTH-003**: 로그인 화면에서 Apple, Google, Kakao 로그인 버튼을 제공해야 한다. (R5~R8)
- **FR-AUTH-004**: 소셜 인증 결과로 기존 Unplan 계정이 있는지 확인하고, 없으면 새 계정을 생성해야 한다. (R9, R10)
- **FR-AUTH-005**: 인증 완료 후 로그인 완료 화면(`AUTH-DONE`)을 표시해야 한다. (R18)
  - 로그인 완료 화면의 표시 시간·문구·다음 화면으로 넘어가는 방식(자동/버튼): [NEEDS CLARIFICATION: Q-059]
- **FR-AUTH-006**: 로그인 완료 후 계정의 온보딩 완료 여부를 확인하여, 미완료면 온보딩, 완료면 홈으로 이동해야 한다. (R19) [NEEDS CLARIFICATION: Q-011 판단 기준]
- **FR-AUTH-007**: 로그인 화면 하단에 약관 동의 간주 문구를 표시하고, 누르면 약관 선택 바텀시트를 열어야 한다. (R12) [NEEDS CLARIFICATION: Q-038 동의 간주 방식의 법적 적합성]
- **FR-AUTH-008**: 약관 선택 바텀시트에서 서비스 이용약관과 개인정보 수집 및 이용약관 전문을 각각 볼 수 있어야 한다. (R13~R16)
- **FR-AUTH-009**: 약관 바텀시트는 뒤로가기 아이콘으로 닫을 수 있어야 한다. (R17)
- **FR-AUTH-010**: Apple 로그인 사용자의 계정 삭제 시 Apple 토큰 철회를 지원해야 한다. (App Store 심사 요건, 009 설정과 연계) [NEEDS CLARIFICATION: Q-037]

### Key Entities

- **User**: `specs/_shared/domain-model.md#user-계정` 참조.
- **소셜 계정 연결**: 소셜 제공자 + 제공자의 사용자 식별자.

## UI Notes *(디자인 소유)*

- 약관 바텀시트 2종의 전문 텍스트는 별도 문서로 관리 (링크: TBD)
- `AUTH-DONE` 문구: TBD

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-AUTH-001**: 신규 사용자가 앱 실행부터 온보딩 첫 화면까지 3번 이하의 탭으로 도달한다.
- **SC-AUTH-002**: 로그인 상태가 유지된 사용자는 앱 실행 후 로그인 화면을 보지 않고 홈에 도달한다.

## Assumptions

- 이메일/비밀번호 로그인은 제공하지 않는다.
- IA의 "회원가입"은 별도 화면이 아니라 첫 소셜 로그인 시 자동 계정 생성을 뜻한다고 본다. (Q-039에서 확인)

## Changelog

- 2026-11-24: 원본 스프레드시트에서 이관 (Draft)
