import { Link } from 'react-router-dom';
import { useContext } from 'react';
import LoginContext from '../../context/LoginContext';
import Logo from '../../assets/images/Logo.png'
import './HomePage.css'

export function HomePage() {
    const context = useContext(LoginContext);
    return (
        <>
            <div className='homepage-container'>
                <div className='homepage-container-left'>
                    <h1 className='homepage-title'>GraphHub</h1>
                    <p className='homepage-description'>Uma ferramenta para armazenamento e visualização de Grafos<br></br></p>
                    <Link className='primary-button' to='Cadastro'>
                        Comece Agora!
                    </Link>
                </div>
                <div className='homepage-container-right'>
                    <img className='homepage-image' src={Logo} alt="" />
                </div>

            </div>
        </>
    );
}