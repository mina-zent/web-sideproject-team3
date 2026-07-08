import { defineConfig } from '@pandacss/dev';

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

  // codegen 산출물 디렉토리 (gitignore 대상, prepare 스크립트로 생성)
  outdir: 'styled-system',
});
