import React from "react";
import {PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {booleanOptional, functionOptional, stringOptional} from "../../../utils/prop-types";


export function InputPassword({placeholder,
                                value,
                                isEdit = false,
                                onChange,
                                clearError = false}) {
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

InputPassword.propTypes = {
  placeholder: stringOptional,
  value: stringOptional,
  isEdit: booleanOptional,
  onChange: functionOptional,
};