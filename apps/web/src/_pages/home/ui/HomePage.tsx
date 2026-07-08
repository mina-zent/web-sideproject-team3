import Image from 'next/image';
import { css } from 'styled-system/css';

import { ApiHealthStatus } from './ApiHealthStatus';

// 모바일 대응 기준 (기존 page.module.css의 브레이크포인트 유지)
const MEDIA_MOBILE = '@media (max-width: 600px)';
// 터치 기기에서는 hover 스타일 제외
const MEDIA_HOVER = '@media (hover: hover) and (pointer: fine)';

// 데모 화면 팔레트 — 라이트/다크는 CSS 변수 재정의로 전환한다
const pageStyle = css({
  '--background': '#fafafa',
  '--foreground': '#fff',
  '--text-primary': '#000',
  '--text-secondary': '#666',
  '--button-primary-hover': '#383838',
  '--button-secondary-hover': '#f2f2f2',
  '--button-secondary-border': '#ebebeb',
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'var(--font-geist-sans)',
  backgroundColor: 'var(--background)',
  _osDark: {
    '--background': '#000',
    '--foreground': '#000',
    '--text-primary': '#ededed',
    '--text-secondary': '#999',
    '--button-primary-hover': '#ccc',
    '--button-secondary-hover': '#1a1a1a',
    '--button-secondary-border': '#1a1a1a',
  },
});

const mainStyle = css({
  display: 'flex',
  flex: '1',
  width: '100%',
  maxWidth: '800px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  backgroundColor: 'var(--foreground)',
  padding: '120px 60px',
  [MEDIA_MOBILE]: {
    padding: '48px 24px',
  },
});

const logoStyle = css({
  _osDark: {
    filter: 'invert(1)',
  },
});

const introStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
  gap: '24px',
  '& h1': {
    maxWidth: '320px',
    fontSize: '40px',
    fontWeight: '600',
    lineHeight: '48px',
    letterSpacing: '-2.4px',
    textWrap: 'balance',
    color: 'var(--text-primary)',
  },
  '& p': {
    maxWidth: '440px',
    fontSize: '18px',
    lineHeight: '32px',
    textWrap: 'balance',
    color: 'var(--text-secondary)',
  },
  '& a': {
    fontWeight: '500',
    color: 'var(--text-primary)',
  },
  [MEDIA_MOBILE]: {
    gap: '16px',
    '& h1': {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: '-1.92px',
    },
  },
});

const ctasStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: '440px',
  gap: '16px',
  fontSize: '14px',
  '& a': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40px',
    padding: '0 16px',
    borderRadius: '128px',
    border: '1px solid transparent',
    transition: '0.2s',
    cursor: 'pointer',
    width: 'fit-content',
    fontWeight: '500',
  },
});

const primaryCtaStyle = css({
  background: 'var(--text-primary)',
  color: 'var(--background)',
  gap: '8px',
  [MEDIA_HOVER]: {
    _hover: {
      background: 'var(--button-primary-hover)',
      borderColor: 'transparent',
    },
  },
});

const secondaryCtaStyle = css({
  borderColor: 'var(--button-secondary-border)',
  [MEDIA_HOVER]: {
    _hover: {
      background: 'var(--button-secondary-hover)',
      borderColor: 'transparent',
    },
  },
});

// 홈 화면 본체 — 라우팅(app/page.tsx)에서 위임받아 렌더링한다
export function HomePage() {
  return (
    <div className={pageStyle}>
      <main className={mainStyle}>
        {/* 백엔드 연결 테스트 — apps/api 헬스체크 결과 표시 */}
        <ApiHealthStatus />
        <Image
          className={logoStyle}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={introStyle}>
          <h1>To get started, edit the page.tsx file.</h1>
          <p>
            Looking for a starting point or more instructions? Head over to{' '}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>{' '}
            or the{' '}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </a>{' '}
            center.
          </p>
        </div>
        <div className={ctasStyle}>
          <a
            className={primaryCtaStyle}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={logoStyle}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className={secondaryCtaStyle}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
