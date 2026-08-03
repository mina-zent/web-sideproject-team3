import type { HTMLAttributes } from 'react';
import { cx } from 'styled-system/css';
import { card } from 'styled-system/recipes';

type CardProps = HTMLAttributes<HTMLDivElement>;

// DS 카드 — 화이트 표면, radius-3xl, shadow-1, padding 24
export function Card({ className, ...rest }: CardProps) {
  return <div className={cx(card(), className)} {...rest} />;
}
