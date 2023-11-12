import {useDispatch, useSelector} from "react-redux";
import {inputsValuesEmail} from "../../../services/inputs-values/inputs-values-selector";
import React from "react";
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {addEmail} from "../../../services/inputs-values/inputs-values-actions";
import {useLocation} from "react-router-dom";

export function InputEmail() {

  const location = useLocation()
  const isProfile = location.pathname === "/profile"
  const isForgot = location.pathname === "/forgot-password"

  const emailValue = useSelector(inputsValuesEmail)
  const dispatch = useDispatch();

  function onChange(e) {
    dispatch(addEmail(e.target.value))
  }


  return (
    <EmailInput
      onChange={onChange}
      value={emailValue}
      name={'email'}
      isIcon={false}
      {...(isForgot && {placeholder: "Укажите e-mail", isIcon: false})}
      {...(isProfile && {placeholder: "Логин", isIcon: true})}
    />
  )
}