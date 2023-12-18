import React, {ForwardedRef} from "react";
import styles from "./form-container.module.css";
import {useLocation} from "react-router-dom";
import {Text} from "../typography/text/text";

type TLink = typeof Text

type TPropsFormContainer = {
  header?: string;
  links?: Array<TLink>;
  button: Array<HTMLButtonElement>;
  handleSubmit: () => void;
  handleReset?: (() => void) | null;
  children: React.ReactNode;
}

export const FormContainer = React.forwardRef(({
                                                 children,
                                                 header,
                                                 links,
                                                 button,
                                                 handleSubmit,
                                                 handleReset
                                               }: TPropsFormContainer, ref: ForwardedRef<HTMLFormElement>) => {

  const location = useLocation()
  const containerClass = location.pathname === "/profile"
    ? styles.profile_container
    : styles.container

  return (
    <div className={containerClass}>

      {header && <Text>
        {header}
      </Text>}

      <form ref={ref} onSubmit={handleSubmit} {...(handleReset && {onReset: handleReset})}>
        <fieldset className={styles.fieldset}>
          <div className={`${styles.placeItems}`}>
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
