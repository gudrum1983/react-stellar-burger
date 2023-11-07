import {InputText} from "../components/form-container/container-inputs/container-input-text";
import React from "react";
import {InputPassword} from "../components/form-container/container-inputs/form-input-new-password";
import {ContainerLink} from "../components/form-container/container-link/container-link";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../components/form-container/form-container.module.css";
import {InputName} from "../components/form-container/container-inputs/form-input-name";
import {InputEmail} from "../components/form-container/container-inputs/form-input-email";

export const typeInputs = {
  email: <InputEmail placeholder="E-mail" key='email' name='email'/>,
  password: <InputPassword placeholder="Пароль" key='password' name='password'/>,
  passwordNew: <InputPassword placeholder="Введите новый пароль" key='passwordNew' name='passwordNew'/>,
  checkedCode: <InputText placeholder="Введите код из письма" key='checkedCode' name='checkedCode'/>,
  name: <InputName placeholder="Имя" key='name' name='name'/>,
  emailResetPassword: <InputText placeholder="Укажите e-mail" key='emailResetPassword' name='emailResetPassword'/>,
  profileName: <InputName placeholder="Имя" key='name' name='name' disabled={true}/>,
  profileLogin: <InputEmail placeholder="Логин" key='email' name='email'/>,
  profilePassword: <InputPassword placeholder="Пароль" key='passwordProfile' name='passwordProfile' disabled={true}/>,
}

export const typeLinksFooter = {
  alreadyRegistered: <ContainerLink textP="Уже зарегистрированы?" textL="Войти" to='/login' key='alreadyRegistered'/>,
  rememberPassword: <ContainerLink textP="Вспомнили пароль?" textL="Войти" to='/login' key='rememberPassword'/>,
  forgotPassword: <ContainerLink textP="Забыли пароль?" textL="Забыли пароль?" to='/forgot-password' key='forgotPassword'/>,
  newUser:<ContainerLink textP="Вы — новый пользователь?" textL="Зарегистрироваться" to='/register' key='newUser'/>,
}

export const navigateButton = ({onClick, label}) => {
  return <Button htmlType="submit" type="primary" size="medium" children={label} onClick={onClick}/>
}

export const typeButton = {
  save: <Button htmlType="submit" type="primary" size="medium" children="Сохранить" key='save'/>,
  cancel: <Button htmlType="reset" type="secondary" size="medium" children="Отмена" key='cancel'/>
}