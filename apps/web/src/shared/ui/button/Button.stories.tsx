import type { Meta, StoryObj } from '@storybook/nextjs';
import { css } from 'styled-system/css';

import { Button } from './Button';

const meta = {
  title: 'DS/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: '기본 액션 버튼. size(xl/l/m/s) × variant(primary/secondary/ghost). primary fill은 화면당 하나만 사용해요.',
      },
    },
  },
  args: { children: '다음' },
  argTypes: {
    size: { control: 'inline-radio', options: ['xl', 'l', 'm', 's'] },
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary', children: '이전' } };
export const Ghost: Story = { args: { variant: 'ghost', children: '건너뛰기' } };
export const Disabled: Story = { args: { disabled: true, children: '비활성' } };

const columnStyle = css({ display: 'flex', flexDirection: 'column', gap: '3', maxWidth: '320px' });

export const Sizes: Story = {
  render: (args) => (
    <div className={columnStyle}>
      <Button {...args} size="xl">
        XL · 법인 전환 체크리스트 보기
      </Button>
      <Button {...args} size="l">
        L 버튼
      </Button>
      <Button {...args} size="m">
        M 버튼
      </Button>
      <Button {...args} size="s">
        S 버튼
      </Button>
    </div>
  ),
};

const rowStyle = css({ display: 'flex', alignItems: 'center', gap: '3' });

export const Variants: Story = {
  render: (args) => (
    <div className={rowStyle}>
      <Button {...args} variant="primary" size="m">
        다음
      </Button>
      <Button {...args} variant="secondary" size="m">
        이전
      </Button>
      <Button {...args} variant="ghost" size="m">
        건너뛰기
      </Button>
    </div>
  ),
};
