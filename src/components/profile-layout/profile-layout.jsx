import {NavLink, Outlet} from "react-router-dom";
import React from "react";
import {logout} from "../../services/user/user-action";
import {useDispatch, useSelector} from "react-redux";
import style from "./profile-layout.module.css"
import {Modal} from "../modal/modal";
import {closeErrorModal} from "../../services/error-modal/error-modal-action";
import {errorModalText, isOpenErrorModal} from "../../services/error-modal/error-modal-selector";

export const ProfileLayout = () => {

  const dispatch = useDispatch();

  const handleErrorModalClose = () => {
    dispatch(closeErrorModal());
  };
  const openErrModal = useSelector(isOpenErrorModal)
  const textErrorModal = useSelector(errorModalText)

  function handleClick(e) {
    e.preventDefault()
    dispatch(logout());
  }

  return (
    <div className={style.profile}>
      <nav className={style.navigation}>
        <ul className={style.links}>
          <li key="profile">
            <NavLink className={`text text_type_main-medium text_color_inactive ${style.link} cursor`}
                     to="/profile"
                     end>Профиль</NavLink>
          </li>
          <li key="orders">
            <NavLink className={`text text_type_main-medium text_color_inactive ${style.link} cursor`}
                     to={"/profile/orders"}>История
              заказов</NavLink>
          </li>
          <li key="logout">
            <button className={`text text_type_main-medium text_color_inactive ${style.link} cursor`}
                     onClick={handleClick}>Выход</button>
          </li>
        </ul>
        <p className={`pt-20 text text_type_main-small text_color_inactive description`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className='profileOutlet'>
        <Outlet/>
      </div>

      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          <p className="text text_type_main-medium">
            {textErrorModal}
          </p>
        </Modal>}


    </div>
  )
}