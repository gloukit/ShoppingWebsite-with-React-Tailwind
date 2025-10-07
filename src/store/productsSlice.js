import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({page,limit,search,category},thunkAPI)=>{
        try {
            let url = `https://dummyjson.com/products?limit=${limit}&skip=${(page-1) * limit}`;

            if (category && category !== "All") {
            url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${(page-1) * limit}`;
            }

            if (search) {
            url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${(page-1) * limit}`;
            }

           
            const response = await fetch(url);
            const data = await response.json();
            return data; //返回{products:[],total:...,skip:...,limit:...}

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async () => {
        const response = await fetch ('https://dummyjson.com/products/categories');
        const data = await response.json();
        return data;
    }
)

const productsSlice = createSlice({
    name:'products',
    initialState:{items:[], categories:[], 
                  status:'idle', error:null,
                  total:0, page:1, limit:12, search:'', category:'' },
    reducers:{
        setSearch(state,action){
            state.search = action.payload;
            state.page = 1 ;     //搜索时重置页码
            state.category = ''; //重置分类
        },
        setCategory(state,action){
            state.category = action.payload;
            state.page = 1;      //分类切换也要重置分页
            state.search = '' ;  //重置搜索内容
        },
        setPage(state,action){
            state.page = action.payload;
        }
    },
    extraReducers:(builder) =>{
        builder
            .addCase(fetchProducts.pending,(state)=>{
                state.status = 'loading' ;
                state.error = null ;
            })
            .addCase(fetchProducts.fulfilled,(state,action)=>{
                state.status = 'succeeded' ;
                state.items = action.payload.products ;
                state.total = action.payload.total;
            })
            .addCase(fetchProducts.rejected,(state,action)=>{
                state.status = 'failed' ;
                state.error = action.error.message;
            })
            .addCase(fetchCategories.fulfilled,(state,action)=>{
                state.categories = action.payload;
            });
    }
});

export const {setSearch,setCategory,setPage} = productsSlice.actions;
export default productsSlice.reducer;