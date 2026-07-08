# NestJS 백엔드 추가 및 pnpm 모노레포 전환

> 유형: feature · 영향 범위: 둘 다(구조 전환 + 신규 앱) · 작성일: 2026-07-08
> **상태: ✅ 확정 (2026-07-08)** — 결정 결과는 8장 참고

## 1. 개요

현재 루트에 단일 Next.js 앱만 있는 리포를 **pnpm workspace 기반 모노레포**로 전환하고,
`apps/api`에 **NestJS + TypeScript** 백엔드를 추가한 뒤, 프론트에서 백엔드 헬스체크
엔드포인트를 호출하는 **연결 테스트**까지 완료한다. 각 단계는 독립적으로 동작 가능한
상태로 **개별 커밋**한다.

PostgreSQL + Prisma는 "데이터 핸드오프 스펙은 DB 설계 시 재논의" 상태이므로,
이번 작업에서는 **연결 테스트에 필요한 범위만** 다루고 스키마 확정은 미룬다.
(로컬에 Docker가 설치되어 있지 않은 점도 고려 — 결정 포인트 4 참고)

## 2. 현재 상태

- 루트에 Next.js 16.2.9 (App Router) 앱 1개 — `src/app/` 구조
- pnpm 10.23.0 / Node 24.14.1, `pnpm-workspace.yaml`은 존재하나 `packages` 필드 없음
  (빌드 허용 목록만 있음 → 사실상 단일 패키지)
- 백엔드 없음, Docker 미설치

## 3. 목표 구조

```
web-sideproject-team3/
├── apps/
│   ├── web/                  # 기존 Next.js 앱 이동 (포트 3000)
│   │   ├── src/app/
│   │   ├── next.config.ts
│   │   ├── package.json      # name: "@repo/web"
│   │   └── tsconfig.json
│   └── api/                  # 신규 NestJS 앱 (포트 4000)
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   └── health/       # 헬스체크 모듈
│       ├── package.json      # name: "@repo/api"
│       └── tsconfig.json
├── packages/                 # (이번 단계에서는 빈 폴더만 예약, 추후 공유 타입/Prisma)
├── plans/
├── pnpm-workspace.yaml       # packages: ["apps/*", "packages/*"]
├── package.json              # 루트 — 워크스페이스 오케스트레이션 스크립트만
└── CLAUDE.md
```

## 4. 단계별 작업 계획 (커밋 단위)

### 커밋 1 — `chore: pnpm 워크스페이스 모노레포 구조로 전환`

- `apps/web/` 생성 후 기존 Next 앱 파일 이동
  (`src/`, `public/`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` 등)
- `pnpm-workspace.yaml`에 `packages: ["apps/*", "packages/*"]` 추가
- 루트 `package.json`을 워크스페이스 루트로 정리, 앱 `package.json`은 `@repo/web`으로 개명
- 루트 스크립트 추가: `dev:web`, `build`, `lint`, `format` (`pnpm --filter` 사용)
- **검증**: `pnpm install` 후 `pnpm dev:web` → http://localhost:3000 기존 화면 정상

### 커밋 2 — `feat: NestJS 백엔드(apps/api) 스캐폴드 추가`

- `apps/api`에 NestJS 최신 안정판 수동 스캐폴드
  (`@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`)
  — Nest CLI 전역 설치 대신 워크스페이스 내 devDependency로 관리
- 전역 프리픽스 `/api`, 포트 **4000** (`PORT` 환경변수로 오버라이드 가능)
- `GET /api/health` → `{ status: 'ok', service: 'api', timestamp }` 반환하는 `HealthModule`
- 리포 공통 컨벤션 적용: 2칸 들여쓰기, `any` 금지, 한국어 주석, console 규칙
  (단, 모듈/DI 등 구조는 NestJS 관례를 따름 — 리스크 6.3 참고)
- 루트 스크립트 추가: `dev:api`, `dev` (web+api 병렬 실행)
- **검증**: `pnpm dev:api` 후 `curl http://localhost:4000/api/health` → 200 OK

### 커밋 3 — `feat: 프론트-백엔드 연결 및 헬스체크 표시`

- 연결 방식은 **결정 포인트 3**에 따름 (추천: 서버 컴포넌트에서 직접 fetch)
- `apps/web/src/app/page.tsx`(또는 별도 섹션 컴포넌트)에서 `/api/health` 호출 결과 표시
  - API URL은 `API_BASE_URL` 상수(환경변수 기반)로 추출, `cache: 'no-store'`로 항상 신선한 응답
  - 백엔드 미기동 시에도 프론트가 죽지 않도록 실패 시 "연결 안 됨" 상태 렌더링
- **검증(연결 테스트)**:
  1. `pnpm dev` (web 3000 + api 4000 동시 기동)
  2. 브라우저에서 http://localhost:3000 접속 → "API 연결됨 (status: ok)" 표시 확인
  3. api 프로세스 종료 후 새로고침 → "API 연결 안 됨" 표시 확인 (그레이스풀 실패)

### 커밋 4 (선택) — `chore: PostgreSQL + Prisma 초기 세팅`

- **결정 포인트 4**에서 "포함"을 선택한 경우에만 진행
- `docker-compose.yml`(PostgreSQL 16) + `apps/api`에 Prisma 도입
- 스키마는 `HealthCheck` 더미 모델 1개만 — 실제 도메인 스키마는 DB 설계 논의 후 확정
- `/api/health`에 DB 연결 상태(`db: 'ok' | 'down'`) 필드 추가
- **검증**: `docker compose up -d` → `pnpm --filter @repo/api prisma migrate dev` → 헬스체크에 `db: ok`

## 5. 연결 테스트 절차 요약

| 순서 | 명령/행동 | 기대 결과 |
| --- | --- | --- |
| 1 | `pnpm install` | 워크스페이스 전체 의존성 설치 성공 |
| 2 | `pnpm dev:api` | 4000 포트 기동, 콘솔에 기동 로그 |
| 3 | `curl localhost:4000/api/health` | `{"status":"ok",...}` |
| 4 | `pnpm dev` (별도 터미널이면 `dev:web`) | web 3000 + api 4000 동시 기동 |
| 5 | 브라우저 http://localhost:3000 | 페이지에 API 연결 상태 "ok" 표시 |
| 6 | api 종료 후 새로고침 | "연결 안 됨" 표시, 프론트는 정상 렌더 |

## 6. 리스크 및 주의사항

1. **파일 이동으로 인한 대량 diff**: 커밋 1은 이동(rename)만 포함하고 코드 수정은 섞지
   않는다 — `git mv`로 이력 보존.
2. **포트 충돌**: api 기본 4000, 사용 중이면 `PORT`로 변경.
3. **컨벤션 충돌**: CLAUDE.md는 `type` 선호/클래스 최소화 성향이지만 NestJS는
   클래스+데코레이터 기반. **백엔드는 Nest 관례(클래스, 모듈, DI)를 우선**하되
   들여쓰기·`any` 금지·console 규칙·한국어 주석 등 공통 룰은 그대로 적용한다.
4. **Docker 미설치**: 커밋 4를 포함하려면 Docker Desktop(또는 OrbStack) 설치가 선행돼야
   한다. 미설치 상태면 커밋 4는 후속 작업으로 미룬다.
5. **팀원 브랜치 충돌**: 커밋 1의 디렉토리 이동은 진행 중인 다른 브랜치와 충돌 가능성이
   크다 — 팀에 공지 후 빠르게 머지하는 것을 권장.

## 7. 검증 체크리스트

- [ ] `pnpm install` 클린 설치 성공
- [ ] `pnpm dev:web` → 기존 Next 화면 정상 (구조 이동 후 회귀 없음)
- [ ] `pnpm dev:api` → `GET /api/health` 200
- [ ] `pnpm dev` → 프론트 페이지에서 API 연결 상태 확인
- [ ] `pnpm lint` 통과 (web, api 모두)
- [ ] 커밋이 단계별로 분리되어 있고 각 커밋 시점에 빌드 가능

## 8. 결정 포인트 (✅ 확정)

| # | 결정 | 확정 결과 |
| --- | --- | --- |
| 1 | 백엔드 시작 방식 | **NestJS 분리로 바로 시작** |
| 2 | 리포 구조 | **apps/web + apps/api로 이동** |
| 3 | 프론트→백엔드 연결 방식 | **서버 컴포넌트에서 직접 fetch** |
| 4 | DB(PostgreSQL + Prisma) 포함 범위 | **이번 작업에서는 제외** (커밋 4는 후속 작업) |

### 결정 배경 Q&A

**Q. 프론트/백엔드 코드를 `apps/` 하위에 두는 이유는? (백엔드까지 `apps/`에 두는 게 일반적인가?)**

- **일반 관례 맞음 (검증 완료)**: 구분 기준은 "프론트냐 백엔드냐"가 아니라 **"실행되는
  앱이냐, 공유 라이브러리냐"**다. `apps/` = 배포/실행 단위(프론트·백엔드·모바일 모두),
  `packages/` = 공유 코드(타입·UI·설정 등).
  - Vercel 공식 Turborepo 예제 `with-nestjs`가 정확히 `apps/api`(NestJS) +
    `apps/web`(Next.js) 구조 — https://github.com/vercel/turborepo/tree/main/examples/with-nestjs
  - pnpm 공식 workspace 문서 및 커뮤니티 가이드도 동일 구분 — https://pnpm.io/workspaces
- 추후 FE·BE가 공유할 타입 패키지가 생기면 `packages/shared`로 자연스럽게 확장된다.
- 루트에 `web/`, `api/`를 평평하게 두는 대안도 동작은 하지만, 앱·공유 패키지가 늘어나는
  순간 루트가 비대해지고 워크스페이스 glob(`apps/*`)의 이점을 잃는다.

**Q. 백엔드 프로젝트명을 `api`로 단순화해도 되나?**

- 가능하며 그렇게 확정. 디렉토리는 `apps/api`, 패키지명은 `@repo/api`.
  `backend`, `server`보다 `api`가 관례적으로 더 흔하고 경로만으로 역할이 명확하다.
