import Alert from 'react-bootstrap/Alert'

const Success = ({userRegisteredAlert}) => {
    return (  
        <Alert variant="success" onClose={() => userRegisteredAlert(false)} dismissible style={{ position: "absolute", top: "4%", right: "0%" }} >
            <Alert.Heading>Registered.</Alert.Heading>
        </Alert>
    );
}
 
export default Success;