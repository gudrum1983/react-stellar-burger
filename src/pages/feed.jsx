import React from "react";
import {Orders} from "../components/orders/orders";
import {Stats} from "../components/stats/stats";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "../components/modal/modal";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {closeErrorModal} from "../services/error-modal/error-modal-action";
import {connectFeedOrders, disconnectFeedOrders} from "../services/feed-orders/feed-orders-actions";
import {URL_WS_ALL} from "../utils/data";

export function Feed() {

  const dispatch = useDispatch();
  const openErrModal = useSelector(isOpenErrorModal)
  const textErrorModal = useSelector(errorModalText)

  const connect = () => dispatch(connectFeedOrders(URL_WS_ALL))
  const disconnect = () => dispatch(disconnectFeedOrders())

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };

  React.useEffect(() => {
    connect();
    return () => {
      disconnect()
    }
  }, []);

  return (
    <>
      <section className={'pl-5 pr-5 half-home'}>
        <p className="text text_type_main-large pb-5">Лента заказов</p>
        <Orders/>
      </section>
      <section className={'pl-5 pr-5 pt-15 half-home'}>
        <Stats/>
      </section>
      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          <p className="text text_type_main-medium">
            {textErrorModal}
          </p>
        </Modal>}
    </>
  )
}