import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';
import { selectAuth } from '../../features/Auth/auth';

type Props = {};

const PrivateRoute = (props: Props): JSX.Element => {
    const account = useAppSelector(selectAuth).account;
    console.log(account);
    
    return account ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateRoute;
