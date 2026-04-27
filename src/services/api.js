import axios from "axios";


export const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PRODUCT_API
});

export const mockApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MOCK_API
});
