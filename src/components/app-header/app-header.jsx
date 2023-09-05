import styles from "./app-header.module.css";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavigationLink} from "../navigation-link/navigation-link";


const classes = {
  link: "pl-5 pr-5 pb-5 pt-5",
  panel: "pt-4 pb-4",
}

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.panel} ${classes.panel}`}>
        <nav className={styles.navigation}>
          <ul className={`${styles.links} text`}>
            <li className={`${styles.flex_row_8gap} ${classes.link}`}>
              <NavigationLink icon={<BurgerIcon type="primary"/>} text="Конструктор"/>
            </li>
            <li className={`${styles.flex_row_8gap} ${classes.link}`}>
              <NavigationLink icon={<ListIcon type="secondary"/>} text="Лента заказов"/>
            </li>
          </ul>
        </nav>
        <Logo className={styles.logo}/>
        <div className={`${styles.flex_row_8gap} ${styles.profile} ${classes.link}`}>
          <NavigationLink icon={<ProfileIcon type="secondary"/>} text="Личный кабинет"/>
        </div>
      </div>
    </header>
  );
}

export {
  AppHeader
}