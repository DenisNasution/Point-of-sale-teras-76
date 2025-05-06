import { CALL_TENANT, CALL_TENANT_FAIL, CALL_MENU, CALL_SUBMENU, CALL_MENU_FAIL, CALL_SUBMENU_FAIL, CLEAR_MENU, CLEAR_SUBMENU, CALL_MENU_REQUEST, CALL_TENANT_REQUEST, CALL_SUBMENU_REQUEST } from '../constants/menuConstant'

export const tenantListReducer = (state = { tenants: [] }, action) => {
    switch (action.type) {
        case CALL_TENANT_REQUEST:
            return { loading: true, tenants: [] }
        case CALL_TENANT:
            return { loading: false, tenants: action.payload }
        case CALL_TENANT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const menuListReducer = (state = { menus: [] }, action) => {
    switch (action.type) {
        case CALL_MENU_REQUEST:
            return { loading: true, menus: [] }
        case CALL_MENU:
            return { loading: false, menus: action.payload }
        case CALL_MENU_FAIL:
            return { loading: false, error: action.payload }
        case CLEAR_MENU:
            return { menus: [] }
        default:
            return state;
    }
}

export const subMenuListReducer = (state = { subMenus: [] }, action) => {
    switch (action.type) {
        case CALL_SUBMENU_REQUEST:
            return { loading: true, ...state, subMenus: [] }
        case CALL_SUBMENU:
            return { loading: false, ...state, subMenus: action.payload }
        case CALL_SUBMENU_FAIL:
            return { loading: false, error: action.payload }
        case CLEAR_SUBMENU:
            return { subMenus: [] }
        default:
            return state;
    }
}