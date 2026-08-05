import { defineConfig, defineGlobalStyles, defineRecipe, defineTextStyles } from '@pandacss/dev';

// ─────────────────────────────────────────────────────────────
// 디자인 토큰 — DESIGN_SYSTEM.md(TDS 기반)를 Panda 토큰으로 이관한다.
// 컬러 표기는 OKLCH, 프라이머리는 Toss Blue(#3182F6 = blue.500).
// 라이트 전용(다크 alias는 DS 문서상 미공개 → 후속 이슈).
// ─────────────────────────────────────────────────────────────

// base 팔레트 — 새 role을 만들 때만 직접 참조하고, product UI는 semanticTokens로 호출한다
const colors = {
  white: { value: 'oklch(1 0 0)' },
  blue: {
    50: { value: 'oklch(0.965 0.020 250)' }, // brand-weak 배경
    500: { value: 'oklch(0.624 0.176 254)' }, // 카노니컬 Toss Blue — primary
    600: { value: 'oklch(0.522 0.176 257)' }, // pressed
    700: { value: 'oklch(0.476 0.174 259)' },
  },
  grey: {
    50: { value: 'oklch(0.978 0.003 247)' }, // app 배경
    100: { value: 'oklch(0.957 0.005 247)' }, // secondary surface
    200: { value: 'oklch(0.913 0.008 247)' }, // default divider/border 헤어라인
    300: { value: 'oklch(0.840 0.012 248)' },
    400: { value: 'oklch(0.752 0.016 251)' }, // disabled text, strong line
    500: { value: 'oklch(0.652 0.020 252)' },
    600: { value: 'oklch(0.555 0.022 253)' },
    700: { value: 'oklch(0.452 0.028 253)' }, // secondary text
    800: { value: 'oklch(0.342 0.030 253)' },
    900: { value: 'oklch(0.234 0.030 254)' }, // primary text (순수 검정 아님)
  },
  yellow: { 500: { value: 'oklch(0.853 0.156 86)' } }, // 일러스트 body
  orange: { 500: { value: 'oklch(0.748 0.183 56)' } }, // semantic warning
  red: { 500: { value: 'oklch(0.628 0.218 22)' } }, // error/danger
  green: { 500: { value: 'oklch(0.493 0.143 154)' } }, // success
  navy: { 900: { value: 'oklch(0.155 0.060 261)' } }, // 그림자 베이스
  // washed 배경 (등급 배지)
  wash: {
    green: { value: 'oklch(0.952 0.045 154)' },
    red: { value: 'oklch(0.945 0.045 18)' },
    orange: { value: 'oklch(0.957 0.045 60)' },
  },
  // alpha 계열
  fg: {
    tertiary: { value: 'oklch(0.155 0.060 261 / 0.58)' }, // 흐린 본문
    quaternary: { value: 'oklch(0.155 0.060 261 / 0.28)' }, // placeholder
  },
  line: {
    subtle: { value: 'oklch(0 0 0 / 0.08)' }, // 그레이 위 카드 보더
  },
  overlay: {
    press: { value: 'oklch(0 0 0 / 0.26)' }, // pressed tint
    scrim: { value: 'oklch(0 0 0 / 0.56)' }, // bottom-sheet scrim
  },
};

// semantic alias — product UI는 이것만 호출한다
const semanticColors = {
  fill: {
    brand: { value: '{colors.blue.500}' },
    brandPressed: { value: '{colors.blue.600}' },
    primary: { value: '{colors.grey.900}' },
    secondary: { value: '{colors.grey.100}' },
    weak: { value: '{colors.grey.50}' },
    danger: { value: '{colors.red.500}' },
    success: { value: '{colors.green.500}' },
    warning: { value: '{colors.orange.500}' },
  },
  text: {
    primary: { value: '{colors.grey.900}' },
    secondary: { value: '{colors.grey.700}' },
    tertiary: { value: '{colors.fg.tertiary}' },
    placeholder: { value: '{colors.fg.quaternary}' },
    alt: { value: '{colors.white}' },
    brand: { value: '{colors.blue.500}' },
    danger: { value: '{colors.red.500}' },
  },
  border: {
    secondary: { value: '{colors.grey.200}' },
    primary: { value: '{colors.blue.500}' },
    subtle: { value: '{colors.line.subtle}' },
  },
  bg: {
    canvas: { value: '{colors.grey.50}' }, // app 배경
    surface: { value: '{colors.white}' }, // 카드 표면
    secondary: { value: '{colors.grey.100}' },
  },
};

// 타이포그래피 램프 (size / line-height / tracking / weight)
const textStyles = defineTextStyles({
  'display-2': { value: { fontSize: '40px', lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: 700 } },
  h1: { value: { fontSize: '28px', lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: 700 } },
  h2: { value: { fontSize: '24px', lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: 700 } },
  'title-1': { value: { fontSize: '18px', lineHeight: '1.45', letterSpacing: '-0.01em', fontWeight: 600 } }, // 카드 타이틀
  'title-2': { value: { fontSize: '17px', lineHeight: '1.45', letterSpacing: '-0.01em', fontWeight: 600 } },
  'body-1': { value: { fontSize: '17px', lineHeight: '1.5', letterSpacing: '-0.005em', fontWeight: 400 } },
  'body-2': { value: { fontSize: '15px', lineHeight: '1.5', letterSpacing: '-0.005em', fontWeight: 400 } }, // 본문 기본
  'body-3': { value: { fontSize: '13px', lineHeight: '1.5', letterSpacing: '0', fontWeight: 400 } },
  'label-l': { value: { fontSize: '17px', lineHeight: '1.25', letterSpacing: '-0.005em', fontWeight: 700 } }, // XL/L 버튼
  'label-m': { value: { fontSize: '15px', lineHeight: '1.25', letterSpacing: '-0.005em', fontWeight: 600 } }, // M 버튼
  'label-s': { value: { fontSize: '13px', lineHeight: '1.25', letterSpacing: '0', fontWeight: 600 } }, // S 버튼
  caption: { value: { fontSize: '12px', lineHeight: '1.4', letterSpacing: '0', fontWeight: 500 } },
});

// ─── 컴포넌트 recipe (DS 정의 레이어 — 여기서만 base 팔레트를 role로 승격) ───

// Button — 사이즈 4종 × 변형 3종. pressed=검정 26% overlay, disabled=전체 opacity 0.30
const buttonRecipe = defineRecipe({
  className: 'button',
  description: 'DS 버튼',
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'pretendard',
    whiteSpace: 'nowrap',
    transitionProperty: 'background-color, color',
    transitionDuration: 'base',
    transitionTimingFunction: 'ease',
    _after: {
      content: '""',
      position: 'absolute',
      inset: '0',
      borderRadius: 'inherit',
      backgroundColor: 'overlay.press',
      opacity: '0',
      transitionProperty: 'opacity',
      transitionDuration: 'fast',
      transitionTimingFunction: 'ease',
      pointerEvents: 'none',
    },
    _active: { _after: { opacity: '1' } },
    _disabled: { opacity: '0.3', pointerEvents: 'none', cursor: 'not-allowed' },
  },
  variants: {
    size: {
      xl: { height: '56px', borderRadius: 'xl', textStyle: 'label-l', px: '6' },
      l: { height: '48px', borderRadius: 'l', textStyle: 'label-l', px: '5' },
      m: { height: '40px', borderRadius: 'm', textStyle: 'label-m', px: '4' },
      s: { height: '32px', borderRadius: '10px', textStyle: 'label-s', px: '3' },
    },
    variant: {
      primary: { backgroundColor: 'fill.brand', color: 'text.alt' },
      secondary: { backgroundColor: 'fill.secondary', color: 'text.secondary' },
      ghost: { backgroundColor: 'transparent', color: 'text.brand' },
    },
  },
  defaultVariants: { size: 'l', variant: 'primary' },
});

// Badge — washed 배경 + semantic 텍스트. generic tone만 제공하고,
// 도메인 등급(강력추천/추천/중립/비추천) 매핑은 상위 레이어(GradeBadge)에서 tone으로 변환한다.
const badgeRecipe = defineRecipe({
  className: 'badge',
  description: 'DS 배지 (generic tone)',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '22px',
    px: '2',
    borderRadius: '6px',
    textStyle: 'label-s',
    fontFamily: 'pretendard',
    whiteSpace: 'nowrap',
  },
  variants: {
    tone: {
      neutral: { backgroundColor: 'grey.100', color: 'grey.700' },
      info: { backgroundColor: 'blue.50', color: 'blue.500' },
      success: { backgroundColor: 'wash.green', color: 'green.500' },
      warning: { backgroundColor: 'wash.orange', color: 'orange.500' },
      danger: { backgroundColor: 'wash.red', color: 'red.500' },
    },
  },
  defaultVariants: { tone: 'neutral' },
});

// Card — 화이트 표면, radius-3xl, shadow-1, padding 24
const cardRecipe = defineRecipe({
  className: 'card',
  description: 'DS 카드',
  base: {
    backgroundColor: 'bg.surface',
    borderRadius: '3xl',
    boxShadow: '1',
    padding: '6',
  },
});

// TextField(input) — 48px, grey-100 배경, focus 시 흰 배경 + 1.5px blue, error 시 red
const textFieldRecipe = defineRecipe({
  className: 'textField',
  description: 'DS 텍스트 필드',
  base: {
    width: '100%',
    height: '48px',
    px: '4',
    borderRadius: 'm',
    backgroundColor: 'fill.secondary',
    color: 'text.primary',
    fontFamily: 'pretendard',
    textStyle: 'body-2',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'border.secondary',
    outline: 'none',
    transitionProperty: 'background-color, border-color',
    transitionDuration: 'fast',
    transitionTimingFunction: 'ease',
    _placeholder: { color: 'text.placeholder' },
    _focus: { backgroundColor: 'bg.surface', borderColor: 'border.primary', borderWidth: '1.5px' },
    _disabled: { opacity: '0.3', pointerEvents: 'none' },
  },
  variants: {
    invalid: {
      true: { backgroundColor: 'bg.surface', borderColor: 'fill.danger', borderWidth: '1.5px' },
    },
  },
});

// 전역 스타일 — Pretendard + DS 배경/텍스트 (기존 Next 기본값 Geist는 제거)
const globalCss = defineGlobalStyles({
  html: { height: '100%' },
  'html, body': { maxWidth: '100vw', overflowX: 'hidden' },
  body: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'bg.canvas',
    color: 'text.primary',
    fontFamily: 'pretendard',
    textStyle: 'body-2',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  a: { color: 'inherit', textDecoration: 'none' },
  '*': { WebkitTapHighlightColor: 'transparent' },
});

export default defineConfig({
  // 브라우저 기본 스타일 리셋 사용 여부
  preflight: true,

  // css 선언을 스캔할 대상 (app/은 라우팅 전용, src/는 FSD 레이어)
  include: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],

  // 스캔 제외 대상
  exclude: [],

  // 래퍼 컴포넌트가 recipe를 동적 prop으로 호출하므로(badge({ grade }) 등),
  // 모든 variant CSS를 강제 생성한다. 없으면 기본 variant만 추출돼 나머지 스타일이 누락됨.
  staticCss: {
    recipes: {
      button: ['*'],
      badge: ['*'],
      card: ['*'],
      textField: ['*'],
    },
  },

  // 테마 — DESIGN_SYSTEM.md 토큰 이관 (spacing 4px 스케일은 Panda 기본값과 일치)
  theme: {
    extend: {
      tokens: {
        colors,
        fonts: {
          pretendard: {
            value:
              '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", Roboto, sans-serif',
          },
        },
        radii: {
          m: { value: '12px' }, // text input
          l: { value: '14px' }, // L 버튼(48)
          xl: { value: '16px' }, // XL 버튼(56), 카드
          '2xl': { value: '20px' }, // sheet, dialog
          '3xl': { value: '24px' }, // 큰 카드/섹션
          full: { value: '999px' }, // chip, pill, dots
        },
        shadows: {
          1: { value: '0 1px 2px oklch(0.155 0.060 261 / 0.04), 0 1px 1px oklch(0.155 0.060 261 / 0.04)' },
          2: { value: '0 4px 12px oklch(0.155 0.060 261 / 0.06), 0 1px 2px oklch(0.155 0.060 261 / 0.04)' },
          3: { value: '0 12px 32px oklch(0.155 0.060 261 / 0.10), 0 2px 6px oklch(0.155 0.060 261 / 0.06)' },
          toast: { value: '0 8px 24px oklch(0.155 0.060 261 / 0.16)' },
        },
        durations: {
          fast: { value: '120ms' },
          base: { value: '200ms' },
          slow: { value: '320ms' },
        },
        easings: {
          ease: { value: 'cubic-bezier(0.22, 0.61, 0.36, 1)' },
        },
      },
      semanticTokens: {
        colors: semanticColors,
      },
      textStyles,
      recipes: {
        button: buttonRecipe,
        badge: badgeRecipe,
        card: cardRecipe,
        textField: textFieldRecipe,
      },
    },
  },

  globalCss,

  // codegen 산출물 디렉토리 (gitignore 대상, prepare 스크립트로 생성)
  outdir: 'styled-system',
});
