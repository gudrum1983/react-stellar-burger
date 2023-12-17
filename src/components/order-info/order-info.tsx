import {Navigate, useLocation, useMatch, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from "./order-info.module.css";
import {IngredientsItems} from "./ingredients-items/ingredients-items";
import React from "react";
import {connectFeed, connectProfile, disconnectFeed, disconnectProfile, WebsocketStatus} from "../../utils/config-ws";
import {orderDetails} from "../../services/order-details/order-details-selectors";
import {clearOrderDetails, getInfoOrderDetails} from "../../services/order-details/order-details-actions";
import {pagePath} from "../../utils/constants";
import {openErrorModal} from "../../services/error-modal/error-modal-action";
import {OrderPrice} from "../order-price/order-price";
import {Text} from "../typography/text/text";
import {Digits} from "../typography/digits/digits";
import {DateWithTimezone} from "../typography/date/date";
import {
  selectorProfileOrdersData,
  selectorProfileOrdersStatus
} from "../../services/feed-orders-profile/feed-orders-selector";
import {selectorFeedOrdersData, selectorFeedOrdersStatus} from "../../services/feed-orders/selector-feed-orders";
import {COLOR_SUCCESS, DISPLAY_SMALL, TOrder} from "../../utils/types";

type TSelectorOrder = {
  orderRequest: boolean;
  orderFailed: boolean
  order: TOrder
}

/**
 * карточка с деталями заказа OrderInfo
 */
export function OrderInfo(): JSX.Element {


  const dispatch = useDispatch();

  const params = useParams()
  const idCurrentItem = params.id

  const location = useLocation()
  const background = location.state && location.state.background;

  const isFeed = useMatch({path: pagePath.feed, end: false});
  const isProfile = useMatch({path: pagePath.profile, end: false});


  const dataFeedProfile = useSelector(selectorProfileOrdersData)
  const statusFeedProfile = useSelector(selectorProfileOrdersStatus)
  const dataFeed = useSelector(selectorFeedOrdersData)
  const statusFeed = useSelector(selectorFeedOrdersStatus)

  let data = dataFeedProfile
  let status = statusFeedProfile


  if (isFeed) {
    data = dataFeed
    status = statusFeed
  }


  const isDisconnected = status !== WebsocketStatus.ONLINE

  const {orderRequest, order: orderRest}: TSelectorOrder = useSelector(orderDetails)

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
      //todo any clear
      const orders: Array<TOrder>  = data.orders

      findOrderWS = orders.find(itemOrder => itemOrder.number === Number(idCurrentItem))
    }

    if (orderRest) {
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
      <Text size={DISPLAY_SMALL}>Загрузка...</Text>
    )
  }

  const styleCard = background ? styles.cardOrder3 : styles.cardOrder2


  if (!!order) {

    const {number, name, status, ingredients, createdAt } = order

    return (
      <div className={styleCard}>
        {!background && <Digits extraClass={styles.header}># {number}</Digits>}

        <div className="mb-15 ">
          <Text size={DISPLAY_SMALL} extraClass='mb-3'>{name}</Text>
          {(status === "done")
            ? <Text color={COLOR_SUCCESS}>Выполнен</Text>
            : <Text>"B работе"</Text>
          }

        </div>
        <Text size={DISPLAY_SMALL} extraClass='mb-6'>Состав</Text>
        <IngredientsItems componentsOrder={ingredients}/>
        <div className="orderId pt-10">
          {DateWithTimezone({value: createdAt})}
          <OrderPrice ingredients={ingredients}/>
        </div>
      </div>
    )
  } else {
    dispatch(openErrorModal(`Заказ с номером ${idCurrentItem} не найден, Милорд...! `));
    return <Navigate to={pagePath.profileOrdersFull}/>
  }
}