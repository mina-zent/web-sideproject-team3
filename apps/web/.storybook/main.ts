import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/nextjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Next.js(App Router) + Panda CSS 기반 Storybook.
// Panda 스타일은 프로젝트 postcss.config.cjs(panda 플러그인)를 통해 globals.css import 시 주입된다.
const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  // tsconfig paths에 baseUrl이 없어 Storybook 빌더가 별칭을 해석하지 못하므로 명시적으로 매핑한다
  webpackFinal: (webpackConfig) => {
    webpackConfig.resolve ??= {};
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias ?? {}),
      'styled-system': path.resolve(dirname, '../styled-system'),
      '@': path.resolve(dirname, '../src'),
    };
    return webpackConfig;
  },
};

export default config;
