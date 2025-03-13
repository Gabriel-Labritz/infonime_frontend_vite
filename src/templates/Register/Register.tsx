import { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { userRegisterInterface } from '../../utils-types/user-register-interface';

// components
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Message from '../../components/Message/Message';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';

import './Register.css';

function Register() {
    const [user, setUser] = useState<userRegisterInterface>({ user_name: "", email: "", password: ""});
    const { register } = useUserContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register(user);
    }

    return (
        <>
            <div className='main-container'>
                <div className='background-area'>
                    <img src="../background-desktop.png" alt="background" />
                </div>
                <div className='form-container'>
                    <img src="../logo_052b647f68.png" alt="logo" />
                    <h2>Crie sua conta !</h2>
                    <Message />
                    <div className='form-area'>
                        <form action="#" method="post" onSubmit={handleSubmit}>
                            <Input type='text' name='user_name' placeholder='Nome de usuário' icon={<FaRegUser size={25}/>} onHandleChange={handleChange} />
                            <Input type='email' name='email' placeholder='Email' icon={<MdOutlineEmail size={28}/>} onHandleChange={handleChange} />
                            <Input type='password' name='password' placeholder='Senha' icon={<FiLock size={25}/>} onHandleChange={handleChange} />
                            <Button txtButton='Cadastre - se'/>
                        </form>

                        <a href="/login">
                            <div className='sign-up-box'>
                                <div className='box-info'>
                                    Já possui uma conta ?
                                    <span className='span-area'>Entrar</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;