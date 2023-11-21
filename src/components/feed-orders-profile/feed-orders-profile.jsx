import {Button, CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-orders-profile.module.css";
import React from "react";
import {useSelector} from "react-redux";
import {burgerIngredientsArray} from "../../services/burger-ingredients/burger-ingredients-selector";
import {Link, useLocation, useParams} from "react-router-dom";
import styless from "../../components/burger-ingredients/ingredient/ingredient.module.css";
import {WebsocketStatus} from "../../utils/constants";

export function FeedHistory() {






  let isFeed = false
  const location = useLocation();
  if (location.pathname === "/feed") {
    isFeed = true
  }

  const {status, data} = useSelector(store => isFeed ? store.feedOrders : store.feedOrdersProfile)

  const isDisconnected = status !== WebsocketStatus.ONLINE

  const orders = React.useMemo(
    () =>
      data?.orders,
    [data]
  );
  console.log({orders})
  console.log({isDisconnected})

  if (!isDisconnected && orders) {
    return (
      <div className={`${styles.containerFeed} custom-scroll`}>
        {orders.map((item) => (
          <CardOrderFeedHistory item={item} key={item._id} isFeed={isFeed}></CardOrderFeedHistory>
        ))}
      </div>
    )
  } else {
    return (<p className="text text_type_main-medium">
      Загрузка...
    </p>)
  }
}


export function CardOrderFeedHistory({item, isFeed}) {

  console.log({item})


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
        <div className={`${styles.orderComponents} ${styles.relative}`}>
          {item.ingredients.map((itemIng, index, arrayIng) => {
            if (index < 6) {
              return (<ImgIng index={index}
                              itemIng={itemIng} {...(index === 5 && arrayIng.length > 6 && {count: arrayIng.length - 5})}></ImgIng>)
            }
          })}
        </div>
        <div className={styles.orderPrice}>
          <div className={`${styles.orderTextPrice} text text_type_digits-default pr-2`}>{888}</div>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </Link>
  )
}

export function ImgIng({itemIng, index, count = null}) {

  const ingredients = useSelector(burgerIngredientsArray)

  const marginLeft = index * 48
  const postIndex = 6 - index
  const image_mobile_find = (idIng) => {
    const currentIngredient = ingredients.find((itemIng) => (itemIng._id === idIng));
    return currentIngredient.image_mobile
  }

  return (
    <Button
      style={{left: marginLeft, zIndex: postIndex}}
      htmlType="button" type="primary" extraClass={`${styles.buttonCardSmall} ${styles.absolute}`}
      index={index} key={`${index}_${itemIng}`}>

      <div className={styles.imgCardSmall} style={{backgroundImage: `url(${image_mobile_find(itemIng)})`}}>
        {count && <div className={styles.imgCardSmallFonNumber}>{`+${count}`}</div>}

      </div>

    </Button>
  )

}


export function DetailsCardOrder() {

  const params = useParams()
  const location = useLocation()
  const idCurrentItem = params.id
  const background = location.state && location.state.background;

  const {data} = useSelector(store => store.feedOrders)

  console.log({data})
const orders = data?.orders
  console.log({orders})
  console.log({idCurrentItem})



  const item = orders.find(tet => tet.number === Number(idCurrentItem))
  const styleCard = background ? styles.cardOrder3 : styles.cardOrder2
  console.log({item})
  return (
    <div className={styleCard}>
      {!background && <p className="text text_type_digits-default mlr-auto mb-10 ">#{item.number}</p>}

      <div className="mb-15">
        <p className="text text_type_main-medium mb-3">
          {item.name}
        </p>
        <p className="text text_type_main-default">
          {item.status}
        </p>
      </div>
      <p className="text text_type_main-medium mb-6">
        Состав:
      </p>
      <ItemsIng componentsOrder={item.ingredients}/>
      <div className={`${styles.orderId} pt-10`}>


        <p className="text text_type_main-default text_color_inactive"><FormattedDate
          date={new Date(item.createdAt)}/> i-GMT+3</p>

        {/*        <p
          className="text text_type_main-default text_color_inactive">{item.orderDate}</p>*/}
        <div className={styles.orderPrice}>
          <div className={`${styles.orderTextPrice} text text_type_digits-default pr-2`}>{888}</div>
          <CurrencyIcon type="primary"/>
        </div>

      </div>
    </div>
  )
}


export function ItemsIng({componentsOrder}) {

  return (
    <div className={`${styles.containerFeed2} custom-scroll`}>
      {componentsOrder.map((item, index) => (
        <ItemIng idIng={item} index={index}/>
      ))}
    </div>
  )

}

export function ItemIng({idIng, index}) {

  const ingredients = useSelector(burgerIngredientsArray)
  const currentIngredient = ingredients.find((itemIng) => (itemIng._id === idIng))
  const {image_mobile, name, price} = currentIngredient


  return (
    <div className={styles.rowIng}>
      <Button
        htmlType="button" type="primary" extraClass={styles.buttonCardSmall}
        key={`${index}_${idIng}`}>

        <div className={styles.imgCardSmall} style={{backgroundImage: `url(${image_mobile})`}}>
        </div>

      </Button>
      <p
        className="text text_type_main-default">{name}</p>
      <div className={styles.orderPrice2}>
        <div className={`${styles.orderTextPrice} text text_type_digits-default pr-2`}>{price}</div>
        <CurrencyIcon type="primary"/>
      </div>

    </div>


  )

}