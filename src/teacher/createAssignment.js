import Sidebar from "./sidebar";
import '../common/main.css';
import './css/createAssignment.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const CreateAssignment = () => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

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
                        <Form.Control as="textarea" rows={5} className="input-field input-area" placeholder="Description" value={title} onChange={(e) => { 
                            e.preventDefault();
                            setTitle(e.target.value);
                        }} />
                    </Form.Group>
                    <div className="createAccount">
                        <Button style={{margin: "auto"}} variant="primary" onClick={handleAssign} >Assign</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
 
export default CreateAssignment;