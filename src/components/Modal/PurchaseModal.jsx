import { useState } from 'react';
import { Button, Form, Modal } from 'rsuite';

const PurchaseModal = ({
  purchaseModalShow,
  setPurchaseModalShow,
  accountDetails,
}) => {
  const [purchaseForm, setPurchaseForm] = useState({
    email: '',
    quantity: 1,
  });

  const handlePurchaseSubmit = () => {
    console.log(purchaseForm);
  };

  console.log(accountDetails);

  return (
    <div>
      <Modal
        open={purchaseModalShow}
        size="xs"
        onClose={() => setPurchaseModalShow(false)}
      >
        <Modal.Header>
          <Modal.Title>Purchase Account</Modal.Title>
          <Modal.Body>
            <Form fluid onChange={setPurchaseForm} formValue={purchaseForm}>
              <Form.Group controlId="email-2">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group controlId="quantity-2">
                <Form.ControlLabel>Quantity</Form.ControlLabel>
                <Form.Control
                  name="quantity"
                  type="number"
                  min={1}
                  max={accountDetails?.stock}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handlePurchaseSubmit()} appearance="primary">
              Register
            </Button>
            <Button
              onClick={() => setPurchaseModalShow(false)}
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

export default PurchaseModal;
