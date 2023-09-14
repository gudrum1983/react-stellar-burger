import styles from "./constructor-list.module.css";
import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {optionalArray, optionalFunc, optionalObject} from "../../../utils/prop-types";

function ConstructorList({data, setSelectedIngredients, selectedIngredients, setShowModal}) {

  ConstructorList.propTypes = {
    data: optionalArray,
    selectedIngredients: optionalObject,
    setSelectedIngredients: optionalFunc,
  };

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


  function showItemDetails(item,e) {
    const action = e.nativeEvent.target.closest(".constructor-element__action")
    if (!action) {
      setShowModal({visible: true, type: "ingredient", ingredient: item.ingredient});
    }
  }



  return (
    <div className={`${styles.listScroll} ${styles.scroll} custom-scroll`}>
      {data.map((item) => (
        <React.Fragment key={item.numberIngredient}>
          <div className={styles.elementConstructor} onClick={(e) => {showItemDetails(item,e)}}>
            <DragIcon type="primary"/>
            <ConstructorElement
              text={item.ingredient.name}
              price={item.ingredient.price}
              thumbnail={item.ingredient.image}
              handleClose={(e) => {
                deleteCard(item.numberIngredient, e)
              }}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export {
  ConstructorList
}