import '../common/main.css';
import Sidebar from './sidebar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import './css/addStudent.css';

const AddStudent = () => {

    const [student, setStudent] = useState('');
    const [subject, setSubject] = useState('');

    useEffect(() => {

        const teacherID = { "id": localStorage.getItem("id") };

        fetch('http://localhost:5000/api/subject/get', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(teacherID)
        })
        .then(data => data.json())
        .then(subjects => {
            console.log(subjects);
        })
        .catch((err) => {
            console.error('Error:', err);
        });
    }, [])

    const handleAdd = () => {

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
                        <option value="A">Apple</option>
                        <option value="B">Banana</option>
                        <option value="C">Cranberry</option>
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