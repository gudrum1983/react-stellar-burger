import React from "react";
import {ContainerLink} from "../components/form-container/container-link/container-link";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

export const typeLinksFooter = {
  alreadyRegistered: <ContainerLink textDescription="Уже зарегистрированы?" textLink="Войти" to='/login' key='alreadyRegistered'/>,
  rememberPassword: <ContainerLink textDescription="Вспомнили пароль?" textLink="Войти" to='/login' key='rememberPassword'/>,
  forgotPassword: <ContainerLink textDescription="Забыли пароль?" textLink="Забыли пароль?" to='/forgot-password' key='forgotPassword'/>,
  newUser:<ContainerLink textDescription="Вы — новый пользователь?" textLink="Зарегистрироваться" to='/register' key='newUser'/>,
}


type Tbutton = {
  label:string;
  key:string;
}

export function createButton({label, key}:Tbutton):JSX.Element {
  return (<Button htmlType="submit" type="primary" size="medium" children={label} key={key}/>)
}

export const profileButtons = [
  <Button htmlType="reset" type="secondary" size="medium" children="Отмена" key='cancel'/>,
  <Button htmlType="submit" type="primary" size="medium" children="Сохранить" key='save'/>
]


