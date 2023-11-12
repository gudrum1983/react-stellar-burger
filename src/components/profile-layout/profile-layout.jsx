import {NavLink, Outlet} from "react-router-dom";
import React from "react";
import {logout} from "../../services/user/user-action";
import {useDispatch} from "react-redux";
import style from "./profile-layout.module.css"

export const ProfileLayout = () => {

  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault()
    dispatch(logout());
  }

  return (
    <div className={style.profile}>
      <nav className={style.navigation}>
        <ul className={style.links}>
          <li>
            <NavLink className={`text text_type_main-medium text_color_inactive ${style.link}`}
                     to={"/profile"}
                     end>Профиль</NavLink>
          </li>
          <li>
            <NavLink className={`text text_type_main-medium text_color_inactive ${style.link}`}
                     to={"/profile/orders"}>История
              заказов</NavLink>
          </li>
          <li>
            <NavLink className={`text text_type_main-medium text_color_inactive ${style.link}`}
                     to={"/login"} onClick={handleClick}>Выход</NavLink>
          </li>
        </ul>
        <p className={`pt-20 text text_type_main-small text_color_inactive description`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Outlet/>
    </div>
  )
}