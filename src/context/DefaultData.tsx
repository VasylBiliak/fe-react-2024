const getFilteredCards = async (cards: any, query: string) => {
    const queryParameters = Object.fromEntries(new URLSearchParams(query));
    const categoryId = Number(queryParameters.categoryId) || 0;
    const title = queryParameters.title?.toLowerCase() || '';
    const sortOrder = queryParameters.sortOrder || 'asc';
    const offset = Number(queryParameters.offset) || 0;
    const limit = Number(queryParameters.limit) || 10;

    let filteredCards = [...cards];

    if (title) {
        filteredCards = filteredCards.filter((card: any) => card.title.toLowerCase().includes(title));
    }

    if (categoryId > 0) {
        filteredCards = filteredCards.filter((card: any) => card.category.id === categoryId);
    }

    if (sortOrder) {
        filteredCards.sort((a: any, b: any) => {
            const comparison = new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime();
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }

    const total = filteredCards.length;
    filteredCards = filteredCards.slice(offset, offset + limit);

    return { filteredCards, total };
};

export default getFilteredCards;
