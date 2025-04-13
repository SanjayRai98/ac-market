import { Button, ButtonToolbar, Form, Modal, Placeholder } from 'rsuite';
import '../../styles/header.css'; // Adjust the path as necessary
import { useState } from 'react';
import LoginModal from '../Modal/LoginModal';
import RegisterModal from '../Modal/RegisterModal';

const AcHeader = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <header className=" header-container ">
      <section className=" flex justify-between items-center p-4 bg-gray-800 text-white pl-12 pr-12 ">
        <div>
          <h4>AccsMarket - Accounts store </h4>
        </div>
        <div>
          <Button
            appearance="primary"
            size="lg"
            onClick={() => setLoginModalShow(true)}
          >
            Login
          </Button>
          <Button
            appearance="ghost"
            size="lg"
            onClick={() => setRegisterModalShow(true)}
          >
            Register
          </Button>
        </div>
      </section>
      <section>
        <ButtonToolbar>
          <Button onClick={handleOpen}> Open</Button>
        </ButtonToolbar>
      </section>
      <section>
        {/* <Modal show={loginModalShow}>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              layout="vertical"
              onSubmit={() => {
                handleLoginSubmit();
              }}
              onChange={setLoginForm}
              formValue={loginForm}
            >
              <Form.Group controlId="email" className="mb-3">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.ControlLabel>Password</Form.ControlLabel>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Form.Group controlId="rememberMe" className="mb-3">
                <Form.Checkbox name="rememberMe">Remember Me</Form.Checkbox>
              </Form.Group>
              <Form.Group controlId="submit" className="mb-3">
                <Button type="submit" appearance="primary" block>
                  Login
                </Button>
              </Form.Group>
              <Form.Group controlId="forgotPassword" className="mb-3">
                <Button appearance="link" block onClick={() => {}}>
                  Forgot Password?
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {}} appearance="primary">
              Login
            </Button>
            <Button onClick={() => {}} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal> */}

        <Modal show={false}>
          <Modal.Header>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>{/* Forgot password form goes here */}</Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {}} appearance="primary">
              Submit
            </Button>
            <Button onClick={() => {}} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Placeholder.Paragraph />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} appearance="primary">
              Ok
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </section>

      <section>
        <LoginModal
          loginModalShow={loginModalShow}
          setLoginModalShow={setLoginModalShow}
        />

        <RegisterModal
          registerModalShow={registerModalShow}
          setRegisterModalShow={setRegisterModalShow}
        />
      </section>
    </header>
  );
};

export default AcHeader;
