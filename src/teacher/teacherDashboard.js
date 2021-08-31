import Sidebar from './sidebar';
import '../common/main.css';
import './css/teacherDashboard.css';
import { useState, useEffect } from 'react';

const TeacherDashboard = () => {

    const [subject, setSubject] = useState('');
    const [subjectList, setSubjectList] = useState([]);

    useEffect(() => {
        async function fetchSubjects() {

          const teacherID = { "id": localStorage.getItem("id") };

          const response = await fetch(
            `http://localhost:5000/api/subject/get`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
            },
            body: JSON.stringify(teacherID)
            }
          );
          const fetchedSubjects = await response.json(response);
          setSubjectList(fetchedSubjects);
          console.log(fetchedSubjects)
        }
        fetchSubjects();
    },[])

    function generateRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    // const addSubject = () => {

    // }

    return (  
        <div className="main">
            <div className="sidebarDiv">
                <Sidebar />
            </div>
            <div className="page">
                <div className="subjects">
                    {subjectList.map((name, index) => 
                        <div key={index} style={{backgroundColor: generateRandomColor()}} className="subject addSubject"><h1>{name.name}</h1></div>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default TeacherDashboard;