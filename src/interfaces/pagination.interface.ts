export interface PaginationProps {
    pageNumbers: number[];
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}