import { useQuery } from "@tanstack/react-query";
import { productAPI } from "../api/product_api";

export function useProducts ({page=1, category="All",search=""}){
    const key = ["products",{page,category,search}];
    async function queryFn (){
        if(search && search.trim()){
            return productAPI.searchProducts({search:search.trim(), page});
        }
        if(category && category!=="All"){
            return productAPI.productsByCategory({category,page});
        }
        return productAPI.productsList({page});
    }

    const {data,isLoading,isFetching,error} = useQuery({
        queryKey:key,
        queryFn,
        keepPreviousData:true
    });

    //根据请求的数据，计算页码范围
    const limit = 12;
    const total = data?.total;
    const totalPages = Math.max(1, Math.ceil(total/limit));

    return {
        data,
        totalPages,
        isLoading,
        isFetching,
        error
    };
}