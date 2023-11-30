import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavigationLink} from "../components/navigation-link/navigation-link";
import {Link, Outlet, useLocation, useMatch} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {userName} from "../services/user/user-selector";
export function AppLayout() {

  const location = useLocation();
  const isProfile = useMatch({path: "/profile", end: false})

  const nameUser = useSelector(userName)

  const active = (to) => {
    if (to === "/profile") {
      return (isProfile)
        ? "primary"
        : "secondary"
    } else {
      return to === location.pathname
        ? "primary"
        : "secondary"
    }
  }

  return (
    <>
      <header className="header relative">
          <nav className="panel">
            <ul className="links1">
              <li className="link_home cursor">
                <NavigationLink to={'/'} icon={<BurgerIcon type={active("/")}/>} label={'Конструктор'}/>
              </li>
              <li className="link_feed cursor">
                <NavigationLink to={'/feed'}
                                icon={<ListIcon type={active("/feed")}/>} label={'Лента заказов'}/>
              </li>
              <li className="link_logo cursorLogo absolute">
                <Link to={'/'}><Logo/></Link>
              </li>
              <li className="link_profile cursor">
                <NavigationLink to={'/profile'}
                                icon={<ProfileIcon type={active("/profile")}/>} label={nameUser || 'Личный кабинет'}/>
              </li>
            </ul>
          </nav>
      </header>

      <main className="main">
        <Outlet/>
      </main>
    </>
  );
}