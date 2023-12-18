import React from "react";
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";

export type TPropsInput = {
  placeholder: string;
  value: string;
  isEdit: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  clearError: boolean;
}

export function InputEmail({placeholder,
                             value,
                             isEdit = false,
                             onChange,
                             clearError = false}:TPropsInput):JSX.Element {

  const text = !!value ? value : ''
  return (
    <div className="input_container">
      <EmailInput onChange={onChange}
                  value={text}
                  name={'email'}
                  isIcon={isEdit}
                  {...(placeholder && {placeholder: placeholder})}
                  {...(clearError && {error: false, errorText: ""})}
      />
    </div>
  )
}