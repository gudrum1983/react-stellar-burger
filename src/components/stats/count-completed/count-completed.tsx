import styles from "./count-completed.module.css";
import React from "react";
import {Text} from "../../typography/text/text";
import {Digits} from "../../typography/digits/digits";
import {DIGITS_LARGE, DISPLAY_SMALL} from "../../../utils/types";
import {format} from "../../../utils/constants";

export type TPropsCountCompleted = {
  header: string;
  value: number;
};

export function CountCompleted({header, value}: TPropsCountCompleted): JSX.Element {

  const formattedValue = format(String(value))

  return (
    <div>
      <Text size={DISPLAY_SMALL}>{header}</Text>
      <Digits size={DIGITS_LARGE} extraClass={styles.shadow}>
        {formattedValue}
      </Digits>
    </div>
  )
}