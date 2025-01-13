export interface QueryParameters {
    categoryId?: number;
    title?: string;
    sortOrder?: 'asc' | 'desc';
    offset?: number;
    limit?: number;
}
