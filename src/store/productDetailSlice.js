import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductDetail = createAsyncThunk(
    "products/fetchProductDetail",
    async (id,thunkAPI)=>{
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const detailData = await response.json();
            return detailData ;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
);

const productDetailSlice = createSlice({
    name:"productDetail",
    initialState:{
        items:{}, //键值对为 productId:{...产品详情数据}
        status:{},//键值对为 productId:{...对应的status状态}
        error:{}  //键值对为 productId:{...对应的错误信息}
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProductDetail.pending, (state,action)=>{
                const id = action.meta.arg;
                state.status[id] = "loading";
            })
            .addCase(fetchProductDetail.fulfilled, (state,action)=>{
                const product = action.payload; //由id和quantity组成的一个对象，将其保存到items里
                state.items[product.id] = product;
                state.status[product.id] = "succeeded";
            })
            .addCase(fetchProductDetail.rejected, (state,action)=>{
                const id = action.meta.arg;
                state.status[id] = "failed";
                state.error[id] = action.error.message;
            });
    }
});

export default productDetailSlice.reducer;