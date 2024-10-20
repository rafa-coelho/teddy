import React from 'react';
import './pagination.component.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const getPages = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        if (currentPage <= 3) {
            pages.push(...Array.from({ length: 4 }, (_, i) => i + 2), '...');
        } else if (currentPage >= totalPages - 3) {
            pages.push('...', ...Array.from({ length: 4 }, (_, i) => totalPages - 4 + i));
        } else {
            pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                {'<'}
            </button>
            {getPages().map((page, index) =>
                typeof page === 'number' ? (
                    <button
                        key={index}
                        className={`page-number ${page === currentPage ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="ellipsis">
                        {page}
                    </span>
                )
            )}
            <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => onPageChange(currentPage + 1)}
            >
                {'>'}
            </button>
        </div>
    );
};

export default Pagination;
