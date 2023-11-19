import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-orders-profile.module.css";
import React from "react";
import {feedOrders} from "../../utils/data";
import {useSelector} from "react-redux";
import {burgerIngredientsArray} from "../../services/burger-ingredients/burger-ingredients-selector";


export function FeedHistory() {
  return (
    <div className={`${styles.containerFeed} custom-scroll`}>
      {feedOrders.map((item) => (
        <CardOrderFeedHistory item={item} key={item.numberOrder}></CardOrderFeedHistory>
      ))}
    </div>
  )

}


export function CardOrderFeedHistory({item}) {


  return (
    <div className={styles.cardOrder}>
      <div className={styles.orderId}>
        <p className="text text_type_digits-default">#{item.numberOrder}</p><p
        className="text text_type_main-default text_color_inactive">{item.orderDate}</p>
      </div>
      <div>
        <p className="text text_type_main-medium pb-2">
          {item.nameOrder}
        </p>
        <p className="text text_type_main-default">
          {item.orderStatus}
        </p>
      </div>
      <div className={styles.orderComponentsAndPrice}>
        <div className={styles.orderComponents}>
          {item.componentsOrder.map((itemIng, index, arrayIng) => {
            if (index < 6) {
              return (<ImgIng index={index} itemIng={itemIng} {...(index === 5 && arrayIng.length > 6 && {count: arrayIng.length - 5})}></ImgIng>)
            }
          })}
        </div>
        <div className={styles.orderPrice}>
          <div className={`${styles.orderTextPrice} text text_type_digits-default pr-2`}>{888}</div>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}

export function ImgIng({itemIng, index, count = null}) {

  const ingredients = useSelector(burgerIngredientsArray)

  const marginLeft = index * 48
  const postIndex = 10 - index
  const image_mobile_find = (idIng) => {
    const currentIngredient = ingredients.find((itemIng) => (itemIng._id === idIng));
    return currentIngredient.image_mobile
  }

  return (
    <Button
      style={{left: marginLeft, zIndex: postIndex}}
      htmlType="button" type="primary" extraClass={styles.buttonCardSmall}
      index={index} key={`${index}_${itemIng}`}>

      <div className={styles.imgCardSmall} style={{backgroundImage: `url(${image_mobile_find(itemIng)})`}}>
        {count && <div className={styles.imgCardSmallFonNumber}>{`+${count}`}</div>}

      </div>

    </Button>
  )

}


/*
export function CardOrderInfoFullPage() {

  return (
    <div className={styles.cardOrder}>
      <div className={styles.orderIdNumber}>#034533</div>
      <div className={styles.burgerName}>Black Hole Singularity острый бургер</div>
      <div className={styles.orderStatus}>Выполнен</div>
      <div className={styles.orderIngredients}>
        <div className={styles.orderIngredientsHeader}>Состав:</div>
        <div className={styles.orderIngredientsItemFullPage}>
          <Button htmlType="button" type="primary"  extraClass={styles.buttonCardSmall}>
            <div className={styles.imgCardSmall} style={{backgroundImage:`url(${ingredientsItem.image_mobile})`}}/>
          </Button>
        </div>
        <div className={orderPrice}>
          <div className={orderTextPrice}></div>
          <div className={orderIconPrice}></div>
        </div>
      </div>


      <div className={orderId}>
        <div className={orderIdNumber}>#034535</div>
        <div className={orderTimeStamp}>Сегодня, 16:20 i-GMT+3</div>
      </div>
      <div>


      </div>


    </div>
  )
}*/
