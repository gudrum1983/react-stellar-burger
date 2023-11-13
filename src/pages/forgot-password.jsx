import React from "react";
import {createButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainer} from "../components/form-container/form-container";
import {useNavigate} from "react-router-dom";

import {useSelector} from "react-redux";
import {inputsValuesEmail} from "../services/inputs-values/inputs-values-selector";
import {getForgot} from "../api/password-config";


export function ForgotPassword() {

  const navigate = useNavigate();
  const email = useSelector(inputsValuesEmail)

  function handleSubmit(evt) {
    evt.preventDefault();
    getForgot(email)
      .then((res) => {
        localStorage.setItem("forgotConfirmed", true);
      })
      .catch((err) => console.log(err));
    navigate('/reset-password', {replace: false});
  }

  const forgotPasswordFormHeader = "Восстановление пароля"
  const forgotPasswordInputs = [typeInputs.emailForgot];
  const forgotPasswordButton = [createButton( {label:"Восстановить", key:"restore"})];
  const forgotPasswordFooterLinks = [typeLinksFooter.rememberPassword];

  return (
    <FormContainer header={forgotPasswordFormHeader} inputs={forgotPasswordInputs} button={forgotPasswordButton}
                   links={forgotPasswordFooterLinks} handleSubmit={handleSubmit}/>
  )
}