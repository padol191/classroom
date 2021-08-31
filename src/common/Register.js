import './Register.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../resources/logo.png';
import Danger from '../messages/danger';
import Info from '../messages/info';
// import Success from '../messages/success';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmPass] = useState('');
    const [userType, setUserType] = useState('');

    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const [userExists, setUserExists] = useState(false);
    // const [userRegistered, setUserRegistered] = useState(false);

    const history = useHistory();

    // useEffect(() => {
    //     localStorage.clear();
    // }, []);

    const handleRegister = () => {
        
        const userData = {
            "name": name,
            "email": email,
            "password": password,
            "usertype": userType
        };

        if(password === confirmpass){
            fetch("http://localhost:5000/api/users", {
                method: 'POST', // or 'PUT'
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // if(data.errors[0].msg === 'User already exists'){
                //     setUserExists(true);
                // }

                if('token' in data){
                    console.log('Registered');
                    // setUserRegistered(true);
                    fetch('http://localhost:5000/api/auth', {
                        method: "GET",
                        headers: {
                        "X-Auth-Token": data.token
                        }
                    })
                    .then(userDetails => userDetails.json())
                    .then(user => {
                        console.log("second fetch")
                        localStorage.setItem("id", user._id);
                        if('subject' in user)
                        {
                            localStorage.setItem("user", "student") 
                            history.push("/student/dashboard");
                            window.reload();
                        }
                        else
                        {
                            localStorage.setItem("user", "teacher") 
                            history.push("/teacher/dashboard");
                            window.reload();
                        }
                    })
                }
                else{
                    console.log("No token")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        else{
            setPasswordsDontMatch(true);
        }
    }

    return ( 
        <> 
            { passwordsDontMatch && <Danger updatePasswordsDontMatchAlert={setPasswordsDontMatch} /> }
            { userExists && <Info userExistsAlert={setUserExists} /> }
            {/* { userRegistered && <Success userRegisteredAlert={setUserRegistered} /> } */}
            <Form className="loginForm" style={{ marginTop: "5vh" }}>
                <img className="logo" src={Logo} alt="Logo" />
                <h3 className="formHeading">Sign up</h3>
                <Form.Control type="text" placeholder="Name" className="input-field" value={name} onChange={(e) => { 
                    e.preventDefault();
                    setName(e.target.value);
                }} />
                <Form.Control type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => { 
                    e.preventDefault();
                    setEmail(e.target.value);
                }} />
                <Form.Control type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => { 
                    e.preventDefault();
                    setPassword(e.target.value);
                }} />
                <Form.Control type="password" placeholder="Confirm Password" className="input-field" value={confirmpass} onChange={(e) => { 
                    e.preventDefault();
                    setConfirmPass(e.target.value);
                }} />
                <select className="subjectDropdown" value={userType} onChange={(e) => { 
                        e.preventDefault();
                        setUserType(e.target.value);
                }} >
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                </select>
                {/* {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3 userType">
                        <Form.Check
                            inline
                            label="Student"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                            // value="student"
                            // onChange={(e) => { 
                            //     e.preventDefault();
                            //     setUserType(e.target.value);
                            // }} 
                        />
                        <Form.Check
                            inline
                            label="Teacher"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                            // value="teacher"
                            // onChange={(e) => { 
                            //     e.preventDefault();
                            //     setUserType(e.target.value);
                            // }} 
                        />
                    </div>
                ))} */}
                {/* <div className="googleRegistration">
                    <Button variant="primary" onClick={handleRegister} >Sign up with google</Button>
                </div> */}
                <div className="createAccount">
                    <Button variant="primary" onClick={handleRegister} >Sign up</Button>
                    <span>Have an account?<br /> <Link to="/">Login</Link></span>
                </div>
            </Form>
        </>
    );
}
 
export default Register;