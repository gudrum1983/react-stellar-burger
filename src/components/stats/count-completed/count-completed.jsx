import styles from "../stats.module.css";
import React, {useMemo} from "react";
import {
  numPropType,
  stringPropType
} from "../../../utils/prop-types";


//todo начать от сюда и до заката
export function Completed({header, children}) {

  const partNumber = useMemo(() => {
    return {
      millions: (Math.floor(children / 1000000) === 0) ? "" : `${Math.floor(children / 1000000)} `,
      thousands: (Math.floor(children / 1000) === 0) ? "" : `${Math.floor(children / 1000)} `,
      hundreds: children % 1000,
    }
  }, [children])

  return (
    <div>
      <p className="text text_type_main-medium">{header}</p>
      <p
        className={`${styles.shadow} text text_type_digits-large`}>{partNumber.millions}{partNumber.thousands}{partNumber.hundreds}</p>
    </div>


  )
}

Completed.propTypes = {
  header: stringPropType,
  children: numPropType,
};