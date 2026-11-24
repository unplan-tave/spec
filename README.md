# Unplan Spec

Unplan의 **기획 명세 단일 진실 공급원(SSOT)** 레포입니다.
디자인·FE·BE는 이 레포의 `main`만 근거로 작업합니다. [spec-kit](https://github.com/github/spec-kit)의 Spec-Driven Development 방식을 따릅니다.

- 최상위 규칙: [`.specify/memory/constitution.md`](.specify/memory/constitution.md)
- 지금 결정이 필요한 것: [`specs/_shared/open-questions.md`](specs/_shared/open-questions.md)

## 구조

```
.specify/memory/constitution.md   헌법: 원칙, 문서 소유권, 상태(Status) 규칙
specs/
  _shared/
    glossary.md          용어집 · 코드값 (FE/BE 공통 enum)
    policies.md          공통 정책 POL-###
    domain-model.md      개념 데이터 모델과 검증 규칙
    screen-map.md        화면 ID · GNB 노출 · Figma 링크 · 화면 이동
    open-questions.md    결정 필요 질문 Q-###
  001-auth/spec.md            인증
  002-onboarding/spec.md      온보딩
  003-home/spec.md            홈
  004-card/spec.md            카드 등록·편집·상세·전환
  005-card-list/spec.md       카드리스트
  006-condition/spec.md       컨디션·수면 기록
  007-recommendation/spec.md  추천 로직·컨디션 점수
  008-notification/spec.md    알림
  009-settings/spec.md        설정
archive/                 원본 Google Sheets 내보내기 (읽기 전용, 첫 열 = 원본 행 번호 R###)
scripts/check-specs.ts   일관성 검사 (CI에서 실행)
```

## ID 규칙

| 종류 | 형식 | 예 | 정의 위치 |
|---|---|---|---|
| 요구사항 | `FR-<도메인>-###` | `FR-CARD-045` | 각 spec.md |
| 화면 | `<영역>-<이름>` | `EDIT-DATETIME` | screen-map.md |
| 정책 | `POL-###` | `POL-002` | policies.md |
| 질문 | `Q-###` | `Q-004` | open-questions.md |
| 원본 행 | `R###` | `(R218)` | archive/feature-spec.csv 첫 열 |

FE/BE 커밋·PR·테스트 이름, Figma 프레임 이름에 이 ID를 넣어 주세요.

## 파트별 작업 방법

### 기획
1. `open-questions.md`의 질문을 Issue(`clarification` 라벨)로 만들고 회의에서 결정합니다.
2. 결정되면 PR 하나로: 해당 spec의 `[NEEDS CLARIFICATION: Q-###]`을 요구사항으로 바꾸고 → `open-questions.md`의 "결정" 열을 채우고 → Issue를 닫습니다.
3. spec의 질문이 모두 사라지면 `Status: Clarified`, 4개 파트 리뷰가 끝나면 `Approved`로 올립니다.

### 디자인
- Figma 프레임 이름을 `[화면 ID] 화면명`으로 맞추고, `screen-map.md`의 Figma 열에 링크를 넣습니다.
- 문구·토스트·빈 상태는 각 spec의 `UI Notes`에 적습니다.

### FE / BE
- 각 레포에 이 레포를 submodule로 연결합니다.

  ```bash
  git submodule add https://github.com/unplan-tave/spec.git spec
  ```

- `Approved` 상태인 spec만 구현을 시작합니다.
- 구현 계획(`plan.md`), 작업 목록(`tasks.md`), API 계약(`openapi.yaml`)은 각 레포에서 관리하되, 요구사항은 `spec/specs/...`를 참조합니다.
- 구현 중 명세와 맞지 않는 점을 발견하면 **코드에서 임의로 정하지 말고** 이 레포에 Issue를 올립니다 (헌법 II).
- 검증 규칙(글자 수, 개수 제한 등)과 enum 코드값은 `glossary.md`·`policies.md` 값을 그대로 씁니다.

## spec-kit 명령 (Claude Code)

이 레포에는 spec-kit Claude 스킬이 설치되어 있습니다 (`.claude/skills/`).

| 명령 | 이 레포에서의 용도 |
|---|---|
| `/speckit-specify` | 새 기능 spec 초안 작성 |
| `/speckit-clarify` | spec의 모호한 부분을 질문으로 뽑아 결정 |
| `/speckit-checklist` | 요구사항 품질 체크리스트 생성 |
| `/speckit-analyze` | spec 간 일관성 점검 |
| `/speckit-plan`, `/speckit-tasks`, `/speckit-implement` | FE/BE 레포에서 사용 |

## 로컬 검사

```bash
node scripts/check-specs.ts
```

Node 22.18 이상이 필요합니다. PR마다 CI(`spec-check`)에서 같은 검사가 돌아갑니다.

## 처음 한 번 설정 (organization 관리자)

1. Teams 만들기: `planning`, `design`, `frontend`, `backend` (CODEOWNERS가 사용)
2. `main` 브랜치 보호: PR 필수, Code Owner 리뷰 필수, `spec-check` 통과 필수
3. Issue 라벨 만들기: `clarification`
4. 원본 Google Sheets를 보기 전용으로 바꾸고 상단에 이 레포 링크 남기기
