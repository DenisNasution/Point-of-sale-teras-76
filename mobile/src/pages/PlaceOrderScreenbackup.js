import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl, ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { cancelOrder, listOrderPaid, StatusOrder } from '../redux/actions/orderActions'
import { ORDER_CREATE_RESET, ORDER_DELETE, ORDER_DELETE_RESET, ORDER_PAID_RESET, ORDER_RESET } from '../redux/constants/orderConstants'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

const PlaceOrderScreen = ({ navigation }) => {
    const [loginData, setLoginData] = useState()
    const [refreshing, setRefreshing] = React.useState(false);
    const { loading, order } = useSelector(state => state.orderListPO)
    const { success: successCreate } = useSelector(state => state.orderCreate)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listOrderPaid(false))
        if (successCreate) {
            dispatch({ type: ORDER_CREATE_RESET })
        }
        const isLogin = async () => {
            const getLogin = await AsyncStorage.getItem('userInf')
            setLoginData(JSON.parse(getLogin))
        }
        isLogin()
    }, [dispatch, successCreate])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        wait(100).then(() => {
            dispatch(listOrderPaid(false))
            setRefreshing(false)
        });
    }, []);

    const renderItemComponent = (ord) => {
        return (
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Rincian', { orderId: ord.item._id })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 8 }} >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 4 }}>Meja: {ord.item.table.nomor}</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Rp. 1.200.000</Text>
                    </View>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginTop: 10 }}> {"\u276F"}  </Text>
                </View>
            </TouchableOpacity>)

    }

    const ItemSeparator = () => (
        <View style={{
            height: 2,
            backgroundColor: "rgba(0,0,0,0.5)",
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
        }}
        />)


    return (
        <View style={{ backgroundColor: '#6DC3BF', flex: 1 }}>
            <SafeAreaView style={{ padding: 12, flex: 1 }}>
                {order ? (
                    <View style={{ padding: 6, paddingTop: 10, paddingBottom: 12, backgroundColor: 'white', borderRadius: 8, flex: 1 }}>
                        <FlatList
                            data={order}
                            renderItem={item => renderItemComponent(item)}
                            keyExtractor={item => item._id}
                            ItemSeparatorComponent={ItemSeparator}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    </View>
                ) : (
                    <View style={{ backgroundColor: '#f5eded', padding: 16, borderRadius: 8, marginBottom: 12 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Belum Ada Pesanan</Text>

                    </View>
                )}
            </SafeAreaView>
            <Navbar navigation={navigation} loginData={loginData}></Navbar>
        </View>
    )
}

export default PlaceOrderScreen

const styles = StyleSheet.create({
    container: {
        height: 50,
        margin: 6,
        backgroundColor: '#FFF',
        borderRadius: 6,
    },
})
