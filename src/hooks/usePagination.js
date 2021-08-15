import {useMemo} from "react";

export const usePagination = (pages, totalPages, setPages) => {
    return useMemo(() => {

        for (let i = 0; i < totalPages; i++) {
            pages.push(i + 1);
        }
        return setPages(pages);
    }, [totalPages])
}