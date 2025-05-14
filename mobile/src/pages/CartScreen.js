import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react'
import { BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { addCountCart, addToCart, removeFromCart } from '../redux/actions/cartActions';
import { addOrder, createOrder } from '../redux/actions/orderActions';
import { updateStatusTable } from '../redux/actions/tableActions';
import { CART_EMPTY, CART_EMPTY_TAMBAH } from '../redux/constants/cartConstant';
import { ORDER_PAID_EMPTY, ORDER_PAID_TAMBAH_EMPTY } from '../redux/constants/orderConstants';

const CartScreen = ({ route, navigation }) => {
    const cart = useSelector(state => state.cart)
    const { table, cartItems } = cart
    const dispatch = useDispatch()

    console.log(cartItems);



    useEffect(() => {
        dispatch(addToCart(route.params))
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [dispatch, route.params])
    cart.totalPrice = cart.cartItems && cart.cartItems.reduce((a, c) => a + c.harga, 0)

    const jumlahHandler = (info1) => {
        dispatch(addCountCart({ info: info1 }))
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const pesanHandler = () => {
        if (cart.idOrder) {
            dispatch(addOrder({
                idOrder: cart.idOrder,
                cartItems,
            }))
            dispatch({
                type: CART_EMPTY
            })

        }
        else {
            // cart.table.inUse = true
            cart.status = false
            dispatch(createOrder({
                orderItems: cart.cartItems,
                table: cart.table,
                status: cart.status,
                totalPrice: cart.totalPrice
            }))
            dispatch({
                type: CART_EMPTY
            })
        }
        dispatch(updateStatusTable({ idTable: cart.table && cart.table.idTable, status: true }))
        navigation.navigate('PlaceOrder')
    }

    const batalHandler = () => {
        dispatch(updateStatusTable({ idTable: cart.table && cart.table.idTable, status: true }))
        dispatch({ type: CART_EMPTY_TAMBAH })
        dispatch({ type: ORDER_PAID_TAMBAH_EMPTY })
        navigation.navigate('Order')
    }
    // console.log(loginData);
    return (
        <View style={{ backgroundColor: '#EDEDED', flex: 1 }}>
            <View style={{ padding: 10, borderRadius: 8, flex: 1 }}>

                {cartItems.length === 0 ? (
                    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Belum Ada Pesanan</Text>

                    </View>
                ) : (
                    <>
                        <Text style={{ fontSize: 31, fontWeight: "bold" }}>Pesanan Meja: {table.nomor}</Text>
                        {cartItems.map((item, index) => (
                            <View style={{ marginTop: 16, }} key={index}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.namaPesanan}</Text>
                                <View style={{ flexDirection: 'row' }} >
                                    <View style={{ borderWidth: 1, marginTop: 5, borderRadius: 10, flex: 1, width: 40 }}>
                                        <Picker
                                            selectedValue={item.jumlah}
                                            onValueChange={(itemValue) =>
                                                jumlahHandler({ idSMenuGab: item.idMenu, idTable: cart.table && cart.table.idTable, namaSMenuGab: item.namaPesanan, idTenant: item.idTenant, jumlah: itemValue, dataHarga: item.hargapcs })
                                            }
                                            style={{ height: 40 }}>
                                            <Picker.Item label="--Jumlah--" />
                                            <Picker.Item label="1" value="1" />
                                            <Picker.Item label="2" value="2" />
                                            <Picker.Item label="3" value="3" />
                                            <Picker.Item label="4" value="4" />
                                            <Picker.Item label="5" value="5" />
                                            <Picker.Item label="6" value="6" />
                                            <Picker.Item label="7" value="7" />
                                            <Picker.Item label="11" value="11" />
                                        </Picker>
                                    </View>
                                    <View style={{ width: 52, alignItems: 'center', justifyContent: 'center', marginLeft: 4 }}>
                                        <TouchableOpacity onPress={() => removeFromCartHandler(item.idMenu)}>
                                            <Image style={{ width: 38, height: 38, alignItems: 'center' }}
                                                source={require('../assets/icons/remove.png')}
                                            >
                                            </Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>)
                        )}
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={{ backgroundColor: '#36A7E8', paddingVertical: 8, alignItems: 'center', borderRadius: 15, }} onPress={pesanHandler}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', textTransform: 'uppercase' }}>Pesan</Text>
                            </TouchableOpacity>
                            {cart && cart.idOrder && (
                                <TouchableOpacity style={{ marginTop: 15, backgroundColor: '#DC3545', paddingVertical: 8, alignItems: 'center', borderRadius: 15, }} onPress={batalHandler}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', textTransform: 'uppercase' }}>Batal Tambah Pesanan</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </>
                )}
            </View>
        </View >
    )
}

export default CartScreen

const styles = StyleSheet.create({})
