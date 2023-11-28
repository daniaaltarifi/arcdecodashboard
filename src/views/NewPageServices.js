import React, { useEffect, useState } from 'react'
import axios from 'axios';
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
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css'; // Import the styles
function NewPageServices() {
  const [add, setAdd] = useState([]);
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");


  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updatePageId, setUpdatePageId] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/newpage");
      const data = response.data;
      setAdd(data);
    } catch (error) {
      console.log(`Error getting data from frontend: ${error}`);
    }
  };


  useEffect(() => {
    fetchData()
  })
  const handlePost = async () => {
    if (!title || !path) {
      Toastify({
        text: "Please Fill All Field",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
    try {




      const response = await axios.post(
        "http://localhost:8080/newpage/post", { title, path }

      );
      setAdd(response.data);
      Toastify({
        text: "Added completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();



      console.log("add", add)
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };
  const openUpdateForm = (id) => {
    setIsUpdateFormVisible(true);
    setUpdatePageId(id);

    const selectedData = add.find((data) => data.id === id);

    // Set the default image names from the fetched data
    if (selectedData) {
      setTitle(selectedData.title || "");
      setPath(selectedData.path || "");

    }

  };
  useEffect(() => {
    if (isUpdateFormVisible) {
      const titleInputElement = document.getElementById('focus_input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
  }, [isUpdateFormVisible]);


  const handleUpdate = async (id) => {
    if (!title || !path) {
      Toastify({
        text: "Please Fill All Field",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
    try {


      const response = await axios.put(
        `http://localhost:8080/newpage/update/${id}`,
        { title, path }
      );
      console.log(response.data);
      setAdd((prevAdd) =>
        prevAdd.map((data) =>
          data.id === id ? response.data : data
        )
      );
      Toastify({
        text: "Updated completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/newpage/delete/${id}`
      );


      setAdd((prevData) =>
        prevData.filter((data) => data.id !== id)
      );

      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add New Page About</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>path</label>
                        <Input
                          type="text"
                          onChange={(e) => setPath(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                  </Row>


                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={handlePost}
                      >
                        Add
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">About Page Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>path</th>

                    </tr>
                  </thead>
                  {add &&
                    Array.isArray(add) &&
                    add.map((data, index) => (
                      <tbody key={data.id}>
                        <tr key={data.id}>
                          <td>{data.title}</td>
                          <td>{data.path}</td>


                          <td>
                            <Button
                              className="btn-round"
                              color="danger"
                              type="button"
                              onClick={
                                () => handleDelete(data.id, index) // Calling handleDelete with the product's _id and index
                              }
                            >
                              delete
                            </Button>
                            <Button
                              className="btn-round"
                              color="info"
                              type="button"
                              onClick={() => openUpdateForm(data.id)}
                            >
                              update
                            </Button>
                          </td>
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
                  <CardTitle tag="h5">Update Page</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form >
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            type="text"
                            id='focus_input'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>path</label>
                          <Input
                            type="text"
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                          />
                        </FormGroup>
                      </Col>

                    </Row>


                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="info"
                          type="button"
                          onClick={() => handleUpdate(updatePageId)}
                        >
                          Update Page
                        </Button>
                        <Button
                          className="btn-round"
                          color="secondary"
                          type="button"
                          onClick={() => setIsUpdateFormVisible(false)}
                        >
                          Cancel                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default NewPageServices;