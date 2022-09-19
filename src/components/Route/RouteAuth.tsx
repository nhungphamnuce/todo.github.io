import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';
import { selectAuth } from '../../features/Auth/auth';

type Props = {}

const RouteAuth = (props: Props) => {
    const account = useAppSelector(selectAuth);
    
    console.log(account);
    
    return !account.account ? <Outlet /> : <Navigate to={'/'} />;
}

export default RouteAuth