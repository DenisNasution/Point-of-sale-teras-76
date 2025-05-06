import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, RefreshControl, TouchableOpacity, View, TextInput, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createTenants, deleteTenants, editTenant, listTenants, updateTenants } from '../redux/actions/tenantActions'
import { TENANT_CREATE_RESET, TENANT_EDITABLE, TENANT_RESET, TENANT_UPDATE_RESET } from '../redux/constants/tenantConstant'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const TenantScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const [tenantName, setTenantName] = useState('')
    const [animating, setAnimating] = useState(true)
    const { loading, tenants } = useSelector(state => state.tenantAdminList)
    const { success: successDelete } = useSelector(state => state.tenantDeleteAdmin)
    const { success: successCreate, tenant: tenantCreate } = useSelector(state => state.tenantCreateAdmin)
    const { success: successUpdate } = useSelector(state => state.tenantUpdateAdmin)
    const { editAble } = useSelector(state => state.tenantEditAdmin)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listTenants())
        if (successDelete) {
            Alert.alert(
                "",
                "Tenant Berhasil Dihapus",
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
            dispatch({ type: TENANT_RESET })

        }
        if (editAble != null) {
            setTenantName(editAble.name)
            setModalVisible(!modalVisible);
        }
        else {
            setTenantName('')
        }
        if (successCreate || successUpdate) {
            dispatch({ type: TENANT_CREATE_RESET })
            dispatch({ type: TENANT_UPDATE_RESET })
            dispatch({ type: TENANT_EDITABLE })
            dispatch(listTenants())
            setModalVisible(!modalVisible);
            setTenantName('')
            Alert.alert(
                "",
                "Tenant Berhasil Disimpan",
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
        if (tenants) {
            spinner
        }
    }, [dispatch, successDelete, successCreate, tenantCreate, editAble, successUpdate])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        wait(100).then(() => {
            dispatch(listTenants())
            setRefreshing(false)
        });
    }, []);

    const spinner = useMemo(() => {
        setTimeout(() => {
            setAnimating(false)

        }, 1000);
    }, [loading, tenants])

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
                { text: "Ya", onPress: () => dispatch(deleteTenants(id)) }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log(id),
            }
        )
    }

    const submitHandler = () => {
        if (editAble !== null) {
            if (tenantName) {
                dispatch(updateTenants({ _id: editAble._id, name: tenantName }))
            }
            else {
                Alert.alert(
                    "Nama Tenanat Belum diisi",
                    "isi dahulu nama tenant",
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
            if (tenantName) {
                dispatch(createTenants({
                    name: tenantName
                }))
            }
            else {
                Alert.alert(
                    "Nama Tenanat Belum diisi",
                    "isi dahulu nama tenant",
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

    const editHandler = (tenant) => {
        dispatch(editTenant(tenant))
    }

    const cancelHandler = () => {
        setTenantName('')
        setModalVisible(!modalVisible)
        dispatch({ type: TENANT_EDITABLE })
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
                        {editAble !== null &&
                            (
                                <Text style={styles.modalText}>Edit Tenant</Text>
                            )
                        }
                        {editAble === null &&
                            (
                                <Text style={styles.modalText}>Tambah Tenant</Text>
                            )
                        }
                        <TextInput
                            style={{
                                height: 40,
                                width: 300,
                                margin: 8,
                                borderWidth: 1,
                            }}
                            placeholder="Masukkan Nama Tenant"
                            onChangeText={(value) => setTenantName(value)}
                            value={tenantName}
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
                            <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 20, marginTop: 5 }}> Daftar Tenant</Text>
                            <View>
                                <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#2196F3' }} onPress={() => setModalVisible(true)}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>+ Tenant</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {tenants.length === 0 ? (
                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Belum Ada Tenant</Text>

                            </View>
                        ) : (
                            <>
                                {tenants && (
                                    <>
                                        {tenants.map(tenant => (
                                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12 }} key={tenant._id}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{tenant.name}</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                                    <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#03498C', marginRight: 8, width: 65 }} onPress={() => navigation.navigate('TenantMenu', { idTenant: tenant._id })}>
                                                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Rincian</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#DDE2EA', marginRight: 8, width: 60 }} onPress={() => editHandler(tenant)}>
                                                        <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Edit</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#DC3545', width: 60 }} onPress={() => deleteHandler(tenant._id)}>
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

export default TenantScreen

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
