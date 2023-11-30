import {Link, useLocation, useMatch} from "react-router-dom";
import styles from "./card-order.module.css";
import {Ingredients} from "./ingredients/ingredients";
import React from "react";
import {DIGITS_SIZES, DateWithTimezone, TEXT_COLORS, TEXT_SIZES} from "../../utils/text-elements";
import {OrderPrice} from "../order-price/order-price";
import {Text} from "../typography/text/text";
import {Digits} from "../typography/digits/digits";
import {objectPropType} from "../../utils/prop-types";


/**
 * Карточка заказа из ленты заказов
 * @param {object} order - заказ
 */
export function CardOrder({order}) {

  const isFeed = useMatch({path: "feed", end: false});
  const location = useLocation()
  const {ingredients, number, name, status, createdAt} = order

  const numberToString = number.toString()

  return (
    <li>
      <Link className={`nonlink ${styles.cardOrder}`} to={numberToString} state={{background: location}}>
        <div className="orderId">
          <Digits size={DIGITS_SIZES.DIGITS_SMALL}># {number}</Digits>
          {DateWithTimezone({value: createdAt})}
        </div>
        <div>
          <Text size={TEXT_SIZES.DISPLAY_SMALL}>{name}</Text>
          {!isFeed && (status === "done") &&
            <Text size={TEXT_SIZES.DESKTOP_TEXT} extraClass='pt-2' color={TEXT_COLORS.SUCCESS}>Выполнен</Text>}
          {!isFeed && (status !== "done") && <Text size={TEXT_SIZES.DESKTOP_TEXT} extraClass='pt-2'>B работе</Text>}
        </div>
        <div className={styles.orderComponentsAndPrice}>
          <div className={`${styles.orderComponents} relative`}>
            {ingredients.map((item, index, arrayIng) => {
              if (index < 6) {
                return (<Ingredients key={`${number}${index}`} index={index}
                                     ingredient={item} {...(index === 5 && arrayIng.length > 6 && {count: (arrayIng.length - 5)})}></Ingredients>)
              }
            })}
          </div>
          <OrderPrice ingredients={ingredients}/>
        </div>
      </Link>
    </li>
  )
}

CardOrder.propTypes = {
  order: objectPropType,
}