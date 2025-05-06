import { CONNECTING, CONNECTING_REQUEST } from '../constants/connectionConstant'

export const connectionRequest = () => async (dispatch) => {
    dispatch({
        type: CONNECTING_REQUEST,
    })
}
export const connection = (info) => async (dispatch) => {
    // console.log(info);
    dispatch({
        type: CONNECTING,
        payload: info
    })
}
