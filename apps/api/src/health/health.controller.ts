import { Controller, Get } from '@nestjs/common';

// 헬스체크 응답 형태 — 프론트 연결 테스트에서 그대로 사용한다
export type HealthResponse = {
  status: 'ok';
  service: 'api';
  timestamp: string;
};

@Controller('health')
export class HealthController {
  // GET /api/health — 서버가 살아있으면 ok를 반환한다
  @Get()
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'api',
      timestamp: new Date().toISOString(),
    };
  }
}
