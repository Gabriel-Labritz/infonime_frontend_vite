import { Navigate, Outlet} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PrivateRouter() {
    const { authenticated, loading} = useAuth();

    if(loading) {
        return <p>Carregando...</p>
    }

    return authenticated ? <Outlet /> : <Navigate to='/login' replace/>
}

export default PrivateRouter;