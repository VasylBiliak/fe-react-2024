import type { Product } from '@/interfaces/Product';
import type { QueryParameters } from '@/interfaces/QueryParameters';

const getFilteredCards = async (cards: Product[], query: string) => {
    const queryParameters: QueryParameters = Object.fromEntries(new URLSearchParams(query)) as any;
    const categoryId = Number(queryParameters.categoryId) || 0;
    const title = queryParameters.title?.toLowerCase() || '';
    const sortOrder = queryParameters.sortOrder || 'asc';
    const offset = Number(queryParameters.offset) || 0;
    const limit = Number(queryParameters.limit) || 10;

    let filteredCards = [...cards];

    if (title) {
        filteredCards = filteredCards.filter((card: Product) => card.title.toLowerCase().includes(title));
    }

    if (categoryId > 0) {
        filteredCards = filteredCards.filter((card: Product) => card.category.id === categoryId);
    }

    if (sortOrder) {
        filteredCards.sort((a: Product, b: Product) => {
            const comparison = new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime();
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }

    const total = filteredCards.length;
    filteredCards = filteredCards.slice(offset, offset + limit);

    return { filteredCards, total };
};

export default getFilteredCards;
