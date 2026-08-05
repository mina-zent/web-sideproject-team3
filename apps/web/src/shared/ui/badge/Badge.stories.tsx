import type { Meta, StoryObj } from '@storybook/nextjs';
import { css } from 'styled-system/css';

import { Badge } from './Badge';

const meta = {
  title: 'DS/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'washed 배경 + semantic 텍스트 배지. generic tone(neutral/info/success/warning/danger)만 제공하고, 시뮬레이터 등급 매핑은 상위 도메인 레이어에서 처리해요.',
      },
    },
  },
  args: { children: '배지' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { tone: 'neutral', children: '중립' } };
export const Info: Story = { args: { tone: 'info', children: '정보' } };
export const Success: Story = { args: { tone: 'success', children: '성공' } };
export const Warning: Story = { args: { tone: 'warning', children: '주의' } };
export const Danger: Story = { args: { tone: 'danger', children: '위험' } };

const rowStyle = css({ display: 'flex', alignItems: 'center', gap: '3' });

// generic tone 5종. 시뮬레이터 등급(강력추천/추천/중립/비추천) 매핑은 도메인 레이어(GradeBadge)에서 처리한다.
export const AllTones: Story = {
  render: () => (
    <div className={rowStyle}>
      <Badge tone="success">성공</Badge>
      <Badge tone="info">정보</Badge>
      <Badge tone="neutral">중립</Badge>
      <Badge tone="warning">주의</Badge>
      <Badge tone="danger">위험</Badge>
    </div>
  ),
};
