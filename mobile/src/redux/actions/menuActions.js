import Axios from 'axios'
import { CALL_TENANT, CALL_TENANT_FAIL, CALL_MENU, CALL_SUBMENU, CALL_MENU_FAIL, CALL_SUBMENU_FAIL, CLEAR_MENU, CLEAR_SUBMENU } from '../constants/menuConstant'
import { BASE_URL } from '../../utilities'

export const listTenant = () => async (dispatch) => {
    try {
        const { data } = await Axios.get(`${BASE_URL}/api/menu`)
        dispatch({
            type: CALL_TENANT,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CALL_TENANT_FAIL,
            payload: error.message
        })
    }
}

export const listMenu = (id) => async (dispatch) => {
    try {
        const { data } = await Axios.get(`${BASE_URL}/api/menu/${id}/menu`)
        dispatch({
            type: CALL_MENU,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CALL_MENU_FAIL,
            payload: error.message
        })
    }
}

export const listSubMenu = (id) => async (dispatch) => {
    try {
        const { data } = await Axios.get(`${BASE_URL}/api/menu/${id}/subMenu`)
        // console.log(data);
        dispatch({
            type: CALL_SUBMENU,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CALL_SUBMENU_FAIL,
            payload: error.message
        })
    }
}

export const clearlistMenu = () => async (dispatch) => {
    dispatch({
        type: CLEAR_MENU,
    })
}

export const clearlistSubMenu = () => async (dispatch) => {
    dispatch({
        type: CLEAR_SUBMENU,
    })
}


