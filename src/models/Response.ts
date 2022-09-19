import { ITodo } from './ITodo';

export interface ListResponse {
    data: ITodo[];
    meta: {
        pagination: Pagination;
    };
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}
