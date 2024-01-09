import {Navigate, useLocation} from "react-router-dom";
import {pagePath} from "../../utils/constants";
import {user, userAuth} from "../../services/user/user-selector";
import {Preloader} from "../preloader/preloader";
import {useSelectorApp} from "../../services/store";

type TPropsProtected = {
  onlyUnAuth?: boolean;
  component: JSX.Element
}

type TPropsUnAuth = Pick<TPropsProtected, "component">

const ProtectedRouteElement = ({onlyUnAuth = false, component}: TPropsProtected): JSX.Element => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelectorApp(userAuth);
  const isUser = !!useSelectorApp(user);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return <Preloader/>
  } else if (onlyUnAuth && isUser) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const {from} = location.state || {from: {pathname: pagePath.home}};
    return <Navigate to={from}/>;
  } else if (!onlyUnAuth && !isUser) {
    return <Navigate to={pagePath.loginAbsolut} state={{from: location}}/>;
  } else {
    return component;
  }
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({component}: TPropsUnAuth): JSX.Element => (
  <ProtectedRouteElement onlyUnAuth={true} component={component}/>
);