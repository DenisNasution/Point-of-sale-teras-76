import { CONNECTING, CONNECTING_REQUEST } from '../constants/connectionConstant';


export const connectionRequestReducer = (state = {
    boundAddress: '',
    name: ''
}, action) => {
    switch (action.type) {
        case CONNECTING_REQUEST:
            return {
                boundAddress: '',
                name: ''
            }
        case CONNECTING:
            return {
                boundAddress: action.payload.info.boundAddress,
                name: action.payload.info.name,
            }
        default:
            return state;
    }
}