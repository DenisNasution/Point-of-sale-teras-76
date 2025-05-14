import { TENANT_CREATE, TENANT_DELETE, TENANT_EDIT, TENANT_LIST, TENANT_RESET, TENANT_UPDATE, TENANT_EDITABLE, TENANT_UPDATE_RESET, TENANT_CREATE_RESET, TENANT_LIST_ID, TENANT_LIST_RESET, TENANT_LIST_ID_RESET, TENANT_LIST_REQUEST, TENANT_LIST_ID_REQUEST, TENANT_DELETE_REQUEST, TENANT_CREATE_REQUEST, TENANT_UPDATE_REQUEST } from '../constants/tenantConstant'

export const tenantListAdminReducer = (state = { tenants: [] }, action) => {
    switch (action.type) {
        case TENANT_LIST_REQUEST:
            return {
                loading: true,
                tenants: []
            }
        case TENANT_LIST:
            return {
                loading: false,
                tenants: action.payload
            }
        case TENANT_LIST_RESET:
            return { tenants: [] }
        default:
            return state;
    }
}

export const tenantListIdAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case TENANT_LIST_ID_REQUEST:
            return {
                loading: true
            }
        case TENANT_LIST_ID:
            return {
                loading: false,
                tenant: action.payload
            }
        case TENANT_LIST_ID_RESET:
            return {}
        default:
            return state;
    }
}
export const tenantDeleteAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case TENANT_DELETE_REQUEST:
            return {
                loading: true
            }
        case TENANT_DELETE:
            return {
                loading: false,
                success: true
            }
        case TENANT_RESET:
            return {}
        default:
            return state;
    }
}
export const tenantCreateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case TENANT_CREATE_REQUEST:
            return {
                loading: true
            }
        case TENANT_CREATE:
            return {
                loading: false,
                success: true, tenant: action.payload
            }
        case TENANT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}
export const tenantEditAdminReducer = (state = { editAble: null }, action) => {
    switch (action.type) {
        case TENANT_EDIT:
            return {
                ...state, editAble: action.payload
            }
        case TENANT_EDITABLE:
            return {
                ...state, editAble: null
            }
        default:
            return state;
    }
}

export const tenantUpdateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case TENANT_UPDATE_REQUEST:
            return {
                loading: true
            }
        case TENANT_UPDATE:
            return {
                loading: false,
                success: true
            }
        case TENANT_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}
