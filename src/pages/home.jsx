import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerConstructor} from "../components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "../components/burger-ingredients/burger-ingredients";
import {OrderDetails} from "../components/modal/order-details/order-details";
import {Modal} from "../components/modal/modal";
import {clearOrderDetails} from "../services/order-details/order-details-actions";
import {useDispatch, useSelector} from "react-redux";
import {
  orderDetailsFailed,
  orderDetailsInfo,
  orderDetailsRequest
} from "../services/order-details/order-details-selectors";

import {TEXT_SIZES} from "../utils/text-elements";
import {Text} from "../components/typography/text/text";

export function Home() {

  const dispatch = useDispatch();
  const orderRequest = useSelector(orderDetailsRequest)
  const orderFailed = useSelector(orderDetailsFailed)
  const order = useSelector(orderDetailsInfo)
  const number = order?.number

  function handleCloseModal() {
    if (number) {
      dispatch(clearOrderDetails())
    }
  }

  function modal(content, header = "") {
    return (<Modal onClose={handleCloseModal} header={header}>
      {content}
    </Modal>)
  }

  return (
    <div className={'flex-row'}>
      <DndProvider backend={HTML5Backend}>
        <section className={'pl-5 pr-5 half-home'}>
          <BurgerIngredients/>
        </section>
        <section className={'pl-5 pr-5 half-home'}>
          <BurgerConstructor/>
        </section>
      </DndProvider>

      {number && modal(<OrderDetails/>)}
      {orderFailed && modal(
        <Text size={TEXT_SIZES.DISPLAY_SMALL} >Наш краторный хмель пожрал антарианский долгоносик,
           попробуйте сформировать заказ позже, Милорд...</Text>
        , "Ошибка")}
      {orderRequest && modal('', "Загрузка Милорд...")}

    </div>
  )
}