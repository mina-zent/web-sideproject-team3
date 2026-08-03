import type { Meta, StoryObj } from '@storybook/nextjs';
import { css } from 'styled-system/css';

import { Badge } from '../badge';
import { Card } from './Card';

const meta = {
  title: 'DS/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const headerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '3',
});
const titleStyle = css({ textStyle: 'title-1', color: 'text.primary' });
const bodyStyle = css({ textStyle: 'body-2', color: 'text.secondary' });

// 분석 결과 카드 예시 — 타이틀 + 등급 배지 + 본문
export const AnalysisResult: Story = {
  render: () => (
    <div className={css({ maxWidth: '420px' })}>
      <Card>
        <div className={headerStyle}>
          <span className={titleStyle}>분석 결과</span>
          <Badge tone="success">강력추천</Badge>
        </div>
        <p className={bodyStyle}>5년 누적 절세액은 약 3,200만원으로 추정돼요. 지금 전환하면 유리해요.</p>
      </Card>
    </div>
  ),
};
