import {NavLink, Outlet} from "react-router-dom";
import React from "react";
import {logout} from "../services/user/user-action";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "../components/modal/modal";
import {closeErrorModal} from "../services/error-modal/error-modal-action";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";

import {TEXT_COLORS, TEXT_SIZES} from "../utils/text-elements";
import {Text} from "../components/typography/text/text";

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
    <div className="profile">
      <nav className="navigation">
        <ul className="links">
          <li key="profile">
            <NavLink className={`text text_type_main-medium text_color_inactive link cursor`}
                     to="/profile"
                     end>Профиль</NavLink>
          </li>
          <li key="orders">
            <NavLink className={`text text_type_main-medium text_color_inactive link cursor`}
                     to={"/profile/orders"}>История
              заказов</NavLink>
          </li>
          <li key="logout">
            <button className={`text text_type_main-medium text_color_inactive link cursor`}
                    onClick={handleClick}>Выход
            </button>
          </li>
        </ul>
        <Text size={TEXT_SIZES.DESKTOP_TEXT} extraClass="description pt-20" color={TEXT_COLORS.INACTIVE}>
          В этом разделе вы можете изменить свои персональные данные
        </Text>
      </nav>
      <div className='profileOutlet'>
        <Outlet/>
      </div>

      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          <Text size={TEXT_SIZES.DISPLAY_SMALL}>{textErrorModal}</Text>
        </Modal>}


    </div>
  )
}