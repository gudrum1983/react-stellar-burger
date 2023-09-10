import React from "react";
import styles from "./burger-ingredients.module.css";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {ListCards} from "../list-cards/list-cards";


function BurgerIngredients({data, setSelectedIngredients, selectedIngredients}) {

  const sortedData = data.toSorted(function (a, b) {
    if (a._id > b._id) {
      return 1;
    }
    if (a._id < b._id) {
      return -1;
    }
    return 0;
  });

  const sauces = sortedData.filter((item) => item.type === "sauce");
  const buns = sortedData.filter((item) => item.type === "bun");
  const mains = sortedData.filter((item) => item.type === "main")

  const [current, setCurrent] = React.useState('one');

  return (
    <>
      <p className="text text_type_main-large mb-5 pt-10">Соберите&nbsp;бургер</p>
      <ul className={`pb-10 ${styles.tab} ${styles.nonList} `}>
        <li>
          <a href="#buns" className={styles.nonLink}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
              Булки
            </Tab>
          </a>
        </li>
        <li>
          <a href="#sauces" className={styles.nonLink}>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
              Соусы
            </Tab>
          </a>
        </li>
        <li>
          <a href="#mains" className={styles.nonLink}>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
              Начинки
            </Tab>
          </a>
        </li>
      </ul>
      <ul className={`${styles.ingredients} ${stylesConstr.scroll} ${styles.nonList} custom-scroll`}>
        <li className={styles.typePart}>
          <p id="buns" className="text text_type_main-medium">Булки</p>
          <ListCards data={buns} setSelectedIngredients={setSelectedIngredients}
                     selectedIngredients={selectedIngredients}/>
        </li>
        <li className={styles.typePart}>
          <p id="sauces" className="text text_type_main-medium">Соусы</p>
          <ListCards data={sauces} setSelectedIngredients={setSelectedIngredients}
                     selectedIngredients={selectedIngredients}/>
        </li>
        <li className={styles.typePart}>
          <p id="mains" className="text text_type_main-medium">Начинки</p>
          <ListCards data={mains} setSelectedIngredients={setSelectedIngredients}
                     selectedIngredients={selectedIngredients}/>
        </li>
      </ul>
    </>
  );
}

export {
  BurgerIngredients
}

