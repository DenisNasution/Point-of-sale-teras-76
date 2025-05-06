import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, RefreshControl, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux'
import { createUser, deleteUser, editUser, getUser, updateUser } from '../redux/actions/userAction'
import { USER_CREATE_RESET, USER_DELETE_RESET, USER_EDITABLE, USER_UPDATE_RESET } from '../redux/constants/userConstant'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const UserMgmtScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const [modalVisible1, setModalVisible1] = useState(false)
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [animating, setAnimating] = useState(true)


    const { loading, users } = useSelector(state => state.userListAdmin)
    const { success: successDelete, error: errorDelete } = useSelector(state => state.userDeleteAdmin)
    const { success: successCreate, error: errorCreate } = useSelector(state => state.userCreateAdmin)
    const { success: successUpdate } = useSelector(state => state.userUpdateAdmin)
    const { editAble } = useSelector(state => state.userEditAdmin)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
        if (successDelete) {
            Alert.alert(
                "",
                "User Berhasil Dihapus",
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
            dispatch({
                type: USER_DELETE_RESET
            })
        }
        if (successCreate) {
            dispatch({ type: USER_CREATE_RESET })
            dispatch(getUser())
            setModalVisible(!modalVisible);
            setName('')
            Alert.alert(
                "",
                "User Berhasil Disimpan",
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
        }
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            dispatch({ type: USER_EDITABLE })
            dispatch(getUser())
            setModalVisible1(!modalVisible1);
            setName('')
            setPassword()
            Alert.alert(
                "",
                "User Berhasil Disimpan",
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
        }
        if (editAble != null) {
            setName(editAble.name)
            setIsAdmin(editAble.isAdmin)
            setModalVisible1(!modalVisible1);
        }
        if (users) {
            spinner
        }


    }, [dispatch, successDelete, successCreate, editAble, successUpdate])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        wait(100).then(() => {
            dispatch(getUser())
            setRefreshing(false)
        });
    }, []);

    const spinner = useMemo(() => {
        setTimeout(() => {
            setAnimating(false)

        }, 1000);
    }, [loading, users])
    // console.log(users);

    const deleteHandler = (id) => {
        Alert.alert(
            "Hapus Tenant",
            "Apakah Anda Yakin?",
            [
                {
                    text: "Tidak",
                    onDismiss: () => console.log(id),
                    style: "cancel",
                },
                {
                    text: "Ya", onPress: () => dispatch(deleteUser(id))
                }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log(id),
            }
        )
    }

    const submitHandler = () => {
        if (editAble !== null) {
            if (name) {
                dispatch(updateUser({ _id: editAble._id, name, isAdmin, password }))
            }
            else {
                Alert.alert(
                    "Nama Belum diisi",
                    "isi dahulu nama",
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
            }
        } else {
            if (name) {
                dispatch(createUser({
                    name,
                    isAdmin
                }))
            } else if (!name) {
                Alert.alert(
                    "Nama belum diisi",
                    "isi dahulu nama",
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
            }
        }
    }

    const editHandler = (user) => {
        dispatch(editUser(user))
    }


    const cancelHandler = () => {
        setName('')
        setUserName('')
        setPassword('')
        setModalVisible(!modalVisible)
    }
    const cancelHandler1 = () => {
        setName('')
        setIsAdmin(false)
        setPassword()
        setModalVisible1(!modalVisible1)
    }

    return (
        <View style={{ backgroundColor: '#F9F9F9', flex: 1 }}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Tambah User</Text>
                        <TextInput
                            style={{
                                height: 40,
                                width: 300,
                                margin: 8,
                                borderWidth: 1,
                            }}
                            placeholder="Masukkan Nama"
                            onChangeText={(value) => setName(value)}
                            value={name}
                        />
                        <View style={{ marginLeft: 4, flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox
                                disabled={false}
                                value={isAdmin}
                                onValueChange={(newValue) => setIsAdmin(newValue)}
                            />
                            <Text style={{ fontWeight: 'bold' }}>Cashier</Text>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Pressable
                                style={[styles.button, styles.buttonCancel]}
                                onPress={cancelHandler}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonSimpan]}
                                onPress={submitHandler}
                            >
                                <Text style={styles.textStyle}>Simpan</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible1(!modalVisible1);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Tambah User</Text>
                        <TextInput
                            style={{
                                height: 40,
                                width: 300,
                                margin: 8,
                                borderWidth: 1,
                            }}
                            placeholder="Masukkan Nama"
                            onChangeText={(value) => setName(value)}
                            value={name}
                        />
                        <TextInput
                            style={{
                                height: 40,
                                width: 300,
                                margin: 8,
                                borderWidth: 1,
                            }}
                            placeholder="Masukkan Password"
                            onChangeText={(value) => setPassword(value)}
                            value={password}
                        />
                        <View style={{ marginLeft: 4, flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox
                                disabled={false}
                                value={isAdmin}
                                onValueChange={(newValue) => setIsAdmin(newValue)}
                            />
                            <Text style={{ fontWeight: 'bold' }}>Cashier</Text>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Pressable
                                style={[styles.button, styles.buttonCancel]}
                                onPress={cancelHandler1}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonSimpan]}
                                onPress={submitHandler}
                            >
                                <Text style={styles.textStyle}>Simpan</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            </Modal>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                style={{ padding: 20, flex: 1 }}>
                {animating && (
                    <ActivityIndicator size="large" color="#0000ff" animating={animating} ></ActivityIndicator>
                )}
                {!animating && (
                    <>
                        <View style={{ flexDirection: 'row', marginBottom: 8, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 20, marginTop: 5 }}> Daftar User</Text>
                            <View>
                                <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#2196F3' }} onPress={() => setModalVisible(true)}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>+ User</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {users.length === 0 ? (
                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Belum Ada User</Text>

                            </View>
                        ) : (
                            <>
                                {users && (
                                    <>
                                        {users.map(user => (
                                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12 }} key={user._id}>
                                                <View >
                                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{user.userName}</Text>
                                                        {user.isAdmin && (
                                                            <Text style={{ fontSize: 16, marginLeft: 12 }}>(Cashier)</Text>
                                                        )}


                                                    </View>

                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                                    <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#DDE2EA', marginRight: 8, width: 60 }} onPress={() => editHandler(user)}>
                                                        <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Edit</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#DC3545', width: 60 }} onPress={() => deleteHandler(user._id)}>
                                                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Hapus</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    )
}

export default UserMgmtScreen

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 8,
        padding: 10,
        elevation: 2,
        marginRight: 8,
        marginTop: 10,
        marginBottom: 15,
        width: 100
    },
    buttonSimpan: {
        backgroundColor: "#2196F3",
    },
    buttonCancel: {
        backgroundColor: "#DC3545",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 6,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        marginTop: 20
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
})
