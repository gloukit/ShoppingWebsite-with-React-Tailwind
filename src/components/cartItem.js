import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../store/productDetailSlice";
import { changeQuantity } from "../store/cartSlice";


export default function CartItem(props){
    const {productId,quantity} = props.data;
    const product = useSelector(state=>state.productDetail.items[productId]);
    const status = useSelector(state=>state.productDetail.status[productId]);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!product){ //如果product的详情数据为空，则拉取数据
            dispatch(fetchProductDetail(productId));
        }
    },[dispatch,productId,product]);

    if(!product && status==="loading"){
        return <p>Loading......</p>;
    }
    console.log(product);

    function handleMinusQuantity(){
        dispatch(changeQuantity({
            productId:productId,
            quantity:quantity-1
        }));
    }
    
    function handlePlusQuantity(){
        dispatch(changeQuantity({
            productId:productId,
            quantity:quantity+1
        }))
    }

    return (
        <div className="grid grid-cols-[2fr,4fr,3.5fr,2fr] justify-between items-center gap-5
                        bg-slate-600 rounded-md 
                        border-b-2 border-slate-700
                        text-white py-3 px-4">
            {product && (
                <>
                    <img src={product.thumbnail} alt={product.title} className="bg-black"/>
                    <h3>{product.title}</h3>
                    <p>${(product.price * quantity).toFixed(2)}</p>
                    <div className="w-20 flex justify-between gap-2">
                        <button className="w-6 h-6 bg-gray-200 rounded-full text-cyan-600 font-bold" onClick={handleMinusQuantity}>-</button>
                        <span>{quantity}</span>
                        <button className="w-6 h-6 bg-gray-200 rounded-full text-cyan-600 font-bold" onClick={handlePlusQuantity}>+</button>
                    </div>
                </>
            )}
        </div>
    )
}