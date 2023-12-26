import React from "react";
import {profileButtons} from "../utils/form-items";
import {FormContainer} from "../components/form-container/form-container";
import {getUser, updateUser} from "../services/user/user-action";
import {userMail, userName} from "../services/user/user-selector";
import {InputEmail} from "../components/form-container/inputs/input-email";
import {InputName} from "../components/form-container/inputs/input-name";
import {InputPassword} from "../components/form-container/inputs/input-password";
import {IField, TFormInputs, TFormInputsValue, useForm} from "../hooks/useForm";
import {useDispatch2, useSelector2} from "../services/store";

export enum Inputs1 {
  passwordInput,
  nameInput,
  emailInput,
}

export type TNameInputs = keyof typeof Inputs1

export function ProfileEdit():JSX.Element {

  const dispatch = useDispatch2();
  const nameValueTest = useSelector2(userName)
  const emailValueTest = useSelector2(userMail)

  const formElement:React.RefObject<HTMLFormElement> = React.createRef()


  const formInputs:TFormInputs<TNameInputs> = {
    passwordInput: {value:''},
    nameInput: {value:nameValueTest},
    emailInput: {value:emailValueTest},
  }

  const {fields, handleSubmit, handleReset} = useForm(formInputs);

  const {passwordInput, nameInput, emailInput} = fields;

  function onChange(field:IField):((event: React.ChangeEvent<HTMLInputElement>) => {}) {
    return field.setState!
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

  function onSubmit(values:TFormInputsValue<TNameInputs> ):void {

    const {passwordInput, nameInput, emailInput} = values

    dispatch(getUser());
    if (isEdit) {
      dispatch(updateUser({email:emailInput, name:nameInput, password:passwordInput}));
    }

  }

  return (
    <FormContainer {...(isEdit && {button: profileButtons})}
                   handleSubmit={handleSubmit(onSubmit)}
                   handleReset={handleReset()}
                   ref={formElement}
    >

      <InputName isEdit={true} key="name"
                 value={nameInput.value!}
                 onChange={onChange(nameInput)}/>
      <InputEmail placeholder="Логин" value={emailInput.value!} key="email" isEdit={true}

                  onChange={onChange(emailInput)}  {...(!isEditMail && {clearError: true})}/>
      <InputPassword isEdit={true} key="password" value={passwordInput.value!}
                     onChange={onChange(passwordInput)} {...(!isEditPassword && {clearError: true})}/>
    </FormContainer>
  )
}