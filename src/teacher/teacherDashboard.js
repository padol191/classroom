import Sidebar from './sidebar';
import '../common/main.css';
import './css/teacherDashboard.css';

const TeacherDashboard = () => {
    return (  
        <div className="main">
            <div className="sidebarDiv">
                <Sidebar />
            </div>
            <div className="page">
                <div className="subjects">
                    <div className="addSubject">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default TeacherDashboard;