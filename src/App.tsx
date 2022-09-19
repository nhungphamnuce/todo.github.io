import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Todo from './Pages/Todo';
import PrivateRoute from './components/Route/PrivateRoute';
import RouteAuth from './components/Route/RouteAuth';

type Props = {};

function App(props: Props) {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute />}>
                <Route index element={<Todo />} />
            </Route>
            <Route path='' element={<RouteAuth/>} >
                <Route path="login" element={<Login />}></Route>
            </Route>
            <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Routes>
    );
}

export default App;
