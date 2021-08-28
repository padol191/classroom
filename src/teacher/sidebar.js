import './css/sidebar.css';
import Logo from '../resources/logo.png'
import { useHistory } from 'react-router-dom';

const Sidebar = () => {

    const history = useHistory();

    const handleLogout = () => {
        localStorage.clear()
        history.push("/");
    }

    return (
        <div className="sidebar">  

            <div className="sidebarHeading">

                <div className="logo"><img src={Logo} alt="logo" /></div>
                <div className="appName">Kisan Kalyan</div>

            </div>

            <hr />

            <div className="sidebarItems">
                <div className="sidebarItem">
                    <div className="itemIcon"><i className="fas fa-chart-pie"></i></div>
                    <div className="itemName">Dashboard</div>
                </div>

                <div className="sidebarItem">
                    <div className="itemIcon"><i className="fas fa-seedling"></i></div>
                    <div className="itemName">Recommendation</div>
                </div>

                <div className="sidebarItem">
                    <div className="itemIcon"><i className="fas fa-rupee-sign" aria-hidden="true"></i></div>
                    <div className="itemName">Sell your produce</div>
                </div>

                <div className="sidebarItem">
                    <div className="itemIcon"><i className="fa fa-shopping-cart" aria-hidden="true"></i></div>
                    <div className="itemName">Buy equipments</div>
                </div>

                <div className="sidebarItem">
                    <div className="itemIcon"><i className="fa fa-shopping-cart" aria-hidden="true"></i></div>
                    <div className="itemName">Buy products</div>
                </div>

                <div className="sidebarItem">
                    <div className="itemIcon"><i className="fas fa-user-alt"></i></div>
                    <div className="itemName">Profile</div>
                </div>
                
            </div>

            <div className="sidebarFooter">
                <div className="logout" onClick={handleLogout}>Logout</div>
                <div className="logoutIcon"><i className="fas fa-sign-out-alt"></i></div>
            </div>
        </div>
    );
}
 
export default Sidebar;