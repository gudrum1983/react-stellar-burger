import React from "react";
import {FormContainerNew} from "../components/form-container/form-container";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../services/user/action";
import {postApiLogin} from "../utils/newApiRegister";
import {selectedEmail, selectedPassword, selectedUserName} from "../services/user-inputs/user-inputs-selector";


export function Login() {

  const dispatch = useDispatch();

  const email = useSelector(selectedEmail)

  const pass = useSelector(selectedPassword)
  const onClick = (evt) => {
    evt.preventDefault();

    dispatch(login(pass, email));
/*    postApiLogin(pass, email);
    dispatch(login());*/
  }

  const loginFormHeader = "Вход"
  const loginInputs = [typeInputs.email, typeInputs.password];
  const loginButton = navigateButton({onClick: onClick, label: "Войти"});
  const loginFooterLinks = [typeLinksFooter.newUser, typeLinksFooter.forgotPassword];

  return (
    <FormContainerNew header={loginFormHeader} inputs={loginInputs} button={loginButton} links={loginFooterLinks}/>
  )
}