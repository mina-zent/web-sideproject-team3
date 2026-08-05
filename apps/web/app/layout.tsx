import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '비즈몬 — 법인전환 의사결정',
  description: '개인사업자의 법인 전환 의사결정을 숫자와 데이터로 돕는 서비스',
};

// Pretendard(가변) — TPS의 무료 대체. DESIGN_SYSTEM.md 기준 jsDelivr CDN
const PRETENDARD_CDN =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href={PRETENDARD_CDN} />
      </head>
      <body>{children}</body>
    </html>
  );
}
