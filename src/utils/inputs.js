import React from "react";
import {InputPassword} from "../components/form-container/inputs/input-password";
import {ContainerLink} from "../components/form-container/container-link/container-link";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {InputName} from "../components/form-container/inputs/input-name";
import {InputEmail} from "../components/form-container/inputs/input-email";
import {InputCode} from "../components/form-container/inputs/input-code";

export const typeInputs = {
  email: <InputEmail placeholder="E-mail"/>,
  profileLogin: <InputEmail placeholder="Логин"/>,
  emailResetPassword: <InputEmail placeholder="Укажите e-mail" key='emailResetPassword' name='emailResetPassword'/>,
  checkedCode: <InputCode placeholder="Введите код из письма"/>,
  name: <InputName placeholder="Имя"/>,
  password: <InputPassword placeholder="Пароль"/>,
  passwordNew: <InputPassword placeholder="Введите новый пароль"/>,

}

export const typeLinksFooter = {
  alreadyRegistered: <ContainerLink textDescription="Уже зарегистрированы?" textLink="Войти" to='/login' key='alreadyRegistered'/>,
  rememberPassword: <ContainerLink textDescription="Вспомнили пароль?" textLink="Войти" to='/login' key='rememberPassword'/>,
  forgotPassword: <ContainerLink textDescription="Забыли пароль?" textLink="Забыли пароль?" to='/forgot-password' key='forgotPassword'/>,
  newUser:<ContainerLink textDescription="Вы — новый пользователь?" textLink="Зарегистрироваться" to='/register' key='newUser'/>,
}

export const navigateButton = ({onClick, label}) => {
  return <Button htmlType="submit" type="primary" size="medium" children={label} onClick={onClick}/>
}

export const typeButton = {
  save: <Button htmlType="submit" type="primary" size="medium" children="Сохранить" key='save'/>,
  cancel: <Button htmlType="reset" type="secondary" size="medium" children="Отмена" key='cancel'/>
}