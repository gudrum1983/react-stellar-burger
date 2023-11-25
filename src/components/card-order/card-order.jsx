import {Link, useLocation} from "react-router-dom";
import styless from "../burger-ingredients/ingredient/ingredient.module.css";
import styles from "./card-order.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredients} from "./ingredients/ingredients";
import React from "react";

export function CardOrder({item, isFeed}) {


  const location = useLocation()


  return (

    <Link className={`${styless.nonlink} ${styles.cardOrder}`} to={`${item.number}`} state={{background: location}}>
      <div className={styles.orderId}>
        <p className="text text_type_digits-default">#{item.number}</p>
        <p className="text text_type_main-default text_color_inactive"><FormattedDate
          date={new Date(item.createdAt)}/> i-GMT+3</p>

      </div>
      <div>
        <p className="text text_type_main-medium">
          {item.name}
        </p>
        {!isFeed && <p className="text text_type_main-default pt-2">
          {item.status}
        </p>}
      </div>
      <div className={styles.orderComponentsAndPrice}>
        <div className={`${styles.orderComponents} relative`}>
          {item.ingredients.map((itemIng, index, arrayIng) => {
            if (index < 6) {
              return (<Ingredients key={`${item.number}${index}`} index={index}
                                   itemIng={itemIng} {...(index === 5 && arrayIng.length > 6 && {count: arrayIng.length - 5})}></Ingredients>)
            }
          })}
        </div>
        <div className={styles.orderPrice}>
          <div className={`text text_type_digits-default pr-2`}>{888}</div>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </Link>


  )
}