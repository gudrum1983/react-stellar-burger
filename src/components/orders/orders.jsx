import styles from "./orders.module.css";
import React from "react";
import {useSelector} from "react-redux";
import {useMatch} from "react-router-dom";
import {CardOrder} from "../card-order/card-order";
import {selectorProfileOrdersData} from "../../services/feed-orders-profile/feed-orders-selector";
import {selectorFeedOrdersData} from "../../services/feed-orders/selector-feed-orders";

export function Orders() {

  const isProfile = useMatch({path: "/profile/orders", end: false});

  const dataProfile = useSelector(selectorProfileOrdersData)
  const dataFeed = useSelector(selectorFeedOrdersData)

  const data = isProfile ? dataProfile : dataFeed

  const orders = React.useMemo(() => {
      let feedOrders = null
      if (data?.orders) {
        feedOrders = data.orders
        return !!isProfile ? feedOrders.toReversed() : feedOrders
      }
    },
    [data]
  );
  {
    return (
      <ul className={`${styles.containerFeed} nonList custom-scroll`}>
        {orders.map((item) => (
          <CardOrder order={item} key={item._id}></CardOrder>
        ))}
      </ul>
    )
  }

}