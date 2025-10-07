import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

export default function Product(props){
    const {id,title,price,thumbnail} = props.data;
    const dispatch = useDispatch();
    
    function handleAddToCart(){
        dispatch(addToCart({
            productId:id,
            quantity:1
        }));
    }


   return (
    <div className="bg-white p-5 rounded-xl shadow-lg
                    flex flex-col justify-between gap-5">
        <Link to={`${id}`}>
            <img src={thumbnail}
                 className="w-full h-75 object-contain object-top drop-shadow-[0_8px_10px_lightgray]" />
        </Link>
        <h3 className="text-xl font-medium text-center py-3">{title}</h3>
        <div className="flex justify-between items-center">
            <p className="text-lg font-medium">${price}</p>
            <button className="bg-gray-300 rounded-md p-2 text-sm
                               flex gap-2
                               hover:bg-gray-200"
                    onClick={handleAddToCart}>
                <ShoppingCart className="size-5"/>
                Add To Cart
            </button>
        </div>
    </div>
   ) 
}