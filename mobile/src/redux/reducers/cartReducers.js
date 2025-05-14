import { CART_ADD_COUNT, CART_ADD_ITEM, CART_EMPTY, CART_EMPTY_TAMBAH, CART_REMOVE_ITEM } from "../constants/cartConstant";

export const cartReducer = (state = { table: {}, cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const pesanan = action.payload.pesanan
            const table = action.payload.table
            const idOrder = action.payload.idOrder
            const existTable = table.idTable === state.table.idTable
            const existItem = state.cartItems.find(x => x.idMenu === pesanan.idMenu)
            if (existTable) {
                if (existItem) {
                    return {
                        ...state,
                        cartItems: state.cartItems.map(x => x.idMenu === existItem.idMenu ? (
                            pesanan1 = {
                                idMenu: pesanan.idMenu,
                                namaPesanan: pesanan.namaPesanan,
                                idTenant: pesanan.idTenant,
                                jumlah: String(parseInt(pesanan.jumlah) + parseInt(x.jumlah)),
                                hargapcs: pesanan.hargapcs,
                                harga: pesanan.harga + x.harga
                            }

                        ) : x)
                    }
                } else {
                    return {
                        ...state,
                        cartItems: [...state.cartItems, pesanan]
                    }
                }

            } else {
                return {
                    ...state,
                    table,
                    idOrder,
                    cartItems: [...state.cartItems, pesanan]
                }
            }
        case CART_ADD_COUNT:
            const pesananAdd = action.payload.pesanan
            const existItemAdd = state.cartItems.find(x => x.idMenu === pesananAdd.idMenu)
            if (existItemAdd) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.idMenu === existItemAdd.idMenu ? pesananAdd : x)
                }
            }


        case CART_REMOVE_ITEM:
            return {
                ...state, cartItems: state.cartItems.filter(x => x.idMenu !== action.payload)
            }
        case CART_EMPTY:
            return {
                ...state, table: {}, cartItems: [], idOrder: "", totalPrice: 0
            }
        case CART_EMPTY_TAMBAH:
            return { table: {}, cartItems: [] }
        default:
            return state;
    }
}