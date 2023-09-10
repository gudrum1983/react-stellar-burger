import React from "react";
import styles from "./burger-ingredients.module.css";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'


const Card = ({item, setComposition, composition}) => {

  let count = 0


  const text = composition.other
  /*  console.log(text)
    console.log(item._id)*/
  if (text.length > 0) {

    const TEST1 = text.filter((ttt) => ttt.itemR._id === item._id)
    const TEST2 = TEST1.map((item) => item.itemR._id)
    console.log(TEST2.length)
    count = TEST2.length

  } else {
    count = 0
  }
  /*  const number = composition.other.filter((item) => (item.itemR._id === item._id)).length
    console.log(number)*/


  /*  const [count, setCount] = React.useState(0);*/


  function toggleCount() {
    /*    setCount(count + 1);*/
    const newCompositionNumber = composition.other.length ? composition.other.length + 1 : 1;
    setComposition({
      ...composition,
      other: [...composition.other,

        {
          _id: `${newCompositionNumber}_${item._id}`,
          itemR: item,
        }]
    })
  }

  function isNum(num) {
    return (num !== 0)
  }


  return (
    <div className={styles.card} onClick={toggleCount}>
      <img className={styles.imgCard} alt={item.name} src={item.image}/>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{item.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.cardName}>
        <p className="text text_type_main-default">{item.name}</p>
      </div>
      {isNum(count) && <Counter count={count} size="default" extraClass="m-1"/>}
    </div>
  );
};


const CardB = ({item, bullka, bun, setComposition, composition}) => {
  /*    const CardB = React.memo(({item, bullka, bun, setComposition, composition}) => {*/
  React.useEffect(() => {
    function check() {
      if (item._id === bun) {
        setComposition({
          ...composition,
          bun: item,
        });
      }
    }

    check();

  }, [])


  const num = (item._id === bun) ? 1 : 0


  function toggleCount() {
    bullka(item._id);
    setComposition({
      ...composition,
      bun: item,
    });
  }

  function isNum(num) {
    return (num !== 0)
  }


  return (
    <div className={styles.card} onClick={toggleCount}>
      <img className={styles.imgCard} alt={item.name} src={item.image}/>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{item.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.cardName}>
        <p className="text text_type_main-default">{item.name}</p>
      </div>
      {isNum(num) && <Counter count={num} size="default" extraClass="m-1"/>}
    </div>
  );
}/*)*/;


/*function TypeP(props) {*/
const TypeP = React.memo((props) => {
    return (
      <div className={`${styles.type} pt-6 pr-4 pl-4 pb-10`}>
        {props.data.map((item) => (
          <React.Fragment key={item._id}>
            <Card item={item} setComposition={props.setComposition} composition={props.composition}/>
          </React.Fragment>
        ))}
      </div>
    )
  }
)

function TypeB(props) {


  const [bun, setBun] = React.useState(props.data[0]._id);


  return (
    <div className={`${styles.type} pt-6 pr-4 pl-4 pb-10`}>
      {props.data.map((item) => (
        <React.Fragment key={item._id}>
          <CardB item={item} bullka={setBun} bun={bun} setComposition={props.setComposition}
                 composition={props.composition}/>
        </React.Fragment>
      ))}
    </div>
  )
}

function BurgerIngredients(props) {
  const sauces = props.data.filter((item) => item.type === "sauce");
  const buns = props.data.filter((item) => item.type === "bun");
  const mains = props.data.filter((item) => item.type === "main")


  function sortArray(items) {
    items.sort(function (a, b) {
      if (a._id > b._id) {
        return 1;
      }
      if (a._id < b._id) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });
  }

  sortArray(sauces)
  sortArray(buns)
  sortArray(mains)


  const [current, setCurrent] = React.useState('one');
  return (
    <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
      <p className="text text_type_main-large mb-5 pt-10">Соберите&nbsp;бургер</p>
      <div style={{display: 'flex'}} className={`pb-10`}>
        <a href="#buns" className={styles.nonLink}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauces" className={styles.nonLink}>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href="#mains" className={styles.nonLink}>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={`${styles.ingredients} ${stylesConstr.scroll} custom-scroll`}>
        <div className={styles.typePart}>
          <p id="buns" className="text text_type_main-medium">Булки</p>
          <TypeB data={buns} setComposition={props.setComposition} composition={props.composition}/>
        </div>
        <div className={styles.typePart}>
          <p id="sauces" className="text text_type_main-medium">Соусы</p>
          <TypeP data={sauces} setComposition={props.setComposition} composition={props.composition}/>
        </div>
        <div className={styles.typePart}>
          <p id="mains" className="text text_type_main-medium">Начинки</p>
          <TypeP data={mains} setComposition={props.setComposition} composition={props.composition}/>
        </div>
      </div>

    </section>
  );
}

export {
  BurgerIngredients
}

