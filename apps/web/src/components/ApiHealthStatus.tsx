import { fetchApiHealth } from '@/lib/api';

// API 연결 상태 배지 문구
const LABEL_CONNECTED = '✅ API 연결됨';
const LABEL_DISCONNECTED = '❌ API 연결 안 됨 — 백엔드(apps/api) 기동 여부를 확인하세요';

// 백엔드 연결 상태를 표시하는 서버 컴포넌트 (연결 테스트용)
export async function ApiHealthStatus() {
  const health = await fetchApiHealth();

  if (!health.connected) {
    return <p>{LABEL_DISCONNECTED}</p>;
  }

  return (
    <p>
      {LABEL_CONNECTED} (status: {health.data.status}, service: {health.data.service},{' '}
      {health.data.timestamp})
    </p>
  );
}
