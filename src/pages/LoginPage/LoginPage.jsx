import { LoginForm } from '../../components/LoginForm/LoginForm';
import './LoginPage.css'
import Logo1 from '../../assets/images/Graph_asset1.png'
import Logo2 from '../../assets/images/Graph_asset2.png'
import Logo3 from '../../assets/images/Graph_asset3.png'

export function LoginPage(){
    return(
        <>
            <div className='login-page_container'>
                <h1 className='login-title'>Login</h1>
                <LoginForm />
                <img className='floating-graph1' src={Logo1} alt="" />
                <img className='floating-graph2' src={Logo2} alt="" />
                <img className='floating-graph3' src={Logo3} alt="" />
            </div>

        </>
    );
}
