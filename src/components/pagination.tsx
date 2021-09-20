import React, {ReactElement} from "react";
import ClickLink from "./click-link";

export interface PaginationProps {
    page: number;
    total: number;
    limit: number;
    onPageChange: (page: number) => void;
}

function Pagination({page, total, limit, onPageChange}: PaginationProps): ReactElement | null {
    if (page === 1 && total < limit) {
        return null;
    }

    return (
        <nav aria-label="navigation">
            <ul className="pagination">
                {
                    page !== 1 ?
                        <li className="page-item">
                            <ClickLink className="page-link" href="#"
                                       onClick={() => onPageChange(page - 1)}>Previous</ClickLink>
                        </li> : null
                }
                {
                    total === limit ?
                        <li className="page-item">
                            <ClickLink className="page-link" href="#"
                                       onClick={() => onPageChange(page + 1)}>Next</ClickLink>
                        </li> : null
                }
            </ul>
        </nav>
    );
}

export default Pagination;