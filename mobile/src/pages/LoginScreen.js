import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator, Alert, BackHandler, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../redux/actions/userAction'
import { USER_SIGN_RESET } from '../redux/constants/userConstant';

const LoginScreen = ({ navigation, route }) => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [animating, setAnimating] = useState(false)

    const { error, success } = useSelector(state => state.userSignin)
    const dispatch = useDispatch()
    useEffect(() => {
        setAnimating(false)
        if (success) {
            setAnimating(false)
            navigation.navigate('Splash')
        }
        if (error) {
            Alert.alert(
                "",
                "Username Atau Password Salah",
                [
                    {
                        text: "Oke",
                        onDismiss: () => dispatch({ type: USER_SIGN_RESET }),
                        style: "cancel",
                    }
                ],
                {
                    cancelable: false,
                }
            )
            dispatch({ type: USER_SIGN_RESET })
            setAnimating(false)

        }
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [error, route.params, dispatch, success])


    const loginHandler = () => {
        dispatch(signin(userName, password))
        setUserName("")
        setPassword("")
        setAnimating(true)
    }


    return (
        <View style={{ backgroundColor: '#6DC3BF', flex: 1 }}>
            <View style={{ paddingVertical: 20, paddingHorizontal: 10, flex: 1, justifyContent: 'center' }} >
                {animating && (
                    <ActivityIndicator size="large" color="#0000ff" animating={animating} ></ActivityIndicator>
                )}
                {!animating && (
                    <>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../assets/Teras76.png')} style={{ height: 100, width: 100, borderRadius: 7 }}></Image>
                            <Text style={{ fontSize: 30, color: '#19547b', textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }} >TERAS 76</Text>
                        </View>
                        <TextInput
                            style={{
                                borderWidth: 2,
                                borderColor: '#0A1D37',
                                marginBottom: 12,
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                color: "#293B5F"
                            }}
                            placeholder="Username"
                            placeholderTextColor="#293B5F"
                            onChangeText={(value) => setUserName(value)}
                            value={userName}>

                        </TextInput>
                        <TextInput
                            style={{
                                borderWidth: 2,
                                borderColor: '#0A1D37',
                                marginBottom: 12,
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                color: "#293B5F"
                            }}
                            placeholder="Password"
                            placeholderTextColor="#293B5F"
                            secureTextEntry={true}
                            onChangeText={(value) => setPassword(value)}
                            value={password}>
                        </TextInput>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#2196F3',
                                alignItems: 'center',
                                paddingVertical: 8,
                                borderRadius: 8
                            }}
                            onPress={loginHandler}
                        >
                            <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Login</Text>
                        </TouchableOpacity>
                    </>
                )}


            </View>

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
