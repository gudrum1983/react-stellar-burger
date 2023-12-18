import React from "react";
import {Orders} from "../components/orders/orders";
import {useDispatch, useSelector} from "react-redux";
import {
  selectorProfileOrdersData,
  selectorProfileOrdersStatus
} from "../services/feed-orders-profile/feed-orders-selector";
import {connectProfile, disconnectProfile, WebsocketStatus} from "../utils/config-ws";
import {Preloader} from "../components/preloader/preloader";
import {Text} from "../components/typography/text/text";

export function ProfileOrders() {

  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken")?.slice(7) ?? ""

  const data = useSelector(selectorProfileOrdersData)
  const status = useSelector(selectorProfileOrdersStatus)
  const isDisconnected = status !== WebsocketStatus.ONLINE

  React.useEffect(() => {
    dispatch(connectProfile(token));
    return () => {
      dispatch(disconnectProfile());
    }
  }, []);

  if (isDisconnected || !data) {
    return (<Preloader/>)
  } else if (!isDisconnected && !!data) {
    return (<Orders/>)
  } else {
    return (<Text>Произошла ошибка, Милорд...</Text>)
  }
}