import React from "react";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {Button, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorList} from "./constructor-list/constructor-list";
import {TotalPrice} from "./total-price/total-price";
import styles from "./constructor-list/constructor-list.module.css";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {getReadyOrderDetails} from "../../services/order-details/order-details-actions";
import {selectBun, selectOther} from "../../services/burger-constructor/burger-constructor-selector";
import {addFilling, chooseBun} from "../../services/burger-constructor/burger-constructor-actions";
import {useNavigate} from "react-router-dom";
import {user, userAuth} from "../../services/user/user-selector";
import {TIngredient} from "../../utils/types";
import {TSelectedIngredientOther} from "./constructor-item/constructor-item";

export function BurgerConstructor(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  //@ts-ignore
  const onDropHandler = (ingredient) => {
    if (ingredient.type === "bun") {
      dispatch(chooseBun(ingredient))
    } else {
      dispatch(addFilling(ingredient))
    }
  };

  const [{isHover, isCanD}, dropTarget] = useDrop({
    accept: "burgerConstructor",
    drop(ingredient) {
      onDropHandler(ingredient);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      isCanD: monitor.canDrop(),
    })
  });

  const borderColor = isHover ? stylesConstr.borderLightgreen : (isCanD ? stylesConstr.borderLightgreen2 : stylesConstr.borderTransparent);
  const isAuthChecked = useSelector(userAuth)
  const isUser = useSelector(user)

  const bun: TIngredient = useSelector(selectBun)
  const {name, image, price, _id} = {...bun}
  const other: Array<TSelectedIngredientOther> = useSelector(selectOther)

  function getListIdIngredients() {
    const idBun = [_id];
    const idOther = other.map((item) => item.ingredient._id);
    return idBun.concat(idOther, idBun)
  }

  function handleSubmitOrder() {
    if (isAuthChecked && !isUser) {
      navigate("/login", {replace: false});
    } else {
      const ingredientsOrder = getListIdIngredients();
      dispatch(getReadyOrderDetails(ingredientsOrder))
    }

  }

  return (
    <div className={`ml-4 mt-20 ${stylesConstr.burgerConstructor}`}>
      <div ref={dropTarget} className={`pt-5 pb-5 ${stylesConstr.dropContainer} ${borderColor}`}>
        <div className={stylesConstr.list}>
          {bun && <div className={styles.elementConstructor}>
            <ConstructorElement extraClass='ml-8 mr-4 notAllowed'
                                type="top"
                                isLocked={true}
                                text={`${name} (верх)`}
                                price={price}
                                thumbnail={image}
            />
          </div>}
          {(other.length > 0) && <ConstructorList/>}
          {bun && <div className={styles.elementConstructor}>
            <ConstructorElement extraClass="ml-8 mr-4 notAllowed"
                                type="bottom"
                                isLocked={true}
                                text={`${name} (низ)`}
                                price={price}
                                thumbnail={image}
            />
          </div>}
        </div>
      </div>
      <div className={`${stylesConstr.price} mr-4`}>
        <TotalPrice/>
        <div className={`${stylesConstr.iconPrice} ml-2 mr-10`}/>
        <Button disabled={(!(bun && (other.length > 0)))} htmlType="button" type="primary" size="large"
                onClick={handleSubmitOrder}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}