import Sidebar from './sidebar';
import '../common/main.css';
import './css/teacherDashboard.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const TeacherDashboard = () => {

    const [subject, setSubject] = useState('');


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const addSubject = () => {

    // }

    return (  
        <div className="main">
            <div className="sidebarDiv">
                <Sidebar />
            </div>
            <div className="page">
                <div className="subjects">
                    <div className="subject">

                    </div>
                    <div className="subject addSubject">
                        <Button onClick={handleShow}>
                            <div className="addIcon">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Subject</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="loginForm">
                        <Form.Control type="text" placeholder="Title" className="input-field" value={subject} onChange={(e) => { 
                            e.preventDefault();
                            setSubject(e.target.value);
                        }} />
                        {/* <div className="createAccount">
                            <Button style={{margin: "auto"}} variant="primary" onClick={handleAssign} >Assign</Button>
                        </div> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Add
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
 
export default TeacherDashboard;