import styles from "./app-header.module.css";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavigationLink} from "./navigation-link/navigation-link";

const classes = {
  link: "pl-5 pr-5 pb-4 pt-4",
  panel: "pt-4 pb-4",
}

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.panel} ${classes.panel}`}>
        <nav className={styles.navigation}>
          <ul className={`${styles.links} text`}>
            <li className={`${styles.flex_row} ${classes.link}`}>
              <NavigationLink icon={<BurgerIcon type="primary"/>}>Конструктор</NavigationLink>
            </li>
            <li className={`${styles.flex_row} ${classes.link}`}>
              <NavigationLink icon={<ListIcon type="secondary"/>}>Лента&nbsp;заказов</NavigationLink>
            </li>
          </ul>
        </nav>
        <Logo className={styles.logo}/>
        <div className={`${styles.flex_row} ${styles.profile} ${classes.link}`}>
          <NavigationLink icon={<ProfileIcon type="secondary"/>}>Личный&nbsp;кабинет</NavigationLink>
        </div>
      </div>
    </header>
  );
}

export {
  AppHeader
}