import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    IconButton,
    Modal,
    TableCell,
    TableRow,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import React from 'react';
import { useAppDispatch } from '../../app/hook';
import { removeTodo } from '../../features/Todo/todos';
import { ITodo } from '../../models/ITodo';
import { deleteTodo } from './../../features/Todo/todos';
import ModalEdit from './ModalEdit';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModalViewDetail from './ModalViewDetail';
type Props = {
    todo: ITodo;
};

const RowTodo = ({ todo }: Props) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);
    const [modalView, setModalView] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseView = () => setModalView(false);

    const handleDelete = () => {
        dispatch(removeTodo(todo));
        dispatch(deleteTodo(todo.id || ''));
    };
    return (
        <>
            <Modal
                keepMounted
                open={modalDelete}
                onClose={() => setModalDelete(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={{ ...style, borderRadius: 3 }}>
                    <Typography my={3} variant={'h6'}>
                        Are you sure you want to delete?
                    </Typography>
                    <Button
                        variant="outlined"
                        color="success"
                        type="submit"
                        sx={{ mr: 2 }}
                        onClick={() => setModalDelete(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        onClick={handleDelete}
                    >
                        Confirm
                    </Button>
                </Box>
            </Modal>
            <ModalViewDetail todo={todo} open={modalView} handleClose={handleCloseView} />
            <ModalEdit open={open} handleClose={handleClose} todo={todo} />
            <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell>{todo.attributes.name}</TableCell>
                <TableCell>
                    {moment(todo.attributes.start_date).format('YYYY/MM/DD')}
                </TableCell>
                <TableCell>
                    {moment(todo.attributes.end_date).format('YYYY/MM/DD')}
                </TableCell>
                <TableCell>
                    {todo.attributes.status.toLowerCase() === 'done' && (
                        <Box sx={{ color: 'success.main' }}>{todo.attributes.status}</Box>
                    )}
                    {todo.attributes.status.toLowerCase() === 'doing' && (
                        <Box sx={{ color: 'warning.main' }}>{todo.attributes.status}</Box>
                    )}
                    {todo.attributes.status.toLowerCase() === 'fail' && (
                        <Box sx={{ color: 'error.main' }}>{todo.attributes.status}</Box>
                    )}
                </TableCell>
                <TableCell>
                    <Button onClick={() => setModalView(true)}>
                        <RemoveRedEyeOutlinedIcon />
                    </Button>
                    <Button onClick={handleOpen}>
                        <BorderColorOutlinedIcon />
                    </Button>
                    <IconButton
                        onClick={() => setModalDelete(true)}
                        aria-label="delete"
                        color="primary"
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
};

export default RowTodo;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
