import React from 'react'
import { PaginationProps } from '../interfaces/pagination.interface'

const Pagination: React.FC<PaginationProps> = ({ pageNumbers, currentPage, setCurrentPage }) => {

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className='flex justify-center pt-10'>
            <ul className="flex items-center justify-center w-3/4 sm:w-full flex-wrap -space-x-px text-base">
                <li>
                    <button onClick={goToPreviousPage} className={`${currentPage === 1 ? 'cursor-not-allowed hover:bg-gray-800 hover:text-gray-400' : ""} flex items-center justify-center px-4 h-10 transition duration-300 ms-0 leading-tight border border-e-0  rounded-s-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white`}>
                        <span className="sr-only">Previous</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>
                {pageNumbers.map((page: number, index: number) => (
                    <li key={index}>
                        <button onClick={() => handleClick(page)} className={`${currentPage === page ? 'bg-gray-700 text-white' : ''} flex items-center justify-center px-4 h-10 leading-tight transition duration-300 border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white`}>{page}</button>
                    </li>
                ))}
                <li>
                    <button onClick={goToNextPage} className={`${currentPage === pageNumbers.length ? 'cursor-not-allowed hover:bg-gray-800 hover:text-gray-400' : ""} flex items-center justify-center transition duration-300 px-4 h-10 leading-tight border rounded-e-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white`}>
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination