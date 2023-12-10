import styles from "./app-layout.module.css";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavigationLink} from "../navigation-link/navigation-link";
import {Link, Outlet, useLocation} from "react-router-dom";
import React from "react";
export function AppLayout() {

  const location = useLocation();
  const active = (to) => {
    if (to === "/profile") {
      return (location.pathname.indexOf(to) === 0) //проверяем что строка "/profile" находится именно в начале pathname
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
      <header className={styles.header}>
          <nav className={styles.panel}>
            <ul className={`${styles.links}`}>
              <li className={`${styles.link_home} cursor`}>
                <NavigationLink to={'/'} icon={<BurgerIcon type={active("/")}/>} label={'Конструктор'}/>
              </li>
              <li className={`${styles.link_feed} cursor`}>
                <NavigationLink to={'/feed'}
                                icon={<ListIcon type={active("/feed")}/>} label={'Лента заказов'}/>
              </li>
              <li className={`${styles.link_logo} cursorLogo`}>
                <Link to={'/'}><Logo/></Link>
              </li>
              <li className={`${styles.link_profile} cursor`}>
                <NavigationLink to={'/profile'}
                                icon={<ProfileIcon type={active("/profile")}/>} label={'Личный кабинет'}/>
              </li>
            </ul>
          </nav>
      </header>

      <main className={styles.main}>
        <Outlet/>
      </main>
    </>
  );
}