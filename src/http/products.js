import {api} from "./api";

export default function productsApi() {
    return {
        listProducts: async (page, size, categoryId, sortBy, sortDirection) =>
            api().get(`/products?page=${page}&size=${size}&categoryId=${categoryId}&sortBy=${sortBy}&sortDirection=${sortDirection}`),
        singleProduct: async (id) => 
            api().get(`/product/${id}`),
        listNearMe: async (latitude, longitude, maxDistanceInKm) =>
            api().get(`/nearby?latitude=${latitude}&longitude=${longitude}&maxDistanceInKm=${maxDistanceInKm}`),
        
    }
}