import React from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";

function TypeD({data}) {

  return (
    <div className={`${stylesConstr.listScroll} ${stylesConstr.scroll} custom-scroll`}>
      {data.map((item) => (
        <React.Fragment key={item._id}>
          <div className={stylesConstr.itemConst}>
            <DragIcon type="primary"/>
            <ConstructorElement
              text={item.itemR.name}
              price={item.itemR.price}
              thumbnail={item.itemR.image}
            />
          </div>
        </React.Fragment>

      ))}
    </div>
  )
}

function TotalPrice({composition}) {

  const totalBun = composition.bun.price * 2
  const test = composition.other.length


  const other = composition.other

  let sumWithInitial = 0

  if (test > 0) {
/*    composition.other.forEach((item) => console.log(item.itemR.price))*/
    const arrayOtherPrice = other.map((item) => (item.itemR.price))

    const initialValue = 0;
    sumWithInitial = arrayOtherPrice.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

  } else {
    sumWithInitial = 0
  }

  const stringTotal = String(totalBun + sumWithInitial)

  return (
    <p className="text text_type_digits-medium">{stringTotal}</p>
  )
}


function BurgerConstructor({composition, setComposition}) {

  const bun = composition.bun
  const textBun = bun.name
  const imgBun = bun.image
  const priceBun = bun.price


  const mains = composition.other

function clear() {
  setComposition({
    ...composition,
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
          <TypeD data={mains}/>

          <ConstructorElement extraClass="ml-8 mr-4"
                              type="bottom"
                              isLocked={true}
                              text={`${textBun} (низ)`}
                              price={priceBun}
                              thumbnail={imgBun}
          />
        </div>

        <div className={`${stylesConstr.price} mr-4`}>
          <TotalPrice composition={composition}/>
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