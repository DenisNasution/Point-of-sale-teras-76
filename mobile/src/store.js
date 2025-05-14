import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from "remote-redux-devtools"
import thunk from "redux-thunk"
import { menuListReducer, subMenuListReducer, tenantListReducer } from "./redux/reducers/menuReducers"
import { cartReducer } from "./redux/reducers/cartReducers"
import { menuListOrderDeleteAdminReducer, orderChartTenantReducer, orderChartWholedReducer, orderCreateReducer, orderDeleteAdminReducer, orderDetailPaidReducer, orderListDetailReducer, orderListHisReducer, orderListPaidReducer, orderListPaidTableReducer, orderListPOReducer, orderListTambahDetailReducer, orderListTenantReducer, orderStatusReducer } from "./redux/reducers/orderReducers"
import { tenantCreateAdminReducer, tenantDeleteAdminReducer, tenantEditAdminReducer, tenantListAdminReducer, tenantListIdAdminReducer, tenantUpdateAdminReducer } from "./redux/reducers/tenantReducers"
import { menuCreateAdminReducer, menuDeleteAdminReducer, menuEditAdminReducer, menuListAdminReducer, menuListIdAdminReducer, menuUpdateAdminReducer } from "./redux/reducers/tenantMenuReducers"
import { subMenuCreateAdminReducer, subMenuDeleteAdminReducer, subMenuEditAdminReducer, subMenuListAdminReducer, subMenuUpdateAdminReducer } from "./redux/reducers/menuSubMenuReducers"
import { userCreateAdminReducer, userDeleteAdminReducer, userEditAdminReducer, userListAdminReducer, userProfileReducer, userSigninReducer, userUpdateAdminReducer, userUpdateProfileReducer } from "./redux/reducers/userReducers"
import { connectionReducer, connectionRequestReducer } from "./redux/reducers/connectionReducers"
import { tableCreateAdminReducer, tableDeleteAdminReducer, tableEditAdminReducer, tableListAdminReducer, tableListIdAdminReducer, tableListReadyReducer, tableUpdateAdminReducer, updateStatusTableReducer } from "./redux/reducers/tableReducers";


const initialState = {

}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userInfo']
};
const reducer = combineReducers({
    tenantList: tenantListReducer,
    menuList: menuListReducer,
    subMenuList: subMenuListReducer,
    cart: cartReducer,
    // orderCreate: orderCreateReducer,
    orderDelete: orderDeleteAdminReducer,
    menuListOrderDeleteAdmin: menuListOrderDeleteAdminReducer,
    orderListPaid: orderListPaidReducer,
    orderListPaidTable: orderListPaidTableReducer,
    orderListPO: orderListPOReducer,
    orderListHis: orderListHisReducer,
    orderCreate: orderCreateReducer,
    orderStatus: orderStatusReducer,
    orderListDetail: orderListDetailReducer,
    orderListTenant: orderListTenantReducer,
    orderListTambahDetail: orderListTambahDetailReducer,
    orderDetailPaid: orderDetailPaidReducer,
    orderChartWhole: orderChartWholedReducer,
    orderChartTenant: orderChartTenantReducer,
    tenantAdminList: tenantListAdminReducer,
    tenantListId: tenantListIdAdminReducer,
    tenantCreateAdmin: tenantCreateAdminReducer,
    tenantEditAdmin: tenantEditAdminReducer,
    tenantUpdateAdmin: tenantUpdateAdminReducer,
    tenantDeleteAdmin: tenantDeleteAdminReducer,
    menuListAdmin: menuListAdminReducer,
    menuListIdAdmin: menuListIdAdminReducer,
    menuDeleteAdmin: menuDeleteAdminReducer,
    menuCreateAdmin: menuCreateAdminReducer,
    menuEditAdmin: menuEditAdminReducer,
    menuUpdateAdmin: menuUpdateAdminReducer,
    subMenuListAdmin: subMenuListAdminReducer,
    subMenuDeleteAdmin: subMenuDeleteAdminReducer,
    subMenuCreateAdmin: subMenuCreateAdminReducer,
    subMenuEditAdmin: subMenuEditAdminReducer,
    subMenuUpdateAdmin: subMenuUpdateAdminReducer,
    userSignin: persistReducer(persistConfig, userSigninReducer),
    // userSignin: userSigninReducer,
    userListAdmin: userListAdminReducer,
    userDeleteAdmin: userDeleteAdminReducer,
    userCreateAdmin: userCreateAdminReducer,
    userEditAdmin: userEditAdminReducer,
    userUpdateAdmin: userUpdateAdminReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userProfile: userProfileReducer,
    connectionRequest: connectionRequestReducer,
    tableAdminList: tableListAdminReducer,
    tableListReady: tableListReadyReducer,
    tableListId: tableListIdAdminReducer,
    tableCreateAdmin: tableCreateAdminReducer,
    tableEditAdmin: tableEditAdminReducer,
    tableUpdateAdmin: tableUpdateAdminReducer,
    tableDeleteAdmin: tableDeleteAdminReducer,
    updateStatusTable: updateStatusTableReducer,
})
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhance = composeWithDevTools({
    realtime: true,
    host: 'localhost',
    port: 8000
});

export const store = createStore(reducer, initialState, enhance(applyMiddleware(thunk)));
// export default store

export const persistor = persistStore(store);