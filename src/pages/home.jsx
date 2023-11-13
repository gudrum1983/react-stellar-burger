import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerConstructor} from "../components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "../components/burger-ingredients/burger-ingredients";
import {OrderDetails} from "../components/modal/order-details/order-details";
import {Modal} from "../components/modal/modal";
import {clearOrderDetails} from "../services/order-details/order-details-actions";
import {useDispatch, useSelector} from "react-redux";
import {orderDetails} from "../services/order-details/order-details-selectors";

export function Home() {

  const dispatch = useDispatch();

  const {orderNumber, orderRequest, orderFailed} = useSelector(orderDetails)
  function handleCloseModal() {
    if (orderNumber) {
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

      {orderNumber && modal(<OrderDetails/>)}
      {orderFailed && modal(<p className="text text_type_main-medium">
        Наш краторный хмель пожрал антарианский долгоносик, попробуйте сформировать заказ позже, Милорд...
      </p>, "Ошибка")}
      {orderRequest && modal('', "Загрузка Милорд...")}
    </div>
  )
}