import { 
    HOME_SCREEN_DETAIL_REQUEST,
    HOME_SCREEN_DETAIL_SUCCESS,
    HOME_SCREEN_DETAIL_FAIL,
 } from '../constants/homeConstants'


export const homeScreenDetail = (state = { data: {} }, action) => {
    switch (action.type) {
      case HOME_SCREEN_DETAIL_REQUEST:
        return { loading: true, data: {} };
  
      case HOME_SCREEN_DETAIL_SUCCESS:
        return { loading: false, data: action.payload };
  
      case HOME_SCREEN_DETAIL_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };