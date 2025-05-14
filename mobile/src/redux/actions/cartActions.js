import { CART_ADD_COUNT, CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant"

export const addToCart = (info) => async (dispatch) => {
    // console.log(info);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            table: {
                nomor: info.info.nomorTable,
                idTable: info.info.idTable
            },
            pesanan:
            {
                idMenu: info.info.idSMenuGab,
                namaPesanan: info.info.namaSMenuGab,
                idTenant: info.info.idTenant,
                jumlah: info.info.jumlah,
                hargapcs: info.info.dataHarga,
                harga: info.info.dataHarga * info.info.jumlah
            },
            idOrder: info.info.idOrder
        }
    })
}
export const addCountCart = (info) => async (dispatch) => {
    // console.log(info);
    dispatch({
        type: CART_ADD_COUNT,
        payload: {
            table: {
                nomor: info.info.nomorTable,
                idTable: info.info.idTable
            },
            pesanan:
            {
                idMenu: info.info.idSMenuGab,
                namaPesanan: info.info.namaSMenuGab,
                idTenant: info.info.idTenant,
                jumlah: info.info.jumlah,
                hargapcs: info.info.dataHarga,
                harga: info.info.dataHarga * info.info.jumlah
            },
            idOrder: info.info.idOrder
        }
    })
}

export const removeFromCart = (id) => async (dispatch) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

}