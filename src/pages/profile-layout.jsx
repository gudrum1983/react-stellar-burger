import {NavLink, Outlet} from "react-router-dom";
import React from "react";
import {logout} from "../services/user/user-action";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "../components/modal/modal";
import {closeErrorModal} from "../services/error-modal/error-modal-action";
import {errorModalText, isOpenErrorModal} from "../services/error-modal/error-modal-selector";
import {displaySmall} from "../utils/text-elements";
import {TEXT_COLOR, TEXT_SIZE, TypographyText} from "../components/typography/text/text";

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
        <TypographyText size={TEXT_SIZE.DESKTOP_TEXT} extraClass="description pt-20" color={TEXT_COLOR.INACTIVE}>В этом
          разделе вы можете изменить свои персональные данные
        </TypographyText>

        {/*        {displaySmall({value:"В этом разделе вы можете изменить свои персональные данные", extraClass:"description pt-20", color: "inactive"})}*/}
        <p className={`pt-20 text text_type_main-small text_color_inactive description`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className='profileOutlet'>
        <Outlet/>
      </div>

      {openErrModal &&
        <Modal onClose={handleErrorModalClose} header={"Ошибка"}>
          {displaySmall({value: textErrorModal})}
        </Modal>}


    </div>
  )
}