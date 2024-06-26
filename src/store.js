import { configureStore } from '@reduxjs/toolkit'//import thunk from 'redux-thunk'; // If you're using asynchronous actions
import { reduxfetch } from './redux/DataSales'
import datasalesReducer from './redux/DataSales'
import datastockReducer from './redux/DataStock'
import datasuppliersReducer from './redux/DataSuppliers'
import datadeletedstockReducer from './redux/DataDeletedStock'
import datadeletedsuppliersReducer from './redux/DataDeletedSuppliers'
import datastaffReducer from './redux/DataStaff'
const store = configureStore({
    reducer: {
        datasales: datasalesReducer,
        datastock: datastockReducer,
        datasuppliers: datasuppliersReducer,
        datadeletedstock: datadeletedstockReducer,
        datadeletedsuppliers:datadeletedsuppliersReducer,
        datastaff:datastaffReducer
    }
      
})
//store.subscribe(() => console.log("STATE AT ROOT!!!!!",store.getState()),store.dispatch(reduxfetch()))

export default store;