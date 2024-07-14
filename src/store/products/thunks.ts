import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ma-backend-api.mocintra.com/api/v1/',
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (parameters: Record<string, string | number>) => {
    const query = new URLSearchParams(parameters as any).toString();
    const response = await api.get(`products?${query}`);
    return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId: string) => {
    const response = await api.get(`products/${productId}`);
    return response.data;
});
