import type { HTMLAttributes } from 'react';
import { cx } from 'styled-system/css';
import { badge, type BadgeVariantProps } from 'styled-system/recipes';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & BadgeVariantProps;

// DS 배지 — tone(neutral/info/success/warning/danger). 도메인 등급 매핑은 상위 레이어에서.
export function Badge({ tone, className, ...rest }: BadgeProps) {
  return <span className={cx(badge({ tone }), className)} {...rest} />;
}
