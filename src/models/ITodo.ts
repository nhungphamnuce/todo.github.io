export interface ITodoStatus {
    status?: 'Done' | 'Doing' | 'Fail' | string;
}
export interface ITodo extends ITodoStatus {
    id?: string;
    attributes: {
        name: string;
        start_date: Date;
        end_date: Date;

        description?: string;
        status: 'Done' | 'Doing' | 'Fail' | string;

    }
}
