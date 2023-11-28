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
function Logo() {
  const [add, setAdd] = useState([]);

  const [logo, setLogo] = useState("")
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updateLogoId, setUpdateLogoId] = useState("");


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/logo");
      const data = response.data;
      setAdd(data);
      console.log("add", add[0].logo)
    } catch (error) {
      console.log(`Error getting img from frontend: ${error}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePost = async () => {
    try {
        const formData = new FormData();
        formData.append('image', logo);

        if (!logo) {
            Toastify({
                text: "Please Add Your Logo",
                duration: 3000, // Duration in milliseconds
                gravity: "top", // 'top' or 'bottom'
                position: 'right', // 'left', 'center', 'right'
                backgroundColor: "#CA1616",
            }).showToast();
            return;
        }
        // Append each selected contact_icon file individually

        const response = await axios.post(
            "http://localhost:8080/logo/post",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        setAdd(response.data);
        Toastify({
            text: "Added completely",
            duration: 3000, // Duration in milliseconds
            gravity: "top", // 'top' or 'bottom'
            position: 'right', // 'left', 'center', 'right'
            backgroundColor: "#5EC693",
        }).showToast();

        window.location.reload();
    }
    catch (error) {

        console.log(`Error fetching post data ${error}`);
    }
};

  const openUpdateForm = (id) => {
    setIsUpdateFormVisible(true);
    setUpdateLogoId(id);




  };
  useEffect(() => {
    if (isUpdateFormVisible) {
      const titleInputElement = document.getElementById('file-input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
  }, [isUpdateFormVisible]);

  const handleUpdate = async (id) => {

    try {
      const formData = new FormData();
      formData.append('logo', logo); // Append the selected image file

      const response = await axios.put(
        `http://localhost:8080/logo/update/${id}`,
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
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
      window.location.reload();
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/logo/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setAdd((prevData) =>
        prevData.filter((data) => data.id !== id)
      );

      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };


  const returnFileSize = (number) => {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  };

  const handleFileChange = (e) => {
    const fileList = e.target.files[0];
    setLogo(fileList);
  };
  return (
    <>
      <div className="content">
        {/* <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Logo</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Logo </label>
                        <input
                          required
                          type="file"
                          name="icon"
                          accept=".jpg, .jpeg , .png, .gif"
                          onChange={(e) => setLogo(e.target.files[0])} // Update state with the selected file
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
                        disabled={add.length > 0}
                      >
                        Add
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Logo Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>logo</th>
                    </tr>
                  </thead>
                  {add &&
                    Array.isArray(add) &&
                    add.map((img, index) => (
                      <tbody key={img.id}>
                        <tr key={img.id}>



                          <td>
                            <img src={`http://localhost:8080/` + img.logo} alt={`Contact Video`} height={'50%'} width={"50%"} />

                          </td>
                          <td>
                            {/* <Button
                              className="btn-round"
                              color="danger"
                              type="button"
                              onClick={
                                () => handleDelete(img.id, index) // Calling handleDelete with the product's _id and index
                              }
                            >
                              delete
                            </Button> */}
                            <Button
                              className="btn-round"
                              color="info"
                              type="button"
                              onClick={() => openUpdateForm(img.id)}
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
                  <CardTitle tag="h5">Update Logo</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form >

                    <Row>

                      <Col className="pl-1" md="4">
                        {/* <FormGroup>
                      <label htmlFor="exampleInputEmail1">logo </label>
                      <input
                      id='focus_input'
                        type="file"
                        name="logo"
                        onChange={(e) => setLogo(e.target.files[0])} // Update state with the selected file
                      />
                    </FormGroup> */}

                        <input type="file" onChange={handleFileChange} id="file-input" accept=".jpg, .jpeg , .png, .gif"
                        />
                        <div className="preview">
                          {logo ? (
                            <div>
                              <p>
                                <b>File name:</b>{logo.name}<br /> <b>file size: </b>{returnFileSize(logo.size)}.
                              </p>
                              <img src={URL.createObjectURL(logo)} alt={`logo`} height={'50%'} width={"50%"} />
                            </div>
                          ) : (
                            <div>

                              <p>  <b>File name:</b> {add[0].logo}</p>
                              <img src={`http://localhost:8080/` + add[0].logo} alt={`logo`} height={'50%'} width={"50%"} />
                            </div>

                          )}
                        </div>

                      </Col>

                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="info"
                          type="button"
                          onClick={() => handleUpdate(updateLogoId)}
                        >
                          Update Logo
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

export default Logo