import Axios from 'axios'
import { CART_EMPTY, CART_EMPTY_TAMBAH } from "../constants/cartConstant"
import { ORDER_CREATE, ORDER_PAID, ORDER_STATUS, ORDER_PAID_PO_REQUEST, ORDER_DELETE, ORDER_TABLE, ORDER_PAID_DETAIL, ORDER_PAID_EMPTY, ORDER_PAID_PO, ORDER_PAID_HIS, ORDER_PAID_TABLE, ORDER_CHART_WHOLE, ORDER_CHART_TENANT, ORDER_CHART_TENANT_REQUEST, ORDER_TAMBAH_TABLE, ORDER_TENANT, ORDER_MENU_DELETE } from "../constants/orderConstants"
import { BASE_URL } from '../../utilities'

export const createOrder = (info) => async (dispatch, getState) => {
    // console.log(info);
    const { data } = await Axios.post(`${BASE_URL}/api/orders`, info)
    // console.log(data);
    dispatch({
        type: ORDER_CREATE,
        payload: data
    })
    dispatch({
        type: CART_EMPTY,
    })
}

export const addOrder = (info) => async (dispatch, getState) => {
    const { data } = await Axios.put(`${BASE_URL}/api/orders/${info.idOrder}/order`, info.cartItems)
    // console.log(data);
    dispatch({
        type: ORDER_CREATE,
        payload: data
    })
    dispatch({
        type: CART_EMPTY_TAMBAH
    })
    dispatch({
        type: ORDER_PAID_EMPTY
    })
}

export const listOrderPaid = (type) => async (dispatch) => {
    dispatch({
        type: ORDER_PAID_PO_REQUEST,
        payload: data
    })
    const { data } = await Axios.get(`${BASE_URL}/api/orders/paid/${type}`)
    dispatch({
        type: ORDER_PAID_PO,
        payload: data
    })
}

export const historyListOrderpaid = (date) => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/orders/paid/now/transaction?startAt=${date.tanggalMulai}&endAt=${date.tanggalSampai}`)
    // console.log(data);
    dispatch({
        type: ORDER_PAID_HIS,
        payload: data
    })
}
export const historyDetailOrderpaid = (date) => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/orders/paid/now/transaction/${date.idTenant}/detail?startAt=${date.mulai}&endAt=${date.sampai}`)
    // console.log(data);
    dispatch({
        type: ORDER_PAID_DETAIL,
        payload: data
    })
}

export const listOrderpaidCurrent = () => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/orders/paid/now/tenant`)
    dispatch({
        type: ORDER_PAID,
        payload: data
    })
}
export const detailOrderpaidCurrent = (id) => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/orders/paid/now/${id}`)
    dispatch({
        type: ORDER_PAID_DETAIL,
        payload: data
    })
}



export const listOrderpaidTableCurrent = () => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/orders/paid/now/table`)
    dispatch({
        type: ORDER_PAID_TABLE,
        payload: data
    })
}

export const listOrderDetail = (id) => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/orders/${id}`)
    // console.log(data);
    dispatch({
        type: ORDER_TABLE,
        payload: data
    })
}

export const detailOrderpaidTenant = (id) => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/orders/rincian/tenant/${id}`)
    dispatch({
        type: ORDER_TENANT,
        payload: data
    })
}
export const listOrderTambahDetail = (id) => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/orders/${id}`)
    // console.log(data);
    dispatch({
        type: ORDER_TAMBAH_TABLE,
        payload: data
    })
}

export const StatusOrder = (id) => async (dispatch) => {
    const { data } = await Axios.put(`${BASE_URL}/api/orders/${id}/status`, {})
    // console.log(data);
    dispatch({
        type: ORDER_STATUS,
        payload: data
    })
}
export const ChartWhole = () => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/orders/chart/whole`)
    // console.log(data);
    dispatch({
        type: ORDER_CHART_WHOLE,
        payload: data
    })
}
export const ChartTenant = (id) => async (dispatch) => {
    dispatch({
        type: ORDER_CHART_TENANT_REQUEST,
    })

    const { data } = await Axios.get(`${BASE_URL}/api/orders/chart/tenant/${id}`)
    // console.log(data);
    dispatch({
        type: ORDER_CHART_TENANT,
        payload: data
    })
}
export const menuListOrderDelete = (menu) => async (dispatch) => {
    console.log(menu);
    await Axios.delete(`${BASE_URL}/api/orders/${menu.id}/order/${menu.idMenu}/menu`)
    dispatch({
        type: ORDER_MENU_DELETE
    })
}
export const cancelOrder = (id) => async (dispatch) => {
    await Axios.delete(`${BASE_URL}/api/orders/${id}`)
    dispatch({
        type: ORDER_DELETE
    })
}