import { MENU_SUBMENU_CREATE, MENU_SUBMENU_DELETE, MENU_SUBMENU_EDIT, MENU_SUBMENU_LIST, MENU_SUBMENU_RESET, MENU_SUBMENU_UPDATE, MENU_SUBMENU_EDITABLE, MENU_SUBMENU_UPDATE_RESET, MENU_SUBMENU_CREATE_RESET, MENU_SUBMENU_LIST_REQUEST, MENU_SUBMENU_DELETE_REQUEST, MENU_SUBMENU_CREATE_REQUEST, MENU_SUBMENU_EDIT_REQUEST, MENU_SUBMENU_UPDATE_REQUEST, MENU_SUBMENU_LIST_RESET } from '../constants/menuSubMenuConstant'

export const subMenuListAdminReducer = (state = { subMenus: [] }, action) => {
    // console.log(action);
    switch (action.type) {
        case MENU_SUBMENU_LIST_REQUEST:
            return {
                loading: true, subMenus: []
            }
        case MENU_SUBMENU_LIST:
            return {
                subMenus: action.payload
            }
        case MENU_SUBMENU_LIST_RESET:
            return {
                subMenus: []
            }
        default:
            return state;
    }
    // console.log(action.type);
}
export const subMenuDeleteAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_SUBMENU_DELETE_REQUEST:
            return {
                loading: true,
            }
        case MENU_SUBMENU_DELETE:
            return {
                loading: false, success: true
            }
        case MENU_SUBMENU_RESET:
            return {}
        default:
            return state;
    }
}
export const subMenuCreateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_SUBMENU_CREATE_REQUEST:
            return {
                loading: true,
            }
        case MENU_SUBMENU_CREATE:
            return {
                loading: false, success: true, subMenu: action.payload
            }
        case MENU_SUBMENU_CREATE_RESET:
            return {}
        default:
            return state;
    }
}
export const subMenuEditAdminReducer = (state = { editAble: null }, action) => {
    switch (action.type) {
        case MENU_SUBMENU_EDIT_REQUEST:
            return {
                loading: true, editAble: null
            }
        case MENU_SUBMENU_EDIT:
            return {
                loading: false, ...state, editAble: action.payload
            }
        case MENU_SUBMENU_EDITABLE:
            return {
                loading: false, ...state, editAble: null
            }
        default:
            return state;
    }
}

export const subMenuUpdateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_SUBMENU_UPDATE_REQUEST:
            return {
                loading: true
            }
        case MENU_SUBMENU_UPDATE:
            return {
                loading: false, success: true
            }
        case MENU_SUBMENU_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}
