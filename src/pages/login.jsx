import React from "react";
import {FormContainerNew} from "../components/form-container/form-container";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../services/user/user-action";
import {inputsValuesEmail, inputsValuesPassword} from "../services/inputs-values/inputs-values-selector";
import {useNavigation} from "react-router-dom";


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
  const loginButton = navigateButton({label: "Войти"});
  const loginFooterLinks = [typeLinksFooter.newUser, typeLinksFooter.forgotPassword];



  return (
    <FormContainerNew
      header={loginFormHeader}
      inputs={loginInputs}
      button={loginButton}
      links={loginFooterLinks}
      handleSubmit={handleSubmit}
    />
  )
}