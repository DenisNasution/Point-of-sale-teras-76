import { TABLE_CREATE, TABLE_DELETE, TABLE_EDIT, TABLE_LIST, TABLE_RESET, TABLE_UPDATE, TABLE_EDITABLE, TABLE_UPDATE_RESET, TABLE_CREATE_RESET, TABLE_LIST_ID, TABLE_LIST_RESET, TABLE_LIST_ID_RESET, TABLE_LIST_REQUEST, TABLE_LIST_ID_REQUEST, TABLE_DELETE_REQUEST, TABLE_CREATE_REQUEST, TABLE_UPDATE_REQUEST, TABLE_LIST_READY, TABLE_LIST_READY_RESET, TABLE_LIST_READY_REQUEST, TABLE_STATUS, TABLE_STATUS_RESET } from '../constants/tableConstants'

export const tableListAdminReducer = (state = { tables: [] }, action) => {
    switch (action.type) {
        case TABLE_LIST_REQUEST:
            return {
                loading: true,
                tables: []
            }
        case TABLE_LIST:
            return {
                loading: false,
                tables: action.payload
            }
        case TABLE_LIST_RESET:
            return { tables: [] }
        default:
            return state;
    }
}

export const tableListReadyReducer = (state = { tables: [] }, action) => {
    switch (action.type) {
        case TABLE_LIST_READY_REQUEST:
            return {
                loading: true,
                tables: []
            }
        case TABLE_LIST_READY:
            return {
                loading: false,
                tables: action.payload
            }
        case TABLE_LIST_READY_RESET:
            return { tables: [] }
        default:
            return state;
    }
}
export const updateStatusTableReducer = (state = {}, action) => {
    switch (action.type) {
        case TABLE_STATUS:
            return {
                success: true
            }
        case TABLE_STATUS_RESET:
            return {
                success: false
            }
        default:
            return state;
    }
}

export const tableListIdAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case TABLE_LIST_ID_REQUEST:
            return {
                loading: true
            }
        case TABLE_LIST_ID:
            return {
                loading: false,
                table: action.payload
            }
        case TABLE_LIST_ID_RESET:
            return {}
        default:
            return state;
    }
}
export const tableDeleteAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case TABLE_DELETE_REQUEST:
            return {
                loading: true
            }
        case TABLE_DELETE:
            return {
                loading: false,
                success: true
            }
        case TABLE_RESET:
            return {}
        default:
            return state;
    }
}
export const tableCreateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case TABLE_CREATE_REQUEST:
            return {
                loading: true
            }
        case TABLE_CREATE:
            return {
                loading: false,
                success: true, table: action.payload
            }
        case TABLE_CREATE_RESET:
            return {}
        default:
            return state;
    }
}
export const tableEditAdminReducer = (state = { editAble: null }, action) => {
    switch (action.type) {
        case TABLE_EDIT:
            return {
                ...state, editAble: action.payload
            }
        case TABLE_EDITABLE:
            return {
                ...state, editAble: null
            }
        default:
            return state;
    }
}

export const tableUpdateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case TABLE_UPDATE_REQUEST:
            return {
                loading: true
            }
        case TABLE_UPDATE:
            return {
                loading: false,
                success: true
            }
        case TABLE_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}
