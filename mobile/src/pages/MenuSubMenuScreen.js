import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, View, RefreshControl, TextInput, Modal, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { createSubMenus, deleteSubMenus, editSubMenus, listSubMenus, updateSubMenus } from '../redux/actions/menuSubMenuAction'
import { listMenusId } from '../redux/actions/tenantMenuActions'
import { MENU_SUBMENU_CREATE_RESET, MENU_SUBMENU_DELETE, MENU_SUBMENU_EDITABLE, MENU_SUBMENU_RESET, MENU_SUBMENU_UPDATE_RESET } from '../redux/constants/menuSubMenuConstant'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const MenuSubMenuScreen = ({ route, navigation }) => {
    const { idMenu, idTenant } = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const [subMenuName, setSubMenuName] = useState('')
    const [subMenuHarga, setSubMenuHarga] = useState()
    const [animating, setAnimating] = useState(true)
    const { menu } = useSelector(state => state.menuListIdAdmin)
    const { loading, subMenus } = useSelector(state => state.subMenuListAdmin)
    const { success: successDelete } = useSelector(state => state.subMenuDeleteAdmin)
    const { success: successCreate, subMenu: subMenuCreate } = useSelector(state => state.subMenuCreateAdmin)
    const { success: successUpdate } = useSelector(state => state.subMenuUpdateAdmin)
    const { editAble } = useSelector(state => state.subMenuEditAdmin)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listMenusId(idMenu))
        dispatch(listSubMenus(idMenu))
        if (successDelete) {
            Alert.alert(
                "",
                "SubMenu Berhasil Dihapus",
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
            dispatch({ type: MENU_SUBMENU_RESET })
        }
        if (editAble !== null) {
            setSubMenuName(editAble.nama)
            setSubMenuHarga(editAble.harga.toString())
            setModalVisible(!modalVisible);
        }
        else {
            setSubMenuName('')
            setSubMenuHarga()
        }
        if (successCreate || successUpdate) {
            dispatch({ type: MENU_SUBMENU_CREATE_RESET })
            dispatch({ type: MENU_SUBMENU_UPDATE_RESET })
            dispatch({ type: MENU_SUBMENU_EDITABLE })
            dispatch(listMenusId(idMenu))
            dispatch(listSubMenus(idMenu))
            setModalVisible(!modalVisible);
            setSubMenuName('')
            setSubMenuHarga()
            Alert.alert(
                "",
                "SubMenu Berhasil Disimpan",
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
        if (subMenus) {
            spinner
        }
    }, [dispatch, idMenu, , successDelete, idMenu, successCreate, subMenuCreate, successUpdate, editAble])



    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        wait(100).then(() => {
            dispatch(listMenusId(idMenu))
            dispatch(listSubMenus(idMenu))
            setRefreshing(false)
        });
    }, []);


    const spinner = useMemo(() => {
        setTimeout(() => {
            setAnimating(false)

        }, 500);
    }, [loading, subMenus])

    const deleteHandler = (id) => {
        // console.log('id: ', id);
        Alert.alert(
            "Hapus Tenant",
            "Apakah Anda Yakin?",
            [
                {
                    text: "Tidak",
                    onDismiss: () => console.log(id),
                    style: "cancel",
                },
                { text: "Ya", onPress: () => dispatch(deleteSubMenus(id)) }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log(id),
            }
        )
    }

    const editHandler = (menu) => {
        dispatch(editSubMenus(menu))
    }

    const submitHandler = () => {
        if (editAble !== null) {
            if (subMenuName && subMenuHarga) {
                dispatch(updateSubMenus({ _id: editAble._id, nama: subMenuName, harga: parseInt(subMenuHarga), idMenu, idTenant }))
            } else if (!subMenuName) {
                Alert.alert(
                    "Nama SubMenu belum diisi",
                    "isi dahulu nama subMenu",
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
            } else if (!subMenuHarga) {
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
        else {
            if (subMenuName && subMenuHarga) {
                dispatch(createSubMenus({
                    nama: subMenuName,
                    harga: subMenuHarga,
                    idMenu,
                    idTenant
                }))
            } else if (!subMenuName) {
                Alert.alert(
                    "Nama SubMenu belum diisi",
                    "isi dahulu nama subMenu",
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
            } else if (!subMenuHarga) {
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

    const cancelHandler = () => {
        setSubMenuName('')
        setSubMenuHarga()
        setModalVisible(!modalVisible)
        dispatch({ type: MENU_SUBMENU_EDITABLE })
    }
    return (
        <View style={{ backgroundColor: '#EDEDED', flex: 1 }}>
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
                                <Text style={styles.modalText}>Edit SubMenu</Text>
                            )
                        }
                        {editAble === null &&
                            (
                                <Text style={styles.modalText}>Tambah SubMenu</Text>
                            )
                        }
                        <TextInput
                            style={{
                                height: 40,
                                width: 300,
                                margin: 8,
                                borderWidth: 1,
                            }}
                            placeholder="Masukkan Nama SubMenu"
                            onChangeText={(value) => setSubMenuName(value)}
                            value={subMenuName}
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
                            onChangeText={(value) => setSubMenuHarga(value)}
                            value={subMenuHarga}
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
                <View style={{ flexDirection: 'row', marginBottom: 8, justifyContent: 'space-between' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 18, marginTop: 5 }}> {menu && menu.nama}</Text>
                    <View>
                        <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#2196F3' }} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>+ SUbMenu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {animating && (
                    <ActivityIndicator size="large" color="#0000ff" animating={animating} ></ActivityIndicator>
                )}

                {subMenus.length !== 0 ? (
                    <>
                        {subMenus && (
                            <>
                                {subMenus.map(subMenu => (
                                    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12 }} key={subMenu._id}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{subMenu.nama}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 4 }}>Rp. {subMenu.harga}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity style={{ padding: 4, borderRadius: 6, backgroundColor: '#DDE2EA', marginRight: 8, width: 60 }} onPress={() => editHandler(subMenu)}>
                                                    <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Edit</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ padding: 4, borderRadius: 6, backgroundColor: '#DC3545', width: 60 }} onPress={() => deleteHandler(subMenu._id)}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Hapus</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </>
                        )}
                    </>
                ) : (
                    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Belum Ada SubMenu</Text>
                    </View>
                )}
            </ScrollView>

        </View>
    )
}

export default MenuSubMenuScreen

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
        // alignItems: "center",
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
        marginBottom: 50,
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
