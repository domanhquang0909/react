import {configureStore} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: '',
        listProduct: [] 
    },
    reducers: { 
        tokenHandle(state, action) {
            state.token = action.payload;
        },
        listproductHandle(state, action) {
            state.listProduct = action.payload;
        }
    }
})
export const tokenActions = tokenSlice.actions;

const store = configureStore({
    reducer: {token: tokenSlice.reducer}
})

export default store;