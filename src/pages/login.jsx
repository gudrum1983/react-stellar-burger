import React from "react";

import {FormContainerNew
} from "../components/form-container/form-container";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {useNavigate} from "react-router-dom";


export function Login() {

  const navigate = useNavigate();

  function onClick() {
    navigate('/', {replace: false});
  }

  const loginFormHeader = "Вход"
  const loginInputs = [typeInputs.email, typeInputs.password];
  const loginButton = navigateButton({onClick: onClick, label: "Войти"});
  const loginFooterLinks = [typeLinksFooter.newUser, typeLinksFooter.forgotPassword];


  return (
    <FormContainerNew header={loginFormHeader} inputs={loginInputs} button={loginButton} links={loginFooterLinks}/>
  )
}


