import styles from "./ingredient-details.module.css";
import {ingredientPropType} from "../../../utils/prop-types";
import {useSelector} from "react-redux";

function IngredientDetails() {
  const {proteins, calories, fat, carbohydrates, name, image_large} = useSelector(store => store.ingredientDetails.details)
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
      <img src={image_large} alt={name} className="mb-4"></img>
      <p className={`${styles.title} text text_type_main-medium mb-8`}>{name}</p>
      <ul className={`${styles.row}`}>
        {energyValue('Калории,ккал', calories)}
        {energyValue('Белки, г', proteins)}
        {energyValue('Жиры, г', fat)}
        {energyValue('Углеводы, г', carbohydrates)}
      </ul>

    </div>
  )

}

IngredientDetails.propTypes = {
  ingredient: ingredientPropType,
};

export {
  IngredientDetails
}