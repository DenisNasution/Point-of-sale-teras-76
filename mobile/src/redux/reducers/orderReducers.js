import { ORDER_CREATE, ORDER_PAID, ORDER_PAID_PO_REQUEST, ORDER_DELETE, ORDER_DELETE_RESET, ORDER_PAID_PO, ORDER_PAID_HIS, ORDER_STATUS, ORDER_TABLE, ORDER_RESET, ORDER_PAID_DETAIL, ORDER_PAID_EMPTY, ORDER_CREATE_RESET, ORDER_PAID_RESET, ORDER_PAID_RESET_PO, ORDER_PAID_RESET_HIS, ORDER_PAID_DETAIL_RESET, ORDER_PAID_TABLE, ORDER_PAID_RESET_TABLE, ORDER_CHART_WHOLE, ORDER_CHART_WHOLE_RESET, ORDER_CHART_TENANT, ORDER_CHART_TENANT_RESET, ORDER_CREATE_REQUEST, ORDER_PAID_REQUEST, ORDER_PAID_TABLE_REQUEST, ORDER_PAID_HIS_REQUEST, ORDER_PAID_DETAIL_REQUEST, ORDER_CHART_WHOLE_REQUEST, ORDER_CHART_TENANT_REQUEST, ORDER_STATUS_REQUEST, ORDER_TABLE_REQUEST, ORDER_DELETE_REQUEST, ORDER_TAMBAH_TABLE_REQUEST, ORDER_TAMBAH_TABLE, ORDER_PAID_TAMBAH_EMPTY, ORDER_TENANT_REQUEST, ORDER_TENANT, ORDER_TENANT_EMPTY, ORDER_MENU_DELETE, ORDER_MENU_DELETE_RESET } from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_CREATE:
            return {
                loading: false,
                order: action.payload,
                success: true
            }
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const orderListPaidReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case ORDER_PAID_REQUEST:
            return {
                loading: true,
                order: []
            }
        case ORDER_PAID:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_PAID_RESET:
            return { order: [] }
        default:
            return state
    }
}
export const orderListPaidTableReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_PAID_TABLE_REQUEST:
            return {
                loading: true,
                orders: []
            }
        case ORDER_PAID_TABLE:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_PAID_RESET_TABLE:
            return { orders: [] }
        default:
            return state
    }
}

export const orderListPOReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case ORDER_PAID_PO_REQUEST:
            return { loading: true, order: [] }
        case ORDER_PAID_PO:
            return {
                loading: false, order: action.payload
            }
        case ORDER_PAID_RESET_PO:
            return { order: [] }
        default:
            return state
    }
}
export const orderListHisReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case ORDER_PAID_HIS_REQUEST:
            return {
                loading: true,
                order: []
            }
        case ORDER_PAID_HIS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_PAID_RESET_HIS:
            return { order: [] }
        default:
            return state
    }
}

export const orderDetailPaidReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case ORDER_PAID_DETAIL_REQUEST:
            return {
                loading: true,
                order: []
            }
        case ORDER_PAID_DETAIL:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_PAID_DETAIL_RESET:
            return { order: [] }
        default:
            return state;
    }
}
export const orderChartWholedReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case ORDER_CHART_WHOLE_REQUEST:
            return {
                loading: true,
                order: []
            }
        case ORDER_CHART_WHOLE:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_CHART_WHOLE_RESET:
            return { order: [] }
        default:
            return state;
    }
}
export const orderChartTenantReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case ORDER_CHART_TENANT_REQUEST:
            return {
                loading: true,
                order: []
            }
        case ORDER_CHART_TENANT:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_CHART_TENANT_RESET:
            return { order: [] }
        default:
            return state;
    }
}

export const orderListDetailReducer = (state = { orders: {} }, action) => {
    switch (action.type) {
        case ORDER_TABLE_REQUEST:
            return {
                loading: true,
            }
        case ORDER_TABLE:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_PAID_EMPTY:
            return {
                orders: {}
            }
        default:
            return state;
    }
}
export const orderListTenantReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_TENANT_REQUEST:
            return {
                loading: true,
            }
        case ORDER_TENANT:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_TENANT_EMPTY:
            return {
                orders: []
            }
        default:
            return state;
    }
}
export const orderListTambahDetailReducer = (state = { orders: {} }, action) => {
    switch (action.type) {
        case ORDER_TAMBAH_TABLE_REQUEST:
            return {
                loading: true,
            }
        case ORDER_TAMBAH_TABLE:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_PAID_TAMBAH_EMPTY:
            return {
                orders: {}
            }
        default:
            return state;
    }
}
export const orderStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_STATUS_REQUEST:
            return {
                loading: true
            }
        case ORDER_STATUS:
            return {
                loading: false,
                success: true
            }
        case ORDER_RESET:
            return {}
        default:
            return state;
    }
}

export const orderDeleteAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return {
                loading: true
            }
        case ORDER_DELETE:
            return {
                loading: false,
                success: true
            }
        case ORDER_DELETE_RESET:
            return {}
        default:
            return state;
    }
}
export const menuListOrderDeleteAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_MENU_DELETE:
            return {
                loading: false,
                success: true
            }
        case ORDER_MENU_DELETE_RESET:
            return {}
        default:
            return state;
    }
}

