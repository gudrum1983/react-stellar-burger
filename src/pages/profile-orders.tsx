import React from "react";
import {Orders} from "../components/orders/orders";
import {useDispatch} from "react-redux";
import {
  selectorProfileOrdersData,
  selectorProfileOrdersStatus
} from "../services/feed-orders-profile/feed-orders-selector";
import {connectProfile, disconnectProfile, WebsocketStatus} from "../utils/config-ws";
import {Preloader} from "../components/preloader/preloader";
import {Text} from "../components/typography/text/text";
import {useSelector2} from "../services/store";

export function ProfileOrders():JSX.Element {

  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken")?.slice(7) ?? ""

  const data = useSelector2(selectorProfileOrdersData)
  const status = useSelector2(selectorProfileOrdersStatus)
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