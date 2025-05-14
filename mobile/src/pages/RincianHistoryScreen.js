import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { historyDetailOrderpaid, historyListOrderpaid } from '../redux/actions/orderActions'

const RincianHistoryScreen = ({ route, navigation }) => {
    const { idTenant, mulai, sampai } = route.params
    const [orderan, setOrderan] = useState()
    const [loginData, setLoginData] = useState()
    const [animating, setAnimating] = useState(true)


    const { loading, order } = useSelector(state => state.orderListHis)
    const { order: orderDetail } = useSelector(state => state.orderDetailPaid)
    const dispatch = useDispatch()
    // let orderlagi
    useEffect(() => {
        dispatch(historyDetailOrderpaid({ mulai, sampai, idTenant }))
        dispatch(historyListOrderpaid({ tanggalMulai: mulai, tanggalSampai: sampai }))
        setOrderan(order[0].v.find(x => x.idTenant === idTenant))

        if (order) {
            spinner
        }

    }, [dispatch, idTenant, mulai, sampai])

    const spinner = useMemo(() => {
        setTimeout(() => {
            setAnimating(false)

        }, 1000);
    }, [loading, order])

    console.log(order);
    return (
        <View style={{ backgroundColor: '#EDEDED', flex: 1 }}>
            <View style={{ padding: 20, flex: 1 }}>
                <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 16 }}>
                    {animating && (
                        <ActivityIndicator size="large" color="#0000ff" animating={animating} ></ActivityIndicator>
                    )}
                    {!animating && (
                        <>
                            {orderan && (
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{orderan.name}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }} >Rp. {orderan.total}</Text>
                                </View>
                            )}
                            {orderDetail.length !== 0 && (
                                <>
                                    {
                                        orderDetail[0].v.map((ord, index) => (
                                            <View style={{ marginTop: 10, marginBottom: 10 }} key={ord.idMenu}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{ord.namaPesanan}</Text>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 8 }}>jumlah: {ord.count}</Text>
                                                <View style={{ borderWidth: 1, borderColor: '#cfd4d0', marginTop: 8 }}></View>
                                            </View>
                                        ))
                                    }
                                </>
                            )}
                        </>
                    )}

                </View>
            </View>
        </View>
    )
}

export default RincianHistoryScreen

const styles = StyleSheet.create({})
