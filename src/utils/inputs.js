import React from "react";
import {InputPassword} from "../components/form-container/inputs/input-password";
import {ContainerLink} from "../components/form-container/container-link/container-link";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {InputName} from "../components/form-container/inputs/input-name";
import {InputEmail} from "../components/form-container/inputs/input-email";
import {InputCode} from "../components/form-container/inputs/input-code";

export const typeInputs = {
  email: <InputEmail key="email"/>,
  emailProfile: <InputEmail placeholder="Логин" isEdit={true} key="email"/>,
  emailForgot: <InputEmail placeholder="Укажите e-mail" key="email"/>,

  checkedCode: <InputCode key="token"/>,

  name: <InputName placeholder="Имя" key="name"/>,
  nameProfile: <InputName isEdit={true} key="name"/>,

  password: <InputPassword key="password"/>,
  passwordProfile: <InputPassword isEdit={true} key="password"/>,
  passwordReset: <InputPassword placeholder="Введите новый пароль" key="password"/>,
}

export const typeLinksFooter = {
  alreadyRegistered: <ContainerLink textDescription="Уже зарегистрированы?" textLink="Войти" to='/login' key='alreadyRegistered'/>,
  rememberPassword: <ContainerLink textDescription="Вспомнили пароль?" textLink="Войти" to='/login' key='rememberPassword'/>,
  forgotPassword: <ContainerLink textDescription="Забыли пароль?" textLink="Забыли пароль?" to='/forgot-password' key='forgotPassword'/>,
  newUser:<ContainerLink textDescription="Вы — новый пользователь?" textLink="Зарегистрироваться" to='/register' key='newUser'/>,
}

export const createButton = ({label, key}) => {
  return <Button htmlType="submit" type="primary" size="medium" children={label} key={key}/>
}

export const profileButtons = [
  <Button htmlType="reset" type="secondary" size="medium" children="Отмена" key='cancel'/>,
  <Button htmlType="submit" type="primary" size="medium" children="Сохранить" key='save'/>
]