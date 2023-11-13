import React from "react";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {addCheckedToken} from "../../../services/inputs-values/inputs-values-actions";
import {inputsValuesVerificationCode} from "../../../services/inputs-values/inputs-values-selector";

export function InputCode() {

  const value = useSelector(inputsValuesVerificationCode)
  const dispatch = useDispatch();

  return (
    <Input
      placeholder={"Введите код из письма"}
      onChange={e => dispatch(addCheckedToken(e.target.value))}
      value={value}
      name={'token'}
    />
  )
}