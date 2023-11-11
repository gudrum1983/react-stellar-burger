import {configApi, registerApi} from "../../utils/config-api";
import {
  getForgot,
  getReset, getRegister
} from "../../api/config";
import {getLogin, getUserDataWithRefresh, getUserDataUpdateWithRefresh, getUserLogoutRefresh, } from "../../api/auth-user";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch) => {
    return getUserDataWithRefresh()
      .then((res) => {
        dispatch(setUser(res.user));
      });
  };
};

export const getUserUpdate = (email, name, password) => {
  return (dispatch) => {
    return getUserDataUpdateWithRefresh(email, name, password)
      .then((res) => {
        console.log("resUpd", res)
        dispatch(setUser(res.user));
      });
  };
};

export const getUserLogout = () => {
  return (dispatch) => {
    return getUserLogoutRefresh()
      .then((res) => {
        console.log("resLogout", res)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      });
  };
};


export const login = (pass, email) => {
  return (dispatch) => {
    return getLogin(pass, email)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch((err) => console.log('actionUserLoginErr', err));
    ;
  };
};

export const register = (name, pass, email) => {
  return (dispatch) => {
    return getRegister(name, pass, email)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch((err) => console.log(err));

  };
};

export const forgotPassword = (email) => {
  return (dispatch) => {
    return getForgot(email)
      .then((res) => {
        console.log(res)
        localStorage.setItem("forgotConfirmed", true);
      })
      .catch((err) => console.log(err));

  };
};

export const resetPassword = (password, code) => {
  return (dispatch) => {
    return getReset(password, code)
      .then((res) => {
        console.log(res)
        localStorage.removeItem("forgotConfirmed");
      })
      .catch((err) => console.log(err));
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
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

export const logout = () => {
  return (dispatch) => {
    return configApi.logout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};
