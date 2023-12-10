import styles from "./count-completed.module.css";
import React, {useMemo} from "react";
import {numPropType, stringPropType} from "../../../utils/prop-types";
import {sizesDigits, sizesText} from "../../../utils/constants";
import {Text} from "../../typography/text/text";
import {Digits} from "../../typography/digits/digits";

export function CountCompleted({header, children}) {

  const partNumber = useMemo(() => {
    return {
      millions: (Math.floor(children / 1000000) === 0) ? "" : `${Math.floor(children / 1000000)} `,
      thousands: (Math.floor(children / 1000) === 0) ? "" : `${Math.floor(children / 1000)} `,
      hundreds: children % 1000,
    }
  }, [children])

  return (
    <div>
      <Text size={sizesText.displaySmall}>{header}</Text>
      <Digits size={sizesDigits.large} extraClass={styles.shadow}>
        {partNumber.millions}{partNumber.thousands}{partNumber.hundreds}
      </Digits>
    </div>
  )
}

CountCompleted.propTypes = {
  header: stringPropType,
  children: numPropType,
};