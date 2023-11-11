import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {addCheckedToken} from "../../../services/inputs-values/inputs-values-actions";
import {inputsValuesVerificationCode} from "../../../services/inputs-values/inputs-values-selector";

export function InputCode({placeholder}) {

  const value = useSelector(inputsValuesVerificationCode)
  const dispatch = useDispatch();
  const inputRef = React.useRef(null)

  return (
    <Input
      type={'text'}
      placeholder={placeholder}
      onChange={e => dispatch(addCheckedToken(e.target.value))}
      value={value}
      name={'name'}
      error={false}
      ref={inputRef}
      errorText={'Ошибка'}
      size={'default'}
    />
  )
}