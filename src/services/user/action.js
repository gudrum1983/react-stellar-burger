import {api, loginApi, registerApi} from "../../utils/api";
import {getLogin, getUserDataRefresh, getUserDataUpdateRefresh, getUserLogoutRefresh} from "../../api/config";

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
    return getUserDataRefresh()
      .then((res) => {

        dispatch(setUser(res.user));
    });
  };
};

export const getUserUpdate = (email, name, password) => {
  return (dispatch) => {
    return getUserDataUpdateRefresh(email, name, password)
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
      .catch((err) => console.log('actionUserLoginErr',err));;
  };
};

export const register = (name, pass, email) => {
  return (dispatch) => {
    return registerApi(name, pass, email)
      .then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
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
    return api.logout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};
