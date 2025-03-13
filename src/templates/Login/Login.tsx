import { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { userLoginInterface } from '../../utils-types/user-login-interface';

// components
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Message from '../../components/Message/Message';
import { MdOutlineEmail } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';

import './Login.css';

function Login() {
    const [user, setUser] = useState<userLoginInterface>({ email: "", password: ""});
    const { login } = useUserContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(user);
    }

    return (
        <>
            <div className='main-container'>
                <div className='background-area'>
                    <img src="../background-desktop.png" alt="background" />
                </div>
                <div className='form-container'>
                    <img src="../logo_052b647f68.png" alt="logo" />
                    <h2>Acesse sua conta !</h2>
                    <Message />
                    <div className='form-area'>
                        <form action="#" method="post" onSubmit={handleSubmit}>
                            <Input type='email' name='email' placeholder='Email' icon={<MdOutlineEmail size={28}/>} onHandleChange={handleChange} />
                            <Input type='password' name='password' placeholder='Senha' icon={<FiLock size={25}/>} onHandleChange={handleChange} />
                            <Button txtButton='Entrar'/>
                        </form>

                        <a href="/register">
                            <div className='sign-up-box'>
                                <div className='box-info'>
                                    Não possui uma conta ?
                                    <span className='span-area'>Cadastre - se</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;