import React, {FormEvent} from "react";
import styles from "./form-container.module.css";
import {useLocation} from "react-router-dom";
import {Text} from "../typography/text/text";

export interface IPropsForm extends React.FormHTMLAttributes<HTMLFormElement> {
  header?: string;
  links?: Array<JSX.Element>;
  button: Array<JSX.Element>;
  handleSubmit: (e: FormEvent) => void;
  handleReset?: (() => void);
  children: React.ReactNode;
}

export const FormContainer = React.forwardRef<HTMLFormElement, IPropsForm >(({
                                                 children,
                                                 header,
                                                 links,
                                                 button,
                                                 handleSubmit,
                                                 handleReset
                                               }, ref) => {

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
