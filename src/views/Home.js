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
function Home() {
  const [add, setAdd] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState("");

  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updateHomeId, setUpdateHomeId] = useState("");


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/home");
      const data = response.data;
      setAdd(data);
      console.log("add",add)
    } catch (error) {
      console.log(`Error getting Blog from frontend: ${error}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('content', content);
      formData.append('video', video);

      if (!subtitle || !video) {
        Toastify({
          text: "Please Fill Required Field",
          duration: 3000, // Duration in milliseconds
          gravity: "top", // 'top' or 'bottom'
          position: 'right', // 'left', 'center', 'right'
          backgroundColor: "#CA1616",
        }).showToast();
        return;
      }
      // Append each selected contact_video file individually

      const response = await axios.post(
        "http://localhost:8080/home/post",
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
    setUpdateHomeId(id);


    const selectedData = add.find((data) => data.id === id);

    // Set the default image names from the fetched data
    if (selectedData) {
      setTitle(selectedData.title || "");
      setSubtitle(selectedData.subtitle || "");
      setContent(selectedData.content || "");
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
  const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const allowedVideoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
  const handleUpdate = async (id) => {
    if (!subtitle) {
      Toastify({
        text: "Please Fill Subtitle",
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
      formData.append('subtitle', subtitle);
      formData.append('content', content);
      formData.append('video', selectedFile); // Append the selected image file


      const response = await axios.put(
        `http://localhost:8080/home/update/${id}`,
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
        `http://localhost:8080/home/delete/${id}`
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
  // const returnFileSize = (number) => {
  //   if (number < 1024) {
  //     return `${number} bytes`;
  //   } else if (number >= 1024 && number < 1048576) {
  //     return `${(number / 1024).toFixed(1)} KB`;
  //   } else if (number >= 1048576) {
  //     return `${(number / 1048576).toFixed(1)} MB`;
  //   }
  // };
  const [selectedFile, setSelectedFile] = useState("");
  const [fileType, setFileType] = useState('');
  const [defaultFileType, setDefaultFileType] = useState('');
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name) {
      setSelectedFile(file);
      const extension = file.name.split('.').pop().toLowerCase();
  
      if (allowedImageExtensions.includes(extension)) {
        setFileType('image');
      } else if (allowedVideoExtensions.includes(extension)) {
        setFileType('video');
      }
    }
  
    // Reset defaultFileType when a new file is selected
    setDefaultFileType('');

    // Update the video state immediately with the selected file
    setVideo(file);
    setDefaultFileType(fileType);

  };
  // Additional useEffect to set defaultFileType based on fetched data
  useEffect(() => {
    if (add.length > 0 && add[0].video) {
      const extension = add[0].video.split('.').pop().toLowerCase();
      if (allowedImageExtensions.includes(extension)) {
        setDefaultFileType('image');
      } else if (allowedVideoExtensions.includes(extension)) {
        setDefaultFileType('video');
      }
    }
  }, [add]);

  // const handleFileChange = (e) => {
  //   const fileList = e.target.files[0];
  //   setVideo(fileList);
  // };
  
  

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   const extension = file.name.split('.').pop().toLowerCase();

  //   if (allowedImageExtensions.includes(extension)) {
  //     setFileType('image');
  //   } else if (allowedVideoExtensions.includes(extension)) {
  //     setFileType('video');
  //   }
  // };
 
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Main Section</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          value={title}
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>subTitle</label>
                        <Input
                          type="text"
                          placeholder='required'
                          onChange={(e) => setSubtitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label >Content </label>
                        <Input
                          type="text"
                          onChange={(e) => setContent(e.target.value)} // Update state with the selected file
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">video </label>
                        <input
                          required
                          type="file"
                          name="video"
                          accept=".mp4, .avi, .mov, .mkv, .flv , .jpg, .jpeg , .png, .gif"
                          onChange={(e) => setVideo(e.target.files[0])} // Update state with the selected file
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
                <CardTitle tag="h4">Main Section Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>subtitle</th>
                      <th>content</th>
                      <th>video</th>

                    </tr>
                  </thead>
                  {add &&
                    Array.isArray(add) &&
                    add.map((blog, index) => (
                      <tbody key={blog.id}>
                        <tr key={blog.id}>
                          <td>{blog.title}</td>
                          <td>{blog.subtitle}</td>
                          <td>{blog.content}</td>
                          <td>
                            {allowedImageExtensions.includes(blog.video.split('.').pop().toLowerCase()) ? (
                              <img
                                src={`http://localhost:8080/` + blog.video}
                                alt={`Contact Video`}
                                height={'50%'}
                                width={'50%'}
                              />
                            ) : allowedVideoExtensions.includes(blog.video.split('.').pop().toLowerCase()) ? (
                              <video autoPlay muted loop height="150" width="200">
                                <source src={`http://localhost:8080/` + blog.video} />
                              </video>
                            ) : null}
                          </td>


                          <td>
                            <Button
                              className="btn-round"
                              color="danger"
                              type="button"
                              onClick={
                                () => handleDelete(blog.id, index) // Calling handleDelete with the product's _id and index
                              }
                            >
                              delete
                            </Button>
                            <Button
                              className="btn-round"
                              color="info"
                              type="button"
                              onClick={() => openUpdateForm(blog.id)}
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
                  <CardTitle tag="h5">Update Main Section</CardTitle>
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
                          <label>subtitle</label>
                          <Input
                            type="text"
                            value={subtitle}
                            placeholder='required'
                            onChange={(e) => setSubtitle(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
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

                      <Col className="pl-1" md="4">
                        {/* <FormGroup>
                        <label htmlFor="exampleInputEmail1">video </label>
                        <input
                          type="file"
                          name="video"
                          accept=".mp4, .avi, .mov, .mkv, .flv , .jpg, .jpeg , .png, .gif"

                          onChange={(e) => setVideo(e.target.files[0])} // Update state with the selected file
                        />
                      </FormGroup> */}
                             <input type="file" onChange={handleFileChange} id="file-input" accept=".jpg, .jpeg , .png, .gif ,.mp4, .avi, .mov, .mkv, .flv "/>
                             <div className="preview">
                          {/* Display selected file or default video */}
                          {selectedFile ? (
                            fileType === 'image' ? (
                              <div>

                              <p>  <b>File name:</b> {selectedFile.name}</p>

                              {/* <img src={URL.createObjectURL(selectedFile)} alt="Selected Image" height={'50%'} width={'50%'} /> */}
                              </div>
                            ) : fileType === 'video' ? (
                              <div>

                              <p>  <b>File name:</b> {selectedFile.name}</p>

                              {/* <video autoPlay muted loop height="150" width="200">
                                <source src={URL.createObjectURL(selectedFile)} />
                              </video> */}
                              </div>
                            ) : null
                          ) : (
                            // Display existing video if available
                            defaultFileType === 'image' ? (
                              <div>

                              <p>  <b>File name:</b> {add[0].video}</p>

                              {/* <img src={`http://localhost:8080/` + add[0].video} alt={`video`} height={'50%'} width={'50%'} /> */}
                              </div>

                            ) :  defaultFileType === 'video' ? (
                              <div>

                              <p>  <b>File name:</b> {add[0].video}</p>

                               {/* <video autoPlay muted loop height="150" width="200">
                                <source src={`http://localhost:8080/` + add[0].video} />
                              </video>   */}
                                                         </div>

                            ) : null
                            
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
                          onClick={() => handleUpdate(updateHomeId)}
                        >
                          Update Home
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

export default Home