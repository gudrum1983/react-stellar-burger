import styles from "./count-completed.module.css";
import React, {FC, useMemo} from "react";
import {Text} from "../../typography/text/text";
import {Digits} from "../../typography/digits/digits";
import {DIGITS_LARGE, DISPLAY_SMALL, TPropsCountCompleted} from "../../../utils/types";

export const CountCompleted: FC<TPropsCountCompleted> = ({header, value}) => {

  const partNumber = useMemo(() => {
    return {
      millions: (Math.floor(value / 1000000) === 0) ? "" : `${Math.floor(value / 1000000)} `,
      thousands: (Math.floor(value / 1000) === 0) ? "" : `${Math.floor(value / 1000)} `,
      hundreds: value % 1000,
    }
  }, [value])

  return (
    <div>
      <Text size={DISPLAY_SMALL}>{header}</Text>
      <Digits size={DIGITS_LARGE} extraClass={styles.shadow}>
        {partNumber.millions}{partNumber.thousands}{partNumber.hundreds}
      </Digits>
    </div>
  )
}