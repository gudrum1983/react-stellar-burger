import React from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";

function TypeD({data, setSelectedIngredients, selectedIngredients}) {

  function deleteCard(idItem) {
    const index = selectedIngredients.other.findIndex(item => item.numberIngredient === idItem)
    const arrEnd = selectedIngredients.other.slice(index + 1, selectedIngredients.other.length + 1)
    const arrStart = selectedIngredients.other.slice(0, index)
    const newOtherSelectedIngredients = arrStart.concat(arrEnd)

    setSelectedIngredients({
      ...selectedIngredients,
      other: newOtherSelectedIngredients
    });
  }

  return (
    <div className={`${stylesConstr.listScroll} ${stylesConstr.scroll} custom-scroll`}>
      {data.map((item) => (
        <React.Fragment key={item.numberIngredient}>
          <div className={stylesConstr.itemConst}>
            <DragIcon type="primary"/>
            <ConstructorElement
              text={item.ingredient.name}
              price={item.ingredient.price}
              thumbnail={item.ingredient.image}
              handleClose={() => {
                deleteCard(item.numberIngredient)
              }}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

function TotalPrice({selectedIngredients}) {

  const costBun = selectedIngredients.bun.price * 2
  /* В макете фигма стоимость была указана с учетом двойной стоимости булочки */
  const other = selectedIngredients.other
  const numberOtherIngredients = other.length
  let sumWithInitial = 0

  if (numberOtherIngredients > 0) {
    const arrayOtherPrice = other.map((item) => (item.ingredient.price))
    const initialValue = 0;
    sumWithInitial = arrayOtherPrice.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
  } else {
    sumWithInitial = 0
  }
  const stringTotal = String(costBun + sumWithInitial)

  return (
    <p className="text text_type_digits-medium">{stringTotal}</p>
  )
}


function BurgerConstructor({selectedIngredients, setSelectedIngredients}) {

  const bun = selectedIngredients.bun
  const textBun = bun.name
  const imgBun = bun.image
  const priceBun = bun.price


  const mains = selectedIngredients.other

  function clear() {
    setSelectedIngredients({
      ...selectedIngredients,
      other: [],
    });
  }


  return (
    <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
      <div className={`ml-4 mt-25 ${stylesConstr.BurgerConstructor}`}>
        <div className={stylesConstr.list}>
          <ConstructorElement extraClass='ml-8 mr-4'
                              type="top"
                              isLocked={true}
                              text={`${textBun} (верх)`}
                              price={priceBun}
                              thumbnail={imgBun}
          />
          <TypeD data={mains} setSelectedIngredients={setSelectedIngredients} selectedIngredients={selectedIngredients}/>
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
    </section>
  );
}

export {
  BurgerConstructor
}