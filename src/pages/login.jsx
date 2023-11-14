import React from "react";
import {FormContainer} from "../components/form-container/form-container";
import {createButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../services/user/user-action";
import {inputsValuesEmail, inputsValuesPassword} from "../services/inputs-values/inputs-values-selector";
import {Modal} from "../components/modal/modal";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {openErrorModal, closeErrorModal} from "../services/error-modal/error-modal-action";

export function Login() {

  const dispatch = useDispatch();
  const email = useSelector(inputsValuesEmail)
  const pass = useSelector(inputsValuesPassword)

  const handleSubmit = (evt) => {
    const target = evt.target
    const isError = !!target.querySelector(".input_status_error")
    evt.preventDefault();
    if (!isError) {
      dispatch(login(pass, email));
    } else {
      dispatch(openErrorModal("Перепроверьте логин и пароль, Милорд... Они введены не корректно."));
    }
  }

  const openErrModal = useSelector(isOpenErrorModal)
  const textErrorModal = useSelector(errorModalText)

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };

  const loginFormHeader = "Вход"
  const loginInputs = [typeInputs.email, typeInputs.password];
  const loginButton = [createButton({label: "Войти", key: "login"})];
  const loginFooterLinks = [typeLinksFooter.newUser, typeLinksFooter.forgotPassword];

  return (
    <>
      <FormContainer
        header={loginFormHeader}
        inputs={loginInputs}
        button={loginButton}
        links={loginFooterLinks}
        handleSubmit={handleSubmit}
      />
      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          <p className="text text_type_main-medium">
            {textErrorModal}
          </p>
        </Modal>}
    </>
  )
}