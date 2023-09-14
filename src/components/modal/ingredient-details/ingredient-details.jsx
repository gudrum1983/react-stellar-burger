import styles from "./ingredient-details.module.css";
import {ingredientPropType} from "../../../utils/prop-types";

function ModalIngredientDetails({ingredient}) {

  ModalIngredientDetails.propTypes = {
    ingredient: ingredientPropType,
  };

  const energyValue = (name, value) => {
    return (
      <li className={styles.column}>
        <p className="text text_type_main-default text_color_inactive">{name}</p>
        <p className="text text_type_digits-default text_color_inactive">{value}</p>
      </li>
    )
  }

  return (
    <div className={`${styles.modalContainer} pb-5`}>
      <img src={ingredient.image_large} alt={ingredient.name} className="mb-4"></img>
      <p className={`${styles.title} text text_type_main-medium mb-8`}>{ingredient.name}</p>
      <ul className={`${styles.row}`}>
        {energyValue('Калории,ккал', ingredient.calories)}
        {energyValue('Белки, г', ingredient.proteins)}
        {energyValue('Жиры, г', ingredient.fat)}
        {energyValue('Углеводы, г', ingredient.carbohydrates)}
      </ul>

    </div>
  )
}

export {
  ModalIngredientDetails
}