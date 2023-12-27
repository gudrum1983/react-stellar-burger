import React from "react";
import {createButton, typeLinksFooter} from "../utils/form-items";
import {FormContainer} from "../components/form-container/form-container";
import {Navigate, useNavigate} from "react-router-dom";
import {getReset} from "../api-config/api-password";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {closeErrorModal, openErrorModal} from "../services/error-modal/error-modal-action";
import {Modal} from "../components/modal/modal";
import {InputPassword} from "../components/form-container/inputs/input-password";
import {InputCode} from "../components/form-container/inputs/input-code";
import {TFormInputs, TFormInputsValue, useForm} from "../hooks/useForm";

import {pagePath} from "../utils/constants";
import {Text} from "../components/typography/text/text";
import {DISPLAY_SMALL} from "../utils/types";
import {useDispatch2, useSelector2} from "../services/store";

export enum Inputs1 {
  passwordInput,
  codeInput,
}

export type TNameInputs = keyof typeof Inputs1

export function ResetPassword():JSX.Element {
  const dispatch = useDispatch2();
  const navigate = useNavigate();
  const textErrorModal = useSelector2(errorModalText)
  const openErrModal = useSelector2(isOpenErrorModal)


  const formElement :React.RefObject<HTMLFormElement> = React.createRef()

  const formInputs:TFormInputs<TNameInputs> = {
    passwordInput: {},
    codeInput: {},
  }
  const {fields, handleSubmit} = useForm(formInputs);
  const {passwordInput, codeInput} = fields;


  function onSubmit(values:TFormInputsValue<TNameInputs>):void {

    const {passwordInput, codeInput} = values
    const target = formElement.current
    const isError = !!target?.querySelector(".input_status_error")

    if (!isError) {
      getReset({password:passwordInput, token:codeInput})
        .then(() => {
          localStorage.removeItem("forgotConfirmed");
          navigate('/register', {replace: true});
        })
        .catch(() => dispatch(openErrorModal("Что-то пошло не так, Милорд... Проверьте данные или попробуйте позже.")))
    } else {
      dispatch(openErrorModal("Перепроверьте данные, Милорд... Они введены не корректно."));
    }
  }

  const header:string = "Восстановление пароля"
  const buttons:JSX.Element[] = [createButton({label: "Сохранить", key: "save"})];
  const footerLinks:JSX.Element[] = [typeLinksFooter.rememberPassword];

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };

  const forgotConfirmed = localStorage.getItem("forgotConfirmed");
  if (!forgotConfirmed) {
    return <Navigate to={pagePath.login} replace={true}/>;
  }
  if (!!fields) {
  return (
    <>
      <FormContainer ref={formElement} header={header}
                     button={buttons} links={footerLinks}
                     handleSubmit={handleSubmit(onSubmit)}>

        <InputPassword placeholder="Введите новый пароль"
                       key="password" value={passwordInput.value!}
                       onChange={passwordInput.setState!}/>

        <InputCode key="token" value={codeInput.value!}
                   onChange={codeInput.setState!}/>

      </FormContainer>

      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          <Text size={DISPLAY_SMALL}>{textErrorModal}</Text>
        </Modal>}
    </>

  )
} else {
  return (
    <p>Загрузка, Милорд...</p>
  )
}}