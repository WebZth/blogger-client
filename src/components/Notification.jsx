import { Container, Alert } from "react-bootstrap";

const Notification = ({ notification: { msg, type } }) => {
  return (
    <Container fluid className="mb-3">
      <Alert className="mb-0 h3" variant={type}>
        {msg}
      </Alert>
    </Container>
  );
};
export default Notification;
