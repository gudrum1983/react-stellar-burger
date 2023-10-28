import React from "react";
import styles from "./form-container.module.css";
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {InputText} from "./container-inputs/container-input-text";
import {InputPassword} from "./container-inputs/container-input-password";
import {ContainerLink} from "./container-link/container-link";


export function FormContainer() {

  return (

    <section className={`${styles.sectionClass}`}>
      <p className="text text_type_main-medium">
        Вход
      </p>
      <div className={`${styles.placeItems}`}>
        <InputText placeholder="E-mail" />
        <InputPassword placeholder="Пароль" />
      </div>

      <Button htmlType="button" type="primary" size="medium" extraClass={styles.buttonExtra}>
        Войти
      </Button>

      <div className={`${styles.placeLinks}`}>
        <ContainerLink textP="Вы — новый пользователь?" textL="Зарегистрироваться" />
        <ContainerLink textP="Забыли пароль?" textL="Забыли пароль?" />
      </div>

    </section>

  )
}