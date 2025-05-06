import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrderScreen from '../pages/OrderScreen';
import CartScreen from '../pages/CartScreen';
import PlaceOrderScreen from '../pages/PlaceOrderScreen';
import TransactionScreen from '../pages/TransactionScreen';
import RincianScreen from '../pages/RincianScreen';
import TransactionDetailScreen from '../pages/TransactionDetailScreen';
import AdminScreen from '../pages/AdminScreen';
import TenantScreen from '../pages/TenantScreen';
import HistoryTransScreen from '../pages/HistoryTransScreen';
import TableScreen from '../pages/TableScreen';
import RincianHistoryScreen from '../pages/RincianHistoryScreen';
import TenantMenuScreen from '../pages/TenantMenuScreen';
import MenuSubMenuScreen from '../pages/MenuSubMenuScreen';
import Print from '../pages/Print';
import Test from '../pages/Test';
import LoginScreen from '../pages/LoginScreen';
import SplashScreen from '../pages/SplashScreen';
import UserMgmtScreen from '../pages/UserMgmtScreen';
import UserScreen from '../pages/UserScreen';
import ChartWholeScreen from '../pages/ChartWholeScreen';
import ChartTenantScreen from '../pages/ChartTenantScreen';
// import TransactionTenant from './src/pages/TransactionTenant';
import TransactionTenant from '../pages/TransactionTenant';
// import { MenuIcon, ShopingCart, Order, Admin, User, Transaction } from './src/assets/icons'
import { MenuIcon, ShopingCart, Order, Admin, User, Transaction } from '../assets/icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChartScreen from '../pages/ChartScreen';

const Stack = createStackNavigator();
const PlaceOrderStack = createStackNavigator();

function PlaceOrderStackScreen() {
    return (
        <PlaceOrderStack.Navigator>
            <PlaceOrderStack.Screen name="PlaceOrder" component={PlaceOrderScreen} options={{
                title: 'Daftar Pesanan',
                headerStyle: {
                    backgroundColor: '#5F939A',
                    height: 40
                },
                headerTintColor: '#000000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <PlaceOrderStack.Screen name="Rincian" component={RincianScreen} options={{
                title: 'Rincian Pesanan',
                headerStyle: {
                    backgroundColor: '#5F939A',
                    height: 40
                },
                headerTintColor: '#000000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </PlaceOrderStack.Navigator>
    );
}
const TransactionStack = createStackNavigator();

function TransactionStackScreen() {
    return (
        <TransactionStack.Navigator>
            <TransactionStack.Screen name="Transaction"
                component={TransactionScreen}
                options={{
                    title: 'Transaksi',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
            <TransactionStack.Screen name="TransactionDetail"
                component={TransactionDetailScreen}
                options={{
                    title: 'Rincian Transaksi',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
            <TransactionStack.Screen name="Rincian" component={RincianScreen} options={{
                title: 'Rincian Pesanan',
                headerStyle: {
                    backgroundColor: '#5F939A',
                    height: 40
                },
                headerTintColor: '#000000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </TransactionStack.Navigator>
    );
}
const AdminStack = createStackNavigator();
function AdminStackScreen() {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen name="Admin"
                component={AdminScreen}
                options={{
                    title: 'Admin Menu',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: null,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }} />
            <AdminStack.Screen name="Tenant"
                component={TenantScreen}
                options={{
                    title: 'Daftar Tenant',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: null
                }} />
            <AdminStack.Screen name="TenantMenu"
                component={TenantMenuScreen}
                options={{
                    title: 'Daftar Menu',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
            <AdminStack.Screen name="MenuSubMenu"
                component={MenuSubMenuScreen}
                options={{
                    title: 'Daftar Menu Tambahan',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
            <AdminStack.Screen name="Table"
                component={TableScreen}
                options={{
                    title: 'Daftar Meja',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
            <AdminStack.Screen name="HistTrans"
                component={HistoryTransScreen}
                options={{
                    title: 'History Transaksi',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: null
                }} />
            <AdminStack.Screen name="RincianHistory"
                component={RincianHistoryScreen}
                options={{
                    title: 'Rincian Transaksi',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
            <AdminStack.Screen name="Print"
                component={Print}
                options={{ headerShown: false }} />
            <AdminStack.Screen name="Test"
                component={Test}
                options={{
                    title: 'Print Struck',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
            <AdminStack.Screen name="UserMgmt"
                component={UserMgmtScreen}
                options={{
                    title: 'Daftar User',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: null
                }} />
            <AdminStack.Screen name="User"
                component={UserScreen}
                options={{
                    title: 'Profile',
                    headerStyle: {
                        backgroundColor: '#5F939A',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: null
                }} />
            <AdminStack.Screen name="Chart"
                component={ChartScreen}
                options={{ headerShown: false }}
            />
            <AdminStack.Screen name="ChartWhole"
                component={ChartWholeScreen}
                options={{ headerShown: false }}
            />
            <AdminStack.Screen name="ChartTenant"
                component={ChartTenantScreen}
                options={{ headerShown: false }} />
        </AdminStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="User" component={UserScreen} options={{
                title: 'Profile User',
                headerStyle: {
                    backgroundColor: '#5F939A',
                    height: 40
                },
                headerTintColor: '#000000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />

        </ProfileStack.Navigator>
    );
}

const AuthStack = createStackNavigator();

function AuthStackScreen() {
    return (
        <AuthStack.Navigator >
            <AuthStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
}

const CartStack = createStackNavigator();

// function CartStackScreen() {
//     return (
//         <CartStack.Navigator>
//             <CartStack.Screen name="Cart" component={CartScreen} options={{
//                 title: 'Keranjang Pesanan',
//                 headerStyle: {
//                     backgroundColor: '#5F939A',
//                     height: 40
//                 },
//                 headerTintColor: '#000000',
//                 headerTitleStyle: {
//                     fontWeight: 'bold',
//                 },
//             }} />

//         </CartStack.Navigator>
//     );
// }
const Tab = createBottomTabNavigator();
const Main = () => {
    const { userInfo } = useSelector(state => state.userSignin)
    // console.log(userInfo);
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    style: { backgroundColor: '#CDF0EA' }, activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
                initialRouteName="Splash"
                screenOptions={({ route }) => ({
                    tabBarButton: [
                        "Splash",
                    ].includes(route.name)
                        ? () => {
                            return null;
                        }
                        : undefined,
                })}

            >
                <Tab.Screen
                    name="Splash"
                    component={AuthStackScreen}
                    options={{
                        tabBarVisible: false
                    }}
                />

                <>
                    <Tab.Screen
                        name="Order"
                        component={OrderScreen}
                        options={{
                            tabBarLabel: 'Menu', tabBarIcon: ({ color, size }) => (
                                <MenuIcon width={25} height={25} ></MenuIcon>
                            ),
                        }} />
                    <Tab.Screen
                        name="Cart"
                        component={CartScreen}
                        options={{
                            tabBarLabel: 'Cart', tabBarIcon: ({ color, size }) => (
                                <ShopingCart width={25} height={25} ></ShopingCart>
                            ),
                        }} />
                    <Tab.Screen
                        name="PlaceOrder"
                        component={PlaceOrderStackScreen}
                        options={{
                            tabBarLabel: 'Order', tabBarIcon: ({ color, size }) => (
                                <Order width={25} height={25} ></Order>
                            ),
                        }} />
                    {userInfo && userInfo.isAdmin && (
                        <>
                            <Tab.Screen
                                name="Transaction"
                                component={TransactionStackScreen}
                                options={{
                                    tabBarLabel: 'Trans', tabBarIcon: ({ color, size }) => (
                                        <Transaction width={25} height={25} ></Transaction>
                                    ),
                                }} />
                        </>
                    )}
                    {userInfo && userInfo.isSuperAdmin && (
                        <>
                            <Tab.Screen
                                name="Admin"
                                component={AdminStackScreen}
                                options={{
                                    tabBarLabel: 'Admin', tabBarIcon: ({ color, size }) => (
                                        <Admin width={25} height={25} ></Admin>
                                    ),
                                }} />
                        </>
                    )}

                    {userInfo && !userInfo.isSuperAdmin && (
                        <>
                            <Tab.Screen
                                name="Profile"
                                component={ProfileStackScreen}
                                options={{
                                    tabBarLabel: 'Profile', tabBarIcon: ({ color, size }) => (
                                        <User width={25} height={25} ></User>
                                    ),
                                }} />
                        </>
                    )}
                </>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Main
