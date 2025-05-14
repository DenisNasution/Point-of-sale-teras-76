import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { detailOrderpaidCurrent, listOrderpaidCurrent } from '../redux/actions/orderActions';

const TransactionDetailScreen = ({ route }) => {
    const { idTenant } = route.params

    const [date1, setDate1] = useState("")

    const { order } = useSelector(state => state.orderListPaid)
    const { order: orderDetail } = useSelector(state => state.orderDetailPaid)

    const dispatch = useDispatch()
    useEffect(() => {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei',
            'Juni', 'Juli', 'Agustus', 'September',
            'Oktober', 'November', 'Desember'
        ];
        const getDate1 = () => {
            var today = new Date(),
                date = today.getDate() + ' ' + months[today.getMonth()] + ' ' + today.getFullYear();
            setDate1({
                date
            });
        }
        getDate1()
        dispatch(detailOrderpaidCurrent(idTenant))
        dispatch(listOrderpaidCurrent())
    }, [dispatch, idTenant])

    let orderLagi
    if (order) {
        orderLagi = order.find(x => x._id === idTenant)
    }
    return (
        <View style={{ backgroundColor: '#F9F9F9', flex: 1 }}>
            <View style={{ padding: 20, flex: 1 }}>
                <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 16 }}>
                    {orderLagi && (
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{orderLagi.name}</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }} >Rp. {orderLagi.total}</Text>
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
                </View>
            </View>
        </View>
    )
}

export default TransactionDetailScreen

const styles = StyleSheet.create({})
