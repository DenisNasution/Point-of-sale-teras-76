import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView, BackHandler, ActivityIndicator } from 'react-native'
import {
    LineChart,
} from "react-native-chart-kit";
import { useDispatch, useSelector } from 'react-redux';
import { ChartWhole } from '../redux/actions/orderActions';
const screenWidth = Dimensions.get("window").width;

const ChartWholeScreen = () => {
    const { loading, order } = useSelector(state => state.orderChartWhole)
    const [copyX, setCopyX] = useState([])
    const [copyY, setCopyY] = useState([])
    const [animating, setAnimating] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ChartWhole())
        if (order) {
            copyTotals
        }
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)

    }, [dispatch])

    const copytotal = () => {
        let data1 = []
        order && order.map(t => data1.push(t.total))
        setCopyX(data1)
    }
    const copyMonth = () => {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei',
            'Juni', 'Juli', 'Agustus', 'September',
            'Oktober', 'November', 'Desember'
        ];
        let month = []
        order && order.map(t => month.push(months[t._id.monthBillDate - 1]))
        setCopyY(month);
    }


    const copyTotals = useMemo(() => {
        copytotal(); copyMonth();
        setAnimating(false)
    }, [loading, order])
    console.log(animating)
    return (
        <View style={{ backgroundColor: '#EDEDED', flex: 1 }} >
            <ScrollView style={{ paddingHorizontal: 20, flex: 1, marginBottom: 10 }}>
                {/* <Text>Bezier Line Chart</Text> */}
                {animating && (
                    <ActivityIndicator size="large" color="#0000ff" animating={animating} ></ActivityIndicator>
                )}

                {copyX.length !== 0 && copyY.length !== 0 && (
                    <LineChart
                        data={{
                            labels: copyY,
                            datasets: [
                                {
                                    data: copyX
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        width={550}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            // backgroundGradientFrom: "#fb8c00",
                            // backgroundGradientTo: "#ffa726",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                )}
            </ScrollView>
        </View >
    )
}

export default ChartWholeScreen

const styles = StyleSheet.create({})
