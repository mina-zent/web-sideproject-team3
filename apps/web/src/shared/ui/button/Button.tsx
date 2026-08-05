import type { ButtonHTMLAttributes } from 'react';
import { cx } from 'styled-system/css';
import { button, type ButtonVariantProps } from 'styled-system/recipes';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantProps;

// DS 버튼 — size(xl/l/m/s) × variant(primary/secondary/ghost). 화면당 primary는 하나만.
export function Button({ size, variant, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={cx(button({ size, variant }), className)} {...rest} />;
}
