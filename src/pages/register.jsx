import React, {useMemo} from "react";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainerNew} from "../components/form-container/form-container";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  inputsValuesEmail,
  inputsValuesPassword,
  inputsValuesUserName,
} from "../services/inputs-values/inputs-values-selector";
import {register} from "../services/user/user-action";


export function Register() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(inputsValuesEmail)
  const name = useSelector(inputsValuesUserName)
  const pass = useSelector(inputsValuesPassword)

  function handleSubmit(evt) {
    debugger
    evt.preventDefault();

    /*   navigate('/login', {replace: false});*/
    /*     postApiRegister(name, pass, email);*/
    dispatch(register(name, pass, email));
  }

  const registerFormHeader = "Регистрация"
  const registerInputs = [typeInputs.name, typeInputs.email, typeInputs.password];
  const registerButton = navigateButton({label: "Зарегистрироваться"});
  const registerFooterLinks = [typeLinksFooter.alreadyRegistered];

  return (
    <FormContainerNew
      header={registerFormHeader}
      inputs={registerInputs}
      button={registerButton}
      links={registerFooterLinks}
      name='formRegister'
      handleSubmit={handleSubmit}
    />
  )
}

