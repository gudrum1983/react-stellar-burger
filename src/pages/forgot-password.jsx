import React from "react";
import {createButton, typeLinksFooter} from "../utils/inputs";
import {FormContainer} from "../components/form-container/form-container";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getForgot} from "../api/password-config";
import {Modal} from "../components/modal/modal";
import {closeErrorModal, openErrorModal} from "../services/error-modal/error-modal-action";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {InputEmail} from "../components/form-container/inputs/input-email";
import {useForm} from "../hooks/useForm";


export function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openErrModal = useSelector(isOpenErrorModal)
  const textErrorModal = useSelector(errorModalText)
  const formElement = React.createRef()

  const formInputs = {
    emailInput: {},
  }
  const {fields, handleSubmit} = useForm(formInputs);
  const {emailInput} = fields;

  function onSubmit({values: {emailInput}}) {

    const target = formElement.current
    const isError = !!target.querySelector(".input_status_error")

    if (!isError) {
      getForgot(emailInput)
        .then(() => {
          localStorage.setItem("forgotConfirmed", true);
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
                    key="email" value={emailInput.value}
                    onChange={emailInput.setState}/>
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