import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
    Alert,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React from 'react';
import { useAppDispatch } from '../../app/hook';
import { AddTodo, createTodo } from '../../features/Todo/todos';
import { ITodo } from '../../models/ITodo';

type Props = {
    open: boolean;
    handleClose: () => void;
};

const ModalCreate = ({ open, handleClose }: Props) => {
    const dispatch = useAppDispatch();
    const [errorMessage, setErroMessage] = React.useState('');
    const [todoValue, setTodoValue] = React.useState<ITodo>({
        attributes: {
            name: '',
            start_date: new Date(),
            end_date: new Date(),
            status: 'Done',
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!todoValue.attributes.name) {
            setErroMessage("name is not empty")
            return
        }
        dispatch(AddTodo(todoValue));
        dispatch(createTodo(todoValue))
        handleClose();
    };

    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={{ ...style, borderRadius: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Stack
                        direction={'row'}
                        alignItems="center"
                        justifyContent={'space-between'}
                    >
                        <Typography variant="h6">Add Task</Typography>
                        <IconButton aria-label="close" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    {errorMessage && (
                        <Alert severity="error">{errorMessage}</Alert>
                    )}
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Name"
                        multiline
                        sx={{ width: '100%', my: 1 }}
                        onChange={(e) =>
                            setTodoValue({
                                ...todoValue,
                                attributes: {
                                    ...todoValue.attributes,
                                    name: e.target.value
                                },
                            })
                        }
                    />


                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label="Deadline"
                            inputFormat="MM/DD/YYYY"
                            value={todoValue.attributes.end_date}
                            onChange={(e) =>
                                setTodoValue({
                                    ...todoValue,
                                    attributes: {
                                        ...todoValue.attributes,
                                        end_date: e || new Date()
                                    },
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    sx={{ width: '100%', my: 1 }}
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <FormControl sx={{ width: '100%', my: 1 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                            Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Age"
                            value={todoValue.status}
                            onChange={(e) =>
                                setTodoValue({
                                    ...todoValue,
                                    attributes: {
                                        ...todoValue.attributes,
                                        status: e.target.value
                                    },
                                })
                            }
                        >
                            <MenuItem value={'Done'}>Done</MenuItem>
                            <MenuItem value={'Doing'}>Doing</MenuItem>
                            <MenuItem value={'Fail'}>Fail</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction={'row'} justifyContent="flex-end">

                        <Button
                            variant="outlined"
                            color="success"
                            type="submit"
                            sx={{ mr: 2 }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                            type="submit"
                        >
                            Save
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
};

export default ModalCreate;

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
