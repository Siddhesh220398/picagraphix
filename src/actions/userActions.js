import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
  } from "../constants/userContstants";
  import axios from "axios";
  import Urls from '../Config/Urls';
  import Notification from '../utils/Notification';
  // login action
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      // calling the api
      
      console.log(email, password);
      const { data } = await axios.post(
        Urls.base_url+"login",
        {
          email: email,
          password: password,
        }
      );
      // dispatch the payload
     if(data.success==1)
     {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

     }else{
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:data.message
      });
     }
      // set the local storage
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  //Logout handler
  export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGOUT,
    });
    // dispatch({
    //   type: USER_DETAILS_RESET,
    // });
  };
  
  // Register
  export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      // calling the api
     
      console.log('sign response actio',email, password);
      const { data } = await axios.post(
        Urls.base_url+"signup",
        {
          username: name,
          email: email,
          password: password,
        },
      );
      console.log('sign response action ',data)

      // dispatch the payload
      if(data.success==1)
      {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data,
        });
              localStorage.setItem("userInfo", JSON.stringify(data));
              Notification('success', data.message + '')

      }else{
        dispatch({
          type: USER_REGISTER_FAIL,
          payload:data.message
        });
        Notification('error', 'Error!', data.message + '')
      }
     
  
      // dispatch the payload
      // dispatch({
      //   type: USER_LOGIN_SUCCESS,
      //   payload: data,
      // });
      // // set the local storage
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };