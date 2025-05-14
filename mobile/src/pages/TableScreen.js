import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, RefreshControl, View, TextInput, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createTable, deleteTable, editTable, listTable, updateTable } from '../redux/actions/tableActions'
import { TABLE_CREATE_RESET, TABLE_EDITABLE, TABLE_RESET, TABLE_UPDATE_RESET } from '../redux/constants/tableConstants'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const TableScreen = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const [tableNum, setTableNum] = useState('')
    const [animating, setAnimating] = useState(true)
    const { loading, tables } = useSelector(state => state.tableAdminList)
    const { success: successDelete } = useSelector(state => state.tableDeleteAdmin)
    const { success: successCreate, table: tableCreate } = useSelector(state => state.tableCreateAdmin)
    const { success: successUpdate } = useSelector(state => state.tableUpdateAdmin)
    const { editAble } = useSelector(state => state.tableEditAdmin)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listTable())
        if (successDelete) {
            Alert.alert(
                "",
                "Table Berhasil Dihapus",
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
            dispatch({ type: TABLE_RESET })

        }
        if (editAble != null) {
            setTableNum(editAble.nomor)
            setModalVisible(!modalVisible);
        }
        else {
            setTableNum('')
        }
        if (successCreate || successUpdate) {
            dispatch({ type: TABLE_CREATE_RESET })
            dispatch({ type: TABLE_UPDATE_RESET })
            dispatch({ type: TABLE_EDITABLE })
            dispatch(listTable())
            setModalVisible(!modalVisible);
            setTableNum('')
            Alert.alert(
                "",
                "Table Berhasil Disimpan",
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
        if (tables) {
            spinner
        }
    }, [dispatch, successDelete, successCreate, tableCreate, editAble, successUpdate])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        wait(100).then(() => {
            dispatch(listTable())
            setRefreshing(false)
        });
    }, []);


    const spinner = useMemo(() => {
        setTimeout(() => {
            setAnimating(false)

        }, 1000);
    }, [loading, tables])

    const deleteHandler = (id) => {
        Alert.alert(
            "Hapus Meja",
            "Apakah Anda Yakin?",
            [
                {
                    text: "Tidak",
                    onDismiss: () => console.log(id),
                    style: "cancel",
                },
                { text: "Ya", onPress: () => dispatch(deleteTable(id)) }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log(id),
            }
        )
    }

    const submitHandler = () => {
        if (editAble !== null) {
            if (tableNum) {
                dispatch(updateTable({ _id: editAble._id, nomor: tableNum }))
            }
            else {
                Alert.alert(
                    "Nomor Meja Belum diisi",
                    "isi dahulu nomor meja",
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
            if (tableNum) {
                dispatch(createTable({
                    nomor: tableNum
                }))
            }
            else {
                Alert.alert(
                    "Nomor Meja Belum diisi",
                    "isi dahulu nomor meja",
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

    const editHandler = (table) => {
        dispatch(editTable(table))
    }

    const cancelHandler = () => {
        setTableNum('')
        setModalVisible(!modalVisible)
        dispatch({ type: TABLE_EDITABLE })
    }
    console.log(tables);

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
                                <Text style={styles.modalText}>Edit Meja</Text>
                            )
                        }
                        {editAble === null &&
                            (
                                <Text style={styles.modalText}>Tambah Meja</Text>
                            )
                        }
                        <TextInput
                            style={{
                                height: 40,
                                width: 300,
                                margin: 8,
                                borderWidth: 1,
                            }}
                            placeholder="Masukkan Nomor meja"
                            onChangeText={(value) => setTableNum(value)}
                            value={tableNum}
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
                            <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 20, marginTop: 5 }}> Daftar Meja</Text>
                            <View>
                                <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#2196F3' }} onPress={() => setModalVisible(true)}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>+ Meja</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {tables.length === 0 ? (
                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Belum Ada Meja</Text>

                            </View>
                        ) : (
                            <>
                                {tables && (
                                    <>
                                        {tables.map(table => (
                                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }} key={table._id}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Meja: {table.nomor}</Text>
                                                    {table.inUsed && (
                                                        <Text style={{ fontSize: 16, marginLeft: 12 }}>(Terisi)</Text>
                                                    )}
                                                </View>

                                                <View style={{ flexDirection: 'row' }}>

                                                    <TouchableOpacity style={{ padding: 4, borderRadius: 6, backgroundColor: '#DDE2EA', marginRight: 8, width: 60 }} onPress={() => editHandler(table)}>
                                                        <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Edit</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ padding: 4, borderRadius: 6, backgroundColor: '#DC3545', width: 60 }} onPress={() => deleteHandler(table._id)}>
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

export default TableScreen

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
