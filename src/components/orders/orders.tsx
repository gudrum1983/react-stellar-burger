import styles from "./orders.module.css";
import React from "react";
import {useMatch} from "react-router-dom";
import {CardOrder} from "../card-order/card-order";
import {selectorProfileOrdersDataOrders} from "../../services/feed-orders-profile/feed-orders-selector";
import {selectorFeedOrdersDataOrders} from "../../services/feed-orders/feed-orders-selector";
import {pagePath} from "../../utils/constants";
import {TSelectorOrders} from "../../utils/types";
import {useSelectorApp} from "../../services/store";



export function Orders() : JSX.Element {

  const isProfile = !!useMatch({path: pagePath.profileOrdersFull, end: false});

  const dataProfile: TSelectorOrders = useSelectorApp(selectorProfileOrdersDataOrders)
  const dataFeed: TSelectorOrders = useSelectorApp(selectorFeedOrdersDataOrders)

  const orders = React.useMemo(() =>
      (isProfile && !!dataProfile) ? dataProfile.reverse() : dataFeed,
    [dataProfile, dataFeed]
  );

  {
    return (
      <ul className={`${styles.containerFeed} nonList custom-scroll`}>
        {orders && orders.map((item) => (
          <CardOrder order={item} key={item._id}></CardOrder>
        ))}
      </ul>
    )
  }
}