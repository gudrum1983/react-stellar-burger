import React from "react";
import {createButton, typeInputs, typeLinksFooter} from "../utils/inputs";
import {FormContainer} from "../components/form-container/form-container";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {inputsValuesVerificationCode, inputsValuesPassword} from "../services/inputs-values/inputs-values-selector";
import {getReset} from "../api/password-config";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {closeErrorModal, openErrorModal} from "../services/error-modal/error-modal-action";
import {Modal} from "../components/modal/modal";
import {addCheckedToken, addPassword} from "../services/inputs-values/inputs-values-actions";

export function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = useSelector(inputsValuesPassword)
  const code = useSelector(inputsValuesVerificationCode)
  const textErrorModal = useSelector(errorModalText)
  const openErrModal = useSelector(isOpenErrorModal)

  function handleSubmit(evt) {
    const target = evt.target
    const isError = !!target.querySelector(".input_status_error")
    evt.preventDefault();
    if (!isError) {
      getReset(password, code)
        .then(() => {
          localStorage.removeItem("forgotConfirmed");
          dispatch(addPassword(''))
          dispatch(addCheckedToken(''))
          navigate('/register', {replace: true});
        })
        .catch(() => dispatch(openErrorModal("Что-то пошло не так, Милорд... Проверьте данные или попробуйте позже.")))
    } else {
      dispatch(openErrorModal("Перепроверьте данные, Милорд... Они введены не корректно."));
    }
  }

  const resetPasswordFormHeader = "Восстановление пароля"
  const resetPasswordInputs = [typeInputs.passwordReset, typeInputs.checkedCode];
  const resetPasswordButton = [createButton({label: "Сохранить", key: "save"})];
  const resetPasswordFooterLinks = [typeLinksFooter.rememberPassword];


  const forgotConfirmed = localStorage.getItem("forgotConfirmed");
  if (!forgotConfirmed) {
    return <Navigate to="/login" replace={true}/>;
  }

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };


  return (
    <>
      <FormContainer header={resetPasswordFormHeader} button={resetPasswordButton}
                     links={resetPasswordFooterLinks} handleSubmit={handleSubmit}>
        {resetPasswordInputs}
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