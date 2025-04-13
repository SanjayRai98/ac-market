import { useState } from 'react';
import { Button, Form, Modal } from 'rsuite';
import { useAuth } from '../../context/AuthContext';

const LoginModal = ({ loginModalShow, setLoginModalShow }) => {
  const [loginFormValue, setLoginFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { login } = useAuth();

  // console.log('loginFormValue', loginFormValue);

  const handleLoginSubmit = async () => {
    // try {
    //   const res = await fetch('http://localhost/acmarket/api/login.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(loginFormValue),
    //   });

    //   const data = await res.json();
    //   if (res.ok) {
    //     localStorage.setItem('token', data.token);
    //     setLoginModalShow(false); // Close the modal on successful login
    //   } else {
    //     alert(data.message || 'Login failed');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }

    console.log('Login:', loginFormValue);

    login(loginFormValue.email, loginFormValue.password).then(res => {
      if (res) {
        setLoginModalShow(false); // Close the modal on successful login
      }
    });
  };

  return (
    <div>
      <Modal
        open={loginModalShow}
        onClose={() => {
          setLoginModalShow(false);
        }}
        size="xs"
      >
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid onChange={setLoginFormValue} formValue={loginFormValue}>
            <Form.Group controlId="email-9">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" type="email" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="password-9">
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                autoComplete="off"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleLoginSubmit()} appearance="primary">
            Confirm
          </Button>
          <Button onClick={() => setLoginModalShow(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginModal;
