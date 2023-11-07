import React from "react";
import styles from "./form-container.module.css";
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {InputText} from "./container-inputs/container-input-text";
import {InputPassword} from "./container-inputs/container-input-password";
import {ContainerLink} from "./container-link/container-link";
import {typeInputs, typeLinksFooter} from "../../utils/inputs";


export function FormContainerUser({inputs, button, handleSubmit, handleReset}) {

  return (
    <section className={`${styles.sectionClassUser}`}>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <fieldset className={styles.fieldset}>
          <div className={`${styles.placeItems}`}>
            {[...inputs]}
          </div>
          <div className={`${styles.buttonExtra}`}>
            {button}
          </div>
        </fieldset>
      </form>
    </section>
  )
}

export function FormContainerNew({header, inputs, links, button, handleSubmit}) {

  return (
    <section className={`${styles.sectionClass}`}>
      <p className="text text_type_main-medium">
        {header}
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <div className={`${styles.placeItems}`}>
            {[...inputs]}
          </div>
          <div className={`${styles.buttonExtra}`}>
            {button}
          </div>
        </fieldset>
      </form>
      <div className={`${styles.placeLinks}`}>
        {[...links]}
      </div>
    </section>
  )
}

/* TODO:ТИПИЗАЦИЯ */