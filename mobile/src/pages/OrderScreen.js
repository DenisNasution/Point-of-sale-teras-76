import React, { useEffect, useMemo, useState } from 'react'
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ActivityIndicator,
    BackHandler
} from 'react-native'
import SelectMultiple from 'react-native-select-multiple'
import { listTenant, listMenu, listSubMenu, clearlistMenu, clearlistSubMenu } from '../redux/actions/menuActions';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import { listOrderDetail } from '../redux/actions/orderActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CART_EMPTY_TAMBAH } from '../redux/constants/cartConstant';
import { ORDER_PAID_EMPTY, ORDER_PAID_TAMBAH_EMPTY } from '../redux/constants/orderConstants';
import { listTableReady, updateStatusTable } from '../redux/actions/tableActions';
import { TABLE_STATUS_RESET } from '../redux/constants/tableConstants';

const OrderScreen = ({ navigation, route }) => {
    const orderId = route.params ? route.params.orderId : null

    const [idTenant, setIdTenant] = useState("");
    const [idTable, setIdTable] = useState("")
    const [idMenu, setIdMenu] = useState("")
    const [animating, setAnimating] = useState(false)
    const [animating1, setAnimating1] = useState(false)
    const [idSubMenu, setIdSubMenu] = useState([])
    const [dataSubMenu, setDataSubMenu] = useState([])
    const [idSMenuGab, setIdSMenuGab] = useState("")
    const [namaSMenuGab, setNamaSMenuGab] = useState("")
    const [dataHarga, setDataHarga] = useState()
    const [jumlah, setJumlah] = useState("1")

    const { tables } = useSelector(state => state.tableListReady)
    const { tenants } = useSelector(state => state.tenantList)
    const { loading, menus } = useSelector(state => state.menuList)
    const { loading: loadingSubMenu, subMenus } = useSelector(state => state.subMenuList)
    const { orders } = useSelector(state => state.orderListDetail)
    const { orders: orderListTambah } = useSelector(state => state.orderListTambahDetail)
    const { success: successUpdateTable } = useSelector(state => state.updateStatusTable)
    const cart = useSelector(state => state.cart)
    const { table: tablePesanan, idOrder: ordId } = cart

    const namaMenu = idMenu && menus.find(m => m._id === idMenu)
    const nomorTable = idTable && tables && tables.find(t => t._id === idTable)

    const idOrder = orderListTambah ? orderListTambah._id : ordId ? ordId : undefined
    const cMeja = orderListTambah.table && orderListTambah.table.idTable
    const tableCart = tablePesanan && tablePesanan.idTable

    let info
    info = idOrder ? info = { idTenant, idTable, nomorTable: nomorTable && nomorTable.nomor, idSMenuGab, namaSMenuGab, dataHarga, jumlah, idOrder } : info = { idTenant, idTable, nomorTable: nomorTable && nomorTable.nomor, idSMenuGab, namaSMenuGab, dataHarga, jumlah }

    const dispatch = useDispatch()

    const isFocused = useIsFocused();

    useEffect(() => {
        dispatch(listTenant())
        dispatch(listTableReady())
        if (menus) {
            spinner
        }
        if (subMenus) {
            spinner1
        }
        if (successUpdateTable) {
            dispatch({ type: TABLE_STATUS_RESET })
        }
        if (tableCart) {
            setIdTable(tableCart)
        }
        if (cMeja) {
            setIdTable(cMeja)
        }
        if (!idMenu) {
            dispatch(clearlistMenu())
            dispatch(clearlistSubMenu())
        }
        if (idTenant) {
            dispatch(listMenu(idTenant))
            setAnimating(true)
        }
        if (idMenu) {
            dispatch(listSubMenu(idMenu))
            setAnimating1(true)
        }
        if (subMenus) {
            copySubMenus
            spinner1
        }
        if (idSubMenu) {
            let harga = 0
            let namaSubMenu = ""
            let idSubMenu1 = ""
            idSubMenu.map(t => {
                subMenus.map(s => {
                    if (s._id === t.value) {
                        harga += s.harga
                        namaSubMenu += s.nama + " "
                        idSubMenu1 += s._id + ""
                    }
                })
            })
            setIdSMenuGab(idMenu + "" + idSubMenu1);
            setNamaSMenuGab(namaMenu && namaMenu.nama + " " + namaSubMenu);
            setDataHarga(namaMenu && namaMenu.harga + harga);

        }
        // BackHandler.addEventListener('hardwareBackPress', () => true)
        // return () =>
        //     BackHandler.removeEventListener('hardwareBackPress', () => true)
        // const unsubscribe = navigation.addListener('willFocus', () => {
        //     dispatch(listTenant())
        //     dispatch(listTableReady())
        //  add ass parameter navigation,
        // });
        // return unsubscribe;
    }, [dispatch, idTenant, idMenu, idSubMenu, idOrder, cMeja, tableCart, successUpdateTable, isFocused])

    // console.log("animating: ", animating);
    const spinner = useMemo(() => {
        // setTimeout(() => {
        setAnimating(false)

        // }, 200);
    }, [loading, menus])

    const spinner1 = useMemo(() => {
        // setTimeout(() => {
        setAnimating1(false)

        // }, 200);
    }, [loadingSubMenu, subMenus])

    const copySubMenu = () => {
        let data = []
        subMenus.map(t => data.push({
            value: t._id,
            label: t.nama
        }))
        setDataSubMenu(data)
    }

    const copySubMenus = useMemo(() => copySubMenu(), [subMenus])

    const onSelectionsChange = (idSubMenu) => {
        setIdSubMenu(idSubMenu)
    }
    const pesanHandler = () => {
        if (idTable && idSMenuGab) {
            navigation.navigate('Cart', { info })
            setIdMenu("")
            if (idOrder) {
                setIdTable("")
            }
        }
        else if (!idTable) {
            Alert.alert(
                "Table belum diisi",
                "isikan nomor meja",
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
        } else if (!idSMenuGab) {
            Alert.alert(
                "Menu belum diisi",
                "isi dahulu menu",
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

    const batalHandler = () => {
        dispatch({ type: CART_EMPTY_TAMBAH })
        dispatch({ type: ORDER_PAID_TAMBAH_EMPTY })
        dispatch(updateStatusTable({ idTable: orders.table && orders.table.idTable, status: true }))
        setIdTable("")
        navigation.setParams({ orderId: null })
    }

    return (

        <View style={{ flex: 1 }}>
            <ScrollView style={{
                flex: 1, paddingHorizontal: 20, marginTop: 20, marginBottom: 20, backgroundColor: '#EDEDED',
            }}>
                <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 8 }}>
                    <Text style={{ fontSize: 20, color: '#19547b', textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>TERAS 76</Text>
                    <View >
                        < View style={{ borderColor: '#000000', borderWidth: 2, marginTop: 5, borderRadius: 10, marginRight: 5 }}>
                            <Picker
                                selectedValue={idTable}
                                onValueChange={(itemValue) =>
                                    setIdTable(itemValue)
                                }
                                itemStyle={{ fontWeight: 'bold', fontSize: 8 }}
                            >
                                <Picker.Item label="Meja" />
                                {tables && tables.map(table => (
                                    <Picker.Item key={table._id} label={table.nomor} value={table._id} />
                                ))}
                            </Picker>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 15, marginLeft: 5 }}>Pilih Tenant</Text>
                        <View style={{ borderColor: '#000000', borderWidth: 2, borderRadius: 10, marginTop: 5 }}>

                            <Picker
                                selectedValue={idTenant}
                                onValueChange={(itemValue) =>
                                    setIdTenant(itemValue)
                                }
                                itemStyle={{ fontWeight: 'bold' }}
                            >
                                <Picker.Item label="--Tenant--" />
                                {tenants && tenants.map(tenant => (
                                    <Picker.Item key={tenant._id} label={tenant.name} value={tenant._id} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    {animating && (
                        <ActivityIndicator size="small" color="#0000ff" animating={animating} ></ActivityIndicator>
                    )}
                    {
                        menus.length > 0 && (
                            <>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 15, marginLeft: 5 }}>Pilih Menus</Text>
                                <View style={{ borderColor: '#000000', borderWidth: 2, marginTop: 5, borderRadius: 10 }}>
                                    <Picker
                                        selectedValue={idMenu}
                                        onValueChange={(itemValue) =>
                                            setIdMenu(itemValue)
                                        }>
                                        <Picker.Item label="--Menu--" />
                                        {menus && menus.map(menu => (
                                            <Picker.Item key={menu._id} label={menu.nama} value={menu._id} />
                                        ))}
                                    </Picker>
                                </View>
                            </>
                        )
                    }
                    {animating1 && (
                        <ActivityIndicator size="small" color="#0000ff" animating={animating1} ></ActivityIndicator>
                    )}
                    {
                        dataSubMenu && (
                            <>
                                <View>
                                    <SelectMultiple
                                        items={dataSubMenu}
                                        selectedItems={idSubMenu}
                                        onSelectionsChange={onSelectionsChange}
                                        rowStyle={{ borderBottomWidth: 0 }}
                                        style={{ backgroundColor: 'red' }}
                                    >
                                    </SelectMultiple>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8, marginLeft: 5 }}>Jumlah</Text>
                                <View style={{ borderColor: '#000000', borderWidth: 2, marginTop: 5, borderRadius: 10 }}>
                                    <Picker
                                        selectedValue={jumlah}
                                        onValueChange={(itemValue) =>
                                            setJumlah(itemValue)
                                        }
                                        itemStyle={{ fontWeight: 'bold' }}
                                    >
                                        <Picker.Item label="--Jumlah--" />
                                        <Picker.Item label="1" value="1" />
                                        <Picker.Item label="2" value="2" />
                                        <Picker.Item label="3" value="3" />
                                        <Picker.Item label="4" value="4" />
                                        <Picker.Item label="5" value="5" />
                                        <Picker.Item label="6" value="6" />
                                        <Picker.Item label="7" value="7" />
                                        <Picker.Item label="11" value="11" />
                                    </Picker>
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <TouchableOpacity style={{ backgroundColor: '#2196F3', borderRadius: 20, paddingVertical: 13 }} onPress={() => pesanHandler()}>
                                        <Text style={{ fontSize: 12, textAlign: 'center', color: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Pesan</Text>
                                    </TouchableOpacity>
                                    {orderListTambah && orderListTambah._id && (
                                        <TouchableOpacity style={{ marginTop: 15, backgroundColor: '#DC3545', borderRadius: 20, paddingVertical: 13 }} onPress={() => batalHandler()}>
                                            <Text style={{ fontSize: 12, textAlign: 'center', color: 'black', fontWeight: 'bold', textTransform: 'uppercase' }}>Batal Tambah Pesanan</Text>
                                        </TouchableOpacity>

                                    )}
                                </View>
                            </>
                        )
                    }
                </View>
            </ScrollView >
            {/* <Navbar navigation={navigation} loginData={loginData}></Navbar> */}
        </View >


    );
}

export default OrderScreen

const styles = StyleSheet.create({})
