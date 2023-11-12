import styles from "./app-header.module.css";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavigationLink} from "./navigation-link/navigation-link";
import {useLocation} from "react-router-dom";

export function AppHeader() {

  const location = useLocation();
  const active = (to) => {
    if (to === "/profile") {
      return (location.pathname.indexOf(to) === 0) //проверяем что строка находится именно в начале pathname
        ? "primary"
        : "secondary"
    } else {
      return to === location.pathname
        ? "primary"
        : "secondary"
    }
  }

  const classes = {
    link: "pl-5 pr-5 pb-4 pt-4",
  }

  return (
    <header className={styles.header}>
      <div className={styles.panel}>
        <nav className={styles.navigation}>
          <ul className={`${styles.links} text`}>
            <li className={`${styles.flex_row} ${classes.link} cursor`}>
              <NavigationLink to={'/'} icon={<BurgerIcon type={active("/")}/>}>Конструктор</NavigationLink>
            </li>
            <li className={`${styles.flex_row} ${classes.link} cursor`}>
              <NavigationLink to={'/feed'} icon={<ListIcon type={active("/feed")}/>}>Лента&nbsp;заказов</NavigationLink>
            </li>
          </ul>
        </nav>
        <Logo className={styles.logo}/>
        <div className={`${styles.flex_row} ${styles.profile} ${classes.link} cursor`}>
          <NavigationLink to={'/profile'}
                          icon={<ProfileIcon type={active1("/profile")}/>}>Личный&nbsp;кабинет</NavigationLink>
        </div>
      </div>
    </header>
  );
}