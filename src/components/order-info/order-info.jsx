import {Navigate, useLocation, useMatch, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from "./order-info.module.css";
import {IngredientsItems} from "./ingredients-items/ingredients-items";
import React from "react";
import {WebsocketStatus} from "../../utils/constants";
import {connectFeed, connectProfile, disconnectFeed, disconnectProfile,} from "../../utils/data";
import {orderDetails} from "../../services/order-details/order-details-selectors";
import {clearOrderDetails, getInfoOrderDetails} from "../../services/order-details/order-details-actions";
import {digitsSmall, displaySmall, formattedData, textDefault} from "../../utils/text-elements";
import {openErrorModal} from "../../services/error-modal/error-modal-action";
import {OrderPrice} from "../order-price/order-price";


export function OrderInfo() {

  //todo Исправить или понять как исправить ошибку "No routes matched location"

  const dispatch = useDispatch();

  const params = useParams()
  const idCurrentItem = params.id

  const location = useLocation()
  const background = location.state && location.state.background;

  const isFeed = useMatch({path: "/feed", end: false});
  const isProfile = useMatch({path: "/profile", end: false});

  const {status, data} = useSelector(store => isFeed ? store.feedOrders : store.feedOrdersProfile)
  const isDisconnected = status !== WebsocketStatus.ONLINE

  const {orderRequest, orderFailed, order: orderRest} = useSelector(orderDetails)

  React.useEffect(() => {
    if (isFeed && isDisconnected) {
      dispatch(connectFeed());
      return () => {
        dispatch(disconnectFeed())
      }
    } else if (isProfile && isDisconnected) {
      dispatch(connectProfile());
      return () => {
        dispatch(disconnectProfile());
      }
    }
  }, []);

  const order = React.useMemo(() => {

    let findOrderWS = null
    let findOrderRest = null

    if (data?.success) {
      findOrderWS = data.orders.find((itemOrder) => itemOrder.number === Number(idCurrentItem))
    }

    if(orderRest) {
      findOrderRest = orderRest
    }

    return findOrderWS ? findOrderWS : findOrderRest
  }, [data, orderRest])

  React.useEffect(() => {
    if (!order) {
      dispatch(getInfoOrderDetails(idCurrentItem))
      return () => {
        dispatch(clearOrderDetails())
      }
    }
  }, [])


  if (isDisconnected || orderRequest) {
    return (
      <>
        {displaySmall({value: "Загрузка --- isDisconnected...",})}
      </>
    )
  }

  const styleCard = background ? styles.cardOrder3 : styles.cardOrder2

  if (orderFailed) {
      dispatch(openErrorModal(`Заказ с номером ${idCurrentItem} не найден, Милорд...! `));
      return <Navigate to={"/profile/orders"}/>
    }

  if (order || orderRest) {
    return (
      <div className={styleCard}>
        {!background && digitsSmall({value: `#${order.number}`})}
        <div className="mb-15">
          {displaySmall({value: order.name, extraClass: 'mb-3'})}
          {textDefault({value: (order.status === "done" ? "Готово" :  "B работе")})}
        </div>
        {displaySmall({value: 'Состав:', extraClass: 'mb-6'})}
        <IngredientsItems componentsOrder={order.ingredients}/>
        <div className="orderId pt-10">
          {formattedData({value: order.createdAt, addText: " i-GMT+3"})}
          <OrderPrice ingredients={order.ingredients}/>
        </div>
      </div>
    )
  }
}