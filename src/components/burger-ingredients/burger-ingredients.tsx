import React from "react";
import styles from "./burger-ingredients.module.css";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {IngredientsTypeList} from "./ingredients-type-list/ingredients-type-list";
import {burgerIngredientsArray} from "../../services/burger-ingredients/burger-ingredients-selector";
import {Text} from "../typography/text/text";
import {DISPLAY_LARGE, TIngredient, TTypeIngredients, typeIngredients} from "../../utils/types";
import {useSelectorApp} from "../../services/store";

type TFilteredIngredients = {
  buns:   Array<TIngredient> | [],
  sauces: Array<TIngredient> | [],
  mains:  Array<TIngredient> | [],
}

export function BurgerIngredients():JSX.Element {

  const ingredients:Array<TIngredient> = useSelectorApp(burgerIngredientsArray)
  const filtered = (type:TTypeIngredients):Array<TIngredient> => {
    return ingredients.filter((item) => item.type === type);
  }

  const [filteredIngredients, setFilteredIngredients] = React.useState<TFilteredIngredients>(
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
          buns: filtered(typeIngredients.bun),
          sauces: filtered(typeIngredients.sauce),
          mains: filtered(typeIngredients.main),
        }
      )
    , [ingredients]
  );

  const [currentTab, setCurrentTab] = React.useState('buns');
  const tabsRef = React.useRef<HTMLUListElement>(null!)
  const mainsRef = React.useRef<HTMLParagraphElement>(null!)
  const bunsRef = React.useRef<HTMLParagraphElement>(null!)
  const saucesRef = React.useRef<HTMLParagraphElement>(null!)

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
      <Text size={DISPLAY_LARGE} extraClass="mb-5 pt-10">Соберите бургер</Text>
      <ul ref={tabsRef} className={`pb-10 ${styles.tab} nonList`}>
        <li>
          <a href="#buns" className="nonLink cursor">
            <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab}>
              Булки
            </Tab>
          </a>
        </li>
        <li>
          <a href="#sauces" className="nonLink cursor">
            <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTab}>
              Соусы
            </Tab>
          </a>
        </li>
        <li>
          <a href="#mains" className="nonLink cursor">
            <Tab value="mains" active={currentTab === 'mains'} onClick={setCurrentTab}>
              Начинки
            </Tab>
          </a>
        </li>
      </ul>
      <ul onScroll={handleScrollList}
          className={`${styles.ingredients} ${stylesConstr.scroll} nonList custom-scroll`}>
        <IngredientsTypeList ref={bunsRef} name="Булки" data={filteredIngredients.buns} id="buns"/>
        <IngredientsTypeList ref={saucesRef} name="Соусы" data={filteredIngredients.sauces} id="sauces"/>
        <IngredientsTypeList ref={mainsRef} name="Начинки" data={filteredIngredients.mains} id="mains"/>
      </ul>
    </>
  );
}