import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Modal, ScrollView, StyleSheet, Text, View, TextInput, RefreshControl, Pressable, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { listTenantsId } from '../redux/actions/tenantActions'
import { createMenus, deleteMenus, editMenus, listMenus, updateMenus } from '../redux/actions/tenantMenuActions'
import { MENU_CREATE_RESET, MENU_EDITABLE, MENU_RESET, MENU_UPDATE_RESET } from '../redux/constants/tenantMenuConstant'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const TenantMenuScreen = ({ route, navigation }) => {
    const { idTenant } = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [menuName, setMenuName] = useState('')
    const [refreshing, setRefreshing] = React.useState(false);
    const [menuHarga, setMenuHarga] = useState()
    const [animating, setAnimating] = useState(true)

    const { tenant } = useSelector(state => state.tenantListId)
    const { loading, menus } = useSelector(state => state.menuListAdmin)
    const { success: successDelete } = useSelector(state => state.menuDeleteAdmin)
    const { success: successCreate, menu: menuCreate } = useSelector(state => state.menuCreateAdmin)
    const { success: successUpdate } = useSelector(state => state.menuUpdateAdmin)
    const { editAble } = useSelector(state => state.menuEditAdmin)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listTenantsId(idTenant))
        dispatch(listMenus(idTenant))
        if (successDelete) {
            Alert.alert(
                "",
                "Menu Berhasil Dihapus",
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
            dispatch({ type: MENU_RESET })
        }
        if (editAble != null) {
            setMenuName(editAble.nama)
            setMenuHarga(editAble.harga.toString())
            setModalVisible(!modalVisible);
        }
        else {
            setMenuName('')
            setMenuHarga()
        }
        if (successCreate || successUpdate) {
            dispatch({ type: MENU_CREATE_RESET })
            dispatch({ type: MENU_UPDATE_RESET })
            dispatch({ type: MENU_EDITABLE })
            dispatch(listMenus(idTenant))
            dispatch(listTenantsId(idTenant))
            setModalVisible(!modalVisible);
            setMenuName('')
            setMenuHarga()
            Alert.alert(
                "",
                "Menu Berhasil Disimpan",
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
        if (menus) {
            spinner
        }

    }, [dispatch, idTenant, successDelete, successCreate, menuCreate, editAble, successUpdate])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        wait(100).then(() => {
            dispatch(listTenantsId(idTenant))
            dispatch(listMenus(idTenant))
            setRefreshing(false)
        });
    }, []);


    const spinner = useMemo(() => {
        setTimeout(() => {
            setAnimating(false)

        }, 1500);
    }, [loading, menus])

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
                { text: "Ya", onPress: () => dispatch(deleteMenus(id)) }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log(id),
            }
        )
    }

    const submitHandler = () => {
        if (editAble !== null) {
            if (menuName && menuHarga) {
                dispatch(updateMenus({ _id: editAble._id, nama: menuName, harga: parseInt(menuHarga), idTenant }))
            } else if (!menuName) {
                Alert.alert(
                    "Nama Menu belum diisi",
                    "isi dahulu nama menu",
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
            } else if (!menuHarga) {
                Alert.alert(
                    "Harga belum diisi",
                    "isi dahulu harga",
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
            if (menuName && menuHarga) {
                dispatch(createMenus({
                    nama: menuName,
                    harga: menuHarga,
                    idTenant
                }))
            } else if (!menuName) {
                Alert.alert(
                    "Nama Menu belum diisi",
                    "isi dahulu nama menu",
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
            } else if (!menuHarga) {
                Alert.alert(
                    "Harga belum diisi",
                    "isi dahulu harga",
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

    const editHandler = (menu) => {
        dispatch(editMenus(menu))
    }

    const cancelHandler = () => {
        setMenuName('')
        setMenuHarga()
        setModalVisible(!modalVisible)
        dispatch({ type: MENU_EDITABLE })

    }
    return (
        <View style={{ backgroundColor: '#F9F9F9', flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {editAble !== null &&
                            (
                                <Text style={styles.modalText}>Edit Menu</Text>
                            )
                        }
                        {editAble === null &&
                            (
                                <Text style={styles.modalText}>Tambah Menu</Text>
                            )
                        }
                        <TextInput
                            style={{
                                height: 40,
                                width: 300,
                                margin: 8,
                                borderWidth: 1,
                            }}
                            placeholder="Masukkan Nama Menu"
                            onChangeText={(value) => setMenuName(value)}
                            value={menuName}
                        />
                        <TextInput
                            style={{
                                height: 40,
                                width: 300,
                                margin: 8,
                                borderWidth: 1,
                            }}
                            placeholder="Masukkan Harga Menu"
                            keyboardType="numeric"
                            onChangeText={(value) => setMenuHarga(value)}
                            value={menuHarga}
                        />
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
                            <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 18, marginTop: 5 }}> {tenant && tenant.name}</Text>
                            <View>
                                <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#2196F3' }} onPress={() => setModalVisible(true)}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>+ Menu</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {menus.length !== 0 ? (
                            <>
                                {menus && (
                                    <>
                                        {menus.map(menu => (
                                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12 }} key={menu._id}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{menu.nama}</Text>
                                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Rp. {menu.harga}</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                                    <TouchableOpacity style={{ padding: 6, borderRadius: 6, backgroundColor: '#03498C', marginRight: 8, width: 65 }} onPress={() => navigation.navigate('MenuSubMenu', { idMenu: menu._id, idTenant: menu.idTenant })}>
                                                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Rincian</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ padding: 6, borderRadius: 6, backgroundColor: '#DDE2EA', marginRight: 8, width: 60 }} onPress={() => (editHandler(menu))}>
                                                        <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Edit</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ padding: 6, borderRadius: 6, backgroundColor: '#DC3545', width: 60 }} onPress={() => (deleteHandler(menu._id))}>
                                                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Hapus</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))}
                                    </>
                                )}
                            </>
                        ) : (
                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Belum Ada Menu</Text>

                            </View>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    )
}

export default TenantMenuScreen

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
    }
})
