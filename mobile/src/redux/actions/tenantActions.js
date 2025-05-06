import Axios from 'axios'
import { TENANT_DELETE, TENANT_LIST, TENANT_CREATE, TENANT_EDIT, TENANT_UPDATE, TENANT_LIST_ID } from '../constants/tenantConstant'
import { BASE_URL } from '../../utilities'

export const listTenants = () => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/tenants`)
    dispatch({
        type: TENANT_LIST,
        payload: data
    })
}
export const listTenantsId = (idTenant) => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/tenants/${idTenant}`)
    dispatch({
        type: TENANT_LIST_ID,
        payload: data
    })
}
export const createTenants = (tenant) => async (dispatch) => {
    // console.log(tenant);
    const { data } = await Axios.post(`${BASE_URL}/api/tenants/`, tenant)
    console.log(data);
    dispatch({
        type: TENANT_CREATE,
        payload: data
    })
}
export const editTenant = (tenant) => async (dispatch) => {
    dispatch({
        type: TENANT_EDIT,
        payload: tenant
    })
}
export const updateTenants = (tenant) => async (dispatch) => {
    const { data } = await Axios.put(`${BASE_URL}/api/tenants/${tenant._id}`, tenant)
    // console.log(data);
    dispatch({
        type: TENANT_UPDATE,
        payload: data
    })
}
export const deleteTenants = (id) => async (dispatch) => {
    await Axios.delete(`${BASE_URL}/api/tenants/${id}`)
    // console.log("mantap", id);
    dispatch({
        type: TENANT_DELETE,
    })
}
