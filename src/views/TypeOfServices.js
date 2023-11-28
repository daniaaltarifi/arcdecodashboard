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
function TypeOfServices() {
  const [add, setAdd] = useState([]);
  const [title, setTitle] = useState("");
  const [descriptionofservice, setDescriptionofservice] = useState("");
  const [image, setImage] = useState("");
 
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updateTypeOfServiceId, setUpdateTypeOfServiceId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/typeofservices");
        const data = response.data;
        setAdd(data);
        console.log(data)
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  

const handlePost = async () => {
  try {
    // Check if an image is selected
    if (!title || !descriptionofservice || !image) {
      Toastify({
        text: "Please Fill All Field", // Display an error message
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }

    // Check the dimensions of the selected image
    // const imageDimensions = await getImageDimensions(image);
    // const expectedWidth = 1200; // replace with your desired width
    // const expectedHeight = 1600; // replace with your desired height

    // if (imageDimensions.width !== expectedWidth || imageDimensions.height !== expectedHeight) {
    //   Toastify({
    //     text: `Image dimensions must be ${expectedWidth} x ${expectedHeight}. Please select a valid image.`, // Display an error message
    //     duration: 5000,
    //     gravity: "top",
    //     position: 'right',
    //     backgroundColor: "#CA1616",
    //   }).showToast();
    //   return;
    // }

    // Continue with the API call if the image dimensions are correct
    const formData = new FormData();
    formData.append('title', title);
    formData.append('descriptionofservice', descriptionofservice);
    formData.append('image', image);

    const response = await axios.post(
      "http://localhost:8080/typeofservices/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      setAdd(response.data);
      Toastify({
        text: "Added completely",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#5EC693",
      }).showToast();
      window.location.reload()
    } else {
      setAdd(null);
    }
  } catch (error) {
    console.log(`Error fetching post data ${error}`);
  }
};

// Function to get the dimensions of an image
const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const dimensions = {
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
      resolve(dimensions);
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
};

  const openUpdateForm = (id) => {
    setIsUpdateFormVisible(true);
    setUpdateTypeOfServiceId(id);
 
    const selectedData = add.find((data) => data.id === id);

    // Set the default image names from the fetched data
    if (selectedData) {
      setTitle(selectedData.title || "");
      setDescriptionofservice(selectedData.descriptionofservice || "");

      
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
    if (!title || !descriptionofservice) {
      Toastify({
        text: "Please Fill All Field",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();
      return;
      }
      // const imageDimensions = await getImageDimensions(image);
      // const expectedWidth = 1200; // replace with your desired width
      // const expectedHeight = 1600; // replace with your desired height
  
      // if (imageDimensions.width !== expectedWidth || imageDimensions.height !== expectedHeight) {
      //   Toastify({
      //     text: `Image dimensions must be ${expectedWidth} x ${expectedHeight}. Please select a valid image.`, // Display an error message
      //     duration: 5000,
      //     gravity: "top",
      //     position: 'right',
      //     backgroundColor: "#CA1616",
      //   }).showToast();
      //   return;
      // }
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('descriptionofservice', descriptionofservice);
      formData.append('image', image); // Append the selected image file
      
  
      const response = await axios.put(
        `http://localhost:8080/typeofservices/update/${id}`,
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
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/typeofservices/delete/${id}`
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
    setImage(fileList);
};
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Type Of Services</CardTitle>

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
                        <label>Description of service</label>
                        <Input
                          type="text"
                          onChange={(e) => setDescriptionofservice(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                   
                  </Row>
                  <Row>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">image  </label>
                        <input
                          type="file"
                          name="image"
                          accept=".jpg, .jpeg , .png, .gif"
                          onChange={(e) => setImage(e.target.files[0])} // Update state with the selected file
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                  {/* <p tag="h6" style={{color:"#EFAE4D",fontWeight:"600"}}>Warning: You can add only  3 services </p> */}

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round add_btn"
                        color="primary"
                        type="button"
                        onClick={handlePost}
                        disabled={add !== null && add.length > 2}

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
                <CardTitle tag="h4">Type Of Services Table</CardTitle>

              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>Description of service</th>
                      <th>image </th>
                    </tr>
                  </thead>
                  {add &&
                    Array.isArray(add) &&
                    add.map((data, index) => (
                      <tbody key={data.id}>
                        <tr key={data.id}>
                          <td>{data.title}</td>
                          <td>{data.descriptionofservice}</td>
                        
                          <td>
                            <img src={`http://localhost:8080/` + data.image} alt={`about`} height={"50%"} width={"50%"} />

                          </td>
                        
                          
                          <td>
                              <Button
                          className="btn-round"
                          color="danger"
                          type="danger"
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
                    <CardTitle tag="h5">Update Type Of Services</CardTitle>
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
                            <label>Description of service</label>
                            <Input
                              type="text"
                              value={descriptionofservice}
                              onChange={(e) => setDescriptionofservice(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                       
                      </Row>
                      <Row>
                      
                        <Col className="pl-1" md="4">
                        {/* <FormGroup>
                        <label htmlFor="exampleInputEmail1">image  </label>
                        <input
                          type="file"
                          name="image_data"
                          onChange={(e) => setImage(e.target.files[0])} // Update state with the selected file
                        />
                      </FormGroup> */}
                       <input type="file" onChange={handleFileChange} id="file-input" accept=".jpg, .jpeg , .png, .gif"/>
                                                <div className="preview">
                                                    {image ? (
                                                        <div>
                                                            <p>
                                                                <b>File name:</b>{image.name}<br /> <b>file size: </b>{returnFileSize(image.size)}.
                                                            </p>
                                                            <img src={URL.createObjectURL(image)} alt={`image`} height={'50%'} width={"50%"} />
                                                        </div>
                                                    ) : (
                                                        <div>

                                                            <p>  <b>File name:</b> {add.find((image)=>image.id === updateTypeOfServiceId)?.image}</p>
                                                            <img src={`http://localhost:8080/` + add.find((image)=>image.id === updateTypeOfServiceId)?.image} alt={`image`} height={'50%'} width={"50%"} />
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
                            onClick={() => handleUpdate(updateTypeOfServiceId)}
                          >
                            Update Type Of Services
                          </Button>
                          <Button
                          className="btn-round"
                          color="secondary"
                          type="button"
                          onClick={()=>setIsUpdateFormVisible(false)}
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

export default TypeOfServices