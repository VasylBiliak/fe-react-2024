export interface PaginationProps {
    page: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}
