import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params={},thunkAPI)=>{
        try {
            const {limit=12,skip=0,category,search} = params;

            let url="";
            if(category){
                url=`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
            } else if (search){
                url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
            } else {
                url =`https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            return data.products ;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name:'products',
    initialState:{items:[], status:'idle', error:null},
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(fetchProducts.pending,(state)=>{
                state.status = 'loading' ;
                state.error = null ;
            })
            .addCase(fetchProducts.fulfilled,(state,action)=>{
                state.status = 'succeeded' ;
                state.items = action.payload ;
            })
            .addCase(fetchProducts.rejected,(state,action)=>{
                state.status = 'failed' ;
                state.error = action.error.message;
            });
    }
});

export default productsSlice.reducer;