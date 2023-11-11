import React from "react";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainerNew} from "../components/form-container/form-container";
import {Navigate, useNavigate} from "react-router-dom";
import {forgotPassword, resetPassword} from "../services/user/action";
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
    dispatch(resetPassword(password, code));
    navigate('/register', {replace: true});
  }


  const resetPasswordFormHeader = "Восстановление пароля"
  const resetPasswordInputs = [typeInputs.passwordNew, typeInputs.checkedCode];
  const resetPasswordButton = navigateButton({label: "Сохранить"});
  const resetPasswordFooterLinks = [typeLinksFooter.rememberPassword];


  const forgotConfirmed = localStorage.getItem("forgotConfirmed");
  if (!forgotConfirmed) { return <Navigate to="/login"  replace={true}/>;}

  return (
    <FormContainerNew header={resetPasswordFormHeader} inputs={resetPasswordInputs} button={resetPasswordButton}
                      links={resetPasswordFooterLinks} handleSubmit={handleSubmit}/>
  )
}