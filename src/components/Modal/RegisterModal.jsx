import { useState } from 'react';
import { Button, Form, Modal } from 'rsuite';

const RegisterModal = ({ registerModalShow, setRegisterModalShow }) => {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegisterSubmit = async () => {
    // Perform registration logic here (e.g., API call)
    console.log('Register:', registerForm);

    try {
      const res = await fetch('http://localhost/acmarket/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });
      const data = await res.json();
      console.log('Response:', data);
      if (res.ok) {
        alert('Registration successful!');
        setRegisterModalShow(false); // Close the modal on successful registration
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // try {
    //   const res = await axios.post(
    //     'http://localhost/acmarket/api/register.php',
    //     {
    //       name: registerForm.name,
    //       email: registerForm.email,
    //       password: registerForm.password,
    //     }
    //   );
    //   const data = res.data;

    //   console.log('Response:', data);

    //   if (res.status === 200) {
    //     alert('Registration successful!');
    //     setRegisterModalShow(false); // Close the modal on successful registration
    //   } else {
    //     alert(data.message || 'Registration failed');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }

    // Close the modal after registration
    // setRegisterModalShow(false);
  };

  return (
    <div>
      <Modal
        open={registerModalShow}
        size="xs"
        onClose={() => setRegisterModalShow(false)}
      >
        <Modal.Header>
          <Modal.Title>Register</Modal.Title>
          <Modal.Body>
            <Form fluid onChange={setRegisterForm} formValue={registerForm}>
              <Form.Group controlId="name-1">
                <Form.ControlLabel>Name</Form.ControlLabel>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Form.Group controlId="email-2">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group controlId="password-3">
                <Form.ControlLabel>Password</Form.ControlLabel>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword-4">
                <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleRegisterSubmit()} appearance="primary">
              Register
            </Button>
            <Button
              onClick={() => setRegisterModalShow(false)}
              appearance="subtle"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default RegisterModal;
