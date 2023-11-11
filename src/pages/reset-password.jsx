import React from "react";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainerNew} from "../components/form-container/form-container";
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {inputsValuesVerificationCode, inputsValuesPassword} from "../services/inputs-values/inputs-values-selector";
import {getReset} from "../api/password-config";

export function ResetPassword() {

  const navigate = useNavigate();
  const password = useSelector(inputsValuesPassword)
  const code = useSelector(inputsValuesVerificationCode)

  function handleSubmit(evt) {
    evt.preventDefault();
    getReset(password, code)
      .then((res) => {
        console.log(res)
        localStorage.removeItem("forgotConfirmed");
      })
      .catch((err) => console.log(err));
    navigate('/register', {replace: true});
  }

  const resetPasswordFormHeader = "Восстановление пароля"
  const resetPasswordInputs = [typeInputs.passwordNew, typeInputs.checkedCode];
  const resetPasswordButton = navigateButton({label: "Сохранить"});
  const resetPasswordFooterLinks = [typeLinksFooter.rememberPassword];


  const forgotConfirmed = localStorage.getItem("forgotConfirmed");
  if (!forgotConfirmed) {
    return <Navigate to="/login" replace={true}/>;
  }

  return (
    <FormContainerNew header={resetPasswordFormHeader} inputs={resetPasswordInputs} button={resetPasswordButton}
                      links={resetPasswordFooterLinks} handleSubmit={handleSubmit}/>
  )
}