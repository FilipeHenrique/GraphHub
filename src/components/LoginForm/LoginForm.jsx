import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './LoginForm.css'
import api from '../../services/api';
import { useContext } from 'react';
import LoginContext from '../../context/LoginContext';

export function LoginForm() {

    const context = useContext(LoginContext);

    const schema = yup.object({
        username: yup.string().required('Por favor forneça seu usuário'),
        password: yup.string().required('Por favor forneça sua senha')
    }).required();

    const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});

    const onSubmit = data => {
        context.Login(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='login-form'>

                <label htmlFor="Username" className='login-form_label form-label'>Usuário</label>
                <input {...register("username",{ required: true})} type="text" id="Username" className='login-form_input' />
                <p className='login-form-error-message '>{errors.username?.message}</p>

                <label htmlFor="Password" className='login-form_label form-label'>Senha</label>
                <input {...register("password",{ required: true})} type="password" id="Password" className='login-form_input' />
                <p className='login-form-error-message '>{errors.password?.message}</p>

                <button type="submit" className='form-button login-button'>Login</button>

                <p style={{textAlign: 'center',marginRight: '10px'}}>
                    Não possui uma conta? <Link to='/Cadastro' className='link'>Cadastre-se</Link> 
                </p>
                
            </form>
        </>
    );
}
