import type { Product } from '@/interfaces/Product';

export const fetchProduct = async (productId: string): Promise<Product> => {
    const response = await fetch(`https://ma-backend-api.mocintra.com/api/v1/products/${productId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return await response.json();
};
