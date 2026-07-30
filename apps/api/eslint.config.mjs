import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

// NestJS(백엔드) 전용 ESLint 설정 — 공통 룰(any 금지 등)은 recommended 프리셋에 포함
const eslintConfig = tseslint.config(
  { ignores: ['dist/**'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier
);

export default eslintConfig;
