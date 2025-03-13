import api from '../utils/api';
import useFlashMessage from './useFlashMessage';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// types interface
import { userRegisterInterface } from '../utils-types/user-register-interface';
import { userLoginInterface } from '../utils-types/user-login-interface';
import { userAuthInterface } from '../utils-types/user-auth-interface';

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();
    const location = useLocation();

    const publicRoutes = ['/register', '/login'];

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        } else if(!publicRoutes.includes(location.pathname)) {
            navigate('/login');
        }

        setLoading(false);
    }, []);

    async function register(user: userRegisterInterface) {

        let msgTxt = 'Cadastro realizado com sucesso !';
        let msgTypeSuccess = true;

        try {
            const data = await api.post('/users/register', user)
            .then((response) => response.data);
            
            await authUser(data);
        } catch (error: any) {
            msgTxt = error.response.data.message;
            msgTypeSuccess = false;
        }

        setFlashMessage(msgTxt, msgTypeSuccess);
    }

    async function login(user: userLoginInterface) {
        let msgTxt = 'Login realizado com sucesso!';
        let msgTypeSuccess = true;

        try {
            const data = await api.post('/users/login', user).then((response) => response.data);

            await authUser(data);
        } catch (error: any) {
            msgTxt = error.response.data.message;
            msgTypeSuccess = false;
        }

        setFlashMessage(msgTxt, msgTypeSuccess);
    }

    async function authUser(data: userAuthInterface) {
        setAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/');
    }

    function logout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = '';
        navigate('/login');
    }

    return { register, login, authenticated, loading, logout };
}