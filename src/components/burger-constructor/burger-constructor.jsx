import React from "react";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorList} from "./constructor-list/constructor-list";
import {TotalPrice} from "./total-price/total-price";
import {
  ingredientPropType,
  optionalFunc,
  selectedIngredientsPropType,
} from "../../utils/prop-types";
import styles from "./constructor-list/constructor-list.module.css";


function BurgerConstructor({selectedIngredients, setSelectedIngredients, defaultBun, setShowModal}) {
  BurgerConstructor.propTypes = {
    setSelectedIngredients: optionalFunc,
    defaultBun: ingredientPropType,
    setShowModal: optionalFunc,
    selectedIngredients: selectedIngredientsPropType
  };

  let filling = selectedIngredients.other

  const bun = selectedIngredients.bun
  const textBun = bun.name
  const imgBun = bun.image
  const priceBun = bun.price

  function clear() {
    setShowModal({visible: true, type: "order", ingredient: {}});
    setSelectedIngredients({
      ...selectedIngredients,
      bun: defaultBun,
      other: [],
    });
  }

  function showBunDetails() {
    setShowModal({visible: true, type: "ingredient", ingredient: bun});
  }

  return (
    <div className={`ml-4 mt-25 ${stylesConstr.burgerConstructor}`}>
      <div className={stylesConstr.list}>
        <div className={styles.elementConstructor} onClick={showBunDetails}>
          <ConstructorElement extraClass='ml-8 mr-4'
                              type="top"
                              isLocked={true}
                              text={`${textBun} (верх)`}
                              price={priceBun}
                              thumbnail={imgBun}
                              item={bun}
          />
        </div>
        {(filling.length > 0) && <ConstructorList filling={filling} setSelectedIngredients={setSelectedIngredients}
                                                selectedIngredients={selectedIngredients} setShowModal={setShowModal}/>}
        <div className={styles.elementConstructor} onClick={showBunDetails}>
          <ConstructorElement extraClass="ml-8 mr-4"
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
        <TotalPrice selectedIngredients={selectedIngredients}/>
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