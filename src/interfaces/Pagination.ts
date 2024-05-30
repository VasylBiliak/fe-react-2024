export interface PaginationProps {
    page: number;
    limit: number;
    total: number;
    setCurrentPage: (page: number) => void;
}
