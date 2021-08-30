import Alert from 'react-bootstrap/Alert'

const Info = ({ userExistsAlert }) => {
    return (  
        <Alert variant="info" onClose={() => userExistsAlert(false)} dismissible style={{ position: "absolute", top: "4%", right: "0%" }} >
            <Alert.Heading>User Exists.</Alert.Heading>
        </Alert>
    );
}
 
export default Info;