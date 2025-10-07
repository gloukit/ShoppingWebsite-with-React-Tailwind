
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleStatusTab } from "../store/cartSlice";

export default function Header(){
    const [totalQuantity,setTotalQuantity] = useState(0);
    const cartData = useSelector(state=>state.cart.items);
    const dispatch = useDispatch();

    useEffect(()=>{
        let total = 0;
        cartData.forEach(item=>total += item.quantity);
        setTotalQuantity(total);
    },[cartData]);

    function handleOpenCartTab(){
        dispatch(toggleStatusTab());
    }

    return (
        <header className="flex justify-between items-center bg-gray-200 px-3 py-6">
            <Link to="/" className="text-2xl font-semibold">Home</Link>
            <div className="w-10 h-10  bg-gray-100 rounded-full 
                            flex justify-center items-center 
                            relative
                            cursor-pointer"
                 onClick={handleOpenCartTab}>
                <ShoppingCartIcon className="size-7"/>
                <span className="absolute top-2/3 right-1/2
                                w-5 bg-red-500 rounded-full 
                                text-white text-sm
                                flex justify-center items-center"
                >{totalQuantity}</span>
            </div>
        </header>
    )
}