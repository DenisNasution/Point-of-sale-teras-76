import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useSelector } from 'react-redux'

const SplashScreen = ({ navigation }) => {
    const { userInfo } = useSelector(state => state.userSignin)
    useEffect(() => {
        setTimeout(() => {
            const validationSession = async () => {
                if (userInfo) {
                    navigation.navigate('Order')
                } else {
                    navigation.navigate('Login')
                }
            }
            validationSession()
        }, 2000);

    }, [userInfo])
    return (
        <View style={{ backgroundColor: '#5F939A', flex: 1 }}>
            <View style={{ paddingVertical: 20, paddingHorizontal: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Image source={require('../assets/Teras76.png')} style={{ height: 150, width: 150, borderRadius: 7 }}></Image>
            </View>

        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})
