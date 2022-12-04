import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  USER_LOGOUT,
} from "./../types/user";
import { registerUserAPI, loginUserAPI, userMeAPI } from "./../services/user";
import { toast } from "react-toastify";

export function registerUser(data, history) {
  return async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    try {
      const user = await registerUserAPI(data);
      console.log(user);
      dispatch({ type: REGISTER_USER_SUCCESS });
      toast(user.data?.message);
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    } catch (error) {
      const { response } = error;
      console.error(response);
      dispatch({ type: REGISTER_USER_FAILURE });
      toast(response?.data?.message || "Something went wrong.");
    }
  };
}

export function loginUser(data, history) {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    try {
      const user = await loginUserAPI(data);
      console.log(user);
      localStorage.setItem("jwtToken", JSON.stringify(user.data?.token));
      dispatch({ type: LOGIN_USER_SUCCESS });
      toast(user.data?.message);
      setTimeout(() => {
        history.push("/");
      }, 2000);
    } catch (error) {
      const { response } = error;
      console.error(response);
      dispatch({ type: LOGIN_USER_FAILURE });
      toast(response?.data?.message || "Something went wrong.");
    }
  };
}

export function getUserProfile() {
  return async (dispatch) => {
    dispatch({ type: USER_PROFILE_REQUEST });
    try {
      const user = await userMeAPI();
      console.log("user", user);
      dispatch({ type: USER_PROFILE_SUCCESS, payload: user.data.response });
    } catch (error) {
      const { response } = error;
      console.error(response);
      dispatch({ type: USER_PROFILE_FAILURE, payload: response?.data });
    }
  };
}

export function logoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: USER_LOGOUT });
    history.push("/login");
  };
}
