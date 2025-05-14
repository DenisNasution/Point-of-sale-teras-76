import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TransactionTenant from './TransactionTenant'
import TransactionMeja from './TransactionMeja'

const TransactionScreen = () => {

    const Tab = createMaterialTopTabNavigator();
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontWeight: 'bold' },
                tabStyle: { height: 45 },
                style: { backgroundColor: '#CDF0EA' },
            }}
        >
            <Tab.Screen name="Tenant" component={TransactionTenant} />
            <Tab.Screen name="Meja" component={TransactionMeja} />
        </Tab.Navigator>
    );
}

export default TransactionScreen
