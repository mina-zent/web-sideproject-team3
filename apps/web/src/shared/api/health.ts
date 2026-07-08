// 백엔드 API 베이스 URL (환경변수 API_BASE_URL로 오버라이드 가능)
export const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:4000';

// 백엔드 HealthController 응답 형태 — 추후 packages/ 공유 타입으로 이동 예정
export type HealthResponse = {
  status: 'ok';
  service: 'api';
  timestamp: string;
};

// 연결 실패를 예외가 아닌 값으로 다뤄 백엔드 미기동 시에도 페이지가 죽지 않게 한다
export type HealthResult = { connected: true; data: HealthResponse } | { connected: false };

// 백엔드 헬스체크 호출 (서버 컴포넌트 전용 — 항상 신선한 응답을 위해 no-store)
export async function fetchApiHealth(): Promise<HealthResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, { cache: 'no-store' });
    if (!res.ok) {
      return { connected: false };
    }
    const data = (await res.json()) as HealthResponse;
    return { connected: true, data };
  } catch {
    return { connected: false };
  }
}
