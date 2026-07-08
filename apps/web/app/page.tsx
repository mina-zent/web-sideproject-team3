import { HomePage } from '@/_pages/home';

// 라우팅 전용 — 실제 화면은 FSD _pages 레이어(home slice)에 위임한다
export default function Home() {
  return <HomePage />;
}
