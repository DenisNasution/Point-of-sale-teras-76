import { USER_CREATE, USER_CREATE_FAIL, USER_CREATE_REQUEST, USER_CREATE_RESET, USER_DELETE, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_RESET, USER_EDIT, USER_EDITABLE, USER_LIST, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_PROFILE, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_SIGN_RESET, USER_UPDATE, USER_UPDATE_PROFILE, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_REQUEST, USER_UPDATE_RESET } from "../constants/userConstant";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return {
                loading: true
            }
        case USER_SIGNIN_SUCCESS:
            return {
                loading: false, userInfo: action.payload, success: true
            }
        case USER_SIGNIN_FAIL:
            return {
                loading: false, error: action.payload
            }
        case USER_SIGNOUT:

            return {}
        case USER_SIGN_RESET:
            return {}
        default:
            return state;
    }
}

export const userListAdminReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {
                loading: true,
                users: []
            }
        case USER_LIST:
            return {
                loading: false,
                users: action.payload
            }
        case USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LIST_RESET:
            return { users: [] }
        default:
            return state;
    }
}
export const userDeleteAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true, }
        case USER_DELETE:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case USER_DELETE_RESET:
            return {}
        default:
            return state;
    }
}
export const userCreateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CREATE_REQUEST:
            return { loading: true }
        case USER_CREATE:
            return { loading: false, success: true, user: action.payload }
        case USER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const userEditAdminReducer = (state = { editAble: null }, action) => {
    switch (action.type) {
        case USER_EDIT:
            return {
                ...state, editAble: action.payload
            }
        case USER_EDITABLE:
            return {
                ...state, editAble: null
            }
        default:
            return state;
    }
}

export const userUpdateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {
                loading: true
            }
        case USER_UPDATE:
            return {
                loading: false,
                success: true
            }
        case USER_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}

export const userProfileReducer = (state = {}, action) => {
    // console.log(action);
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {
                loading: true
            }
        case USER_PROFILE:
            return {
                loading: false,
                profile: action.payload
            }
        case USER_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true
            }
        case USER_UPDATE_PROFILE:
            return {
                loading: false,
                success: true
            }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state;
    }
}