import type { Meta, StoryObj } from '@storybook/nextjs';

import { TextField } from './TextField';

const meta = {
  title: 'DS/TextField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: '레이블 + 입력 + 헬퍼/에러 문구로 구성한 텍스트 필드. default / focus / error 상태를 지원해요.',
      },
    },
  },
  args: { label: '연 순이익 (과세표준)', placeholder: '예: 120,000,000' },
  argTypes: {
    invalid: { control: 'boolean' },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: { helperText: '세전 순이익 기준으로 입력해요' },
};

export const Error: Story = {
  args: {
    label: '연 매출',
    placeholder: '숫자만 입력해요',
    defaultValue: 'abc',
    invalid: true,
    helperText: '숫자만 입력할 수 있어요',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '120,000,000' },
};
