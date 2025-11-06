import { API_CONFIG } from "./config";

class ProductAPI {
    createUrl(endpoint,params){
        const searchParams = new URLSearchParams({...params});
        return `${endpoint}?${searchParams.toString()}`;
    }

    async fetchData(url){
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Product API Error:${response.statusText}`);
        }
        return response.json();
    }

    async productsList({page}){
        const limit = 12;
        const skip = (page-1)*limit;
        const url = this.createUrl(`${API_CONFIG.BASE_URL}`, {limit:limit.toString(),skip:skip.toString()});
        const data = await this.fetchData(url);
        return data;
    }

    async getProduct({id}){
        const productId=id.toString();
        const url = `${API_CONFIG.BASE_URL}/${productId}`;
        const data = await this.fetchData(url);
        return data;
    }

    async productsByCategory({category,page}){
        const limit = 12;
        const skip = (page-1)*limit;
        const url = this.createUrl(`${API_CONFIG.CATEGORY_URL}/${category}`, {limit:limit.toString(), skip:skip.toString()});
        const data = await this.fetchData(url);
        return data;
    }
    
    async searchProducts({search,page}){
        const limit = 12;
        const skip = (page-1)*limit;
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/search`, {q:search, limit:limit.toString(), skip:skip.toString()});
        const data = await this.fetchData(url);
        return data;
    }

}

export const productAPI = new ProductAPI();