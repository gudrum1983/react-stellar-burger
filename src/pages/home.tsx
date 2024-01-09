import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerConstructor} from "../components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "../components/burger-ingredients/burger-ingredients";
import {OrderDetails} from "../components/modal/order-details/order-details";
import {Modal} from "../components/modal/modal";
import {clearOrderDetails} from "../services/order-details/order-details-actions";
import { orderDetailsFailed, orderDetailsInfo, orderDetailsRequest } from "../services/order-details/order-details-selectors";
import {Text} from "../components/typography/text/text";
import {DISPLAY_SMALL} from "../utils/types";
import {useDispatchApp, useSelectorApp} from "../services/store";

export function Home():JSX.Element {

  const dispatch = useDispatchApp();
  const orderRequest = useSelectorApp(orderDetailsRequest)
  const orderFailed = useSelectorApp(orderDetailsFailed)
  const order = useSelectorApp(orderDetailsInfo)
  const number = order?.number

  function handleCloseModal():void {
    if (number) {
      dispatch(clearOrderDetails())
    }
  }

  function modal(content:React.ReactNode, header = ""):JSX.Element {
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

      {number && modal(<OrderDetails number={number}/>)}
      {orderFailed && modal(
        <Text size={DISPLAY_SMALL} >Наш краторный хмель пожрал антарианский долгоносик,
           попробуйте сформировать заказ позже, Милорд...</Text>
        , "Ошибка")}
      {orderRequest && modal('', "Загрузка Милорд...")}

    </div>
  )
}