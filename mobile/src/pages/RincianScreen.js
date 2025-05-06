import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Button, ScrollView, RefreshControl, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { cancelOrder, listOrderDetail, listOrderTambahDetail, StatusOrder, detailOrderpaidTenant, menuListOrderDelete } from '../redux/actions/orderActions'
import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ORDER_CREATE_RESET, ORDER_DELETE_RESET, ORDER_MENU_DELETE_RESET, ORDER_PAID_TAMBAH_EMPTY, ORDER_RESET } from '../redux/constants/orderConstants'
import { updateStatusTable } from '../redux/actions/tableActions'
import { CART_EMPTY } from '../redux/constants/cartConstant'

var { height, width } = Dimensions.get('window');

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const StrukTenant = (props) => {
    let _listeners = []
    const { ordersTenant, orders } = props
    const [loading, setLoading] = useState(false)

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei',
        'Juni', 'Juli', 'Agu', 'Sep',
        'Okt', 'Nov', 'Des'
    ];
    const date = new Date()
    const waktu = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const tanggal = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

    // const total = orders && orders.totalPrice

    return (
        <View>
            <Button disabled={loading} color="#FFCC00"
                title="Cetak List Pesanan" onPress={async () => {
                    try {
                        await BluetoothEscposPrinter.printerInit();
                        await BluetoothEscposPrinter.printerLeftSpace(0);

                        {
                            if (ordersTenant) {
                                for (let index = 0; index < ordersTenant.length; index++) {

                                    let columnWidths = [14, 6, 12];
                                    await BluetoothEscposPrinter.printText("\r\n\r\n", {});
                                    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                                    await BluetoothEscposPrinter.printColumn(columnWidths,
                                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                        [tanggal, '', waktu], { widthtimes: 0 });

                                    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                                    await BluetoothEscposPrinter.printColumn(columnWidths,
                                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                        [String(orders._id).substr(String(orders._id).length - 7), '', 'Meja: ' + orders.table.nomor], { widthtimes: 0 });



                                    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                                    await BluetoothEscposPrinter.setBlob(0);
                                    await BluetoothEscposPrinter.printText(ordersTenant[index].name + '\r\n\r\n', {
                                        encoding: 'GBK',
                                        codepage: 0,
                                        widthtimes: 0,
                                        heigthtimes: 0,
                                        fonttype: 1
                                    });

                                    for (let i = 0; i < ordersTenant[index].v.length; i++) {
                                        await BluetoothEscposPrinter.printColumn([20, 0, 12],
                                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                            [String(ordersTenant[index].v[i].namaPesanan), "", String(ordersTenant[index].v[i].jumlah)], {});
                                    }
                                    await BluetoothEscposPrinter.printText("\r\n\r\n--------------------------------\r\n", {});


                                }
                            }

                        }
                        await BluetoothEscposPrinter.printText("\r\n\r\n", {});
                    } catch (e) {
                        alert(e.message || "PERANGKAT TIDAK TERHUBUNG");
                    }
                }} />
        </View>
    )
}

const RincianScreen = ({ route, navigation }) => {
    const { orderId } = route.params

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei',
        'Juni', 'Juli', 'Agu', 'Sep',
        'Okt', 'Nov', 'Des'
    ];
    const date = new Date()
    const waktu = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const tanggal = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

    const dispatch = useDispatch()
    let _listeners = []
    const [loading, setLoading] = useState(false)
    const [loginData, setLoginData] = useState()
    const [refreshing, setRefreshing] = React.useState(false);
    const [cash, setCash] = useState()
    const [animating, setAnimating] = useState(true)
    const { loading: loadingList, orders } = useSelector(state => state.orderListDetail)
    const { success } = useSelector(state => state.orderStatus)
    // const { success: successDelete } = useSelector(state => state.orderDelete)
    const { success: successDelete } = useSelector(state => state.menuListOrderDeleteAdmin)
    const { success: successCreate } = useSelector(state => state.orderCreate)
    const { orders: ordersTenant } = useSelector(state => state.orderListTenant)
    const { userInfo } = useSelector(state => state.userSignin)
    console.log(ordersTenant);

    useEffect(() => {
        dispatch(listOrderDetail(orderId))
        dispatch(detailOrderpaidTenant(orderId))
        if (successCreate) {
            dispatch({ type: CART_EMPTY })
            dispatch({ type: ORDER_CREATE_RESET })
            dispatch({ type: ORDER_PAID_TAMBAH_EMPTY })
        }
        if (successDelete) {
            Alert.alert(
                "",
                "Menu Pesanan Berhasil Dibatalkan",
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
            dispatch({ type: ORDER_MENU_DELETE_RESET })
        }
        if (success) {
            dispatch({ type: ORDER_RESET })
        }
        if (!loadingList) {
            spinner
        }
    }, [dispatch, success, successCreate, successDelete])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        wait(100).then(() => {
            dispatch(listOrderDetail(orderId))
            setRefreshing(false)
        });
    }, []);

    const spinner = useMemo(() => {
        setTimeout(() => {
            setAnimating(false)
        }, 1000);
    }, [loading, orders])

    const cancelHandler = (id) => {
        Alert.alert(
            "Batalkan Pesanan",
            "Apakah Anda Yakin?",
            [
                {
                    text: "Tidak",
                    onDismiss: () => console.log(''),
                    style: "cancel",
                },
                {
                    text: "Ya", onPress: () => {
                        dispatch(cancelOrder(id))
                        dispatch(updateStatusTable({ idTable: orders.table && orders.table.idTable, status: false }))
                        navigation.navigate('PlaceOrder')
                    }
                }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log(''),
            }
        )
    }
    // console.log(orders);
    const tambahHandler = (id) => {
        dispatch(listOrderTambahDetail(id))
        dispatch(updateStatusTable({ idTable: orders.table && orders.table.idTable, status: false }))
        navigation.navigate('Order')
    }

    const bayarHandler = () => {
        if (cash) {
            dispatch(StatusOrder(orderId))
            dispatch(updateStatusTable({ idTable: orders.table && orders.table.idTable, status: false }))
            setCash()
        } else {
            Alert.alert(
                "Nominal Cash Belum diisi",
                "isi dahulu nominal cash",
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

    const removeFromCartHandler = (id) => {
        Alert.alert(
            "Batalkan Pesanan",
            "Apakah Anda Yakin?",
            [
                {
                    text: "Tidak",
                    onDismiss: () => console.log(''),
                    style: "cancel",
                },
                {
                    text: "Ya", onPress: () => {
                        dispatch(menuListOrderDelete(id))
                    }
                }
            ],
            {
                cancelable: true,
                onDismiss: () => console.log(''),
            }
        )

    }

    const total = orders && orders.totalPrice
    return (
        <View style={{ backgroundColor: '#EDEDED', flex: 1 }}>
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
                        <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 16 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Meja: {orders.table && orders.table.nomor}</Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Rp. {total}</Text>

                            </View>
                            {orders.orderItems && (
                                <View style={{ marginBottom: 20 }}>
                                    {orders.orderItems.map((item, index) => (
                                        <View style={{ marginTop: 20, justifyContent: 'space-between' }} key={index}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 4 }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{(index + 1) + '.  ' + item.namaPesanan}</Text>
                                                <TouchableOpacity onPress={() => removeFromCartHandler({ id: orderId, idMenu: item._id })}>
                                                    <Image style={{ width: 20, height: 20, alignItems: 'center' }}
                                                        source={require('../assets/icons/remove.png')}
                                                    >
                                                    </Image>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }} >
                                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Jumlah: {item.jumlah}</Text>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Rp. {item.harga}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                            <View style={{ marginBottom: 20 }}>
                                <StrukTenant ordersTenant={ordersTenant} orders={orders} ></StrukTenant>
                            </View>
                            {orders && !orders.status && (
                                <>
                                    {userInfo && userInfo.isAdmin && (

                                        <View style={{ flexDirection: 'row', marginBottom: 8, justifyContent: 'space-between' }}>
                                            <>
                                                <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#DC3545', marginRight: 8, width: 140 }} onPress={() => cancelHandler(orderId)}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Batal</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#2196F3', width: 140 }} onPress={() => tambahHandler(orderId)}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>+ Pesanan</Text>
                                                </TouchableOpacity>
                                            </>

                                        </View>
                                    )}
                                    {userInfo && !userInfo.isAdmin && (
                                        <View style={{ marginBottom: 8 }}>
                                            <>
                                                <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#2196F3' }} onPress={() => tambahHandler(orderId)}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>+ Pesanan</Text>
                                                </TouchableOpacity>
                                            </>

                                        </View>
                                    )}

                                </>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <Button disabled={loading} color="#4BB543"
                                    title="Cetak struk" onPress={async () => {
                                        try {
                                            await BluetoothEscposPrinter.printerInit();
                                            await BluetoothEscposPrinter.printerLeftSpace(0);

                                            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                                            await BluetoothEscposPrinter.setBlob(0);
                                            await BluetoothEscposPrinter.printText("Teras 76\r\n", {
                                                encoding: 'GBK',
                                                codepage: 0,
                                                widthtimes: 3,
                                                heigthtimes: 3,
                                                fonttype: 1
                                            });
                                            let columnWidths = [14, 6, 12];
                                            await BluetoothEscposPrinter.printText("\r\n", {});
                                            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                                            await BluetoothEscposPrinter.printColumn(columnWidths,
                                                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                [String(orders._id).substr(String(orders._id).length - 7), '', 'Meja: ' + orders.table.nomor], { widthtimes: 0 });

                                            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                                            await BluetoothEscposPrinter.printColumn(columnWidths,
                                                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                [tanggal, '', waktu], { widthtimes: 0 });
                                            await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                            {
                                                if (orders.orderItems) {
                                                    for (let index = 0; index < orders.orderItems.length; index++) {
                                                        await BluetoothEscposPrinter.printColumn([20, 0, 12],
                                                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                            [orders.orderItems[index].namaPesanan, "", ""], {});
                                                        await BluetoothEscposPrinter.printColumn(columnWidths,
                                                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                            [String(orders.orderItems[index].jumlah) + 'X  ' + ' @' + String(orders.orderItems[index].harga / orders.orderItems[index].jumlah), "", 'Rp. ' + String(orders.orderItems[index].harga)], {});
                                                    }
                                                }

                                            }
                                            await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                            await BluetoothEscposPrinter.printColumn(columnWidths,
                                                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                ["SubTotal", '', "Rp. " + String(total)], {});
                                            await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                            await BluetoothEscposPrinter.printColumn(columnWidths,
                                                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                ["Total", '', "Rp. " + String(total)], {});
                                            await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                                            // await BluetoothEscposPrinter.printText("Terima Kasih\r\n\r\n\r\n", {});
                                            await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
                                        } catch (e) {
                                            alert("PERANGKAT TIDAK TERHUBUNG");
                                        }
                                    }} />
                            )}


                        </View>
                        {userInfo && userInfo.isAdmin && (
                            <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 8, marginTop: 8, marginBottom: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                {orders && !orders.status && (
                                    <>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }} >Cash: </Text>
                                        <TextInput
                                            style={{
                                                height: 35,
                                                width: 190,
                                                padding: 8,
                                                borderWidth: 1,
                                            }}
                                            placeholder="Masukkan Nominal"
                                            onChangeText={(value) => setCash(value)}
                                            keyboardType="numeric"
                                            value={cash}
                                        />

                                        <Button disabled={loading} color="#4BB543"
                                            title="Bayar" onPress={async () => {
                                                bayarHandler()
                                                try {
                                                    if (cash) {
                                                        await BluetoothEscposPrinter.printerInit();
                                                        await BluetoothEscposPrinter.printerLeftSpace(0);

                                                        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                                                        await BluetoothEscposPrinter.setBlob(0);
                                                        await BluetoothEscposPrinter.printText("Teras 76\r\n", {
                                                            encoding: 'GBK',
                                                            codepage: 0,
                                                            widthtimes: 3,
                                                            heigthtimes: 3,
                                                            fonttype: 1
                                                        });

                                                        let columnWidths = [14, 6, 12];
                                                        await BluetoothEscposPrinter.printText("\r\n", {});
                                                        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                                                        await BluetoothEscposPrinter.printColumn(columnWidths,
                                                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                            [String(orders._id).substr(String(orders._id).length - 7), '', 'Meja: ' + orders.table.nomor], { widthtimes: 0 });

                                                        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                                                        await BluetoothEscposPrinter.printColumn(columnWidths,
                                                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                            [tanggal, '', waktu], { widthtimes: 0 });
                                                        await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                                        {
                                                            if (orders.orderItems) {
                                                                for (let index = 0; index < orders.orderItems.length; index++) {
                                                                    await BluetoothEscposPrinter.printColumn([20, 0, 12],
                                                                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                                        [orders.orderItems[index].namaPesanan, "", ""], {});
                                                                    await BluetoothEscposPrinter.printColumn(columnWidths,
                                                                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                                        [String(orders.orderItems[index].jumlah) + 'X  ' + ' @' + String(orders.orderItems[index].harga / orders.orderItems[index].jumlah), "", 'Rp. ' + String(orders.orderItems[index].harga)], {});
                                                                    // await BluetoothEscposPrinter.printText("--------------------------------\r\n\r\n\r\n", {});
                                                                }
                                                            }

                                                        }
                                                        await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                                        await BluetoothEscposPrinter.printColumn(columnWidths,
                                                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                            ["SubTotal", '', "Rp. " + String(total)], {});
                                                        await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                                        await BluetoothEscposPrinter.printColumn(columnWidths,
                                                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                            ["Total", '', "Rp. " + String(total)], {});
                                                        await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                                        await BluetoothEscposPrinter.printColumn(columnWidths,
                                                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                            ["Tunai", '', "Rp. " + String(cash)], {});
                                                        await BluetoothEscposPrinter.printColumn(columnWidths,
                                                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                                            ["Kembalian", '', "Rp. " + String(cash - total)], {});
                                                        await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                                        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                                                        await BluetoothEscposPrinter.printText("Terima Kasih\r\n\r\n\r\n", {});
                                                        await BluetoothEscposPrinter.printText("\r\n\r\n", {});
                                                    }

                                                } catch (e) {
                                                    alert("PERANGKAT TIDAK TERHUBUNG");
                                                }
                                            }} />
                                    </>
                                )}

                                {orders && orders.status && (
                                    <View style={{ padding: 8, borderRadius: 6, backgroundColor: '#FFC107', flex: 1 }} >
                                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Lunas</Text>
                                    </View>
                                )}

                            </View>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    )
}

export default RincianScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    title: {
        width: width,
        backgroundColor: "#4BB543",
        color: "#232323",
        paddingLeft: 8,
        paddingVertical: 4,
        textAlign: "left"
    },


});
