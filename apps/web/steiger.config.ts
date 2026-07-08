import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

// FSD 공식 린터 설정 — 레이어/slice 경계 규칙을 강제한다
export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      // Next.js pages/ 라우터와의 충돌 회피용 _pages 프리픽스(공식 관례)를 오탈자로 오탐하지 않도록 비활성화
      'fsd/typo-in-layer-name': 'off',
    },
  },
]);
