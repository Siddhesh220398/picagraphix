import {
  HEADER_REQUEST,
  HEADER_SUCCESS,
  HEADER_FAIL,
} from "../constants/componentConstants";

// login
export const headerDataReducer = (state = { }, action) => {
    switch (action.type) {
      case HEADER_SUCCESS:
        return { loading: true };
  
      case HEADER_REQUEST:
        return { loading: false, headerData: action.payload };
  
      case HEADER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
