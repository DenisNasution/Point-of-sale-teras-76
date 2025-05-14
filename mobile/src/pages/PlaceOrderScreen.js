import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl, ActivityIndicator, SafeAreaView, BackHandler, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderPaid } from '../redux/actions/orderActions'
import { CART_EMPTY, CART_EMPTY_TAMBAH } from '../redux/constants/cartConstant'
import { ORDER_CREATE_RESET, ORDER_DELETE_RESET, ORDER_PAID_TAMBAH_EMPTY } from '../redux/constants/orderConstants'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const PlaceOrderScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [animating, setAnimating] = useState(true)
    const { loading, order } = useSelector(state => state.orderListPO)
    const { success: successCreate } = useSelector(state => state.orderCreate)
    const { success: successDelete } = useSelector(state => state.orderDelete)

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(listOrderPaid(false))
        if (order) {
            copyTotals
        }
        if (successCreate) {
            dispatch({ type: CART_EMPTY })
            dispatch({ type: ORDER_CREATE_RESET })
            dispatch({ type: ORDER_PAID_TAMBAH_EMPTY })
        }
        if (successDelete) {
            Alert.alert(
                "",
                "Pesanan Berhasil Dibatalkan",
                [
                    {
                        text: "Oke",
                        onDismiss: () => console.log(''),
                        style: "cancel",
                    }
                ],
                {
                    cancelable: false,
                }
            )
            dispatch({ type: ORDER_DELETE_RESET })

        }
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(listOrderPaid(false))
        });
        return unsubscribe;
    }, [dispatch, successCreate, successDelete, navigation])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        dispatch(listOrderPaid(false))
        wait(500).then(() => {
            setRefreshing(false)
        });
    }, []);

    const copyTotals = useMemo(() => {
        setTimeout(() => {
            setAnimating(false)

        }, 1000);
    }, [loading, order])

    return (
        <SafeAreaView style={{ backgroundColor: '#EDEDED', flex: 1 }}>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                style={{ paddingHorizontal: 30, marginTop: 30 }}
            >
                {animating && (
                    <ActivityIndicator size="large" color="#0000ff" animating={animating} ></ActivityIndicator>
                )}
                {order && order.map(ord => (
                    <View style={{ backgroundColor: 'white', padding: 14, borderRadius: 8, marginBottom: 12, boxShadow: `10px 10px` }} key={ord._id} >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Meja: {ord.table && ord.table.nomor}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8 }}>Rp. 250.000</Text>
                            <TouchableOpacity style={{ padding: 4, borderRadius: 6, backgroundColor: '#2196F3', marginRight: 8, width: 83 }} onPress={() => navigation.navigate('Rincian', { orderId: ord._id })}>
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Rincian</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}{order && order.length === 0 && (
                    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Belum Ada Pesanan</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default PlaceOrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

})
