import { createSlice } from '@reduxjs/toolkit';

import type { Product } from '@/interfaces/Product';

import { fetchProductById, fetchProducts } from './thunks';

interface ProductsState {
    productsList: Product[];
    isError: boolean;
    isLoading: boolean;
    totalProducts: number;
    product?: Product;
}

const initialState: ProductsState = {
    productsList: [],
    isError: false,
    isLoading: false,
    totalProducts: 0,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsList = action.payload.products;
                state.totalProducts = action.payload.total;
                state.isError = false;
                state.isLoading = false;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.product = action.payload;
                state.isError = false;
                state.isLoading = false;
            })
            .addCase(fetchProductById.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });
    },
});

export const selectProducts = (state: { products: ProductsState }) => state.products.productsList;
export const selectIsLoading = (state: { products: ProductsState }) => state.products.isLoading;
export const selectIsError = (state: { products: ProductsState }) => state.products.isError;
export const selectTotalProducts = (state: { products: ProductsState }) => state.products.totalProducts;

export default productsSlice.reducer;
