import React from "react";
import {createButton, typeLinksFooter} from "../utils/form-items";
import {FormContainer} from "../components/form-container/form-container";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../services/user/user-action";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {closeErrorModal, openErrorModal} from "../services/error-modal/error-modal-action";
import {Modal} from "../components/modal/modal";
import {useForm} from "../hooks/useForm";
import {InputPassword} from "../components/form-container/inputs/input-password";
import {InputEmail} from "../components/form-container/inputs/input-email";
import {InputName} from "../components/form-container/inputs/input-name";

import {sizesText} from "../utils/constants";
import {Text} from "../components/typography/text/text";


export function Register() {

  const dispatch = useDispatch();
  const openErrModal = useSelector(isOpenErrorModal)
  const textErrorModal = useSelector(errorModalText)
  const formElement = React.createRef()


  const formInputs = {
    passwordInput: {},
    nameInput: {},
    emailInput: {},
  }
  const {fields, handleSubmit} = useForm(formInputs);

  const {passwordInput, nameInput, emailInput} = fields;

  function onChange(field) {
    return field.setState
  }

  function onSubmit({values: {passwordInput, nameInput, emailInput}}) {
    const target = formElement.current
    const isError = !!target.querySelector(".input_status_error")
    if (!isError) {
      dispatch(register(nameInput, passwordInput, emailInput));
    } else {
      dispatch(openErrorModal("Перепроверьте данные, Милорд... Они введены не корректно."));
    }
  }

  const header = "Регистрация"
  const buttons = [createButton({label: "Зарегистрироваться", key: "register"})];
  const footerLinks = [typeLinksFooter.alreadyRegistered];

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };


  if(!!fields) {
    return (
      <>
        <FormContainer ref={formElement} header={header}
                       button={buttons} links={footerLinks}
                       name='formRegister'
                       handleSubmit={handleSubmit(onSubmit)}>
          <InputName placeholder="Имя" key="name"
                     value={nameInput.value}
                     onChange={onChange(nameInput)}/>
          <InputEmail
                      value={emailInput.value} key="email"
                      onChange={onChange(emailInput)}/>
          <InputPassword key="password" value={passwordInput.value}
                         onChange={onChange(passwordInput)}/>

        </FormContainer>
        {openErrModal &&
          <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
            <Text size={sizesText.displaySmall}>{textErrorModal}</Text>
          </Modal>}
      </>
    )

  } else {
    <p>PFUHEPRF</p>
  }


}

