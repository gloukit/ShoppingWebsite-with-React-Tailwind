import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { changeQuantity, removeFromCart } from "../store/cartSlice";
import { Trash2Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { productAPI } from "../api/product_api";


export default function CartItem(props){
    const {productId,quantity} = props.data;
    const id = productId.toString();

    const {data:product, isLoading }= useQuery({
        queryKey:["product",id],
        queryFn: ()=>productAPI.getProduct({id})
    })
    const dispatch = useDispatch();

    if(!product && isLoading){
        return <p>Loading......</p>;
    }

    if (!isLoading) {console.log("购物车单项",product);}

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
        <div className="grid grid-cols-[2fr,4fr,3fr,2fr,1fr] justify-between items-center gap-5
                        bg-slate-600 rounded-md 
                        border-b-2 border-slate-700
                        text-white py-3 px-3">
            {product && (
                <>
                    <Link to={`${product.id}`}>
                        <img className="hover:bg-gray-500 rounded-md" src={product.thumbnail} alt={product.title} />
                    </Link>

                    <Link to={`${product.id}`}>
                        <h3 className="hover:text-gray-300">{product.title}</h3>                    
                    </Link>
 
                    <p>${(product.price * quantity).toFixed(2)}</p>

                    <div className="w-20 flex justify-between gap-2">
                        <button className="w-6 h-6 bg-gray-200 rounded-full text-cyan-600 font-bold" onClick={handleMinusQuantity}>-</button>
                        <span>{quantity}</span>
                        <button className="w-6 h-6 bg-gray-200 rounded-full text-cyan-600 font-bold" onClick={handlePlusQuantity}>+</button>
                    
                    </div>

                    <button onClick={()=>dispatch(removeFromCart({productId,quantity}))}>
                        <Trash2Icon className="size-4 cursor-pointer hover:text-gray-400"/>
                    </button>
                </>
            )}
        </div>
    )
}