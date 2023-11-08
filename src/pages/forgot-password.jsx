import React from "react";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainerNew} from "../components/form-container/form-container";
import {useNavigate} from "react-router-dom";
import {register, forgotPassword} from "../services/user/action";
import {useDispatch, useSelector} from "react-redux";
import {selectedEmail} from "../services/user-inputs/user-inputs-selector";

export function ForgotPassword() {

  const navigate = useNavigate();
  const email = useSelector(selectedEmail)
  const dispatch = useDispatch();
/*  function onClick() {
    navigate('/reset-password', {replace: false});
  }*/

  function handleSubmit(evt) {
    evt.preventDefault();

    /*   navigate('/login', {replace: false});*/
    /*     postApiRegister(name, pass, email);*/
    dispatch(forgotPassword(email));
    navigate('/reset-password', {replace: false});
  }



  const forgotPasswordFormHeader = "Восстановление пароля"
  const forgotPasswordInputs = [typeInputs.emailResetPassword];
  const forgotPasswordButton = navigateButton({label: "Восстановить"});
  const forgotPasswordFooterLinks = [typeLinksFooter.rememberPassword];

  return (
    <FormContainerNew header={forgotPasswordFormHeader} inputs={forgotPasswordInputs} button={forgotPasswordButton}
                      links={forgotPasswordFooterLinks} handleSubmit={handleSubmit}/>
  )
}