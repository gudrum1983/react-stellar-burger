import React from "react";
import {Orders} from "../components/orders/orders";
import {Stats} from "../components/stats/stats";
import { useDispatch, useSelector} from "react-redux";
import {Modal} from "../components/modal/modal";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {closeErrorModal} from "../services/error-modal/error-modal-action";
import {connectFeed, disconnectFeed} from "../utils/data";
import {displayLarge, displaySmall} from "../utils/text-elements";

export function Feed() {

  const dispatch = useDispatch();
  const openErrModal = useSelector(isOpenErrorModal)
  const textErrorModal = useSelector(errorModalText)

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };

  React.useEffect(() => {
    dispatch(connectFeed());
    return () => {
      dispatch(disconnectFeed());
    }
  }, []);

  return (
    <>
      <section className={'pl-5 pr-5 half-home'}>
        {displayLarge({value: "Лента заказов", extraClass:"pb-5"})}
        <Orders/>
      </section>
      <section className={'pl-5 pr-5 pt-15 half-home'}>
        <Stats/>
      </section>
      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          {displaySmall({value: textErrorModal})}
        </Modal>}
    </>
  )
}