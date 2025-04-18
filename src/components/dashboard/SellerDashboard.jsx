import { useState, useEffect } from 'react';
import {
  Sidebar,
  Sidenav,
  Nav,
  Container,
  Header,
  Content,
  Button,
  Form,
  Panel,
  List,
} from 'rsuite';
import { Plus, List as ListIcon } from 'lucide-react';
import axios from 'axios';

const SellerDashboard = () => {
  const [activeKey, setActiveKey] = useState('add');
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category_id: '',
    subcategory_id: '',
  });

  useEffect(() => {
    if (activeKey === 'view') fetchAccounts();
  }, [activeKey]);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/getSellerAccounts.php', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(res.data.accounts);
    } catch (error) {
      console.error('Failed to fetch accounts', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/uploadAccount.php', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Account uploaded successfully!');
      setFormData({
        title: '',
        price: '',
        description: '',
        category_id: '',
        subcategory_id: '',
      });
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <Container>
      <Sidebar>
        <Sidenav defaultOpenKeys={['dashboard']}>
          <Sidenav.Body>
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              <Nav.Item eventKey="add" icon={<Plus size={16} />}>
                Add Account
              </Nav.Item>
              <Nav.Item eventKey="view" icon={<ListIcon size={16} />}>
                My Accounts
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>

      <Container>
        <Header>
          <h4>Seller Dashboard</h4>
        </Header>
        <Content>
          {activeKey === 'add' && (
            <Panel header="Upload Account" bordered>
              {/* <Form fluid onChange={setFormData} formValue={formData}>
                <Form.Group>
                  <Form.ControlLabel>Title</Form.ControlLabel>
                  <Form.FormControl name="title" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Price</Form.ControlLabel>
                  <Form.FormControl name="price" type="number" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Description</Form.ControlLabel>
                  <Form.FormControl
                    rows={5}
                    name="description"
                    componentClass="textarea"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Category ID</Form.ControlLabel>
                  <Form.FormControl name="category_id" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Subcategory ID</Form.ControlLabel>
                  <Form.FormControl name="subcategory_id" />
                </Form.Group>
                <Button appearance="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form> */}
              <h1>Upload Account</h1>
              <p>Form to upload account details</p>
            </Panel>
          )}

          {activeKey === 'view' && (
            <Panel header="My Uploaded Accounts" bordered>
              <List bordered>
                {accounts?.map(acc => (
                  <List.Item key={acc.id}>
                    <strong>{acc.title}</strong> - ${acc.price}
                    <br />
                    {acc.description}
                  </List.Item>
                ))}
              </List>
            </Panel>
          )}
        </Content>
      </Container>
    </Container>
  );
};

export default SellerDashboard;
