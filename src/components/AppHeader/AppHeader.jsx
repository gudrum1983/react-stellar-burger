import styles from "./AppHeader.module.css";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ButtonS} from "../iconR/iconR";


function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header__panel}>
        <nav className={styles.header__nav}>
          <ul className={styles.navigation}>
            <ButtonS icon={<BurgerIcon type="primary"/>} text="Конструктор"/>
            <ButtonS icon={<ListIcon type="secondary"/>} text="Лента заказов"/>
          </ul>
        </nav>
        <div className={styles.header__logo}>
          <Logo/>
        </div>
        <div className={styles.header__profile}>
          <ButtonS icon={<ProfileIcon type="secondary"/>} text="Личный кабинет"/>
        </div>
      </div>
    </header>
  );
}

export {
  AppHeader
}