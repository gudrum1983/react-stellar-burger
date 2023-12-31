import {configUserApi, DataUser} from "../../api-config/api-user";
import {openErrorModal} from "../error-modal/error-modal-action";
import {AppThunk} from "../store";
import {TValuesInput} from "../../hooks/useForm";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

type TSetAuthChecked = {
  type: typeof SET_AUTH_CHECKED,
  payload: boolean,
};

type TSetUser = {
  type: typeof SET_USER,
  payload: DataUser | null,
};

type TClearUser = {
  type: typeof CLEAR_USER,
};

export type TUserActions = TSetAuthChecked | TSetUser | TClearUser;

export const setAuthChecked = (value:boolean):TSetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user:DataUser | null):TSetUser => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = ():TClearUser => ({
  type: CLEAR_USER,
});


export const getUser = ():AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    return configUserApi.getUser()
      .then((res) => {
        dispatch(setUser(res.user));
      });
  };
};


export const updateUser = ({email, name, password}:TValuesInput):AppThunk => {
  return (dispatch) => {
    return configUserApi.updateUser({email, name, password})
      .then((res) => {
        dispatch(setUser(res.user));
      });
  };
};

export const logout = ():AppThunk => {
  return (dispatch) => {
    return configUserApi.logout()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(clearUser());
      });
  };
};

export const login = ({password, email}:TValuesInput):AppThunk => {
  return (dispatch) => {
    return configUserApi.login({password, email})
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch(() => dispatch(openErrorModal("Перепроверьте логин и пароль, Милорд... Пользователь с такими логином и паролем не найден.")));
  };
};

export const register = ({name, password, email}:TValuesInput):AppThunk => {
  return (dispatch) => {
    return configUserApi.register({name, password, email})
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch(() => dispatch(openErrorModal("Перепроверьте данные, Милорд... Данные введены не корректно или такой пользователь уже существует.")));
  };
};

export const checkUserAuth = ():AppThunk => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .then(() => {
          // handle successful getUser() dispatch
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};
