
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
import { ToastContainer, toast } from "react-toastify";

function Slider() {
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateBlogId, setUpdateBlogId] = useState("");
  const [images, setImages] = useState([]);
  const [updateDate, setUpdateDate] = useState("");
  const [updateImage, setUpdateImage] = useState(""); // Separate state for image
  const [updateDetails, setUpdateDetails] = useState(""); // Separate state for details
  const [del, setDel] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cases, setCases] = useState([]);
  const [isUpdateFormVisibleText, setIsUpdateFormVisibleText] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [openAddFormImg, setOpenAddFormImg] = useState(false);
  const [open, setOpen] = useState(false);
  const [displayAddText, setDisplayAddText] = useState(false);




  useEffect(() => {
    axios.get('http://localhost:8080/slider')
      .then((response) => {
        const data = response.data;
        // console.log("first", data);
        setImageUrls(data);
      })
      .catch((error) => console.error('Error fetching image URLs:', error));
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cases");
        const data = response.data;
        setCases(data);
        console.log("case", cases)
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    fetchData();
  }, []);

  // const handleFileSelect = (e) => {
  //   const fileInput = document.getElementById('imageInput');
  //   const selectedFiles = Array.from(fileInput.files);
   
  //     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'video/mp4', 'video/mpeg', 'video/quicktime'];
   
  //     if (selectedFiles && allowedTypes.includes(selectedFiles.type)) {
  //       // File type is allowed, you can process the file here
  //       setImages(selectedFiles);
  //     } else {
  //       // File type is not allowed
  //       Toastify({
  //         text: "Please upload a valid image.",
  //         duration: 3000, // Duration in milliseconds
  //         gravity: "top", // 'top' or 'bottom'
  //         position: 'right', // 'left', 'center', 'right'
  //         backgroundColor: "#CA1616",
  //       }).showToast();    // You can add your own error handling or UI updates here
  //     }
     
  // };
  const handleFileSelect = (e) => {
    const fileInput = document.getElementById('imageInput');
    const selectedFiles = Array.from(fileInput.files);
  
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'video/mp4', 'video/mpeg', 'video/quicktime'];
  
    // Loop through each selected file and check its type
    const isValidFiles = selectedFiles.every(file => allowedTypes.includes(file.type));
  
    if (isValidFiles) {
      // All selected files have valid types, you can process the files here
      setImages(selectedFiles);
    } else {
      // At least one file type is not allowed
      Toastify({
        text: "Please upload valid image ",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#CA1616",
      }).showToast();
    }
  };
  
  const openAddForm = () => {
    setOpenAddFormImg(true)
  }
  const displayAddForm = () => {
    setDisplayAddText(true)
  }
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
        "http://localhost:8080/slider/post",
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

  const handlePostText = async () => {
    if (!title || !content) {
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

     
     console.log("first",title)
     console.log("first",content)

      // Append each selected contact_video file individually

      const response = await axios.post(
        "http://localhost:8080/cases/post",{title,content}
    
      );
      setCases(response.data);
      Toastify({
        text: "Added completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();
      
     
    window.location.reload();
      console.log("add",cases)
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };

  const openUpdateFormImage = (p_id) => {
    setIsUpdateFormVisible(true);
    setUpdateBlogId(p_id);
    const selectedData = add.find((data) => data.p_id === p_id);

    // Set the default image names from the fetched data
    if (selectedData) {
      setImages(selectedData.images || "");

    }

  };
  const openUpdateFormText = (id) => {
    setIsUpdateFormVisibleText(true);
    setUpdateText(id);

    const selectedData = cases.find((data) => data.id === id);

    // Set the default image names from the fetched data
    if (selectedData) {
      setTitle(selectedData.title || "");
      setContent(selectedData.content || "");

    }

  };
  useEffect(() => {
    if (isUpdateFormVisible) {
      const titleInputElement = document.getElementById('file-input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
    if (isUpdateFormVisibleText) {
      const titleInputElement = document.getElementById('focus_input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
    if (displayAddText) {
      const titleInputElement = document.getElementById('focus_input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
    if (openAddFormImg) {
      const titleInputElement = document.getElementById('imageInput');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
  }, [isUpdateFormVisible, isUpdateFormVisibleText,displayAddText,openAddFormImg]);





  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      if (updateImage) {
        formData.append('images', updateImage);
      }
      formData.append("title", title);
      formData.append("content", content)
      const response = await axios.put(
        `http://localhost:8080/slider/update/${id}`,
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
      window.location.reload();

      setIsUpdateFormVisible(false);
      setIsUpdateFormVisibleText(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };


  const handleUpdateText = async (id) => {
    if (!title || !content) {
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
        `http://localhost:8080/cases/update/${id}`,
        { title, content }
      );
      console.log(response.data);
      setCases((prevAdd) =>
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
      setIsUpdateFormVisibleText(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/slider/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setAdd((prevProduct) =>
        prevProduct.filter((product) => product.id !== id)
      );
      window.location.reload()
      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteText = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/cases/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setCases((prevData) =>
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
    const file = e.target.files[0];

    const fileList = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'video/mp4', 'video/mpeg', 'video/quicktime'];
 
    if (fileList && allowedTypes.includes(fileList.type)) {
      // File type is allowed, you can process the file here
      console.log('File uploaded:', fileList);
      setUpdateImage(file); // Update state with the selected file for update
    } else {
      // File type is not allowed
      Toastify({
        text: "Please upload a valid image.",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();    // You can add your own error handling or UI updates here
    
   }
  };
  return (
    <>
      <div className="content">


        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Slider Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
  {/* Check if cases array is not empty */}
  {cases.length > 0 ? (
    // Display rows and buttons for cases data
    cases.map((data, index) => (
      <React.Fragment key={data.id}>
        <tr>
          <td>{data.title}</td>
          <td>{data.content}</td>
          <td>--------------</td>
          <td>
            {/* Conditionally display buttons for the first row */}
            {index === 0 ? (
              <>
      <img src={require("../assets/img/trash.png")}width={"37vh"}  onClick={() => handleDeleteText(data.id, index)}/>

                {/* <Button
                  className="btn-round"
                  color="danger"
                  type="button"
                  onClick={() => handleDeleteText(data.id, index)}
                >
                  Delete
                </Button> */}
                  <img src= {require("../assets/img/edit (1).png")} width={"45vh"}onClick={() => openUpdateFormText(data.id)}
/>
                {/* <Button
                  className="btn-round"
                  color="info"
                  type="button"
                  onClick={() => openUpdateFormText(data.id)}
                >
                  Update
                </Button> */}
              </>
            ) : null}
          </td>
        </tr>
      </React.Fragment>
    ))
  ) : (
    // Display "Add" button when cases array is empty
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <Button
          className="btn-round"
          color="primary"
          type="button"
          style={{ width: "34vh" }}
          onClick={displayAddForm}
        >
          Add Title & Content
        </Button>
      </td>
    </tr>
  )}

  {/* Always display images */}
  {imageUrls.map((imageUrl, index) => (
    <tr key={index}>
      <td>---------------</td>
      <td>---------------</td>
      <td>
        <img
          src={`http://localhost:8080/` + imageUrl.images}
          alt={`Image ${index}`}
          height={"50px"}
          width={"50px"}
        />
      </td>
      <td>
      <img src={require("../assets/img/trash.png")}width={"37vh"}          onClick={() => handleDelete(imageUrl.id, index)}/>

        {/* <Button
          className="btn-round"
          color="danger"
          type="button"
          onClick={() => handleDelete(imageUrl.id, index)}
        >
          Delete
        </Button> */}
          <img src= {require("../assets/img/edit (1).png")} width={"45vh"}          onClick={() => openUpdateFormImage(imageUrl.id)}
/>
        {/* <Button
          className="btn-round"
          color="info"
          type="button"
          onClick={() => openUpdateFormImage(imageUrl.id)}
        >
          Update
        </Button> */}
      </td>
    </tr>
  ))}

  {/* Always display "Add Image" button */}
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>
      <Button
        className="btn-round"
        color="primary"
        type="button"
        style={{ width: "34vh" }}
        onClick={openAddForm}
      >
        Add Image
      </Button>
    </td>
  </tr>
</tbody>

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
                    <CardTitle tag="h5">Update Slider</CardTitle>
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
                          {/* <img
                            src={updateImage ? URL.createObjectURL(updateImage) : `http://localhost:8080/` + imageUrls[0].images}
                            alt={`Default Image`}
                            height={'50%'}
                            width={'50%'}
                          /> */}

                        </Col>
                      </Row>

                      <Row>
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            multiple
                            onClick={() => handleUpdate(updateBlogId)}
                          >
                            Update
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
              {isUpdateFormVisibleText && (
                <div>
                  <CardHeader>
                    <CardTitle tag="h5">Update Case</CardTitle>
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
                            <label>content</label>
                            <Input
                              type="text"
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
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
                            onClick={() => handleUpdateText(updateText)}
                          >
                            Update Case
                          </Button>
                          <Button
                            className="btn-round"
                            color="secondary"
                            type="button"
                            onClick={() => setIsUpdateFormVisibleText(false)}
                          >
                            Cancel                        </Button>
                        </div>
                      </Row>
                    </Form>
                  </CardBody>
                </div>
              )}
              {openAddFormImg && (

                <Row>
                  <Col md="12">
                    <Card className="card-user">
                      <CardHeader>
                        <CardTitle tag="h5">Add Image</CardTitle>
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
              )}
               {displayAddText &&(
                <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Case</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          type="text"
                          id="focus_input"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Content</label>
                        <Input
                          type="text"
                          onChange={(e) => setContent(e.target.value)}
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
                        onClick={handlePostText}
                        // disabled={cases.length > 0}
                      >
                        Add
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>)}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Slider;
