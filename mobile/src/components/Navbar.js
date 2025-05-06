import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { MenuIcon, ShopingCart, Order, Admin, User, Transaction } from '../assets/icons'

const Navbar = ({ navigation, loginData }) => {
    const signOutHandler = () => {
        AsyncStorage.removeItem('userInf')
        navigation.navigate('Login')
    }
    return (
        <View style={{ height: 54, backgroundColor: '#CDF0EA', flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 10 }} contentContainerStyle={styles.wrapper} >
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('Order')}>
                <MenuIcon width={25} height={25} ></MenuIcon>
                <Text>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('Cart')}>
                <ShopingCart width={25} height={25}></ShopingCart>
                <Text>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('PlaceOrder')}>
                <Order width={25} height={25}></Order>
                <Text >Order</Text>
            </TouchableOpacity>
            {loginData && !loginData.isAdmin && (
                <>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={signOutHandler}>
                        <View style={{ height: 25, width: 25, borderWidth: 1, borderRadius: 8 }}></View>
                        <Text >Keluar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('User')}>
                        <User width={25} height={25}></User>
                        <Text >Profile</Text>
                    </TouchableOpacity>
                </>
            )}

            {loginData && loginData.isAdmin && (
                <>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('Transaction')}>
                        <Transaction width={25} height={25}></Transaction>
                        <Text >Trans</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('Admin')}>
                        <Admin width={25} height={25}></Admin>
                        <Text>Admin</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('ChartWhole')}>
                        <View style={{ height: 25, width: 25, borderWidth: 1, borderRadius: 8 }}></View>
                        <Text>Chart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('ChartTenant')}>
                        <View style={{ height: 25, width: 25, borderWidth: 1, borderRadius: 8 }}></View>
                        <Text>ChartTenant</Text>
                    </TouchableOpacity> */}
                </>
            )}


        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'space-between',
        alignContent: 'space-between'
    }
})
