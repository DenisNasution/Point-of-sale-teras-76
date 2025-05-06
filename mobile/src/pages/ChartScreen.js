import React from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChartTenantScreen from './ChartTenantScreen';
import ChartWholeScreen from './ChartWholeScreen';
import Test from './Test';

const ChartScreen = () => {
    const Tab = createMaterialTopTabNavigator();
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontWeight: 'bold' },
                tabStyle: { height: 45 },
                style: { backgroundColor: '#CDF0EA' },
            }}
        >
            <Tab.Screen name="All" component={ChartWholeScreen} />
            <Tab.Screen name="Tenant" component={ChartTenantScreen} />
        </Tab.Navigator>
    );
}

export default ChartScreen

const styles = StyleSheet.create({})
