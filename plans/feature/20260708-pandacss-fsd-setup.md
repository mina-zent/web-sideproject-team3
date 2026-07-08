# Panda CSS 도입 및 FSD 폴더 구조 적용 (apps/web)

> 유형: feature · 영향 범위: 앱(apps/web) · 작성일: 2026-07-08
> **상태: ✅ 확정 (2026-07-08)** — 결정 결과는 8장 참고

## 1. 개요

apps/web에 스타일링 시스템으로 **Panda CSS**(확정)를 도입하고, 폴더 구조를
**FSD(Feature-Sliced Design)**로 전환한다. 기능이 붙기 전인 지금이 이동할 파일이
3개뿐이라 전환 비용이 사실상 0인 유일한 타이밍이며, import 경계 규칙도 위반 코드가
생기기 전에 걸어둔다. 각 단계는 독립적으로 동작 가능한 상태로 **개별 커밋**한다.

- Panda CSS: zero-runtime이라 서버 컴포넌트 중심 구조와 잘 맞고, 디자인 토큰·recipe는
  FSD의 `shared` 레이어에 자연스럽게 들어간다.
- FSD × Next.js App Router 충돌(공식 해법 적용):
  - Next의 `app/`(라우팅)은 프로젝트 루트로 빼고 `src/`는 순수 FSD 레이어만 담기
  - FSD의 `app`/`pages` 레이어는 `_app`/`_pages`로 프리픽스 (공식 린터 호환)
  - 라우트 파일(page.tsx)은 얇게 유지하고 실제 화면은 `_pages` slice에 위임
  - 참고: https://feature-sliced.design/docs/guides/tech/with-nextjs

## 2. 현재 상태

- `apps/web/src/app/` — App Router 라우팅 + 화면이 한 폴더에 공존
- 스타일: CSS Modules (`globals.css`, `page.module.css`)
- 이동 대상 코드: `app/page.tsx`, `components/ApiHealthStatus.tsx`, `lib/api.ts` (3개)
- 백엔드 연결(서버 컴포넌트 fetch)은 이전 작업에서 완료 — 회귀 검증 기준으로 사용

## 3. 목표 구조

```
apps/web/
├── app/                        # Next App Router — 라우팅 전용 (루트로 이동, 결정 4)
│   ├── layout.tsx              # 전역 레이아웃 (styled-system/styles.css 로드)
│   └── page.tsx                # 얇은 위임: src/_pages/home 재export 수준
├── src/                        # 순수 FSD 레이어 (결정 1: 최소 시작 권장)
│   ├── _pages/                 # FSD pages 레이어 (프리픽스로 Next와 충돌 회피)
│   │   └── home/
│   │       ├── ui/HomePage.tsx           # 기존 page.tsx 화면 본체
│   │       ├── ui/ApiHealthStatus.tsx    # 헬스체크 표시 (home slice 내부)
│   │       └── index.ts                  # slice public API
│   └── shared/
│       ├── api/                # 기존 lib/api.ts → shared/api (백엔드 클라이언트)
│       ├── config/             # 상수·환경변수 접근
│       └── ui/                 # 공용 UI (필요해질 때 채움)
│   # widgets/ features/ entities/ 는 첫 기능이 들어올 때 생성 (미리 파두지 않음)
├── styled-system/              # Panda codegen 산출물 (gitignore, prepare로 생성)
├── panda.config.ts
├── postcss.config.cjs
└── tsconfig.json               # paths: @/* → ./src/*, styled-system 별칭
```

## 4. 단계별 작업 계획 (커밋 단위)

### 커밋 1 — `feat: Panda CSS 세팅`

- `@pandacss/dev`(최신 안정판) devDependency 추가, `panda init --postcss`
- `panda.config.ts`: `include: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}']`,
  `outdir: 'styled-system'`, preset 기본값으로 시작 (토큰 커스터마이징은 디자인 확정 후)
- `package.json`에 `"prepare": "panda codegen"` — 클론 직후에도 산출물 자동 생성
- `globals.css`에 `@layer reset, base, tokens, recipes, utilities;` 선언
- `styled-system/`을 `.gitignore`에 추가
- 동작 확인용으로 기존 화면 요소 1곳에 `css()` 적용 (스모크 테스트)
- **검증**: `pnpm dev:web` 기존 화면 정상 + Panda 클래스 적용 확인, `pnpm build` 통과

### 커밋 2 — `refactor: FSD 폴더 구조 전환`

- 결정 4에 따라 Next `app/`을 `apps/web` 루트로 이동 (tsconfig include 경로 수정)
- `src/`를 FSD 레이어로 재구성 (결정 1의 범위로 시작):
  - `lib/api.ts` → `src/shared/api/health.ts` (+ `index.ts` public API)
  - `components/ApiHealthStatus.tsx`, `app/page.tsx` 화면 본체 →
    `src/_pages/home/` slice
  - `app/page.tsx`는 `src/_pages/home`을 import만 하는 얇은 파일로
- import는 모두 slice의 public API(`index.ts`) 경유로 정리
- **검증**: `pnpm dev:web` — 홈 화면·API 연결 상태 표시 회귀 없음, `pnpm build` 통과

### 커밋 3 — `refactor: 기존 스타일 Panda CSS 마이그레이션`

- 결정 3의 범위에 따라 진행 (추천: 전부 전환 — 대상이 `page.module.css` 1개 +
  `globals.css`뿐이라 지금 끝내는 게 싸다)
- `page.module.css` → `css()`/`recipe`로 전환 후 삭제, `globals.css`는 Panda
  `globalCss`로 이관하거나 layer 선언만 남김
- 다크모드 등 기존 CSS 변수는 Panda 토큰/시맨틱 토큰으로 흡수
- **검증**: 홈 화면 라이트/다크 렌더링 육안 비교, `pnpm build` 통과

### 커밋 4 — `chore: FSD 경계 규칙 강제 및 컨벤션 문서화`

- 결정 2에 따라 경계 강제 도구 설치 (추천: Steiger — FSD 공식 린터, 설정 거의 불필요)
  - `steiger ./src` 를 `lint` 파이프라인 또는 별도 스크립트로 추가
- `CLAUDE.md`(또는 apps/web/README)에 FSD 컨벤션 추가:
  - 레이어별 용도, 하위 레이어만 import 가능 규칙, slice public API 강제,
    `_pages`/`_app` 프리픽스 이유, 새 레이어는 필요할 때 생성
- **검증**: `pnpm lint` + steiger 통과

## 5. 검증 절차 요약

| 순서 | 명령/행동 | 기대 결과 |
| --- | --- | --- |
| 1 | `pnpm install` (prepare 훅) | `styled-system/` 자동 생성 |
| 2 | `pnpm dev` | 홈 화면 정상 + "API 연결됨" 표시 (회귀 없음) |
| 3 | `pnpm build` | web·api 모두 빌드 성공 |
| 4 | `pnpm lint` (+ steiger) | 경계 위반 0건 |
| 5 | 커밋별 체크아웃 | 각 커밋 시점에 dev/build 가능 |

## 6. 리스크 및 주의사항

1. **codegen 산출물 관리**: `styled-system/`을 커밋하면 diff 오염, 무시하면 클론 직후
   빌드 실패 — `prepare` 스크립트 + gitignore 조합으로 해결한다.
2. **Turbopack × PostCSS**: Next 16 dev는 Turbopack 기본. Panda의 PostCSS 플러그인은
   Turbopack에서 동작하지만, 문제가 생기면 Panda CLI watch 모드(`panda --watch`) 병행으로
   전환한다 (공식 지원 경로).
3. **`_pages` 프리픽스 낯섦**: Next `pages/` 라우터와의 충돌 회피용 공식 관례임을
   문서에 명시해 팀원 혼란을 방지한다.
4. **`app/` 루트 이동**: tsconfig `include`와 ESLint 대상 경로를 함께 수정해야 한다.
   이동 자체는 Next가 공식 지원하는 배치(루트 `app/`)라 런타임 리스크는 낮다.
5. **과도한 스캐폴딩 금지**: 빈 `entities/`·`widgets/`·`features/`를 미리 만들지
   않는다. 레이어는 첫 사용 기능이 들어올 때 생성한다.
6. **팀 타이밍**: 커밋 2의 구조 이동은 진행 중인 FE 브랜치와 충돌 가능 — 공지 후
   빠르게 머지한다.

## 7. 검증 체크리스트 (2026-07-08 완료)

- [x] `pnpm install` 시 styled-system 자동 생성 (prepare 훅 동작 확인)
- [x] `pnpm dev` → 홈 화면 + "API 연결됨" 표시 회귀 없음
- [x] 다크/라이트 모드 규칙 컴파일 CSS에 동일 반영 (prefers-color-scheme·모바일 브레이크포인트 확인)
- [x] `pnpm build` 통과 (web, api)
- [x] `pnpm lint` 통과 — eslint + steiger "No problems found"
- [x] CSS Modules 파일 잔존 0개
- [x] 커밋이 단계별로 분리되어 있고 각 커밋 시점에 빌드 가능

> 참고: Steiger가 `_pages` 프리픽스를 오탈자로 오탐하여
> `fsd/typo-in-layer-name` 룰만 비활성화함 (공식 Next 충돌 회피 관례).

## 8. 결정 포인트 (✅ 확정)

| # | 결정 | 확정 결과 |
| --- | --- | --- |
| 1 | FSD 시작 레이어 범위 | **최소로 시작: `_pages` + `shared`만** (나머지는 첫 기능 때 생성) |
| 2 | FSD 경계 강제 도구 | **Steiger (FSD 공식 린터)** |
| 3 | 기존 스타일 마이그레이션 범위 | **기존 화면까지 전부 Panda로 전환** |
| 4 | Next `app/` 디렉토리 위치 | **`apps/web` 루트로 이동** (FSD 공식 권장 배치) |
