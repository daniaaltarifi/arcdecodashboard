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
  const [mainslider, setMainslider] = useState([])
  const [openAddImages, setOpenAddImages] = useState(false)
  const [images, setImages] = useState([]);
  const [openUpdateImages, setOpenUpdateImages] = useState(false)
  const [updateImage, setUpdateImage] = useState(""); // Separate state for image
  const [updateImgId, setUpdateImgId] = useState("");
  const [openAddText, setOpenAddText] = useState("");


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
  const fetchMainslider = async () => {
    try {
      const response = await axios.get("http://localhost:8080/mainslider");
      const data = response.data;
      setMainslider(data);
      console.log("add",add)
    } catch (error) {
      console.log(`Error getting Blog from frontend: ${error}`);
    }
  };
  useEffect(() => {
    fetchData();
    fetchMainslider();
  }, []);

  const handlePost = async () => {
    try {
      // const formData = new FormData();
      // formData.append('title', title);
      // formData.append('subtitle', subtitle);
      // formData.append('content', content);
      // formData.append('video', video);

      // if (!video) {
      //   Toastify({
      //     text: "Please Fill Required Field",
      //     duration: 3000, // Duration in milliseconds
      //     gravity: "top", // 'top' or 'bottom'
      //     position: 'right', // 'left', 'center', 'right'
      //     backgroundColor: "#CA1616",
      //   }).showToast();
      //   return;
      // }
      // Append each selected contact_video file individually

      const response = await axios.post(
        "http://localhost:8080/home/post",
        {title,subtitle,content},
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
    // if (!subtitle) {
    //   Toastify({
    //     text: "Please Fill Subtitle",
    //     duration: 3000, // Duration in milliseconds
    //     gravity: "top", // 'top' or 'bottom'
    //     position: 'right', // 'left', 'center', 'right'
    //     backgroundColor: "#CA1616",
    //   }).showToast();
    //   return;
    // }
    try {
      // const formData = new FormData();
      // formData.append('title', title);
      // formData.append('subtitle', subtitle);
      // formData.append('content', content);
      // formData.append('video', selectedFile); // Append the selected image file


      const response = await axios.put(
        `http://localhost:8080/home/update/${id}`,
        {title,subtitle,content}, // Send the FormData object
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
  const [selectedFile, setSelectedFile] = useState("");
  const [fileType, setFileType] = useState('');
  const [defaultFileType, setDefaultFileType] = useState('');
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/gif', 'image/jpg', 'video/mp4', 'video/mpeg', 'video/quicktime'];

   if (file && allowedTypes.includes(file.type)) {
     // File type is allowed, you can process the file here
     if (file && file.name) {
      setUpdateImage(file);
      const extension = file.name.split('.').pop().toLowerCase();
  
      if (allowedImageExtensions.includes(extension)) {
        setFileType('image');
      } else if (allowedVideoExtensions.includes(extension)) {
        setFileType('video');
      }
    }
      setDefaultFileType('');
    setImages(file);
    setDefaultFileType(fileType);  
} else {
     // File type is not allowed
     Toastify({
       text: "Please upload a valid image or video file.",
       duration: 3000, // Duration in milliseconds
       gravity: "top", // 'top' or 'bottom'
       position: 'right', // 'left', 'center', 'right'
       backgroundColor: "#CA1616",
     }).showToast();    // You can add your own error handling or UI updates here
   }
   

  };
  useEffect(() => {
    if (mainslider.length > 0 && mainslider[0].images) {
      const extension = mainslider[0].images.split('.').pop().toLowerCase();
      if (allowedImageExtensions.includes(extension)) {
        setDefaultFileType('image');
      } else if (allowedVideoExtensions.includes(extension)) {
        setDefaultFileType('video');
      }
    }
  }, [mainslider]);

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
  // const handleFileSelect = (e) => {
  //   const fileInput = document.getElementById('imageInput');
  //   const selectedFiles = Array.from(fileInput.files);
   
  //     const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mpeg', 'video/quicktime'];
   
  //     if (selectedFiles && allowedTypes.includes(selectedFiles.type)) {
  //       // File type is allowed, you can process the file here
  //       console.log('File uploaded:', selectedFiles);
  //       setImages(selectedFiles);

  //  } else {
  //       // File type is not allowed
  //       Toastify({
  //         text: "Please upload a valid image or video file.",
  //         duration: 3000, // Duration in milliseconds
  //         gravity: "top", // 'top' or 'bottom'
  //         position: 'right', // 'left', 'center', 'right'
  //         backgroundColor: "#CA1616",
  //       }).showToast();    // You can add your own error handling or UI updates here
  //     }
     
  // };
//   const handleFileSelect = (e) => {
//   const fileInput = document.getElementById('imageInput');
//   const selectedFiles = Array.from(fileInput.files);
//     // Handle further operations with the allowed file(s)
//     setImages(selectedFiles); // Assuming 'images' is an array state variable

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
      text: "Please upload valid image or video files.",
      duration: 3000,
      gravity: "top",
      position: 'right',
      backgroundColor: "#CA1616",
    }).showToast();
  }
};
  const handlePostImages = async () => {

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
        "http://localhost:8080/mainslider/post",
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
      console.log("Image names:", imageNames);

      setMainslider(imageNames);

      Toastify({
        text: "Added completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",

      }).showToast();
      setTimeout(() => {
        window.location.reload();
      }, 2001);

    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };
  useEffect(() => {
    if (openAddImages) {
      const titleInputElement = document.getElementById('imageInput');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
    if (openUpdateImages) {
      const titleInputElement = document.getElementById('file-input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
    if (openAddText) {
      const titleInputElement = document.getElementById('openaddtext');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
  }, [openAddImages,openUpdateImages,openAddText]);
  const openUpdateFormImage = (p_id) => {
    setOpenUpdateImages(true);
    setUpdateImgId(p_id);
    const selectedData = mainslider.find((data) => data.p_id === p_id);

    // Set the default image names from the fetched data
    if (selectedData) {
      setImages(selectedData.images || "");

    }

  };
  const handleUpdateImges = async (id) => {
    console.log("id", id);
    try {
      const formData = new FormData();
      if (updateImage) {
        formData.append('images', updateImage);
      }
   
      const response = await axios.put(
        `http://localhost:8080/mainslider/update/${id}`,
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );

      // Update the state with the new image details after the update
      setMainslider((prevAdd) =>
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

      setOpenUpdateImages(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };
  const handleDeleteImages = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/mainslider/delete/${id}`
      );
   

      setMainslider((prevProduct) =>
        prevProduct.filter((product) => product.id !== id)
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
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Slider Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>subtitle</th>
                      <th>content</th>
                      {/* <th >video</th> */}
                      <th>Actions</th>

                    </tr>
                  </thead>
                  {
  add.length > 0 ? (
    <tbody>
      {Array.isArray(add) &&
        add.map((blog, index) => (
          <tr key={blog.id}>
            <td>{blog.title}</td>
            <td>{blog.subtitle}</td>
            <td>{blog.content}</td>
            <td colSpan={2}>
              <img
                src={require("../assets/img/trash.png")}
                width={"37vh"}
                onClick={() => handleDelete(blog.id, index)}
              />
              <img
                src={require("../assets/img/edit (1).png")}
                width={"45vh"}
                onClick={() => openUpdateForm(blog.id)}
              />
            </td>
          </tr>
        ))}
    </tbody>
  ) : (
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td colSpan={4}>
          <Button
            className="btn-round"
            color="primary"
            type="button"
            onClick={() => setOpenAddText(true)}
          >
            Add content
          </Button>
        </td>
      </tr>
    </tbody>
  )
}

                        <thead className="text-primary">
                    <tr>
                      <th colSpan={3}>images</th>
                      <th >Actions</th>
                      <th colSpan={2}><Button
                        className="btn-round"
                        color="primary"
                        type="button"
                       onClick={()=>setOpenAddImages(true)}
                        // disabled={add.length > 0}
                        // onClick={handlePost}
                      >
                        Add images
                      </Button></th>
                    

                    </tr>
                  </thead>
                  {mainslider.map((slider)=>(
                    <tr>
                      {/* <td colSpan={3}><img src={`http://localhost:8080/` + slider.images} height={"200vh"} width={"200vh"}/></td> */}
                         <td colSpan={3}>
                         {slider && (slider.images) ? (
                          <>
                            {allowedImageExtensions.includes(slider.images.split('.').pop().toLowerCase()) ? (
                              <img
                                src={`http://localhost:8080/` + slider.images}
                                alt={`Contact Video`}
                                height={'20%'}
                                width={'30%'}
                              />
                            ) : allowedVideoExtensions.includes(slider.images.split('.').pop().toLowerCase()) ? (
                              <video autoPlay muted loop height="150" width="200">
                                <source src={`http://localhost:8080/` + slider.images} />
                              </video>
                            ) : null}
                          </>):null}
                         
                          </td>
                      <td colSpan={3}>
                          <img src={require("../assets/img/trash.png")}width={"37vh"} onClick={
                                () => handleDeleteImages(slider.id) // Calling handleDelete with the product's _id and index
                              }/>

                              <img src= {require("../assets/img/edit (1).png")} width={"45vh"} onClick={() =>openUpdateFormImage(slider.id)}/>
                          </td>
                    </tr>
                  ))}
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      {openAddImages && (

<Row>
  <Col md="12">
    <Card className="card-user">
      <CardHeader>
        <CardTitle tag="h5">Add Images</CardTitle>
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
                  accept=".mp4, .avi, .mov, .mkv, .flv , .jpg, .jpeg , .png, .gif"
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
                onClick={handlePostImages}
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
   <Row>
          <Col md="12">
            <Card className="card-user">
              {openUpdateImages && (
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
                          <input type="file" onChange={handleFileChange} id="file-input"                   accept=".mp4, .avi, .mov, .mkv, .flv , .jpg, .jpeg , .png, .gif"

/>
                          <div className="preview">
                            {updateImage ? (
                              <div>
                                <p>
                                  <b>File name:</b>{updateImage.name}<br /> .
                                </p>

                                {/* <img src={URL.createObjectURL(updateImage)} alt={`logo`} height={'50%'} width={"50%"} /> */}
                              </div>
                            ) : (
                              <div>

                                <p>  <b>File name:</b> {mainslider.find((images) => images.id === updateImgId)?.images}</p>

                                {/* <img src={`http://localhost:8080/` + mainslider.find((images) => images.id === updateImgId)?.images} alt={`logo`} height={'50%'} width={"50%"} /> */}
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
                            onClick={() => handleUpdateImges(updateImgId)}
                          >
                            Update
                          </Button>
                          <Button
                            className="btn-round"
                            color="secondary"
                            type="button"
                            onClick={() => setOpenUpdateImages(false)}
                          >
                            Cancel                        </Button>
                        </div>
                      </Row>
                    </Form>
                  </CardBody>
                </div>
              )}
              {/* {isUpdateFormVisibleText && (
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
              )} */}
              {/* {openAddFormImg && (

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
              )} */}
               {/* {displayAddText &&(
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
        </Row>)} */}
            </Card>
          </Col>
        </Row>

        {openAddText &&
 <Row>
 <Col md="12">
   <Card className="card-user">
     <CardHeader>
       <CardTitle tag="h5">Add Slider</CardTitle>
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
                 id='openaddtext'
                 onChange={(e) => setTitle(e.target.value)}
               />
             </FormGroup>
           </Col>
           <Col className="px-1" md="3">
             <FormGroup>
               <label>subTitle</label>
               <Input
                 type="text"
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
         {/* <Row>
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

         </Row> */}

         <Row>
           <div className="update ml-auto mr-auto">
             <Button
               className="btn-round"
               color="primary"
               type="button"
               // disabled={add.length > 0}
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
        }
      <Row>
        <Col md="12">
          <Card className="card-user">
            {isUpdateFormVisible && (
              <div>
                <CardHeader>
                  <CardTitle tag="h5">Update Slider</CardTitle>
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