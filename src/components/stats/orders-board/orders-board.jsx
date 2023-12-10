import styles from "./orders-board.module.css";
import React, {Fragment} from "react";
import {Text} from "../../typography/text/text";
import {sizesDigits, sizesText} from "../../../utils/constants";
import {Digits} from "../../typography/digits/digits";
import {arrayOptional, booleanOptional, stringOptional} from "../../../utils/prop-types";

export function OrdersBoard({header, items, done = false}) {

  const styleGrid = (items.length > 10) ? styles.listNumbersTwoColumns : styles.listNumbers
  const styleText = done ? 'text_color_success' : ''

  return (
    <div className={styles.listOrdersBoard}>
      <Text size={sizesText.displaySmall}>
        {header}
      </Text>
      <div className={styleGrid}>
        {items.map((item, index) => {
          if (index < 20) {
            return (
              <Fragment key={item}>
                <Digits size={sizesDigits.small} extraClass={styleText}>{item}</Digits>
              </Fragment>
            )
          }
        })}
      </div>
    </div>
  )
}

OrdersBoard.propTypes = {
  header: stringOptional,
  items: arrayOptional,
  done: booleanOptional,
};