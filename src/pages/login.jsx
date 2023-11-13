import React from "react";
import {FormContainer} from "../components/form-container/form-container";
import {createButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../services/user/user-action";
import {inputsValuesEmail, inputsValuesPassword} from "../services/inputs-values/inputs-values-selector";

export function Login() {

  const dispatch = useDispatch();
  const email = useSelector(inputsValuesEmail)
  const pass = useSelector(inputsValuesPassword)
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(login(pass, email));
  }

  const loginFormHeader = "Вход"
  const loginInputs = [typeInputs.email, typeInputs.password];
  const loginButton = [createButton( {label:"Войти", key:"login"})];
  const loginFooterLinks = [typeLinksFooter.newUser, typeLinksFooter.forgotPassword];

  return (
    <FormContainer
      header={loginFormHeader}
      inputs={loginInputs}
      button={loginButton}
      links={loginFooterLinks}
      handleSubmit={handleSubmit}
    />
  )
}