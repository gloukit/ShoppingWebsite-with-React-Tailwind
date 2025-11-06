import {useEffect,useState } from "react"
import Product from "../components/product";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/use-products";


export default function Home(){
    {/*const {items,status,error,total,page,limit,search,category,categories} = useSelector(state=>state.products);
    console.log(items)

    const dispatch = useDispatch();
    
    //初次挂载时获取分类
    useEffect(()=>{
        dispatch(fetchCategories());
    },[dispatch]); 

    useEffect(()=>{
        dispatch(fetchProducts({page,limit,search,category}));
    },[dispatch,page,limit,search,category]); */}


    //改为 Tanstack query 从服务端获取数据，包括：产品详情、分类

    //状态变量的初始值：从路由地址的参数中获取
    const [searchParams,setSearchParams] = useSearchParams();

    const [page,setPage] = useState(Number(searchParams.get("page") || 1));
    const [category,setCategory] = useState(searchParams.get("category") || "All");
    const [search,setSearch] = useState(searchParams.get("search") || "");
    const [searchInput,setSearchInput] = useState(searchParams.get("search") || "");
    const [categoryList,setCategoryList] = useState([]);
    console.log(searchParams);

    const {data,totalPages,isLoading,error} = useProducts({page,category,search});
    console.log(data?.products);


    //<------------ 当URL查询参数发生变化时，同步到state状态变量 ------------->
    useEffect(()=>{
        const p = Number(searchParams.get("page") || 1);
        const c = searchParams.get("category") || "All";
        const s = searchParams.get("search") || "";

        //只有和旧值不一样，才重新渲染
        setPage((prev) => (prev === p ? prev : p));
        setCategory((prev) => (prev === c ? prev : c));
        setSearch((prev) => (prev === s ? prev : s));
        setSearchInput((prev) => (prev === s ? prev : s));
    },[searchParams.toString()]);

    //<------------ 当state变量产生变化时，将之同步写入 URL 路由地址 ------------->
    useEffect(() => {
        const params = {} ;
        if(page && page>1) params.page = page ;
        if(category && category !== "All") params.category = category ;
        if(search && search.trim()) params.search = search.trim();
        setSearchParams(params);
    },[page,category,search]);


    //<------------ 获取分类下拉列表 ------------->
    useEffect(()=>{
        async function getCategoryList () {
            try {
                const response = await fetch("https://dummyjson.com/products/categories");
                if(!response.ok) throw new Error(response.statusText);
                const data = await response.json();
                setCategoryList(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getCategoryList();
    },[]);

    //<------------ 分类表单提交触发函数 ------------->
    function handleSelect(e){
        setCategory(e.target.value);
        setSearch(""); 
        setPage(1);
        setSearchInput("");
    }

    //<------------ 搜索提交触发函数 ------------->
    function handleSubmit(e){
        e.preventDefault();
        setSearch(searchInput);
        setPage(1);
        setCategory("All");
    }

    //<------------ 同步输入框的值 ------------->
    useEffect(()=>{
        setSearchInput(search);
    },[search]);

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

    if(isLoading){return <div className="flex justify-center items-center text-3xl font-600">Loading...</div>};
    if(error){return <div className="flex justify-center items-center text-3xl font-600">Error:{error}</div>};

    return (
        <div>
            <div className="py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <h1 className="text-3xl">List Products</h1>

                <form onSubmit={handleSubmit} className="bg-white p-1 flex rounded overflow-hidden shadow-lg">
                    <select className="w-24 sm:w-auto px-1 bg-gray-100 rounded outline-none border-r border-gray-300 shrink-0" //shrink-0避免在空间不足时被压缩得太小
                            onChange={handleSelect}
                            value={category}>
                        <option value='All'>All</option>
            
                        {categoryList.map((item)=>(
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
                 {!isLoading && data.products && (
                    data.products.map((item)=><Product key={item.id} data={item}/>)
                    )}
            </div>
            
            <div className="w-full flex justify-center gap-5 my-10">
                <button onClick={()=>setPage( Math.max(1,page-1))}
                        disabled={page === 1}
                        className={`${page===1?"text-gray-300":"text-gray-500"}`}>
                    <ChevronFirst/>
                </button>

                {/*首页按钮*/}
                {start>1 &&(
                    <>
                        <button onClick={()=>setPage(1)}> 1 </button>
                        {start>2 && <span>...</span>}
                    </>
                )}
                
                {/*中间页按钮，根据页码范围渲染*/}
                {pages.map(p => (
                    <button key={p} onClick={()=>setPage(p)}
                            className={page===p? "text-xl font-bold":""}
                    >{p}</button>
                ))}

                {/*尾页按钮*/}
                {end < totalPages && (
                    <>
                        {end < totalPages-1 && <span>...</span>}
                        <button onClick={()=>setPage(totalPages)}>{totalPages}</button>
                    </>
                )}

                <button onClick={()=>setPage( Math.min(totalPages,page+1) )}
                        disabled={page===totalPages}
                        className={page===totalPages?"text-gray-300":"text-gray-500"}>
                    <ChevronLast/>
                </button>
            </div>

        </div>
     
    )
}
