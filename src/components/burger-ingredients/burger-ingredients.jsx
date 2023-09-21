import React from "react";
import styles from "./burger-ingredients.module.css";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {ListCards} from "./list-cards/list-cards";
import {optionalArrayOfIngredients} from "../../utils/prop-types";


function BurgerIngredients({ingredients}) {

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

  const list = (name, data, id) => {
    return (
      <li className={styles.typePart}>
        <p id={id} className="text text_type_main-medium">{name}</p>
        <ListCards ingredients={data} />
      </li>)
  }


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


  const [current, setCurrent] = React.useState('one');

  return (
    <>
      <p className="text text_type_main-large mb-5 pt-10">Соберите&nbsp;бургер</p>
      <ul className={`pb-10 ${styles.tab} ${styles.nonList} `}>
        <li>
          <a href="#buns" className={`${styles.nonLink} cursor`}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
              Булки
            </Tab>
          </a>
        </li>
        <li>
          <a href="#sauces" className={`${styles.nonLink} cursor`}>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
              Соусы
            </Tab>
          </a>
        </li>
        <li>
          <a href="#mains" className={`${styles.nonLink} cursor`}>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
              Начинки
            </Tab>
          </a>
        </li>
      </ul>
      <ul className={`${styles.ingredients} ${stylesConstr.scroll} ${styles.nonList} custom-scroll`}>
        {list("Булки", filteredIngredients.buns, "buns")}
        {list("Соусы", filteredIngredients.sauces, "sauces")}
        {list("Начинки", filteredIngredients.mains, "mains")}
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

