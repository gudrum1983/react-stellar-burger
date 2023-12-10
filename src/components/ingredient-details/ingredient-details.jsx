import styles from "./ingredient-details.module.css";
import {useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {
  burgerIngredientsArray,
} from "../../services/burger-ingredients/burger-ingredients-selector";

export function IngredientDetails() {

  const params = useParams()
  const location = useLocation()
  const idCurrentItem = params.id
  const background = location.state && location.state.background;

  const ingredients = useSelector(burgerIngredientsArray)

  const currentIngredient = ingredients.find(item => item._id === idCurrentItem);
  const {proteins, calories, fat, carbohydrates, name, image_large} = currentIngredient
  const energyValue = (text, value) => {
    return (
      <li className={styles.column}>
        <p className="text text_type_main-default text_color_inactive">{text}</p>
        <p className="text text_type_digits-default text_color_inactive">{value}</p>
      </li>
    )
  }

  const testContainer = background ? "" : "container"

  return (
    <div className={`${styles.modalContainer} ${testContainer} pb-5`}>
      {!background && <p className="text text_type_main-large">Детали ингредиента</p>}
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