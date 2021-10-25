import React from 'react';
import classes from "./Pagination.module.css";
import {usePagination} from "../../../hooks/usePagination";

const Pagination = ({totalPages, currentPage, changePage}) => {
    const paginationArray = usePagination(totalPages)

    return (
        <div className={classes.pagination}>
            {
                paginationArray.map(p =>
                    <button
                        key={p}
                        className={currentPage === p
                            ? [classes.pagination__item, classes.current].join(' ')
                            : classes.pagination__item}
                        onClick={() => changePage(p)}
                    >
                        {p}
                    </button>
                )
            }
        </div>
    );
};

export default Pagination;