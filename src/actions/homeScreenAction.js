import {
    HOME_SCREEN_DETAIL_REQUEST,
    HOME_SCREEN_DETAIL_SUCCESS,
    HOME_SCREEN_DETAIL_FAIL,
} from '../constants/homeConstants'
import axios from 'axios'
import Urls from '../Config/Urls'

export const homeScreenData = () => async (dispatch) => {
    try {
        dispatch({ type: HOME_SCREEN_DETAIL_REQUEST })
        axios.get(Urls.base_url + "get-home", {
            // headers: {
            //     "Access-Control-Allow-Headers": "Authorization, Content-Type",
            //     "Access-Control-Allow-Origin": "*",
            //     "content-type": "application/json; charset=utf-8"
            // }
        })
            .then(res => {
                console.log("res : ", res.data)
                if (res.data.success) {
                    dispatch({
                        type: HOME_SCREEN_DETAIL_SUCCESS,
                        payload: res.data
                    })
                }
            })
            .catch(error => {
                console.log("error : ", error)
                dispatch({
                    type: HOME_SCREEN_DETAIL_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                })
            })

        // const data = await axios.get(Urls.base_url + 'get-home')
        // console.log("_____data :", data)

    } catch (error) {
        console.log("errorr : ", error)
        dispatch({
            type: HOME_SCREEN_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}