import '../common/main.css';
import Sidebar from './sidebar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const AddStudent = () => {

    const [student, setStudent] = useState('');
    const [subject, setSubject] = useState('');

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
                    <div className="createAccount">
                        <Button style={{margin: "auto"}} variant="primary" onClick={handleAdd} >Add</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
 
export default AddStudent;