import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl, SafeAreaView, BackHandler, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderpaidCurrent } from '../redux/actions/orderActions'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const TransactionTenant = ({ navigation }) => {
    const [date1, setDate1] = useState("")
    const [refreshing, setRefreshing] = React.useState(false);
    const [animating, setAnimating] = useState(true)

    const { loading, order } = useSelector(state => state.orderListPaid)

    const dispatch = useDispatch()

    console.log(order);
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
        dispatch(listOrderpaidCurrent())
        if (order) {
            spinner
        }

        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [dispatch])


    const spinner = useMemo(() => {
        setTimeout(() => {
            setAnimating(false)
        }, 1000);
    }, [loading, order])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        wait(1000).then(() => {
            dispatch(listOrderpaidCurrent(false))
            setRefreshing(false)
        });
    }, []);
    return (
        <SafeAreaView style={{ backgroundColor: '#F9F9F9', flex: 1 }}>
            <ScrollView
                style={{ paddingHorizontal: 20, marginTop: 20, flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {animating && (
                    <ActivityIndicator size="large" color="#0000ff" animating={animating} ></ActivityIndicator>
                )}
                {!animating && (
                    <>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 8, marginBottom: 12 }}>
                            <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: 'bold' }}>{date1.date}</Text>
                        </View>

                        {order.length === 0 ? (
                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Belum Ada Transaksi</Text>

                            </View>
                        ) : (
                            <>
                                {order && order.map(
                                    ord => (
                                        <View style={{ backgroundColor: 'white', padding: 14, borderRadius: 8, marginBottom: 12 }} key={ord._id} >
                                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{ord.name}</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8 }}>Rp. {ord.total}</Text>
                                                <TouchableOpacity style={{ padding: 4, borderRadius: 6, backgroundColor: '#2196F3', marginRight: 8, width: 83 }} onPress={() => navigation.navigate('TransactionDetail', { idTenant: ord._id })}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Rincian</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                )}</>
                        )}


                    </>
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

export default TransactionTenant

const styles = StyleSheet.create({})
