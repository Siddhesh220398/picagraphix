import {
  HEADER_REQUEST,
  HEADER_SUCCESS,
  HEADER_FAIL

} from "../constants/componentConstants";
import axios from "axios";
import Urls from '../Config/Urls';

// header data action
export const headerApi = () => async (dispatch) => {
  try {
    dispatch({
      type: HEADER_REQUEST,
    });
    // calling the api
    const { data } = await axios.get(
      Urls.base_url + "get-home",

    );
    // dispatch the payload
    if (data.success) {
      dispatch({
        type: HEADER_SUCCESS,
        payload: data,
      });
      localStorage.setItem("headerData", JSON.stringify(data));

    } else {
      dispatch({
        type: HEADER_FAIL,
        payload: data.message
      });
    }
    // set the local storage
  } catch (error) {
    dispatch({
      type: HEADER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
