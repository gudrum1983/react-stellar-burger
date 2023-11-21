import React from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./app.module.css";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import {Home} from "../../pages/home";
import {AppLayout} from '../app-layout/app-layout'
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
import {Profile} from "../../pages/profile";
import {Feed} from "../../pages/feed";
import {ProfileLayout} from "../profile-layout/profile-layout";
import {Orders} from "../../pages/orders";
import {NotFound} from "../../pages/not-found";
import {DetailsCardOrder} from "../feed-orders-profile/feed-orders-profile";
import {WebsocketStatus} from "../../utils/constants";
import {connectFeedOrders, disconnectFeedOrders} from "../../services/feed-orders/feed-orders-actions";
import {URL_WS_ALL, URL_WS_OWNER} from "../../utils/data";
import {
  connectFeedOrdersProfile,
  disconnectFeedOrdersProfile
} from "../../services/feed-orders-profile/feed-orders-actions";

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

  const {status, data} = useSelector(store => store.feedOrders)
/*  const {status, data, connectingError} = useSelector(store => store.feedOrders)*/

  const isDisconnected = status !== WebsocketStatus.ONLINE
  const connect = () => dispatch(connectFeedOrders(URL_WS_ALL))
  const connectPr = () => dispatch(connectFeedOrdersProfile(URL_WS_OWNER))

  const disconnect = () => dispatch(disconnectFeedOrders())
  const disconnectPr = () => dispatch(disconnectFeedOrdersProfile())



  React.useEffect(() => {
    connect()
    connectPr()
    return () => {
      disconnect()
      disconnectPr()
    }
  }, []);

  console.log({data})
  console.log({isDisconnected})
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
            <Route index element={<Profile/>}/>
            <Route path="orders" element={<Orders/>}/>
          </Route>
          <Route path="/feed" element={<OnlyAuth component={<Feed/>}/>}/>
          <Route path="/feed/:id" element={<DetailsCardOrder/>}/>
          <Route path="/profile/orders/:id" element={<OnlyAuth component={<DetailsCardOrder/>}/>}/>

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
          <DetailsCardOrder/>
        </Modal>}/>
      </Routes>}
      {background && <Routes>
        <Route path="/profile/orders/:id" element={<Modal onClose={handleModalClose} header={"need = params.id"}>
          <DetailsCardOrder/>
        </Modal>}/>
      </Routes>}


    </div>

  )
}