import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

// 기존 globals.css를 이관한 전역 스타일 (박스 리셋은 preflight가 담당)
const globalCss = defineGlobalStyles({
  ':root': {
    '--background': '#ffffff',
    '--foreground': '#171717',
    '--font-geist-sans': 'Arial, Helvetica, sans-serif',
    '--font-geist-mono': "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
    _osDark: {
      '--background': '#0a0a0a',
      '--foreground': '#ededed',
    },
  },
  html: {
    height: '100%',
    _osDark: { colorScheme: 'dark' },
  },
  'html, body': {
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  body: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--foreground)',
    background: 'var(--background)',
    fontFamily: 'Arial, Helvetica, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

export default defineConfig({
  // 브라우저 기본 스타일 리셋 사용 여부
  preflight: true,

  // css 선언을 스캔할 대상 (app/은 라우팅 전용, src/는 FSD 레이어)
  include: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],

  // 스캔 제외 대상
  exclude: [],

  // 테마 커스터마이징 — 디자인 토큰은 디자인 확정 후 반영
  theme: {
    extend: {},
  },

  globalCss,

  // codegen 산출물 디렉토리 (gitignore 대상, prepare 스크립트로 생성)
  outdir: 'styled-system',
});
