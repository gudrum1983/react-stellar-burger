import React, {useMemo} from "react";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainerNew} from "../components/form-container/form-container";
import {useNavigate} from "react-router-dom";
import {postApiRegister} from "../utils/newApiRegister";
import {useDispatch, useSelector} from "react-redux";
import {
  selectedEmail,
  selectedPassword,
  selectedUserName,
} from "../services/user-inputs/user-inputs-selector";
import {register} from "../services/user/action";


export function Profile() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(selectedEmail)
  const name = useSelector(selectedUserName)
  const pass = useSelector(selectedPassword)

  function onClick(evt) {
    evt.preventDefault();

    /*   navigate('/login', {replace: false});*/
    /*     postApiRegister(name, pass, email);*/
    dispatch(register(name, pass, email));
  }

  const registerFormHeader = "PROFILE"
/*  const registerInputs = [typeInputs.name, typeInputs.email, typeInputs.password];
  const registerButton = navigateButton({onClick: onClick, label: "Зарегистрироваться"});
  const registerFooterLinks = [typeLinksFooter.alreadyRegistered];*/


  return (
    <FormContainerNew
      header={registerFormHeader}
      inputs={[]}
      button={[]}
      links={[]}
      name='formRegister'
    />
  )

}