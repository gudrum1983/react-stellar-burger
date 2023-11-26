import {Navigate, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {WebsocketStatus} from "../../utils/constants";
import {openErrorModal} from "../../services/error-modal/error-modal-action";
import styles from "./order-info.module.css";
import styless from "../card-order/card-order.module.css";
import {IngredientsItems} from "../card-order/ingredients-items/ingredients-items";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {burgerIngredientsMap} from "../../services/burger-ingredients/burger-ingredients-selector";
import {digitsSmall, displaySmall, formattedData, textDefault} from "../../utils/inputs";

export function OrderInfo() {
  /*  const [ingredients, setIngredients] = React.useState(null)*/

  const [sum, setSum] = React.useState(0)
  const dispatch = useDispatch();
  const params = useParams()
  const location = useLocation()
  const isFeed = (location.pathname.indexOf("/feed") === 0) //проверяем что строка "/profile" находится именно в начале pathname

  const idCurrentItem = params.id
  const background = location.state && location.state.background;


  const {status, data} = useSelector(store => isFeed ? store.feedOrders : store.feedOrdersProfile)
  const mapIngredients = useSelector(burgerIngredientsMap)

  const isDisconnected = status !== WebsocketStatus.ONLINE


  const orders = data?.orders
  const item = orders.find(tet => tet.number === Number(idCurrentItem))

  React.useEffect(() => {
    let newSum = sum

    item.ingredients.forEach((ing) => {
      if (mapIngredients.has(ing)) {
        const {price} = mapIngredients.get(ing)
        newSum = (newSum + price)
      }
    })

    setSum(newSum)
  }, [])


  if (!item) {
    if (isFeed) {
      dispatch(openErrorModal(`Заказ с номером ${idCurrentItem} не найден, Милорд... Проверьте есть ли интересующий вас заказ в ленте заказов! `));
      return <Navigate to={"/feed"}/>
    } else {
      dispatch(openErrorModal(`Заказ с номером ${idCurrentItem} не найден в вашем профиле, Милорд... Проверьте есть ли интересующий вас заказ в вашей истории заказов! `));
      return <Navigate to={"/profile/orders"}/>
    }


  }


  if (isDisconnected || !data?.success) {
    return (
      <p className="text text_type_main-medium">
        Загрузка...
      </p>
    )

  }

  const styleCard = background ? styles.cardOrder3 : styles.cardOrder2


  return (
    <div className={styleCard}>
{/*
      {!background && <p className="text text_type_digits-default mlr-auto mb-10 ">#{item.number}</p>}
*/}
      {!background && digitsSmall({value: `#${item.number}`})}

      <div className="mb-15">

        {displaySmall({value:item.name, extraClass: 'mb-3'})}
        {textDefault({value:item.status})}
{/*        <p className="text text_type_main-medium mb-3">
          {item.name}
        </p>*/}
{/*        <p className="text text_type_main-default">
          {item.status}
        </p>*/}
      </div>
      {displaySmall({value:'Состав:', extraClass: 'mb-6'})}
{/*      <p className="text text_type_main-medium mb-6">
        Состав:
      </p>*/}
      <IngredientsItems componentsOrder={item.ingredients}/>
      <div className={`${styless.orderId} pt-10`}>

        {formattedData({value: item.createdAt, addText: " i-GMT+3"})}
{/*        <p className="text text_type_main-default text_color_inactive"><FormattedDate
          date={new Date(item.createdAt)}/> i-GMT+3</p>*/}
        <div className={styless.orderPrice}>
          {digitsSmall({value: sum, extraClass:'pr-2'})}

{/*          <div className={`text text_type_digits-default pr-2`}>{sum}</div>*/}
          <CurrencyIcon type="primary"/>
        </div>

      </div>
    </div>
  )
}