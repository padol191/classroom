import '../common/main.css';
import Sidebar from './sidebar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import './css/addStudent.css';

const AddStudent = () => {

    const [student, setStudent] = useState('');
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
    
    const handleAdd = () => {
        fetch('http://localhost:5000/api/subject/add/'+subject,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "email": student })
        })
        .then(data => data.json())
        .then(response => console.log())

        setStudent('');
        setSubject('');
    }

    return (  
        <div className="main">
            <div className="sidebarDiv">
                <Sidebar />
            </div>
            <div className="page">
                <Form className="loginForm">
                    <Form.Control type="text" placeholder="Student email" className="input-field" value={student} onChange={(e) => { 
                        e.preventDefault();
                        setStudent(e.target.value);
                    }} />
                    {/* <Dropdown className="subjectDropdown">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="dropdownButton">
                            Select team
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                    <select className="subjectDropdown" value={subject} onChange={(e) => { 
                        e.preventDefault();
                        setSubject(e.target.value);
                    }} >
                        {subjectList.map((name, index) => <option key={index} value={name.name}>{name.name}</option>)}
                    </select>
                    <div className="createAccount">
                        <Button style={{margin: "auto"}} variant="primary" onClick={handleAdd} >Add</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
 
export default AddStudent;