import styles from "./orders-board.module.css";
import React, {Fragment} from "react";
import {Text} from "../../typography/text/text";
import {Digits} from "../../typography/digits/digits";
import {COLOR_SUCCESS, DISPLAY_SMALL} from "../../../utils/types";


type TPropsOrdersBoard = {
  header: string;
  items: Array<number>;
  done?: boolean;
};

export function OrdersBoard ({header, items, done = false}:TPropsOrdersBoard):JSX.Element {

  const styleGrid = (items.length > 10) ? styles.listNumbersTwoColumns : styles.listNumbers

  return (
    <div className={styles.listOrdersBoard}>
      <Text size={DISPLAY_SMALL}>
        {header}
      </Text>
      <div className={styleGrid}>
        {items.map((item, index) => {
          if (index < 20) {
            return (
              <Fragment key={item}>
                <Digits {...done && {color:COLOR_SUCCESS}}>{item}</Digits>
              </Fragment>
            )
          }
        })}
      </div>
    </div>
  )
}