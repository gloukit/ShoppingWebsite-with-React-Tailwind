import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cartItem";
import { toggleStatusTab } from "../store/cartSlice";

export default function CartTab(){
    const cartData = useSelector(state => state.cart.items);
    const statusTab = useSelector(state => state.cart.statusTab);
    const dispatch = useDispatch();

    function handleCLoseCartTab(){
        dispatch(toggleStatusTab());
    }
    
    return (
        <div className={`fixed top-0 right-0
                        w-[400px] h-full bg-gray-700 shadow-2xl
                        grid grid-rows-[60px_1fr_60px]
                        overflow-auto
                        transform transition-transform duration-500
                        ${statusTab===false? "translate-x-full":""}`}>
            <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
            <div className="p-5">
                {cartData.map(item=>(
                    <CartItem key={item.productId} data={item}/>
                ))}
            </div>

            <div className="grid grid-cols-2">
                <button className="bg-black text-white" onClick={handleCLoseCartTab}>CLOSE</button>
                <button className="bg-amber-600 text-white">CHECKOUT</button>
            </div>
        </div>
    )
}