import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import './SignUpForm.css'
import { useNavigate } from "react-router-dom";
import api from '../../services/api'

export function SignUpForm() {

    const schema = yup.object({
        username: yup.string().required('Por favor forneça seu usuário'),

        password: yup.string().required('Por favor forneça sua senha').min(6,'A senha deve possuir ao menos 6 caracteres').max(10,'A senha deve possuir no máximo 10 caracteres'),
    
        passwordConfirm: yup.string().required('Por favor confirme sua senha').oneOf([yup.ref('password'), null], 'As senhas não coincidem'),

    }).required();

    const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});

    let navigate = useNavigate();

    const onSubmit = data => {
        
        const user = {
            username: data.username,
            password: data.password
        }

        api.post(`/users/`,user)
        .then((response)=>{
            navigate("/Login", { replace: true });
        })
        .catch((error)=>{
            alert(error.response.data.detail);
        })

    };

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='SignUp-form'>
                <label htmlFor="SignUp" className='SignUp-form_label form-label'>Usuário</label>
                <input {...register("username",{ required: true})} type="text" id="SignUp"className='SignUp-form_input'/>
                <p className='login-form-error-message '>{errors.username?.message}</p>


                <label htmlFor="Password" className='SignUp-form_label form-label'>Senha</label>
                <input {...register("password",{ required: true, minLenght: 6})} type="password" minLength={6} maxLength={10} id="Password" className='SignUp-form_input' />
                <p className='login-form-error-message '>{errors.password?.message}</p>


                <label htmlFor="PasswordConfirm" className='SignUp-form_label form-label'>Confirmar Senha</label>
                <input {...register("passwordConfirm",{ required: true})} type="password" min='6' max='10' id="PasswordConfirm" className='SignUp-form_input' />
                <p className='login-form-error-message '>{errors.passwordConfirm?.message}</p>


                <button type="submit" className='form-button SignUp-button'>Cadastrar</button>

                <p style={{textAlign: 'center',marginRight: '10px'}}>
                    Já possui uma conta? <Link to='/Login' className='link'>Entrar</Link> 
                </p>
            </form>
        </>
    );
}