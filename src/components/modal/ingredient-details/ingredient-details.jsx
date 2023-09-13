import styles from "./ingredient-details.module.css";

function ModalIngredientDetails({data}){
return(
  <div className={`${styles.modalContainer} pb-5`}>
    <img src={data.image_large} alt={data.name} className="mb-4"></img>
    <p className="text text_type_main-medium mb-8">{data.name}</p>
    <div className={`${styles.row}`}>
      <div className={styles.column}>
        <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
        <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
      </div>
      <div className={styles.column}>
        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
        <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
      </div>
      <div className={styles.column}>
        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
        <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
      </div>
      <div className={styles.column}>
        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
        <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
      </div>

    </div>

  </div>
)
}

export {
  ModalIngredientDetails
}