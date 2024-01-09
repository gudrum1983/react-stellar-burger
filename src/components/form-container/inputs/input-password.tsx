import React from "react";
import {PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {TPropsInput} from "./input-email";

export function InputPassword({placeholder,
                                value,
                                isEdit = false,
                                onChange,
                                clearError = false}:TPropsInput):JSX.Element {
const text = !!value ? value : ''

  return (
    <div className="input_container">
      <PasswordInput autoComplete="off"
                     onChange={onChange}
                     value={text}
                     name={'password'}
                     {...(placeholder && {placeholder: placeholder})}
                     {...(clearError && {error: false, errorText: ""})}
                     {...(isEdit && {icon: "EditIcon"})}
      />
    </div>
  )
}