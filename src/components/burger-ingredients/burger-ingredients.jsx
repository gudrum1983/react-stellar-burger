import React from "react";
import styles from "./burger-ingredients.module.css";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {optionalArrayOfIngredients} from "../../utils/prop-types";
import {List} from "./ingredients-type-list/ingredients-type-list";


function BurgerIngredients({ingredients}) {


  const [current, setCurrent] = React.useState('buns');


  const filtered = (type) => {
    return ingredients.filter((item) => item.type === type);
  }


  const tabsRef = React.useRef()
  const mainsRef = React.useRef();
  const bunsRef = React.useRef()
  const saucesRef = React.useRef()


  function handleScrollList() {
    const tabsBottom = tabsRef.current?.getBoundingClientRect().bottom;
    const bunsTop = bunsRef.current?.getBoundingClientRect().top;
    const saucesTop = saucesRef.current?.getBoundingClientRect().top;
    const mainsTop = mainsRef.current?.getBoundingClientRect().top;

    if (!tabsBottom || !bunsTop || !saucesTop || !mainsTop) {
      return
    }

    const bunsDelta = Math.abs(bunsTop - tabsBottom);
    const saucesDelta = Math.abs(saucesTop - tabsBottom);
    const mainsDelta = Math.abs(mainsTop - tabsBottom);
/*
    console.log("bunsDelta",bunsDelta)
    console.log("saucesDelta",saucesDelta)
    console.log("mainsDelta",mainsDelta)*/



    const min = Math.min(bunsDelta,saucesDelta,mainsDelta);
/*    console.log("min",min)*/
    const newTab = min === bunsDelta ? "buns" : min === saucesDelta ? "sauces" : "mains";
/*    console.log("newTab",newTab)*/
    if (newTab !== current) {
      setCurrent(newTab)

    }

  }


  const [filteredIngredients, setFilteredIngredients] = React.useState(
    {
      buns: [],
      sauces: [],
      mains: [],
    }
  )

  React.useMemo(
    () =>
      setFilteredIngredients(
        {
          buns: filtered("bun"),
          sauces: filtered("sauce"),
          mains: filtered("main"),
        }
      )
    , [ingredients]
  );


  return (
    <>
      <p className="text text_type_main-large mb-5 pt-10">Соберите&nbsp;бургер</p>
      <ul ref={tabsRef} className={`pb-10 ${styles.tab} ${styles.nonList} `}>
        <li>
          <a href="#buns" className={`${styles.nonLink} cursor`}>
            <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
              Булки
            </Tab>
          </a>
        </li>
        <li>
          <a href="#sauces" className={`${styles.nonLink} cursor`}>
            <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
              Соусы
            </Tab>
          </a>
        </li>
        <li>
          <a href="#mains" className={`${styles.nonLink} cursor`}>
            <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
              Начинки
            </Tab>
          </a>
        </li>
      </ul>
      <ul onScroll={handleScrollList}
          className={`${styles.ingredients} ${stylesConstr.scroll} ${styles.nonList} custom-scroll`}>
        <List ref={bunsRef} name="Булки" data={filteredIngredients.buns} id="buns"/>
        <List ref={saucesRef} name="Соусы" data={filteredIngredients.sauces} id="sauces"/>
        <List ref={mainsRef} name="Начинки" data={filteredIngredients.mains} id="mains"/>
      </ul>
    </>
  );
}

BurgerIngredients.propTypes = {
  ingredients: optionalArrayOfIngredients,
};

export {
  BurgerIngredients
}

