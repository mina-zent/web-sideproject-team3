import { Module } from '@nestjs/common';

import { HealthModule } from './health/health.module';

// 애플리케이션 루트 모듈 — 도메인 모듈을 여기에 등록한다
@Module({
  imports: [HealthModule],
})
export class AppModule {}
