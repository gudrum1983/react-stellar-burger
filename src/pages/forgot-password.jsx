import React from "react";
import {createButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainer} from "../components/form-container/form-container";
import {useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {inputsValuesEmail} from "../services/inputs-values/inputs-values-selector";
import {getForgot} from "../api/password-config";
import {Modal} from "../components/modal/modal";
import {closeErrorModal, openErrorModal} from "../services/error-modal/error-modal-action";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";


export function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(inputsValuesEmail)
  const openErrModal = useSelector(isOpenErrorModal)
  const textErrorModal = useSelector(errorModalText)

  function handleSubmit(evt) {
    evt.preventDefault();
    const target = evt.target
    const isError = !!target.querySelector(".input_status_error")


    if (!isError) {
      getForgot(email)
        .then(() => {
          localStorage.setItem("forgotConfirmed", true);
          navigate('/reset-password', {replace: false});
        })
        .catch(() => dispatch(openErrorModal("Что-то пошло не так, Милорд... Попробуйте позже.")))
    } else {
      dispatch(openErrorModal("Перепроверьте e-mail, Милорд... Он введён не корректно."));
    }
  }

  const forgotPasswordFormHeader = "Восстановление пароля"
  const forgotPasswordInputs = [typeInputs.emailForgot];
  const forgotPasswordButton = [createButton({label: "Восстановить", key: "restore"})];
  const forgotPasswordFooterLinks = [typeLinksFooter.rememberPassword];

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };


  return (
    <>
      <FormContainer header={forgotPasswordFormHeader} button={forgotPasswordButton}
                     links={forgotPasswordFooterLinks} handleSubmit={handleSubmit}>
        {forgotPasswordInputs}
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