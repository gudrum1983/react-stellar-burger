import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavigationLink} from "../components/navigation-link/navigation-link";
import {Link, Outlet, useLocation, useMatch} from "react-router-dom";
import React from "react";
import {userName} from "../services/user/user-selector";
import {pagePath} from "../utils/constants";
import {useSelector2} from "../services/store";
export function AppLayout():JSX.Element {

  const location = useLocation();
  const isProfile = useMatch({path: pagePath.profile, end: false})
  console.log({isProfile})
  console.log({isProfile})
  console.log({location})
  const nameUser = useSelector2(userName)

  const active = (to:string) => {

    if (to === "profile") {
      return (!!isProfile)
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
              <li className="link cursor">
                <NavigationLink to={pagePath.home} icon={<BurgerIcon type={active(pagePath.home)}/>} label={'Конструктор'}/>
              </li>
              <li className="link cursor">
                <NavigationLink to={pagePath.feed}
                                icon={<ListIcon type={active(pagePath.feed)}/>} label={'Лента заказов'}/>
              </li>
              <li className="cursorLogo absolute">
                <Link to={pagePath.home}><Logo/></Link>
              </li>
              <li className="link_profile cursor">
                <NavigationLink to={pagePath.profile}
                                icon={<ProfileIcon type={active(pagePath.profile)}/>} label={nameUser || 'Личный кабинет'}/>
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