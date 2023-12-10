import React from "react";
import styles from "./form-container.module.css";
import {useLocation} from "react-router-dom";
import {
  arrayNodeElementOptional,
  functionOptional,
  functionPropType,
  stringOptional
} from "../../utils/prop-types";

export const FormContainer = React.forwardRef(({
                                                 children,
                                                 header = null,
                                                 inputs,
                                                 links = null,
                                                 button,
                                                 handleSubmit,
                                                 handleReset = null
                                               }, ref) => {

  const location = useLocation()
  const containerClass = location.pathname === "/profile"
    ? styles.profile_container
    : styles.container

  return (
    <div className={containerClass}>

      {header && <p className="text text_type_main-medium">
        {header}
      </p>}

      <form ref={ref} onSubmit={handleSubmit} {...(handleReset && {onReset: handleReset})}>
        <fieldset className={styles.fieldset}>
          <div className={`${styles.placeItems}`}>
            {inputs}
            {children}
          </div>
          <div className={`${styles.buttonExtra}`}>
            {button}
          </div>
        </fieldset>
      </form>

      {links && <div className={`${styles.placeLinks}`}>
        {links}
      </div>}

    </div>
  )
})

FormContainer.propTypes = {
  header: stringOptional,
  inputs: arrayNodeElementOptional,
  links: arrayNodeElementOptional,
  button: arrayNodeElementOptional,
  handleSubmit: functionPropType,
  handleReset: functionOptional,
};
