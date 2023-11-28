
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

function Subscribe() {
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updatecategory_id, setUpdateCategory_id] = useState("");
  const [category_name, setCategoryName] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateImage, setUpdateImage] = useState(""); // Separate state for image
  const [updateDetails, setUpdateDetails] = useState(""); // Separate state for details
  const [del, setDel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1010/subscribe/getsubscribes"
        );
        setAdd(response.data);
        console.log("add",add)
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  const handlePost = async () => {
    try {
      const response = await axios.post("http://localhost:1010/category/add", {
        category_name: category_name, // Use the provided title
   
      });
      console.log(response.data);
      // Call the onSave callback with the data
      setAdd(response.data);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };
  const openUpdateForm = (category_id) => {
    setIsUpdateFormVisible(true);
    setUpdateCategory_id(category_id);
  };

  const handleUpdate = async (category_id) => {
    try {
      const response = await axios.put(
        `http://localhost:1010/category/edit/${category_id}`,
        {
            category_name: category_name, // Use the provided title
      
        }
      );
      console.log(response.data);
      setAdd((prevAdd) =>
        prevAdd.map((category) =>
          category.category_id === category_id ? response.data : category
        )
      );
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:1010/subscribe/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setAdd((prevCategory) =>
      prevCategory.filter((category) => category.id !== id)
      )

      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="content">
        {/* <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Category</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>category Name</label>
                        <Input
                          type="text"
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        onClick={handlePost}
                      >
                        Add category
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Subscribe Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Email</th>
                      </tr>
                    </thead>
                    {add &&
                      Array.isArray(add) &&
                      add.map((emails, index) => (
                        <tbody key={emails.id}>
                          <tr key={emails.id}>
                            <td>{emails.email}</td>
                        

                            <td>
                              <button
                                onClick={
                                  () => handleDelete(emails.id, index) // Calling handleDelete with the product's _id and index
                                }
                              >
                                delete
                              </button>
                              {/* <button
                                onClick={() => openUpdateForm(emails.category_id)}
                              >
                                update
                              </button> */}
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
                    <CardTitle tag="h5">Update Category</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>category Name</label>
                            <Input
                              type="text"
                              value={category_name}
                              onChange={(e) => setCategoryName(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                            onClick={() => handleUpdate(updatecategory_id)}
                          >
                            Update category
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

export default Subscribe;
