import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {pagePath} from "../../utils/constants";
import {user, userAuth} from "../../services/user/user-selector";

type TPropsProtected = {
  onlyUnAuth: boolean;
  component: JSX.Element
}

type TPropsUnAuth = Pick<TPropsProtected, "component">

const ProtectedRouteElement = ({onlyUnAuth = false, component}: TPropsProtected) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector(userAuth);
  const isUser = !!useSelector(user);
  const location = useLocation();


  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return null;
  }

  if (onlyUnAuth && isUser) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const {from} = location.state || {from: {pathname: pagePath.home}};
    return <Navigate to={from}/>;
  }

  if (!onlyUnAuth && !isUser) {
    return <Navigate to={pagePath.loginAbsolut} state={{from: location}}/>;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({component}:TPropsUnAuth) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component}/>
);