import { MENU_CREATE, MENU_DELETE, MENU_EDIT, MENU_LIST, MENU_RESET, MENU_UPDATE, MENU_EDITABLE, MENU_UPDATE_RESET, MENU_CREATE_RESET, MENU_LIST_ID, MENU_LIST_REQUEST, MENU_LIST_ID_REQUEST, MENU_DELETE_REQUEST, MENU_CREATE_REQUEST, MENU_UPDATE_REQUEST, MENU_LIST_RESET, MENU_LIST_ID_RESET } from '../constants/tenantMenuConstant'

export const menuListAdminReducer = (state = { menus: [] }, action) => {
    switch (action.type) {
        case MENU_LIST_REQUEST:
            return {
                loading: true,
                menus: []
            }
        case MENU_LIST:
            return {
                loading: false,
                menus: action.payload
            }
        case MENU_LIST_RESET:
            return {
                loading: false,
                menus: []
            }
        default:
            return state;
    }
}
export const menuListIdAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_LIST_ID_REQUEST:
            return {
                loading: true,
            }
        case MENU_LIST_ID:
            return {
                loading: false,
                menu: action.payload
            }
        case MENU_LIST_ID_RESET:
            return {}
        default:
            return state;
    }
}
export const menuDeleteAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_DELETE_REQUEST:
            return {
                loading: true
            }
        case MENU_DELETE:
            return {
                loading: false,
                success: true
            }
        case MENU_RESET:
            return {}
        default:
            return state;
    }
}
export const menuCreateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_CREATE_REQUEST:
            return {
                loading: true
            }
        case MENU_CREATE:
            return {
                loading: false,
                success: true, menu: action.payload
            }
        case MENU_CREATE_RESET:
            return {}
        default:
            return state;
    }
}
export const menuEditAdminReducer = (state = { editAble: null }, action) => {
    switch (action.type) {
        case MENU_EDIT:
            return {
                ...state, editAble: action.payload
            }
        case MENU_EDITABLE:
            return {
                ...state, editAble: null
            }
        default:
            return state;
    }
}

export const menuUpdateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_UPDATE_REQUEST:
            return {
                loading: true
            }
        case MENU_UPDATE:
            return {
                loading: false,
                success: true
            }
        case MENU_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}
