import styles from "./app-header.module.css";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavigationLink} from "./navigation-link/navigation-link";
import {useNavigate} from "react-router-dom";
import {fetchWithRefresh, getUser, getUser1, refreshToken} from "../../api/config";

export function AppHeader() {

  const navigate = useNavigate();

  function refresh() {
    refreshToken().then((res) => {
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("accessToken", res.accessToken);})
  }

  function onClickProfile() {
    navigate('/profile', {replace: false})
    getUser1()
      .then((res) => console.log('resprofile', res))

  }

  function onClickHome() {

    console.log(32111)
    navigate('/', {replace: false})
  }


  const classes = {
    link: "pl-5 pr-5 pb-4 pt-4",
    panel: "pt-4 pb-4",
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.panel} ${classes.panel}`}>
        <nav className={styles.navigation}>
          <ul className={`${styles.links} text`}>
            <li className={`${styles.flex_row} ${classes.link} cursor`} onClick={onClickHome}>
              <NavigationLink icon={<BurgerIcon type="primary"/>}>Конструктор</NavigationLink>
            </li>
            <li className={`${styles.flex_row} ${classes.link} cursor`}>
              <NavigationLink icon={<ListIcon type="secondary"/>}>Лента&nbsp;заказов</NavigationLink>
            </li>
          </ul>
        </nav>
        <Logo className={styles.logo}/>
        <div className={`${styles.flex_row} ${styles.profile} ${classes.link} cursor`} onClick={onClickProfile}>
          <NavigationLink icon={<ProfileIcon type="secondary"/>}>Личный&nbsp;кабинет</NavigationLink>
        </div>
      </div>
    </header>
  );
}