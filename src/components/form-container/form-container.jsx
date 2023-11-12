import React from "react";
import styles from "./form-container.module.css";
import {useLocation} from "react-router-dom";
import {arrayOfNode, functionOptional, functionPropType, stringOptional} from "../../utils/prop-types";
import {Ingredient} from "../burger-ingredients/ingredient/ingredient";

export function FormContainer({header= null, inputs, links = [], button, handleSubmit, handleReset = null}) {

  const location = useLocation()
  const containerClass = location.pathname === "/profile"
    ? styles.profile_container
    : styles.container

  return (
    <div className={containerClass}>
      {header && <p className="text text_type_main-medium">
        {header}
      </p>}
      <form onSubmit={handleSubmit} {...(handleReset && {onReset:handleReset})}>
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
    </div>
  )
}

Ingredient.propTypes = {
  header: stringOptional,
  inputs: arrayOfNode,
  links: arrayOfNode,
  button: arrayOfNode,
  handleSubmit: functionPropType,
  handleReset: functionOptional,
};