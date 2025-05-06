import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl, ActivityIndicator, SafeAreaView, BackHandler } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { listOrderpaidTableCurrent } from '../redux/actions/orderActions'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

const TransactionMeja = ({ navigation }) => {
    const [loginData, setLoginData] = useState()
    const [refreshing, setRefreshing] = React.useState(false);
    const [animating, setAnimating] = useState(true)
    const { loading, orders } = useSelector(state => state.orderListPaidTable)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listOrderpaidTableCurrent())

        if (orders) {
            spinner
        }

        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [dispatch,])

    const spinner = useMemo(() => {
        setTimeout(() => {
            setAnimating(false)

        }, 1000);
    }, [loading, orders])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        wait(100).then(() => {
            dispatch(listOrderpaidTableCurrent())
            setRefreshing(false)
        });
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: '#F9F9F9', flex: 1 }}>

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
                {!animating && (
                    <>
                        {orders ? (
                            <>
                                {orders && orders.map(ord => (
                                    <View style={{ backgroundColor: 'white', padding: 14, borderRadius: 8, marginBottom: 12 }} key={ord._id} >
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Meja: {ord.table && ord.table.nomor}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8 }}>Rp. 250.000</Text>
                                            <TouchableOpacity style={{ padding: 4, borderRadius: 6, backgroundColor: '#2196F3', marginRight: 8, width: 83 }} onPress={() => navigation.navigate('Rincian', { orderId: ord._id })}>
                                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Rincian</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </>

                        ) : (
                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Belum Ada Pesanan</Text>

                            </View>
                        )}

                    </>
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

export default TransactionMeja

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

})
