import { useEffect } from "react"
import Product from "../components/product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";


export default function Home(){
    const {items,status,error} = useSelector(state=>state.products);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    if(status==='loading'){return <div className="flex justify-center items-center text-3xl font-600">Loading...</div>};
    if(error){return <div className="flex justify-center items-center text-3xl font-600">Error:{error}</div>};

    return (
        <div>
            <h1 className="text-3xl my-5">List Products</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
                {items.map((item)=><Product key={item.id} data={item}/>)}
            </div>
        </div>
    )
}
