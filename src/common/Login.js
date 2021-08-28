import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../resources/logo.png';

const Login = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();

    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleLogin = () => {
        const loginInfo = {
            "email": email,
            "password": password
        };

        fetch('http://localhost:5000/api/auth', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
        })
        .then(response => response.json())
        .then(data => {
        // console.log(data);
            if(data.hasOwnProperty("token")) {
                fetch('http://localhost:5000/api/auth', {
                    method: "GET",
                    headers: {
                    "X-Auth-Token": data.token
                    }
                })
                .then(userDetails => userDetails.json())
                .then(user => {
                    // console.log(user.email);
                    // props.handleLoginCallback(user);
                    // history.push("/"+user.usertype+"/dashboard"); 
                    localStorage.setItem("id", user._id);
                    if('subject' in user)
                    {
                        localStorage.setItem("user", "student")
                        history.push("/student/dashboard");
                    }
                    else
                    {
                        localStorage.setItem("user", "teacher")
                        history.push("/teacher/dashboard");
                    }
                })
            }
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    return (  
        <Form className="loginForm">
            <img className="logo" src={Logo} alt="Logo" />
            <h3 className="formHeading">Login</h3>
            <Form.Control type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => { 
                e.preventDefault();
                setEmail(e.target.value);
            }} />
            <Form.Control type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => { 
                e.preventDefault();
                setPassword(e.target.value);
            }} />
            <div className="createAccount">
                <Button variant="primary" onClick={handleLogin} >Login</Button>
                <span>Don't have an account?<br /> <Link to="/register">Sign up</Link></span>
            </div>
        </Form>
    );
}

export default Login;