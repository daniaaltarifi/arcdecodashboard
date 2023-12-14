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
import '../assets/css/About.css'
function TypeOfServices() {
  const [add, setAdd] = useState([]);
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [descriptionofservice, setDescriptionofservice] = useState("");
  const [image, setImage] = useState("");
  const [openAddFormTypeOfServices, setOpenAddFormTypeOfServices] = useState("");

  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updateTypeOfServiceId, setUpdateTypeOfServiceId] = useState("");
  const [updateServicesId, setUpdateServicesId] = useState("");
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openUpdateFormServices, setOpenUpdateFormServices] = useState(false);

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
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8080/services");
        const data = response.data;
        setServices(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };

    fetchData();
    fetchServices();
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
  const handlePostServices = async () => {

    try {


      console.log("first", title)
      console.log("first", content)

      // Append each selected contact_video file individually
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
      const response = await axios.post(
        "http://localhost:8080/services/post", { title, content }

      );
      setAdd(response.data);
      // Basic toast
      Toastify({
        text: "Added completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();
      window.location.reload()
      console.log("add", add)
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
    if (openAddForm) {
      const titleInputElement = document.getElementById('focus_input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
    if (isUpdateFormVisible) {
      const titleInputElement = document.getElementById('focus_input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
    if (openUpdateFormServices) {
      const titleInputElement = document.getElementById('focus_input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
    if (openAddFormTypeOfServices) {
      const titleInputElement = document.getElementById('focus_input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
  }, [isUpdateFormVisible, openAddForm, openUpdateFormServices,openAddFormTypeOfServices]);
  const handleOpenUpdateForm = (id) => {
    setOpenUpdateFormServices(true)
    setUpdateServicesId(id);

    const selectedData = services.find((data) => data.id === id);

    // Set the default image names from the fetched data
    if (selectedData) {
      setTitle(selectedData.title || "");
      setContent(selectedData.content || "");

    }

  }
  const handleUpdateServices = async (id) => {
    console.log("serv", title, content)
    console.log("serv", id)
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
        `http://localhost:8080/services/update/${id}`,
        { title, content }
      );
      console.log(response.data);
      setServices((prevAdd) =>
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
      // setIsUpdateFormVisible(false);
      setOpenUpdateFormServices(false)
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };
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
  const handleDeleteServices = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/services/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setServices((prevData) =>
        prevData.filter((data) => data.id !== id)
      );

      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
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
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/gif', 'image/jpg', 'video/mp4', 'video/mpeg', 'video/quicktime'];
   
      if (fileList && allowedTypes.includes(fileList.type)) {
        // File type is allowed, you can process the file here
        console.log('File uploaded:', fileList);
        setImage(fileList);
      } else {
        // File type is not allowed
        Toastify({
          text: "Please upload a valid image .",
          duration: 3000, // Duration in milliseconds
          gravity: "top", // 'top' or 'bottom'
          position: 'right', // 'left', 'center', 'right'
          backgroundColor: "#CA1616",
        }).showToast();    // You can add your own error handling or UI updates here
      }
     }
  const handleImageTypeandSave=(e)=>{
    const fileList = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'video/mp4', 'video/mpeg', 'video/quicktime'];
 
    if (fileList && allowedTypes.includes(fileList.type)) {
      // File type is allowed, you can process the file here
      console.log('File uploaded:', fileList);
      setImage(fileList);
    } else {
      // File type is not allowed
      Toastify({
        text: "Please upload a valid image .",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();    // You can add your own error handling or UI updates here
    }
   }
  return (
    <>
      <div className="content">
       
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Services Table</CardTitle>

              </CardHeader>

              <div style={{ display: "flex", justifyContent: "right" }}
              >

                <Button
                  className="btn-round"
                  color="primary"
                  type="button"
                  onClick={() => setOpenAddFormTypeOfServices(true)}
                >
                  Add Type of services
                </Button>
              </div>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Main Title</th>
                      <th>Content</th>
                      <th></th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.length > 0 ? services.map((service, index) => (
                      <tr key={service.id}>
                        <td>{service.title}</td>
                        <td>{service.content}</td>
                        <td width={"35%"}></td>
                        <td>
                        <img src={require("../assets/img/trash.png")}width={"37vh"}  onClick={
                              () => handleDeleteServices(service.id, index) // Calling handleDelete with the product's _id and index
                            }/>

                          {/* <Button
                            className="btn-round"
                            color="danger"
                            type="danger"
                            onClick={
                              () => handleDeleteServices(service.id, index) // Calling handleDelete with the product's _id and index
                            }
                          >
                            delete
                          </Button> */}
                            <img src= {require("../assets/img/edit (1).png")} width={"45vh"}  onClick={() => handleOpenUpdateForm(service.id)}
/>
                          {/* <Button
                            className="btn-round"
                            color="info"
                            type="button"
                            onClick={() => handleOpenUpdateForm(service.id)}
                          >
                            update
                          </Button> */}
                        </td>
                      </tr>

                    )) :
                      <tr>

                        <td></td>
                        <td></td>
                        <td></td>
                        <td width={"35%"}>
                          <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={() => setOpenAddForm(true)}
                          >
                            Add main title & content
                          </Button>
                        </td>
                      </tr>
                    }
                  </tbody>
                  <br />
                  <br />
                  <br />
                  <thead className="text-primary">
                    <tr>
                      <th>Sub Title</th>
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

                          <td width={"35%"}>
                            <img src={`http://localhost:8080/` + data.image} alt={`about`} height={"50%"} width={"50%"} />

                          </td>


                          <td>
                            <img src={require("../assets/img/trash.png")}width={"37vh"} onClick={
                                () => handleDelete(data.id, index) // Calling handleDelete with the product's _id and index
                              }/>
                            {/* <Button
                              className="btn-round"
                              color="danger"
                              type="danger"
                              onClick={
                                () => handleDelete(data.id, index) // Calling handleDelete with the product's _id and index
                              }
                            >
                              delete
                            </Button> */}
                            <img src= {require("../assets/img/edit (1).png")} width={"45vh"} onClick={() => openUpdateForm(data.id)}/>
                            {/* <Button
                              className="btn-round"
                              color="info"
                              type="button"
                              onClick={() => openUpdateForm(data.id)}
                            >
                              update
                            </Button> */}

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
      {openAddForm && (
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Service</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          type="text"
                          id='focus_input'
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>content</label>
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
                        onClick={handlePostServices}
                      //  disabled={add.length > 0}

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
      )}
      {openAddFormTypeOfServices && (
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
                         id='focus_input'
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
                         onChange={handleImageTypeandSave} // Update state with the selected file
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
      )}
      <Row>
        <Col md="12">
          <Card className="card-user">
            {openUpdateFormServices && (
              <div>
                <CardHeader>
                  <CardTitle tag="h5">Update service</CardTitle>
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
                          onClick={() => handleUpdateServices(updateServicesId)}
                        >
                          Update service
                        </Button>
                        <Button
                          className="btn-round"
                          color="secondary"
                          type="button"
                          onClick={() => setOpenUpdateFormServices(false)}
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
                        <input type="file" onChange={handleFileChange} id="file-input" accept=".jpg, .jpeg , .png, .gif" />
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

                              <p>  <b>File name:</b> {add.find((image) => image.id === updateTypeOfServiceId)?.image}</p>
                              <img src={`http://localhost:8080/` + add.find((image) => image.id === updateTypeOfServiceId)?.image} alt={`image`} height={'50%'} width={"50%"} />
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

export default TypeOfServices