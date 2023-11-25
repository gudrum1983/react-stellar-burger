import {Navigate, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {WebsocketStatus} from "../../utils/constants";
import {openErrorModal} from "../../services/error-modal/error-modal-action";
import styles from "./order-info.module.css";
import styless from "../card-order/card-order.module.css";
import {IngredientsItems} from "../card-order/ingredients-items/ingredients-items";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export function OrderInfo() {

/*  const test2 = useMatch({path: "/profile/orders/", end: false});*/

  const dispatch = useDispatch();


  const params = useParams()
  const location = useLocation()
  const isFeed = (location.pathname.indexOf("/feed") === 0) //проверяем что строка "/profile" находится именно в начале pathname


  const idCurrentItem = params.id
  const background = location.state && location.state.background;


  const {status, data} = useSelector(store => isFeed ? store.feedOrders : store.feedOrdersProfile)

  const isDisconnected = status !== WebsocketStatus.ONLINE


  if (isDisconnected || !data?.success) {
    return (
      <p className="text text_type_main-medium">
        Загрузка...
      </p>
    )

  }


  const orders = data?.orders
  const item = orders.find(tet => tet.number === Number(idCurrentItem))

  if (!item) {
    if (isFeed) {
      dispatch(openErrorModal(`Заказ с номером ${idCurrentItem} не найден, Милорд... Проверьте есть ли интересующий вас заказ в ленте заказов! `));
      return <Navigate to={"/feed"}/>
    } else {
      dispatch(openErrorModal(`Заказ с номером ${idCurrentItem} не найден в вашем профиле, Милорд... Проверьте есть ли интересующий вас заказ в вашей истории заказов! `));
      return <Navigate to={"/profile/orders"}/>
    }


  }

  const styleCard = background ? styles.cardOrder3 : styles.cardOrder2
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
      <IngredientsItems componentsOrder={item.ingredients}/>
      <div className={`${styless.orderId} pt-10`}>


        <p className="text text_type_main-default text_color_inactive"><FormattedDate
          date={new Date(item.createdAt)}/> i-GMT+3</p>
        <div className={styless.orderPrice}>
          <div className={`text text_type_digits-default pr-2`}>{888}</div>
          <CurrencyIcon type="primary"/>
        </div>

      </div>
    </div>
  )
}