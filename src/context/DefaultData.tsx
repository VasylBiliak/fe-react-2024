const getFilteredCards = async (cards, query) => {
    const { categoryId = 0, title = '', sortOrder = 'asc', offset = 0, limit = 10 } = query;

    return cards
        .filter((card) => {
            const isCategoryMatched = categoryId === 0 || card.category.id === Number(categoryId);
            const matchesTitle = !title || card.title.toLowerCase().includes(String(title).toLowerCase());
            return isCategoryMatched && matchesTitle;
        })
        .sort((a, b) =>
            sortOrder === 'asc'
                ? new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime()
                : new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime(),
        )
        .slice(Number(offset), Number(offset) + Number(limit))
        .map((card, index) => ({ ...card, id: card.id || index + 1 }));
};

export default getFilteredCards;
