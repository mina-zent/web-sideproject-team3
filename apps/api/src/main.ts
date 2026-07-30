import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

// API 서버 기본 포트 (환경변수 PORT로 오버라이드 가능)
const DEFAULT_PORT = 4000;
// 모든 라우트에 공통으로 붙는 전역 프리픽스
const GLOBAL_PREFIX = 'api';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const port = Number(process.env.PORT ?? DEFAULT_PORT);
  await app.listen(port);
  console.info(`[api] 서버 기동 완료: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

void bootstrap();
