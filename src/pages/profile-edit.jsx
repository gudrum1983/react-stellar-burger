import React, {useState} from "react";
import {profileButtons} from "../utils/inputs";
import {FormContainer} from "../components/form-container/form-container";
import {useDispatch, useSelector} from "react-redux";
import {getUser, updateUser} from "../services/user/user-action";
import {userMail, userName} from "../services/user/user-selector";
import {InputEmail} from "../components/form-container/inputs/input-email";
import {InputName} from "../components/form-container/inputs/input-name";
import {InputPassword} from "../components/form-container/inputs/input-password";
import {useForm} from "../hooks/useForm";

export function ProfileEdit() {

  const [clearError, setClearError] = useState(false)

  const dispatch = useDispatch();
  const nameValueTest = useSelector(userName)
  const emailValueTest = useSelector(userMail)

  const formElement = React.createRef()

  const formInputs = {
    passwordInput: '',
    nameInput: nameValueTest,
    emailInput: emailValueTest,
  }

  const {fields, handleSubmit, handleReset} = useForm(formInputs);

  const {passwordInput, nameInput, emailInput} = fields;

  function onChange(field) {
    return field.setState
  }

  function setValue() {
    dispatch(getUser());
  }

  const isEditName = nameValueTest !== nameInput.value
  const isEditMail = emailValueTest !== emailInput.value
  const isEditPassword = passwordInput.value !== ''

  const isEdit = React.useMemo(() => {
    return [isEditName, isEditMail, isEditPassword].includes(true)
  }, [isEditName, isEditMail, isEditPassword])


  React.useEffect(() => {
    setValue()

  }, [nameValueTest, emailValueTest]);


 React.useEffect(() => {

    if (clearError && !isEdit) {

    } else {
      setClearError(false)
    }

  }, [isEdit]);


  function onReset() {
    setClearError(true)
  }

  function onSubmit({values: {passwordInput, nameInput, emailInput}}) {

    dispatch(getUser());
    if (isEdit) {
      dispatch(updateUser(emailInput, nameInput, passwordInput));
    }

  }

  return (
    <FormContainer {...(isEdit && {button: profileButtons})}
                   handleSubmit={handleSubmit(onSubmit)}
                   handleReset={handleReset(onReset)}
                   ref={formElement}
    >

      <InputName isEdit={true} key="name"
                 value={nameInput.value}
                 onChange={onChange(nameInput)}/>
      <InputEmail placeholder="Логин" value={emailInput.value} key="email" isEdit={true}

                  onChange={onChange(emailInput)}  {...(!isEditMail && {clearError: true})}/>
      <InputPassword isEdit={true} key="password" value={passwordInput.value}
                     onChange={onChange(passwordInput)} {...(clearError && !!passwordInput && {clearError: true})}/>
    </FormContainer>
  )
}