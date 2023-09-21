import React from "react";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorList} from "./constructor-list/constructor-list";
import {TotalPrice} from "./total-price/total-price";
import {SelectedIngredientsContext} from "../../services/burgerConstructorContext";
import styles from "./constructor-list/constructor-list.module.css";
import {ShowModalContext} from "../../services/modalContext";

function BurgerConstructor() {
  //получаем функцию-сеттер из контекста
  const {selectedIngredients, selectedIngredientsDispatcher} = React.useContext(SelectedIngredientsContext);
  const {showModalDispatcher} = React.useContext(ShowModalContext);
  const filling = selectedIngredients.other
  const bun = selectedIngredients.bun
  const textBun = bun.name
  const imgBun = bun.image
  const priceBun = bun.price


  function getListIdIngredients() {
    const idBun = [selectedIngredients.bun._id];
    const idOther = selectedIngredients.other.map((item) => item.ingredient._id);
    const idIngredients = idBun.concat(idOther, idBun)
    console.log(idIngredients)
    return idIngredients
  }

  const url = "https://norma.nomoreparties.space/api/orders"
  const getOrderData = () => {

    const ingredientsOrder = getListIdIngredients();

    let promise = fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: ingredientsOrder,
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
      .then(data => data.order.number)
      .then(orderNumber => {
        showModalDispatcher({type: 'open', payload: {type: "order", ingredient: {}, orderNumber: orderNumber}})
        selectedIngredientsDispatcher({type: 'resetOnlyOther'})
      })
      .catch(() => {
        alert("При формировании заказа произошла ошибка, попробуйте позже...")
      })
  };


  function clear() {
    getOrderData()
    showModalDispatcher({type: 'open', payload: {type: "order", ingredient: {}}})
  }

  function showBunDetails() {
    showModalDispatcher({type: 'open', payload: {type: "ingredient", ingredient: bun}})
  }

  return (
    <div className={`ml-4 mt-25 ${stylesConstr.burgerConstructor}`}>
      <div className={stylesConstr.list}>
        <div className={styles.elementConstructor} onClick={showBunDetails}>
          <ConstructorElement extraClass='ml-8 mr-4 cursor'
                              type="top"
                              isLocked={true}
                              text={`${textBun} (верх)`}
                              price={priceBun}
                              thumbnail={imgBun}
                              item={bun}
          />
        </div>
        {(filling.length > 0) && <ConstructorList filling={filling}
        />}
        <div className={styles.elementConstructor} onClick={showBunDetails}>
          <ConstructorElement extraClass="ml-8 mr-4 cursor"
                              type="bottom"
                              isLocked={true}
                              text={`${textBun} (низ)`}
                              price={priceBun}
                              thumbnail={imgBun}
                              item={bun}
          />
        </div>
      </div>
      <div className={`${stylesConstr.price} mr-4`}>
        <TotalPrice/>
        <div className={`${stylesConstr.iconPrice} ml-2 mr-10`}/>
        <Button htmlType="button" type="primary" size="large" onClick={clear}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export {
  BurgerConstructor
}