import type { InputHTMLAttributes } from 'react';
import { css, cx } from 'styled-system/css';
import { textField } from 'styled-system/recipes';

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string;
  helperText?: string;
  invalid?: boolean;
};

const fieldWrapStyle = css({ display: 'flex', flexDirection: 'column', gap: '2' });
const fieldLabelStyle = css({ textStyle: 'label-s', color: 'text.secondary' });
const helperStyle = css({ textStyle: 'caption', color: 'text.tertiary' });
const errorStyle = css({ textStyle: 'caption', color: 'text.danger' });

// DS 텍스트 필드 — label + input(default/focus/error) + helper/error 문구
export function TextField({ label, helperText, invalid, className, id, ...rest }: TextFieldProps) {
  return (
    <div className={fieldWrapStyle}>
      {label ? (
        <label htmlFor={id} className={fieldLabelStyle}>
          {label}
        </label>
      ) : null}
      <input id={id} aria-invalid={invalid} className={cx(textField({ invalid }), className)} {...rest} />
      {helperText ? <p className={invalid ? errorStyle : helperStyle}>{helperText}</p> : null}
    </div>
  );
}
