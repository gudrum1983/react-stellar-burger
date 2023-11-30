import React from "react";
import {createButton, typeLinksFooter} from "../utils/inputs";
import {FormContainer} from "../components/form-container/form-container";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getReset} from "../api/password-config";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {closeErrorModal, openErrorModal} from "../services/error-modal/error-modal-action";
import {Modal} from "../components/modal/modal";
import {InputPassword} from "../components/form-container/inputs/input-password";
import {InputCode} from "../components/form-container/inputs/input-code";
import {useForm} from "../hooks/useForm";

export function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const textErrorModal = useSelector(errorModalText)
  const openErrModal = useSelector(isOpenErrorModal)


  const formElement = React.createRef()

  const formInputs = {
    passwordInput: {},
    codeInput: {},
  }
  const {fields, handleSubmit} = useForm(formInputs);
  const {passwordInput, codeInput} = fields;

  function onSubmit({values: {passwordInput, codeInput}}) {

    const target = formElement.current
    const isError = !!target.querySelector(".input_status_error")

    if (!isError) {
      getReset(passwordInput, codeInput)
        .then(() => {
          localStorage.removeItem("forgotConfirmed");
          navigate('/register', {replace: true});
        })
        .catch(() => dispatch(openErrorModal("Что-то пошло не так, Милорд... Проверьте данные или попробуйте позже.")))
    } else {
      dispatch(openErrorModal("Перепроверьте данные, Милорд... Они введены не корректно."));
    }
  }

  const header = "Восстановление пароля"
  const buttons = [createButton({label: "Сохранить", key: "save"})];
  const footerLinks = [typeLinksFooter.rememberPassword];

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };

  const forgotConfirmed = localStorage.getItem("forgotConfirmed");
  if (!forgotConfirmed) {
    return <Navigate to="/login" replace={true}/>;
  }
  if (!!fields) {
  return (
    <>
      <FormContainer ref={formElement} header={header}
                     button={buttons} links={footerLinks}
                     handleSubmit={handleSubmit(onSubmit)}>

        <InputPassword placeholder="Введите новый пароль"
                       key="password" value={passwordInput.value}
                       onChange={passwordInput.setState}/>

        <InputCode key="token" value={codeInput.value}
                   onChange={codeInput.setState}/>

      </FormContainer>

      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          <p className="text text_type_main-medium">
            {textErrorModal}
          </p>
        </Modal>}
    </>

  )
} else {
  return (
    <p>PFUHEPRF</p>
  )
}}