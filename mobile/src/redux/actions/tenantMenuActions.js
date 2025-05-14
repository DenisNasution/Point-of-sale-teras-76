import Axios from 'axios'
import { MENU_DELETE, MENU_LIST, MENU_CREATE, MENU_EDIT, MENU_UPDATE, MENU_LIST_ID } from '../constants/tenantMenuConstant'
import { BASE_URL } from '../../utilities'

export const listMenus = (idTenant) => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/tenantsMenu/${idTenant}/tenant`)
    // console.log(data);
    dispatch({
        type: MENU_LIST,
        payload: data
    })
}
export const listMenusId = (idMenu) => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/tenantsMenu/${idMenu}`)
    dispatch({
        type: MENU_LIST_ID,
        payload: data
    })
}
export const createMenus = (tenant) => async (dispatch) => {
    const { data } = await Axios.post(`${BASE_URL}/api/tenantsMenu/`, tenant)
    dispatch({
        type: MENU_CREATE,
        payload: data
    })
}
export const editMenus = (tenant) => async (dispatch) => {
    dispatch({
        type: MENU_EDIT,
        payload: tenant
    })
}
export const updateMenus = (tenant) => async (dispatch) => {
    const { data } = await Axios.put(`${BASE_URL}/api/tenantsMenu/${tenant._id}`, tenant)
    // console.log(data);
    dispatch({
        type: MENU_UPDATE,
        payload: data
    })
}
export const deleteMenus = (id) => async (dispatch) => {
    await Axios.delete(`${BASE_URL}/api/tenantsMenu/${id}`)
    dispatch({
        type: MENU_DELETE,
    })
}
