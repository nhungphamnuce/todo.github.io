import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import ModalCreate from '../components/Todo/ModalCreate';
import TableTodo from '../components/Todo/TableTodo';
import { fetchTodos, selectTodos } from '../features/Todo/todos';
import { useAppDispatch, useAppSelector } from './../app/hook';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logOut } from '../features/Auth/auth';
type Props = {};

const Todo = (props: Props) => {
    const dispatch = useAppDispatch();
    const listTodo = useAppSelector(selectTodos);
    console.log({ listTodo });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    React.useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);
    const handleLogout = () => {
        dispatch(logOut())

    }
    return (
        <div>
            <ModalCreate open={open} handleClose={handleClose} />
            <Box sx={{ float: 'right', boxSizing: 'border-box', pl: 10, pb: 3, mr: 10 }}>
                <Button
                    onClick={handleOpen}
                    variant="contained"
                    color="success"
                    sx={{ mr: 3 }}
                    startIcon={<AddIcon />}
                >
                    Create
                </Button>
                <Button
                    variant='outlined'
                    startIcon={<LogoutOutlinedIcon />}
                    onClick={handleLogout}
                >
                    logout
                </Button>
            </Box>
            <TableTodo todos={listTodo} />
        </div>
    );
};

export default Todo;
