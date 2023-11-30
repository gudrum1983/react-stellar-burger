import React from "react";
import {Orders} from "../components/orders/orders";
import {Stats} from "../components/stats/stats";
import { useDispatch, useSelector} from "react-redux";
import {Modal} from "../components/modal/modal";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {closeErrorModal} from "../services/error-modal/error-modal-action";
import {connectFeed, disconnectFeed} from "../utils/data";

import {TEXT_SIZES} from "../utils/text-elements";
import {Text} from "../components/typography/text/text";
import {selectorFeedOrdersData, selectorFeedOrdersStatus} from "../services/feed-orders/selector-feed-orders";
import {WebsocketStatus} from "../utils/constants";
import {Preloader} from "../components/preloader/preloader";

export function Feed() {

  const dispatch = useDispatch();
  const openErrModal = useSelector(isOpenErrorModal)
  const textErrorModal = useSelector(errorModalText)

  const status = useSelector(selectorFeedOrdersStatus)
  const data = useSelector(selectorFeedOrdersData)
  const isDisconnected = status !== WebsocketStatus.ONLINE

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };

  React.useEffect(() => {
    dispatch(connectFeed());
    return () => {
      dispatch(disconnectFeed());
    }
  }, []);

  if (!isDisconnected && data) {  return (
    <>
      <section className={'pl-5 pr-5 half-home'}>
        <Text size={TEXT_SIZES.DISPLAY_LARGE} extraClass="pb-5">Лента заказов</Text>
        <Orders/>
      </section>
      <section className={'pl-5 pr-5 pt-15 half-home'}>
        <Stats/>
      </section>
      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          <Text size={TEXT_SIZES.DISPLAY_SMALL}>{textErrorModal}</Text>
        </Modal>}
    </>
  )} else {
    return <Preloader/>
  }
}