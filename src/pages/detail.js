import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { addToCart } from "../store/cartSlice";
import { fetchProductDetail } from "../store/productDetailSlice";

export default function Detail(){
    const {id} = useParams();
    const product = useSelector(state => state.productDetail.items[id]);
    const status = useSelector(state => state.productDetail.status[id]);
    const dispatch = useDispatch();
   
    const navigate = useNavigate();
    const [quantity,setQuantity] = useState(1);

    //根据id发送请求拉取数据
    useEffect(()=>{
        dispatch(fetchProductDetail(id));
    },[id, dispatch]);
    
    //加载完成后，检查获取到的数据是否为空
    useEffect(()=>{
       if(status==="succeeded" && !product){
        navigate("/");
       }
    },[status,product,navigate]);
    

    function handleMinusQuantity(){
        setQuantity(prev=>(prev-1<1? 1 : prev-1));
    }

    function handlePlusQuantity(){
        setQuantity(prev=>prev+1);
    }

    function handleAddToCart(){
        dispatch(addToCart({
            productId : product.id,
            quantity : quantity
        }))
    }

    return (
        <div className="py-5">
            <h2 className="text-3xl">Product Detail</h2>
            {product ? (
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div>
                        <img src={product.thumbnail} alt={product.title} 
                             className="w-full h-[380px] object-contain"/>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h1 className="text-4xl uppercase font-bold">{product.title}</h1>
                        <p className="font-bold text-3xl">${product.price}</p>
                        <div className="flex gap-5">{/*控制购物车的按钮*/}
                            <div className="flex gap-2 justify-center items-center">
                                <button className="bg-gray-100 h-full w-10 rounded-xl font-bold text-xl flex justify-center items-center" onClick={handleMinusQuantity}>-</button>
                                <span className="bg-gray-300 h-full w-10 rounded-xl font-bold text-xl flex justify-center items-center">{quantity}</span>
                                <button className="bg-gray-100 h-full w-10 rounded-xl font-bold text-xl flex justify-center items-center" onClick={handlePlusQuantity}>+</button>
                            </div>
                            <button className="bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl"
                                    onClick={handleAddToCart}>
                                Add To Cart
                            </button>
                        </div>
                        <p className="text-lg pr-8">{product.description}</p>
                    </div>
                </div>
            ):(<p>Loading...</p>)}
        </div>
    );
}