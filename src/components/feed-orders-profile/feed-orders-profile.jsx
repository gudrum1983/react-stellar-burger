import styles from "./feed-orders-profile.module.css";
import React, {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useMatch} from "react-router-dom";
import {WebsocketStatus} from "../../utils/constants";
import {
  connectFeedOrdersProfile,
  disconnectFeedOrdersProfile
} from "../../services/feed-orders-profile/feed-orders-actions";
import {URL_WS_ALL, URL_WS_OWNER} from "../../utils/data";
import {connectFeedOrders, disconnectFeedOrders} from "../../services/feed-orders/feed-orders-actions";
import {CardOrder} from "../card-order/card-order";

export function Orders() {
  const dispatch = useDispatch();
  const connect = () => dispatch(connectFeedOrders(URL_WS_ALL))
  const connectPr = () => dispatch(connectFeedOrdersProfile(URL_WS_OWNER))
  const disconnect = () => dispatch(disconnectFeedOrders())
  const disconnectPr = () => dispatch(disconnectFeedOrdersProfile())

  const isProfileHistory = useMatch({path: "/profile/orders", end: false});
  const isFeed = useMatch({path: "feed", end: false});
  React.useEffect(() => {
    if (isProfileHistory) {
      connectPr();
      return () => {
        disconnectPr()
      }
    } else if (isFeed) {
      connect();
      return () => {
        disconnect()
      }
    }
  }, []);

  const {status, data} = useSelector(store => isFeed ? store.feedOrders : store.feedOrdersProfile)

  const isDisconnected = status !== WebsocketStatus.ONLINE

  const orders = React.useMemo(
    () =>
      data?.orders,
    [data]
  );

  if (!isDisconnected && orders) {
    return (
      <div className={`${styles.containerFeed} custom-scroll`}>
        {orders.map((item) => (
          <Fragment key={item._id}>
            <CardOrder item={item} isFeed={isFeed}></CardOrder>
          </Fragment>
        ))}
      </div>
    )
  } else {
    return (<p className="text text_type_main-medium">
      Загрузка...
    </p>)
  }
}


