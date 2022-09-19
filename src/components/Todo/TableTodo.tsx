import styled from '@emotion/styled';
import { Pagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { ITodo } from '../../models/ITodo';
import RowTodo from './RowTodo';
interface Column {
    id: 'name' | 'created' | 'dealine' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    {
        id: 'created',
        label: 'Created',
        minWidth: 170,
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'dealine',
        label: 'Deadline',
        minWidth: 170,
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        format: (value: number) => value.toFixed(2),
    },
];

interface Props {
    todos: ITodo[];
}
export default function TableTodo({ todos }: Props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper
            sx={{
                boxSizing: 'border-box',
                width: '90%',

                m: 'auto',
                overflow: 'hidden',
            }}
        >
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center">
                                Actions
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todos.map((row, i) => {
                            return (
                                <RowTodo
                                    key={i.toString() + row.id}
                                    todo={row}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                sx={{ p: 2, float: 'right' }}
                getItemAriaLabel={(type, page: number) => {
                    console.log(page);

                    return ''
                }}
                count={Math.ceil(todos.length / rowsPerPage)}
                variant="outlined"
                color="primary"
            />
        </Paper>
    );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#26a69a',
        color: '#fff',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
