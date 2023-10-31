import React from "react";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainerNew} from "../components/form-container/form-container";
import {useNavigate} from "react-router-dom";

export function ForgotPassword() {

  const navigate = useNavigate();

  function onClick() {
    navigate('/reset-password', {replace: false});
  }

  const forgotPasswordFormHeader = "Восстановление пароля"
  const forgotPasswordInputs = [typeInputs.emailResetPassword];
  const forgotPasswordButton = navigateButton({onClick: onClick, label: "Восстановить"});
  const forgotPasswordFooterLinks = [typeLinksFooter.rememberPassword];

  return (
    <FormContainerNew header={forgotPasswordFormHeader} inputs={forgotPasswordInputs} button={forgotPasswordButton}
                      links={forgotPasswordFooterLinks}/>
  )
}