import React from "react";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainerNew} from "../components/form-container/form-container";
import {useNavigate} from "react-router-dom";
import {forgotPassword} from "../services/user/action";
import {getReset} from "../api/config";
import {useDispatch, useSelector} from "react-redux";
import {selectedCode, selectedEmail, selectedPassword} from "../services/user-inputs/user-inputs-selector";


export function ResetPassword() {

  const navigate = useNavigate();
  const password = useSelector(selectedPassword)
  const code = useSelector(selectedCode)
  const dispatch = useDispatch();
/*  function onClick() {
    navigate('/', {replace: false});
  }*/


  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(getReset(password, code));
/*    navigate('/reset-password', {replace: false});*/
  }


  const resetPasswordFormHeader = "Восстановление пароля"
  const resetPasswordInputs = [typeInputs.passwordNew, typeInputs.checkedCode];
  const resetPasswordButton = navigateButton({label: "Сохранить"});
  const resetPasswordFooterLinks = [typeLinksFooter.rememberPassword];

  return (
    <FormContainerNew header={resetPasswordFormHeader} inputs={resetPasswordInputs} button={resetPasswordButton}
                      links={resetPasswordFooterLinks} handleSubmit={handleSubmit}/>
  )
}