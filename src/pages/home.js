import { useEffect, useRef, useState } from "react"
import Product from "../components/product";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts, setCategory,setPage, setSearch } from "../store/productsSlice";
import { ChevronFirst, ChevronLast } from "lucide-react";


export default function Home(){
    const {items,status,error,total,page,limit,search,category,categories} = useSelector(state=>state.products);
    const dispatch = useDispatch();
    const [searchInput,setSearchInput] = useState("");
    console.log(items)

    //初次挂载时获取分类
    useEffect(()=>{
        dispatch(fetchCategories());
    },[dispatch]); 

    useEffect(()=>{
        dispatch(fetchProducts({page,limit,search,category}));
    },[dispatch,page,limit,search,category]);

    const totalPages = Math.ceil(total/limit);

    function handleSubmit(e){
        e.preventDefault();
        dispatch(setSearch(searchInput));  //submit提交时，将输入框的值保存更新到search，useEffect触发fetch
        setSearchInput("");
    }

    //<---------------------计算页码显示范围------------------------>
    const windowSize = 5 ;
    const pages = [] ;
    let start = Math.max(1, page-Math.floor(windowSize/2));
    let end = start + windowSize -1 ;
    if(end > totalPages) {
        end = totalPages;
        start = Math.max(1,totalPages-windowSize+1);
    }
    for(let i = start; i<=end; i++){
        pages.push(i);
    }


    if(status==='loading'){return <div className="flex justify-center items-center text-3xl font-600">Loading...</div>};
    if(error){return <div className="flex justify-center items-center text-3xl font-600">Error:{error}</div>};

    return (
        <div>
            <div className="py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <h1 className="text-3xl">List Products</h1>

                <form onSubmit={handleSubmit} className="bg-white p-1 flex rounded overflow-hidden shadow-lg">
                    <select className="w-24 sm:w-auto px-1 bg-gray-100 rounded outline-none border-r border-gray-300 shrink-0" //shrink-0避免在空间不足时被压缩得太小
                            onChange={(e)=>dispatch(setCategory(e.target.value))}
                            value={category}>
                        <option value='All'>All</option>
                        {categories.map((item)=>(
                            <option key={item.slug} value={item.slug}>{item.name}</option>
                        ))}
                    </select>

                    <input  className="min-w-0 px-3 py-1 flex-grow outline-none "   //min-w-0 是防止它因为flex布局而溢出的关键，搜索按钮不会被挤不见；flex-grow 代表有多余空间时,让搜索输入框占满剩余空间
                            type="text" placeholder="Search..."
                            value={searchInput}
                            onChange={(e)=>setSearchInput(e.target.value)}
                            />
                    <button type="submit" className="bg-gray-300 px-1.5 rounded hover:bg-gray-200">Search</button>
                </form>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
                 {status ==='succeeded' && items && (
                    items.map((item)=><Product key={item.id} data={item}/>)
                    )}
            </div>
            
            <div className="w-full flex justify-center gap-5 my-10">
                <button onClick={()=>{dispatch(setPage( Math.max(1,page-1) ))}}
                        disabled={page === 1}
                        className={`${page===1?"text-gray-300":"text-gray-500"}`}>
                    <ChevronFirst/>
                </button>

                {/*首页按钮*/}
                {start>1 &&(
                    <>
                        <button onClick={()=>dispatch(setPage(1))}> 1 </button>
                        {start>2 && <span>...</span>}
                    </>
                )}
                
                {/*中间页按钮，根据页码范围渲染*/}
                {pages.map(p => (
                    <button key={p} onClick={()=>dispatch(setPage(p))}
                            className={page===p? "text-xl font-bold":""}
                    >{p}</button>
                ))}

                {/*尾页按钮*/}
                {end<totalPages && (
                    <>
                        {end < totalPages-1 && <span>...</span>}
                        <button onClick={()=>dispatch(setPage(totalPages))}>{totalPages}</button>
                    </>
                )}

                <button onClick={()=>{dispatch(setPage( Math.min(totalPages,page+1) ))}}
                        disabled={page===totalPages}
                        className={page===totalPages?"text-gray-300":"text-gray-500"}>
                    <ChevronLast/>
                </button>
            </div>

        </div>
     
    )
}
