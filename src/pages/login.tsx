import React from "react";
import {FormContainer} from "../components/form-container/form-container";
import {createButton, typeLinksFooter} from "../utils/form-items";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../services/user/user-action";
import {Modal} from "../components/modal/modal";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {openErrorModal, closeErrorModal} from "../services/error-modal/error-modal-action";
import {IField, TFormInputsValue, useForm} from "../hooks/useForm";
import {InputEmail} from "../components/form-container/inputs/input-email";
import {InputPassword} from "../components/form-container/inputs/input-password";

import {pagePath} from "../utils/constants";
import {Text} from "../components/typography/text/text";
import {DISPLAY_SMALL} from "../utils/types";

export enum Inputs1 {
  passwordInput,
  emailInput,
}

export type TNameInputs = keyof typeof Inputs1

export function Login():JSX.Element {

  const dispatch = useDispatch();

  const formElement:React.RefObject<HTMLFormElement> = React.createRef()

  const formInputs = {
    passwordInput: {},
    emailInput: {},
  }
  const {fields, handleSubmit} = useForm(formInputs);
  const {passwordInput, emailInput} = fields;

  function onChange(field:IField): ((event: React.ChangeEvent<HTMLInputElement>) => {}) {
    return field.setState!
  }

  function onSubmit(values:TFormInputsValue<TNameInputs> ) {
    debugger
    const {passwordInput, emailInput} = values
    const target = formElement.current
    const isError = !!target?.querySelector(".input_status_error")
    if (!isError) {
      dispatch(login(passwordInput, emailInput));
    } else {
      dispatch(openErrorModal("Перепроверьте логин и пароль, Милорд... Они введены не корректно."));
    }
  }

  const openErrModal = useSelector(isOpenErrorModal)
  const textErrorModal = useSelector(errorModalText)

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };

  const header = "Вход"
  const buttons = [createButton({label: "Войти", key: pagePath.login})];
  const footerLinks = [typeLinksFooter.newUser, typeLinksFooter.forgotPassword];
  if (!!fields) {
  return (
    <>
      <FormContainer ref={formElement} header={header}
                     button={buttons} links={footerLinks}
                     handleSubmit={handleSubmit(onSubmit)}>
        <InputEmail
          value={emailInput.value!} key="email"
          onChange={onChange(emailInput)}/>
        <InputPassword key="password" value={passwordInput.value!}
                       onChange={onChange(passwordInput)}/>
      </FormContainer>
      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          <Text size={DISPLAY_SMALL}>{textErrorModal}</Text>
        </Modal>}
    </>
  )
} else {
    return (
      <p>Загрузка...</p>
    )
  }
}