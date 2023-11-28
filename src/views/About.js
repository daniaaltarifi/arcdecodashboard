import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../assets/css/About.css'
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
function About() {
  const [add, setAdd] = useState([]);
  const [title, setTitle] = useState("");
  const [paragraphleft, setParagraphleft] = useState("");
  const [paragraphright, setParagraphright] = useState("");
  const [imageleft, setImageleft] = useState("");
  const [imageright, setImageRight] = useState("")

  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updateAboutId, setUpdateAboutId] = useState("");


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/about");
      const data = response.data;
      setAdd(data);
    } catch (error) {
      console.log(`Error getting data from frontend: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();

  }, [])
  const handlePost = async () => {
    document.getElementById('containerID').scrollTop = 0;

    if (!title || !paragraphleft || !paragraphright || !imageleft || !imageright) {
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
      const formData = new FormData();
      formData.append('title', title);
      formData.append('paragraphleft', paragraphleft);
      formData.append('paragraphright', paragraphright);
      formData.append('imageleft', imageleft);
      formData.append('imageright', imageright);


      // Append each selected contact_video file individually

      const response = await axios.post(
        "http://localhost:8080/about/post",
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
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };
  const openUpdateForm = (id) => {
    setIsUpdateFormVisible(true);
    setUpdateAboutId(id);

    const selectedData = add.find((data) => data.id === id);

    // Set the default image names from the fetched data
    if (selectedData) {
      setTitle(selectedData.title || "");
      setParagraphleft(selectedData.paragraphleft || "");
      setParagraphright(selectedData.paragraphright || "");
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
    if (!title || !paragraphleft || !paragraphright) {
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
      const formData = new FormData();
      formData.append('title', title);
      formData.append('paragraphleft', paragraphleft);
      formData.append('paragraphright', paragraphright);
      formData.append('imageleft', imageleft); // Append the selected image file
      formData.append('imageright', imageright); // Append the selected image file

      fetchData()
      const response = await axios.put(
        `http://localhost:8080/about/update/${id}`,
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

      setIsUpdateFormVisible(false);
      window.location.reload();
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/about/delete/${id}`
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

  const handleFileimageleft = (e) => {
    const fileList = e.target.files[0];
    setImageleft(fileList);
  };
  const handleFileimageright = (e) => {
    const fileList = e.target.files[0];
    setImageRight(fileList);
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">About</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row id='containerID'>
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
                        <label>paragraph left</label>
                        <Input
                          type="text"
                          onChange={(e) => setParagraphleft(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>paragraph right</label>
                        <Input
                          type="text"
                          onChange={(e) => setParagraphright(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">image left </label>
                        <input
                          type="file"
                          name="imageleft"
                          onChange={(e) => setImageleft(e.target.files[0])} // Update state with the selected file
                        />
                      </FormGroup>
                     
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <div>
                          <label>image right</label>
                          <Input
                            name="imageright"
                            type="file"
                            onChange={(e) => setImageRight(e.target.files[0])} // Update state with the selected file
                          // disabled={fileLimit}
                          />

                          <label htmlFor="fileUpload"></label>
                        </div>
                      </FormGroup>
                      
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        disabled={add.length > 0}
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
                <CardTitle tag="h4">About Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>paragraph left</th>
                      <th>paragraph right</th>
                      <th>image left</th>
                      <th>image right</th>
                    </tr>
                  </thead>
                  {add &&
                    Array.isArray(add) &&
                    add.map((data, index) => (
                      <tbody key={data.id}>
                        <tr key={data.id}>
                          <td>{data.title}</td>
                          <td>{data.paragraphleft}</td>
                          <td>{data.paragraphright}</td>

                          <td>
                            <img src={`http://localhost:8080/` + data.imageleft} alt={`about`} height={"50%"} width={"50%"} />

                          </td>
                          <td>
                            <img src={`http://localhost:8080/` + data.imageright} alt={`about`} height={"50%"} width={"50%"} />

                          </td>

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
                  <CardTitle tag="h5">Update About</CardTitle>
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
                          <label>paragraph left</label>
                          <Input
                            type="text"
                            value={paragraphleft
                            }
                            onChange={(e) => setParagraphleft(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>paragraph right</label>
                          <Input
                            type="text"
                            value={paragraphright
                            }
                            onChange={(e) => setParagraphright(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-1" md="4">
                        <input type="file" onChange={handleFileimageleft} id="file-input" />
                        <div className="preview">
                          {imageleft ? (
                            <div>
                              <p>
                                <b>File name:</b>{imageleft.name}<br /> <b>file size: </b>{returnFileSize(imageleft.size)}.
                              </p>
                              <img src={URL.createObjectURL(imageleft)} alt={`imageleft`} height={'50%'} width={"50%"} />
                            </div>
                          ) : (
                            <div>

                              <p>  <b>File name:</b> {add[0].imageleft}</p>
                              <img src={`http://localhost:8080/` + add[0].imageleft} alt={`imageleft`} height={'50%'} width={"50%"} />
                            </div>

                          )}
                        </div>
                      </Col>
                      <Col className="pl-1" md="4">
                        <input type="file" onChange={handleFileimageright} id="file-input" />
                        <div className="preview">
                          {imageright ? (
                            <div>
                              <p>
                                <b>File name:</b>{imageright.name}<br /> <b>file size: </b>{returnFileSize(imageright.size)}.
                              </p>
                              <img src={URL.createObjectURL(imageright)} alt={`imageright`} height={'50%'} width={"50%"} />
                            </div>
                          ) : (
                            <div>

                              <p>  <b>File name:</b> {add[0].imageright}</p>
                              <img src={`http://localhost:8080/` + add[0].imageright} alt={`imageright`} height={'50%'} width={"50%"} />
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
                          onClick={() => handleUpdate(updateAboutId)}
                        >
                          Update About
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

export default About