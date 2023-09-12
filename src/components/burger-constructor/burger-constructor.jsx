import React from "react";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorList} from "./constructor-list/constructor-list";
import {TotalPrice} from "./total-price/total-price";
import {ingredientPropType, optionalFunc, optionalObject} from "../../utils/prop-types";


function BurgerConstructor({selectedIngredients, setSelectedIngredients, defaultBun}) {

  BurgerConstructor.propTypes = {
    selectedIngredients: optionalObject,
    setSelectedIngredients: optionalFunc,
    defaultBun: ingredientPropType,
  };


  const bun = selectedIngredients.bun
  const textBun = bun.name
  const imgBun = bun.image
  const priceBun = bun.price

  const mains = selectedIngredients.other

  function clear() {
    setSelectedIngredients({
      ...selectedIngredients,
      bun: defaultBun,
      other: [],
    });
  }

  return (
       <div className={`ml-4 mt-25 ${stylesConstr.burgerConstructor}`}>
        <div className={stylesConstr.list}>
          <ConstructorElement extraClass='ml-8 mr-4'
                              type="top"
                              isLocked={true}
                              text={`${textBun} (верх)`}
                              price={priceBun}
                              thumbnail={imgBun}
          />
          <ConstructorList data={mains} setSelectedIngredients={setSelectedIngredients}
                           selectedIngredients={selectedIngredients}/>
          <ConstructorElement extraClass="ml-8 mr-4"
                              type="bottom"
                              isLocked={true}
                              text={`${textBun} (низ)`}
                              price={priceBun}
                              thumbnail={imgBun}
          />
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