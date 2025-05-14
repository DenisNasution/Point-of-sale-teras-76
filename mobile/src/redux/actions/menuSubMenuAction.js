import Axios from 'axios'
import { MENU_SUBMENU_DELETE, MENU_SUBMENU_LIST, MENU_SUBMENU_CREATE, MENU_SUBMENU_EDIT, MENU_SUBMENU_UPDATE } from '../constants/menuSubMenuConstant'
import { BASE_URL } from '../../utilities'

export const listSubMenus = (idmenu) => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/menuSubMenu/${idmenu}/menu`)
    // console.log("data: ", data);
    dispatch({
        type: MENU_SUBMENU_LIST,
        payload: data
    })
}
export const createSubMenus = (menu) => async (dispatch) => {
    const { data } = await Axios.post(`${BASE_URL}/api/menuSubMenu/`, menu)
    dispatch({
        type: MENU_SUBMENU_CREATE,
        payload: data
    })
}
export const editSubMenus = (menu) => async (dispatch) => {
    dispatch({
        type: MENU_SUBMENU_EDIT,
        payload: menu
    })
}
export const updateSubMenus = (menu) => async (dispatch) => {
    const { data } = await Axios.put(`${BASE_URL}/api/menuSubMenu/${menu._id}`, menu)
    // console.log(data);
    dispatch({
        type: MENU_SUBMENU_UPDATE,
        payload: data
    })
}
export const deleteSubMenus = (id) => async (dispatch) => {
    // console.log("Ini id: ", id);
    await Axios.delete(`${BASE_URL}/api/menuSubMenu/${id}`)
    // console.log(data);
    dispatch({
        type: MENU_SUBMENU_DELETE,
    })
}
