import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './common/Login';
import Register from './common/Register';
import AccessDenied from './common/accessdenied';
import StudentDashboard from './student/studentDashboard';
import TeacherDashboard from './teacher/teacherDashboard';

function App() {
  return (
    <>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/student/dashboard">
        { localStorage.getItem("user")==="student" ? <StudentDashboard /> : <AccessDenied /> }
      </Route>
      <Route exact path="/teacher/dashboard">
        { localStorage.getItem("user")==="teacher" ? <TeacherDashboard /> : <AccessDenied /> }
      </Route>
    </>
  );
}

export default App;
