import Logo from '../resources/logo.png'
import './accessdenied.css'

const AccessDenied = () => {
    return (  
        <div className="denied">
            <div><img src={Logo} alt="logo" /></div>
            <div><h1>You are not authorized to view this page.</h1></div>
        </div>
    );
}
 
export default AccessDenied;