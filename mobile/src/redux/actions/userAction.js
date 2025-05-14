import Axios from 'axios'
import { ORDER_CHART_TENANT_RESET, ORDER_CHART_WHOLE_RESET, ORDER_CREATE_RESET, ORDER_PAID_DETAIL_RESET, ORDER_PAID_EMPTY, ORDER_PAID_RESET, ORDER_PAID_RESET_HIS, ORDER_PAID_RESET_PO } from '../constants/orderConstants'
import { TENANT_LIST_ID_RESET, TENANT_LIST_RESET } from '../constants/tenantConstant'
import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT, USER_LIST, USER_DELETE, USER_DELETE_FAIL, USER_CREATE, USER_CREATE_FAIL, USER_EDIT, USER_UPDATE, USER_UPDATE_PROFILE, USER_PROFILE_FAIL, USER_PROFILE, USER_LIST_FAIL, USER_LIST_RESET } from '../constants/userConstant'
import { BASE_URL } from '../../utilities'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TABLE_LIST_ID_RESET, TABLE_LIST_READY_RESET, TABLE_LIST_RESET } from '../constants/tableConstants'
import { CART_EMPTY, CART_EMPTY_TAMBAH } from '../constants/cartConstant'
import { CLEAR_MENU, CLEAR_SUBMENU } from '../constants/menuConstant'
import { MENU_LIST_ID_RESET, MENU_LIST_RESET } from '../constants/tenantMenuConstant'

export const signin = (userName, password) => async (dispatch) => {
    try {
        const { data } = await Axios.post(`${BASE_URL}/api/user/signin`, { userName, password })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        AsyncStorage.setItem('userInf', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const getUser = () => async (dispatch) => {
    try {
        const { data } = await Axios.get(`${BASE_URL}/api/user/`)
        dispatch({
            type: USER_LIST,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const deleteUser = (id) => async (dispatch) => {
    try {
        const { data } = await Axios.delete(`${BASE_URL}/api/user/${id}`)
        dispatch({
            type: USER_DELETE,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const createUser = (name) => async (dispatch) => {
    try {
        const { data } = await Axios.post(`${BASE_URL}/api/user/register`, name)
        dispatch({
            type: USER_CREATE,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const editUser = (user) => async (dispatch) => {
    dispatch({
        type: USER_EDIT,
        payload: user
    })
}

export const updateUser = (user) => async (dispatch) => {
    const { data } = await Axios.put(`${BASE_URL}/api/user/${user._id}`, user)

    dispatch({
        type: USER_UPDATE,
        payload: data
    })
}

export const getProfile = (user) => async (dispatch) => {
    try {
        const { data } = await Axios.get(`${BASE_URL}/api/user/${user}/profile`)
        // console.log("data:", data);
        dispatch({
            type: USER_PROFILE,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const updateProfile = (user) => async (dispatch) => {
    const { data } = await Axios.put(`${BASE_URL}/api/user/${user._id}/profile`, user)
    dispatch({
        type: USER_UPDATE_PROFILE,
        payload: data
    })
}

export const signout = () => (dispatch) => {
    AsyncStorage.removeItem('userInf')
    dispatch({ type: USER_SIGNOUT })
    dispatch({ type: ORDER_PAID_DETAIL_RESET })
    dispatch({ type: ORDER_PAID_RESET })
    dispatch({ type: ORDER_PAID_EMPTY })
    dispatch({ type: ORDER_PAID_RESET_HIS })
    dispatch({ type: ORDER_PAID_RESET_PO })
    dispatch({ type: TENANT_LIST_RESET })
    dispatch({ type: TENANT_LIST_ID_RESET })
    dispatch({ type: ORDER_CREATE_RESET })
    dispatch({ type: ORDER_CHART_WHOLE_RESET })
    dispatch({ type: ORDER_CHART_TENANT_RESET })
    dispatch({ type: TABLE_LIST_ID_RESET })
    // dispatch({ type: TABLE_LIST_READY_RESET })
    dispatch({ type: TABLE_LIST_RESET })
    dispatch({ type: CART_EMPTY_TAMBAH })
    dispatch({ type: CART_EMPTY })
    dispatch({ type: CLEAR_MENU })
    dispatch({ type: CLEAR_SUBMENU })
    dispatch({ type: MENU_LIST_RESET })
    dispatch({ type: MENU_LIST_ID_RESET })
    dispatch({ type: USER_LIST_RESET })
}