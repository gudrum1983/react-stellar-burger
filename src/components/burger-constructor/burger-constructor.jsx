import React from "react";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorList} from "./constructor-list/constructor-list";
import {TotalPrice} from "./total-price/total-price";
import styles from "./constructor-list/constructor-list.module.css";

import {getOrderData} from "../../api/config";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_MODAL} from "../../services/actions/modal";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const chooseIngredients = useSelector(store => store.chooseIngredients)
  const bun = chooseIngredients.bun
    ,{name, image, price, _id} = {...bun}
    ,other = chooseIngredients.other;


  function getListIdIngredients() {
    const idBun = [_id];
    const idOther = other.map((item) => item.ingredient._id);
    return idBun.concat(idOther, idBun)
  }

  function handleSubmitOrder() {

    const ingredientsOrder = getListIdIngredients();
    // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
    // return позволяет потом дальше продолжать цепочку `then, catch, finally`
      return getOrderData(ingredientsOrder)
        .then(data => {
          return data.order.number})
        .then(orderNumber => {
          dispatch({type: OPEN_MODAL, payload: {type: "order"}});
        })
        .catch(() => {
          dispatch({type: OPEN_MODAL, payload: {type: "error"}});
        })
    }

  return (
    <div className={`ml-4 mt-25 ${stylesConstr.burgerConstructor}`}>
      <div className={stylesConstr.list}>
        {bun && <div className={styles.elementConstructor}>
          <ConstructorElement extraClass='ml-8 mr-4 cursor'
                              type="top"
                              isLocked={true}
                              text={`${name} (верх)`}
                              price={price}
                              thumbnail={image}
           />
        </div>}
        {(other.length > 0) && <ConstructorList filling={other}
        />}
        {bun && <div className={styles.elementConstructor}>
          <ConstructorElement extraClass="ml-8 mr-4 cursor"
                              type="bottom"
                              isLocked={true}
                              text={`${name} (низ)`}
                              price={price}
                              thumbnail={image}
          />
        </div>}
      </div>
      <div className={`${stylesConstr.price} mr-4`}>
        <TotalPrice/>
        <div className={`${stylesConstr.iconPrice} ml-2 mr-10`}/>
        <Button htmlType="button" type="primary" size="large" onClick={handleSubmitOrder}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export {
  BurgerConstructor
}