import {booleanOptional, functionOptional, stringOptional} from "../../../utils/prop-types";
import React from "react";
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";


export function InputEmail({placeholder,
                             value,
                             isEdit = false,
                             onChange,
                             clearError = false}) {

  const text = !!value ? value : ''
  return (
    <div className="input_container">
      <EmailInput onChange={onChange}
/*                  defaultValue={''}*/
                  value={text}
                  name={'email'}
                  isIcon={isEdit}
                  {...(placeholder && {placeholder: placeholder})}
                  {...(clearError && {error: false, errorText: ""})}
      />
    </div>
  )
}

InputEmail.propTypes = {
  placeholder: stringOptional,
  value: stringOptional,
  isEdit: booleanOptional,
  onChange: functionOptional,
};