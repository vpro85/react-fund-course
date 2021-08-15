import React from 'react';
import {usePagination} from "../../../hooks/usePagination";

const Pagination = ({pagesArray, page, changePage,totalPages, setPagesArray}) => {

    usePagination(pagesArray, totalPages, setPagesArray);

    return (
        <div className="page__wrapper">
            {pagesArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? ' page page__current ' : 'page'}>
                        {p}
                    </span>
            )}
        </div>
    );
};

export default Pagination;