
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
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css'; // Import the styles
function Partner() {
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateBlogId, setUpdateBlogId] = useState("");
  const [images, setImages] = useState([]);
  const [updateDate, setUpdateDate] = useState("");
  const [updateImage, setUpdateImage] = useState(""); // Separate state for image
  const [updateDetails, setUpdateDetails] = useState(""); // Separate state for details
  const [del, setDel] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:8080/slider')
  //     .then((response) => {
  //       const data = response.data;
  //       console.log("first", data.imageUrls);
  //       setImageUrls(data.imageUrls);
  //     })
  //     .catch((error) => console.error('Error fetching image URLs:', error));
  // }, []);


  useEffect(() => {
    axios.get('http://localhost:8080/partner')
      .then((response) => {
        const data = response.data;
        console.log("first", data);
        setImageUrls(data);
      })
      .catch((error) => console.error('Error fetching image URLs:', error));
  }, []);

  const handleFileSelect = (e) => {
    const fileInput = document.getElementById('imageInput');
    const selectedFiles = Array.from(fileInput.files);
    setImages(selectedFiles);
  };

  const handlePost = async () => {

    try {
      const formData = new FormData();
      const imageNames = images.map((image) => image.name);
      if (images.length === 0) {
        Toastify({
          text: "Please select an image", // Display an error message
          duration: 3000,
          gravity: "top",
          position: 'right',
          backgroundColor: "#CA1616",
        }).showToast();
        return;
      }
      // Assuming you have an array of File objects named "images"
      for (const image of images) {
        formData.append('images', image);
        console.log("data", image)

      }
      const response = await axios.post(
        "http://localhost:8080/partner/post",
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
      console.log("Image names:", imageNames);

      setAdd(imageNames);
      Toastify({
        text: "Added completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();


      setTimeout(() => {
        window.location.reload();
      }, 3001);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };





  const openUpdateForm = (p_id) => {
    setIsUpdateFormVisible(true);
    setUpdateBlogId(p_id);
    const selectedData = add.find((data) => data.p_id === p_id);

    // Set the default image names from the fetched data
    if (selectedData) {
      setImages(selectedData.images || "");

    }

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
      // if (images.length === 0) {
      //   Toastify({
      //     text: "Please select an image", // Display an error message
      //     duration: 3000,
      //     gravity: "top",
      //     position: 'right',
      //     backgroundColor: "#CA1616",
      //   }).showToast();
      //   return;
      // }
      // Assuming you have an array of File objects named "images"
      // for (const image of images) {
      //   formData.append('images', image);
      // }
      if (updateImage) {
        formData.append('images', updateImage);
      }
      const response = await axios.put(
        `http://localhost:8080/partner/update/${id}`,
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );

      // Update the state with the new image details after the update
      setAdd((prevAdd) =>
        prevAdd.map((desc) =>
          desc.id === id ? { ...desc, images: response.data.images } : desc
        )
      );
      Toastify({
        text: "Updated completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();
      window.location.reload()
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };


  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/partner/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setAdd((prevData) =>
        prevData.filter((data) => data.id !== id)
      );
      window.location.reload()
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
    const file = e.target.files[0];
    setUpdateImage(file); // Update state with the selected file for update

  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Partner</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>

                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Image </label>
                        <input
                          type="file"
                          name="image_blog"
                          id="imageInput"
                          accept=".jpg, .jpeg , .png, .gif"
                          multiple
                          onChange={handleFileSelect} />
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
                        Add Image
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
                  <CardTitle tag="h4">Partners Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {imageUrls.map((imageUrl, index) => (
                      <tr key={imageUrl.id}>

                        <td>
                          <img key={index} src={`http://localhost:8080/` + imageUrl.images} alt={`Image ${index}`} height={"30%"} width={"30%"} />
                        </td>
                        <td>
                          <Button
                            className="btn-round"
                            color="danger"
                            type="button"
                            onClick={
                              () => handleDelete(imageUrl.id, index) // Calling handleDelete with the product's _id and index
                            }
                          >
                            delete
                          </Button>
                          <Button
                            className="btn-round"
                            color="info"
                            type="button"
                            onClick={() => openUpdateForm(imageUrl.id)}
                          >
                            update
                          </Button>
                        </td>
                      </tr>
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
                    <CardTitle tag="h5">Update Partner</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>

                        <Col className="pl-1" md="4">
                          {/* <FormGroup>
                            <label htmlFor="exampleInputEmail1">Image </label>
                            <input
                              type="file"
                              id='focus_input'

                              name="image_blog"
                              onChange={(e) => setImages(e.target.files)} // Update state with the selected file
                            />
                          </FormGroup> */}
                          <input type="file" onChange={handleFileChange} id="file-input" accept=".jpg, .jpeg , .png, .gif"/>
                          <div className="preview">
                            {updateImage ? (
                              <div>
                                <p>
                                  <b>File name:</b>{updateImage.name}<br /> <b>file size: </b>{returnFileSize(updateImage.size)}.
                                </p>

                                <img src={URL.createObjectURL(updateImage)} alt={`logo`} height={'50%'} width={"50%"} />
                              </div>
                            ) : (
                              <div>

                                <p>  <b>File name:</b> {imageUrls.find((images) => images.id === updateBlogId)?.images}</p>

                                <img src={`http://localhost:8080/` + imageUrls.find((images) => images.id === updateBlogId)?.images} alt={`logo`} height={'50%'} width={"50%"} />
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
                            multiple
                            onClick={() => handleUpdate(updateBlogId)}
                          >
                            Update Partner
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
      </div>
    </>
  );
}

export default Partner;
