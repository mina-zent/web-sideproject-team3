import { Module } from '@nestjs/common';

import { HealthController } from './health.controller';

// 헬스체크 모듈 — 서버 생존 여부 확인용
@Module({
  controllers: [HealthController],
})
export class HealthModule {}
