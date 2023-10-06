import React from "react";
import styles from "./burger-ingredients.module.css";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {List} from "./ingredients-type-list/ingredients-type-list";
import {useSelector} from "react-redux";
import {burgerIngredients} from "../../services/burger-ingredients/burger-ingredients-selector";

function BurgerIngredients() {

  const {ingredients} = useSelector(burgerIngredients)
  const filtered = (type) => {
    return ingredients.filter((item) => item.type === type);
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

  console.log(filteredIngredients)

  const [currentTab, setCurrentTab] = React.useState('buns');
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

    const TabsWithBottomPadding = (tabsBottom + 40)
    const bunsDelta = Math.abs(bunsTop - TabsWithBottomPadding);
    const saucesDelta = Math.abs(saucesTop - TabsWithBottomPadding);
    const mainsDelta = Math.abs(mainsTop - TabsWithBottomPadding);
    const min = Math.min(bunsDelta, saucesDelta, mainsDelta);
    const newTab = min === bunsDelta ? "buns" : min === saucesDelta ? "sauces" : "mains";
    if (newTab !== currentTab) {
      setCurrentTab(newTab)
    }
  }


  return (
    <>
      <p className="text text_type_main-large mb-5 pt-10">Соберите&nbsp;бургер</p>
      <ul ref={tabsRef} className={`pb-10 ${styles.tab} ${styles.nonList} `}>
        <li>
          <a href="#buns" className={`${styles.nonLink} cursor`}>
            <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab}>
              Булки
            </Tab>
          </a>
        </li>
        <li>
          <a href="#sauces" className={`${styles.nonLink} cursor`}>
            <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTab}>
              Соусы
            </Tab>
          </a>
        </li>
        <li>
          <a href="#mains" className={`${styles.nonLink} cursor`}>
            <Tab value="mains" active={currentTab === 'mains'} onClick={setCurrentTab}>
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

export {BurgerIngredients}