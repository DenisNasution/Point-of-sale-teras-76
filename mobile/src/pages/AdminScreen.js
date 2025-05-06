import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, BackHandler, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux';
import { signout } from '../redux/actions/userAction';
import { USER_SIGN_RESET } from '../redux/constants/userConstant';

const AdminScreen = ({ navigation }) => {
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [])
    const dispatch = useDispatch()

    const signOutHandler = () => {
        dispatch(signout())
        navigation.navigate('Login')
        dispatch({ type: USER_SIGN_RESET })
    }
    return (
        <View style={{ backgroundColor: '#EDEDED', flex: 1 }}>
            <ScrollView style={{ paddingVertical: 20, paddingHorizontal: 10, flex: 1 }}>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('Tenant')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Tenant</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}> {"\u276F"}  </Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 16 }}></View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('Table')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Table</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}> {"\u276F"}  </Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 16 }}></View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('HistTrans')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>History Transaksi</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}> {"\u276F"}  </Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 16 }}></View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('Chart')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Chart</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}> {"\u276F"}  </Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 16 }}></View>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('ChartTenant')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Chart Tenant</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}> {"\u276F"}  </Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 16 }}></View>
                </TouchableOpacity> */}
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('Print')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Koneksi</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}> {"\u276F"}  </Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 16 }}></View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('UserMgmt')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>User</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}> {"\u276F"}  </Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 16 }}></View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('PlaceOrder')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>test</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}> {"\u276F"}  </Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 16 }}></View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={signOutHandler}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Keluar</Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 16 }}></View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default AdminScreen

const styles = StyleSheet.create({})
