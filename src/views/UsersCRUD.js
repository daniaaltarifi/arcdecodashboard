import axios from "axios";
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";
import Tables from "./Tables";

function UsersCRUD() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role_id, setRole_id] = useState(1);

  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateUserId, setUpdateUserId] = useState("");
  const [del, setDel] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //modify route
        const response = await axios.get(
          "http://localhost:1010/login/getusers"
        );
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting news from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  const handlePostUser = async () => {
    try {
      const response = await axios.post("http://localhost:1010/signup", {
        username,
        email,
        password,
        role_id: 2,
      });

      console.log(response.data);
      setAdd(response.data);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };
  const handlePost = async () => {
    try {
      const response = await axios.post("http://localhost:1010/signup", {
        username,
        email,
        password,
        role_id: 1,
      });

      console.log(response.data);
      setAdd(response.data);
      console.log("admin", add);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };
  //modify the id based on db
  const openUpdateForm = (id) => {
    setIsUpdateFormVisible(true);
    setUpdateUserId(id);
  };
  const handleUpdate = async (id, username, email, password, role_id) => {
    try {
      setUpdateUserId(id);
      //modify route
      const response = await axios.put(
        `https://monkfish-app-wyvrc.ondigitalocean.app/siginup/edit/${id}`,
        {
          username: username,
          email: email,
          password: password,
          role_id: role_id,
        }
      );
      console.log("hello");
      console.log(response.data);
      setAdd(response.data);
      // setNews(response.data);
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id,index) => {
    try {
      const response = await axios.delete(
        `http://localhost:1010/signup/delete/${id}`
      );
      console.log(id);
      console.log(response);
  
      setAdd((prevProduct) =>
      prevProduct.filter((product) => product.id !== id)
    );

    setDel((prev) => prev.filter((_, i) => i !== index));
    
    } catch (error) {
      console.error(error);
    }
  };
  console.log("add",add);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add User</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>username</label>
                        <Input
                          type="text"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Melbourne, Australia"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Melbourne"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Australia"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          type="textarea"
                          defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
                  <Row>
                    <div className="update  ">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={handlePostUser}
                      >
                        Add User
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* add admin */}

        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Admin</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>username</label>
                        <Input
                          type="text"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Melbourne, Australia"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Melbourne"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Australia"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          type="textarea"
                          defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
                  <Row>
                    <div className="update  ">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={handlePost}
                      >
                        Add User
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Users Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>username</th>
                        <th>email</th>
                        <th>role_id</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {add &&
                      Array.isArray(add) &&
                      add.map((user, index) => (
                        <tbody key={user.id}>
                          <tr>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role_id}</td>
                            <button
  onClick={() => {
    console.log("Clicked delete for user:", user.id);
    handleDelete(user.id,index); // Remove the 'index' argument
  }}
>
  delete
</button>

                          </tr>
                        </tbody>
                      ))}
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Row>
          <Col md="12">
            <Card className="card-user">
              {isUpdateFormVisible && (
                <div>
                  <CardHeader>
                    <CardTitle tag="h5">Update User</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>username</label>
                            <Input
                              type="text"
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Email</label>
                            <Input
                              type="text"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* <Row>
                 <Col md="12">
                   <FormGroup>
                     <label>Address</label>
                     <Input
                       defaultValue="Melbourne, Australia"
                       placeholder="Home Address"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                 <Col className="pr-1" md="4">
                   <FormGroup>
                     <label>City</label>
                     <Input
                       defaultValue="Melbourne"
                       placeholder="City"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
                 <Col className="px-1" md="4">
                   <FormGroup>
                     <label>Country</label>
                     <Input
                       defaultValue="Australia"
                       placeholder="Country"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
                 <Col className="pl-1" md="4">
                   <FormGroup>
                     <label>Postal Code</label>
                     <Input placeholder="ZIP Code" type="number" />
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                 <Col md="12">
                   <FormGroup>
                     <label>About Me</label>
                     <Input
                       type="textarea"
                       defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                     />
                   </FormGroup>
                 </Col>
               </Row> */}
                      <Row>
                        <div className="update ">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={() =>
                              handleUpdate(
                                updateUserId,
                                username,
                                email,
                                role_id
                              )
                            }
                          >
                            Update User
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  </CardBody>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UsersCRUD;
