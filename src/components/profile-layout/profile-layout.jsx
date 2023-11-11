import {Link, NavLink, Outlet} from "react-router-dom";
import {FormContainerUser} from "../form-container/form-container";
import React from "react";
import {getUserLogout} from "../../services/user/action";
import {useDispatch} from "react-redux";

export const ProfileLayout = () => {

  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault()
    console.log("click", "click")
    dispatch(getUserLogout());
  }


  return (
    <section className={"profileSection"}>
      <div className={"profilePanel"}>
        <ul className={"profileUl"}>
          <li>
            <NavLink className={`text text_type_main-medium text_color_inactive defaultNavLink`}
                     to={"/profile"}
                     end>Профиль</NavLink>
          </li>
          <li>
            <NavLink className={`text text_type_main-medium text_color_inactive defaultNavLink`}
                     to={"/profile/orders"}>История
              заказов</NavLink>
          </li>
          <li>
            <NavLink className={`text text_type_main-medium text_color_inactive defaultNavLink`}
                     to={"/login"} onClick={handleClick}>Выход</NavLink>
          </li>
        </ul>
        <p className={`text text_type_main-small text_color_inactive pText`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>

      </div>

      <Outlet/>

    </section>


  )

}