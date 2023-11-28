import React from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./app.module.css";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import {Home} from "../../pages/home";
import {AppLayout} from '../../pages/app-layout'
import {Modal} from "../modal/modal";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {loadBurgerIngredients} from "../../services/burger-ingredients/burger-ingredients-actions";
import {burgerIngredients} from "../../services/burger-ingredients/burger-ingredients-selector";
import {checkUserAuth} from "../../services/user/user-action";
import {OnlyAuth, OnlyUnAuth} from "../hoc/protected-route";
import {Register} from "../../pages/register";
import {Login} from "../../pages/login";
import {ForgotPassword} from "../../pages/forgot-password";
import {ResetPassword} from "../../pages/reset-password";
import {ProfileEdit} from "../../pages/profile-edit";
import {Feed} from "../../pages/feed";
import {ProfileLayout} from "../../pages/profile-layout";
import {NotFound} from "../../pages/not-found";
import {OrderInfo} from "../order-info/order-info";
import {ProfileOrders} from "../../pages/profile-orders";


export default function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(loadBurgerIngredients())
  }, []);

  const {ingredients, isLoading, hasError} = useSelector(burgerIngredients);
  const location = useLocation()

  const navigate = useNavigate()
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);     // Возвращаемся к предыдущему пути при закрытии модалки
  };


  if (isLoading) {
    return <div className={`text text_type_main-default`}>Загрузка...</div>
  } else {
    if (hasError) {
      return <div className={`text text_type_main-default`}>Произошла ошибка</div>
    } else if (ingredients.length === 0) {
      return <div className={`text text_type_main-default`}>Нет данных</div>
    }
  }

  return (<div className={`${styles.app}`}>

      <Routes location={background || location}>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="/ingredients/:id" element={<IngredientDetails/>}/>


          {/*OnlyUnAuth*/}
          <Route path="login" element={<OnlyUnAuth component={<Login/>}/>}/>
          <Route path="register" element={<OnlyUnAuth component={<Register/>}/>}/>
          <Route path="forgot-password" element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
          <Route path="reset-password" element={<OnlyUnAuth component={<ResetPassword/>}/>}/>

          {/*OnlyAuth*/}
          <Route path="profile" element={<OnlyAuth component={<ProfileLayout/>}/>}>
            <Route index element={<ProfileEdit/>}/>
            <Route path="orders" element={<ProfileOrders/>}/>
          </Route>
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/feed/:id" element={<OrderInfo/>}/>
          <Route path="/profile/orders/:id" element={<OnlyAuth component={<OrderInfo/>}/>}/>

        </Route>

        <Route path="*" element={<NotFound/>}/>
      </Routes>

      {background && <Routes>
        <Route path="/ingredients/:id" element={<Modal onClose={handleModalClose} header={"Детали ингредиента"}>
          <IngredientDetails/>
        </Modal>}/>

      </Routes>}

      {background && <Routes>
        <Route path="/feed/:id" element={<Modal onClose={handleModalClose} header={"need = params.id"}>
          <OrderInfo/>
        </Modal>}/>
      </Routes>}
      {background && <Routes>
        <Route path="/profile/orders/:id" element={<Modal onClose={handleModalClose} header={"need = params.id"}>
          <OrderInfo/>
        </Modal>}/>
      </Routes>}


    </div>

  )
}