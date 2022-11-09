import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'
import Logo from '../../assets/images/Nav_Logo.png'
import { useContext } from 'react';
import LoginContext from '../../context/LoginContext';
import { SearchBar } from '../SearchBar/SearchBar';

export default function Navbar() {
    const context = useContext(LoginContext);
    let location = useLocation();
    return (
        <>
            <nav className='navbar-container'>
                {sessionStorage.getItem("isLogged")
                    ?
                    <>
                        <Link to='/'>
                            <img src={Logo} alt="" />
                        </Link>
                        <SearchBar />
                        <div></div>
                    </>


                    :
                    <>
                        <Link to='/'>
                            <img src={Logo} alt="" />
                        </Link>

                        {
                            location.pathname === "/" ?
                                <div className='navbar-buttons'>
                                    <Link className='primary-button' to='Login'>
                                        Login
                                    </Link>
                                    <Link className='secondary-button' to='Cadastro'>
                                        Cadastro
                                    </Link>
                                </div>
                                : ''
                        }

                    </>
                }

            </nav>
        </>
    );
}