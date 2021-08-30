import Alert from 'react-bootstrap/Alert'

const Danger = ({ updatePasswordsDontMatchAlert }) => {
    return (  
        <Alert variant="danger" onClose={() => updatePasswordsDontMatchAlert(false)} dismissible style={{ position: "absolute", top: "4%", right: "0%" }} >
            <Alert.Heading>Passwords don't match.</Alert.Heading>
        </Alert>
    );
}
 
export default Danger;