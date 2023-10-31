import React from "react";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainerNew} from "../components/form-container/form-container";
import {useNavigate} from "react-router-dom";


export function ResetPassword() {

  const navigate = useNavigate();

  function onClick() {
    navigate('/', {replace: false});
  }

  const resetPasswordFormHeader = "Восстановление пароля"
  const resetPasswordInputs = [typeInputs.passwordNew, typeInputs.checkedCode];
  const resetPasswordButton = navigateButton({onClick: onClick, label: "Сохранить"});
  const resetPasswordFooterLinks = [typeLinksFooter.rememberPassword];

  return (
    <FormContainerNew header={resetPasswordFormHeader} inputs={resetPasswordInputs} button={resetPasswordButton}
                      links={resetPasswordFooterLinks}/>
  )
}