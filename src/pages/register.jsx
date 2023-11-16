import React from "react";
import {createButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainer} from "../components/form-container/form-container";
import {useDispatch, useSelector} from "react-redux";
import {
  inputsValuesEmail,
  inputsValuesPassword,
  inputsValuesUserName,
} from "../services/inputs-values/inputs-values-selector";
import {register} from "../services/user/user-action";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {closeErrorModal, openErrorModal} from "../services/error-modal/error-modal-action";
import {Modal} from "../components/modal/modal";


export function Register() {

  const dispatch = useDispatch();
  const email = useSelector(inputsValuesEmail)
  const name = useSelector(inputsValuesUserName)
  const pass = useSelector(inputsValuesPassword)
  const openErrModal = useSelector(isOpenErrorModal)
  const textErrorModal = useSelector(errorModalText)
  function handleSubmit(evt) {
    evt.preventDefault();
    const target = evt.target
    const isError = !!target.querySelector(".input_status_error")
    if (!isError) {
      dispatch(register(name, pass, email));
    } else {
      dispatch(openErrorModal("Перепроверьте данные, Милорд... Они введены не корректно."));
    }
  }

  const registerFormHeader = "Регистрация"
  const registerInputs = [typeInputs.name, typeInputs.email, typeInputs.password];
  const registerButton = [createButton( {label:"Зарегистрироваться", key:"register"})];
  const registerFooterLinks = [typeLinksFooter.alreadyRegistered];

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };

  return (
    <>
      <FormContainer
        header={registerFormHeader}
        button={registerButton}
        links={registerFooterLinks}
        name='formRegister'
        handleSubmit={handleSubmit}>
        {registerInputs}
      </FormContainer>
      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          <p className="text text_type_main-medium">
            {textErrorModal}
          </p>
        </Modal>}
    </>



  )
}

