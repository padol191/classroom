import './css/sidebar.css';
import Logo from '../resources/logo.png'
import { useHistory, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Sidebar = () => {

    const [subjectList, setSubjectList] = useState([]);

    const history = useHistory();

    const handleLogout = () => {
        localStorage.clear()
        history.push("/");
    }

    useEffect(() => {
        async function fetchSubjects() {

          const teacherID = { "id": localStorage.getItem("id") };

          const response = await fetch(
            `http://localhost:5000/api/users/getname`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
            },
            body: JSON.stringify(teacherID)
            }
          );
          const fetchedSubjects = await response.json(response);
        //   console.log(fetchedSubjects)
          setSubjectList(fetchedSubjects);
          console.log(subjectList)
        }
        fetchSubjects();
    },[])

    return (
        <>
        <div className="sidebar">  

            <div className="sidebarHeading">

                <div className="logo"><img src={Logo} alt="logo" /></div>
                <div className="appName">Class</div>

            </div>

            <hr />


            <div className="sidebarItems">

                <Link to="/teacher/dashboard">
                    <div className="sidebarItem">
                        <div className="itemIcon"><i className="fas fa-chart-pie"></i></div>
                        <div className="itemName">Dashboard</div>
                    </div>
                </Link>

                <Link to="/teacher/create">
                    <div className="sidebarItem">
                        <div className="itemIcon"><i className="fa fa-book" aria-hidden="true"></i></div>
                        <div className="itemName">Create assignment</div>
                    </div>
                </Link>

                <Link to="/teacher/add">
                    <div className="sidebarItem">
                        <div className="itemIcon"><i className='fas'>&#xf5da;</i></div>
                        <div className="itemName">Add student</div>
                    </div>
                </Link>

                {/* <div className="sidebarItem">
                    <div className="itemIcon"><i className="fas fa-user-alt"></i></div>
                    <div className="itemName">Profile</div>
                </div> */}
                
            </div>

            <div className="sidebarFooter">
                <div className="logout" onClick={handleLogout}>Logout</div>
                <div className="logoutIcon"><i className="fas fa-sign-out-alt"></i></div>
            </div>
        </div>
        <div className="logged">
            <div>Logged In: { subjectList.name }</div>
        </div>
    </>
    );
}
 
export default Sidebar;