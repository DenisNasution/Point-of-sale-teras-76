import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, BackHandler, ActivityIndicator } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { historyListOrderpaid } from '../redux/actions/orderActions'



const HistoryTransScreen = ({ navigation }) => {
    const [mulai, setMulai] = useState()
    const [sampai, setSampai] = useState()
    const [animating, setAnimating] = useState(false)

    const { loading, order } = useSelector(state => state.orderListHis)

    useEffect(() => {
        if (order) {
            spinner
        }
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [])

    const spinner = useMemo(() => {
        setTimeout(() => {
            setAnimating(false)

        }, 500);
    }, [loading, order])


    let tanggalMulai
    let tanggalSampai
    if (order.length !== 0) {
        tanggalMulai = order[0].mulai
        tanggalSampai = order[0].akhir
    } else {
        if (mulai && sampai) {
            tanggalMulai = mulai.split("-").reverse().join("-")
            tanggalSampai = sampai.split("-").reverse().join("-")
        }
    }
    console.log(order);
    console.log("Mulai:", mulai);

    const dispatch = useDispatch()
    const filterHandler = () => {
        dispatch(historyListOrderpaid({ tanggalMulai, tanggalSampai }))
        setAnimating(true)
    }
    return (
        <View style={{ backgroundColor: '#EDEDED', flex: 1 }}>

            <ScrollView style={{ padding: 20, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
                    <View>
                        <DatePicker
                            style={{ width: 200 }}
                            date={mulai}
                            mode="date"
                            placeholder="Mulai Tanggal"
                            format="DD-MM-YYYY"
                            minDate="01-05-2020"
                            maxDate="01-05-2025"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                placeholderText: {
                                    color: 'black',
                                    fontWeight: 'bold'
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    borderWidth: 2,
                                    borderColor: 'black'
                                }
                            }}
                            onDateChange={(date) => { setMulai(date) }}
                        />
                        <DatePicker
                            style={{ width: 200, marginTop: 8 }}
                            date={sampai}
                            mode="date"
                            placeholder="Sampai Tanggal"
                            format="DD-MM-YYYY"
                            minDate="01-05-2020"
                            maxDate="01-05-2025"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                placeholderText: {
                                    color: 'black',
                                    fontWeight: 'bold'
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    borderWidth: 2,
                                    borderColor: 'black'
                                }
                            }}
                            onDateChange={(date) => { setSampai(date) }}
                        />
                    </View>
                    <TouchableOpacity style={{ marginLeft: 8, backgroundColor: '#1080c6', borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 80 }} onPress={filterHandler}>
                        <Text style={{ color: 'white' }}>Filter</Text>
                    </TouchableOpacity>

                </View>
                {animating && (
                    <ActivityIndicator size="large" color="#0000ff" animating={animating} ></ActivityIndicator>
                )}
                {order.length !== 0 && order[0].v.map(
                    ord => (
                        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12 }} key={ord.idTenant} >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{ord.name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 4 }}>Rp. {ord.total}</Text>
                                <TouchableOpacity style={{ padding: 8, borderRadius: 6, backgroundColor: '#2196F3', marginRight: 8, width: 83 }} onPress={() => navigation.navigate('RincianHistory', { idTenant: ord.idTenant, mulai: tanggalMulai, sampai: tanggalSampai })}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Rincian</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                )
                }
                {order.length === 0 && (
                    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12, alignItems: 'center' }}  >
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Pilih Tanggal</Text>
                    </View>
                )}
            </ScrollView>
        </View >
    )
}

export default HistoryTransScreen

const styles = StyleSheet.create({})
