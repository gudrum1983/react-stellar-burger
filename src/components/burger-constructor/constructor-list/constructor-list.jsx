import styles from "./constructor-list.module.css";
import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {optionalFunc, selectedOtherIngredientsPropType} from "../../../utils/prop-types";
import {SelectedIngredientsContext} from "../../../services/burgerConstructorContext";

function ConstructorList({filling, setShowModal}) {

  const {selectedIngredients, selectedIngredientsDispatcher} = React.useContext(SelectedIngredientsContext);

  function deleteCard(idItem) {
    const index = selectedIngredients.other.findIndex(item => item.numberIngredient === idItem)
    const arrEnd = selectedIngredients.other.slice(index + 1, selectedIngredients.other.length + 1)
    const arrStart = selectedIngredients.other.slice(0, index)
    const newOtherSelectedIngredients = arrStart.concat(arrEnd)
    selectedIngredientsDispatcher({type: 'replaceOther', payload: newOtherSelectedIngredients})
  }

  function showItemDetails(item, e) {
    const action = e.nativeEvent.target.closest(".constructor-element__action")
    if (!action) {
      setShowModal({type: "ingredient", ingredient: item.ingredient, visible: true});
    }
  }

  return (
    <div className={`${styles.listScroll} ${styles.scroll} custom-scroll`}>
      {filling.map((item) => (
        <React.Fragment key={item.numberIngredient}>
          <div className={styles.elementConstructor} onClick={(e) => {
            showItemDetails(item, e)
          }}>
            <DragIcon type="primary"/>
            <ConstructorElement
              extraClass='cursor'
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

ConstructorList.propTypes = {
  filling: selectedOtherIngredientsPropType,
  setShowModal: optionalFunc,
};

export {
  ConstructorList
}