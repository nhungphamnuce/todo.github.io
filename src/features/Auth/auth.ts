import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/Store';
import { LOGIN_URL } from '../../constants/Url';
import { Account } from '../../models/Account';
import { authAxios } from './../../aixos/authAxios';

interface AuthState {
    isLoading?: boolean;
    error?: string;
    account?: Account;
}

const initialState: AuthState = {};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action: PayloadAction<Account>) => {
            state.account = action.payload;
        },
        loginFaild: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        logOut: () => {
            return { ...initialState };
        },
    },
});

export const { loginFaild, loginRequest, loginSuccess, logOut } =
    authSlice.actions;

export const postLogin = createAsyncThunk(
    'auth/login',
    async (account: Account, { dispatch }) => {
        try {
            const { data } = await authAxios.post('', account);
            console.log({ data });

            dispatch(loginSuccess(account))
        } catch (error: any) {
            let message = error?.response?.data?.error?.message || error.message;
            dispatch(loginFaild(message))
        }
    },
);

export const selectAuth = (state: RootState) => ({
    ...state.authPersistedReducer,
});
export default authSlice.reducer;
