import Axios from 'axios'
import { TABLE_DELETE, TABLE_LIST, TABLE_CREATE, TABLE_EDIT, TABLE_UPDATE, TABLE_LIST_ID, TABLE_LIST_READY, TABLE_STATUS } from '../constants/tableConstants'
import { BASE_URL } from '../../utilities'

export const listTable = () => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/table`)
    dispatch({
        type: TABLE_LIST,
        payload: data
    })
}
export const listTableReady = () => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/table/ready`)
    dispatch({
        type: TABLE_LIST_READY,
        payload: data
    })
}
export const listTableId = (idTable) => async (dispatch) => {
    const { data } = await Axios.get(`${BASE_URL}/api/table/${idTable}`)
    dispatch({
        type: TABLE_LIST_ID,
        payload: data
    })
}
export const createTable = (table) => async (dispatch) => {
    // console.log(table);
    const { data } = await Axios.post(`${BASE_URL}/api/table/`, table)
    console.log(data);
    dispatch({
        type: TABLE_CREATE,
        payload: data
    })
}
export const editTable = (table) => async (dispatch) => {
    dispatch({
        type: TABLE_EDIT,
        payload: table
    })
}
export const updateTable = (table) => async (dispatch) => {
    const { data } = await Axios.put(`${BASE_URL}/api/table/${table._id}`, table)
    // console.log(data);
    dispatch({
        type: TABLE_UPDATE,
        payload: data
    })
}

export const updateStatusTable = (table) => async (dispatch) => {
    const { data } = await Axios.put(`${BASE_URL}/api/table/${table.idTable}/ready/${table.status}`)
    // console.log(data);
    dispatch({
        type: TABLE_STATUS,
        payload: data
    })
}
export const deleteTable = (id) => async (dispatch) => {
    await Axios.delete(`${BASE_URL}/api/table/${id}`)
    // console.log("mantap", id);
    dispatch({
        type: TABLE_DELETE,
    })
}
