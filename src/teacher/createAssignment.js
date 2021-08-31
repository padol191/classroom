import Sidebar from "./sidebar";
import '../common/main.css';
import './css/createAssignment.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";

const CreateAssignment = () => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
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
        }
        fetchSubjects();
      },[])

    const handleAssign = () => {

    }

    return (  
        <div className="main">
            <div className="sidebarDiv">
                <Sidebar />
            </div>
            <div className="page">
                <Form className="loginForm">
                    <Form.Control type="text" placeholder="Title" className="input-field" value={title} onChange={(e) => { 
                        e.preventDefault();
                        setTitle(e.target.value);
                    }} />
                    <Form.Group style={{margin: "auto"}} className="mb-3 input-field" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" style={{width: "100%", padding: "0%"}} rows={3} className="input-field input-area" placeholder="Description" value={desc} onChange={(e) => { 
                            e.preventDefault();
                            setDesc(e.target.value);
                        }} />
                    </Form.Group>
                    <select className="subjectDropdown" value={subject} onChange={(e) => { 
                        e.preventDefault();
                        setSubject(e.target.value);
                    }} >
                        {subjectList.map((name, index) => <option key={index} value={name.name}>{name.name}</option>)}
                    </select>
                    <div className="createAccount">
                        <Button style={{margin: "auto"}} variant="primary" onClick={handleAssign} >Assign</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
 
export default CreateAssignment;