import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items : localStorage.getItem("carts")?JSON.parse(localStorage.getItem("carts")):[],
    statusTab : false
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            const {productId,quantity} = action.payload;
            const indexProductId = state.items.findIndex(item=>item.productId===productId); //在state.items里，查找符合条件的第一个项的index（条件：商品id（item.productId）和传入的productId是否一致？）
            if(indexProductId>=0){
                state.items[indexProductId].quantity += quantity;
            }else{
                state.items.push({productId,quantity});
            }
            localStorage.setItem("carts",JSON.stringify(state.items));
        },

        changeQuantity(state,action){
            const {productId,quantity} = action.payload;
            const indexProductId = state.items.findIndex(item=>item.productId===productId);
            if(quantity>0){
                state.items[indexProductId].quantity = quantity; 
            }else{ //当数量小于等于0时，将product从state.items里删除
                state.items = state.items.filter(item=>item.productId !== productId);
            }
            localStorage.setItem("carts",JSON.stringify(state.items));
        },

        removeFromCart(state,action){
            const {productId} = action.payload;
            state.items = state.items.filter(item=>item.productId !== productId);
        },

        toggleStatusTab(state){
            state.statusTab = !state.statusTab;
        }
    }
})

export const {addToCart,changeQuantity, removeFromCart, toggleStatusTab} = cartSlice.actions;
export default cartSlice.reducer;