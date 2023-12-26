import React from "react";
import {createButton, typeLinksFooter} from "../utils/form-items";
import {FormContainer} from "../components/form-container/form-container";
import {useNavigate} from "react-router-dom";
import {getForgot} from "../api/password-config";
import {Modal} from "../components/modal/modal";
import {closeErrorModal, openErrorModal} from "../services/error-modal/error-modal-action";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {InputEmail} from "../components/form-container/inputs/input-email";
import {TFormInputs, TFormInputsValue, useForm} from "../hooks/useForm";
import {Text} from "../components/typography/text/text";
import {DISPLAY_SMALL} from "../utils/types";
import {useDispatch2, useSelector2} from "../services/store";

export enum Inputs1 {
  emailInput,
}

export type TNameInputs = keyof typeof Inputs1

export function ForgotPassword():JSX.Element {
  const dispatch = useDispatch2();
  const navigate = useNavigate();
  const openErrModal = useSelector2(isOpenErrorModal)
  const textErrorModal = useSelector2(errorModalText)
  const formElement:React.RefObject<HTMLFormElement> = React.createRef()

  const formInputs:TFormInputs<TNameInputs> = {
    emailInput: {},
  }
  const {fields, handleSubmit} = useForm(formInputs);
  const {emailInput} = fields;

  function onSubmit(values:TFormInputsValue<TNameInputs>):void {

    const {emailInput} = values

    const target = formElement.current
    const isError = !!target?.querySelector(".input_status_error")
    if (!isError) {
      getForgot({email:emailInput})
        .then(() => {
          localStorage.setItem('forgotConfirmed', 'true');
          navigate('/reset-password', {replace: false});
        })
        .catch(() => dispatch(openErrorModal("Что-то пошло не так, Милорд... Попробуйте позже.")))
    } else {
      dispatch(openErrorModal("Перепроверьте e-mail, Милорд... Он введён не корректно."));
    }
  }

  const header = "Восстановление пароля"
  const buttons = [createButton({label: "Восстановить", key: "restore"})];
  const footerLinks = [typeLinksFooter.rememberPassword];

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };

  return (
    <>
      <FormContainer ref={formElement} header={header}
                     button={buttons} links={footerLinks}
                     handleSubmit={handleSubmit(onSubmit)}>

        <InputEmail placeholder="Укажите e-mail"
                    key="email" value={emailInput.value!}
                    onChange={emailInput.setState!}/>
      </FormContainer>

      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          <Text size={DISPLAY_SMALL}>{textErrorModal}</Text>
        </Modal>}
    </>
  )
}