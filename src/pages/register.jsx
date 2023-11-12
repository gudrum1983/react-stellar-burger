import React from "react";
import {navigateButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainer} from "../components/form-container/form-container";
import {useDispatch, useSelector} from "react-redux";
import {
  inputsValuesEmail,
  inputsValuesPassword,
  inputsValuesUserName,
} from "../services/inputs-values/inputs-values-selector";
import {register} from "../services/user/user-action";


export function Register() {

  const dispatch = useDispatch();
  const email = useSelector(inputsValuesEmail)
  const name = useSelector(inputsValuesUserName)
  const pass = useSelector(inputsValuesPassword)

  function handleSubmit(evt) {
    debugger
    evt.preventDefault();
    dispatch(register(name, pass, email));
  }

  const registerFormHeader = "Регистрация"
  const registerInputs = [typeInputs.name, typeInputs.email, typeInputs.password];
  const registerButton = navigateButton({label: "Зарегистрироваться"});
  const registerFooterLinks = [typeLinksFooter.alreadyRegistered];

  return (
    <FormContainer
      header={registerFormHeader}
      inputs={registerInputs}
      button={registerButton}
      links={registerFooterLinks}
      name='formRegister'
      handleSubmit={handleSubmit}
    />
  )
}

