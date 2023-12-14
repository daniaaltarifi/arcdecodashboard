import React, { useEffect, useState } from 'react'
import axios from 'axios';
import validator from 'validator';
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
function Footer() {
  const [add, setAdd] = useState([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState(['']);
  const [social1, setSocial1] = useState("")
  const [social2, setSocial2] = useState("")
  const [social3, setSocial3] = useState("")
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updateFooterId, setUpdateFooterId] = useState("");
  const [updateExtraContactId, setUpdateExtraContactId] = useState("");
  const [link, setLink] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");
  const [allContact, setAllContact] = useState([]);
  const [inputs, setInputs] = useState(['']); // State to hold input fields as an array of objects
  const [openAddSocial, setOpenAddSocial] = useState(false);
  const [isSocialUpdateFormVisiable, setIsSocialUpdateFormVisible] = useState(false);
  // const [link, setLink] = useState("");
  const [socialmedia, setSocialmedia] = useState("")
  const [allSocial, setAllSocial] = useState("")
  const [updateHomeId, setUpdateHomeId] = useState("");
  const [openExtraFormUpdate, setOpenExtraFormUpdate] = useState(false);
  const [openAddFooter, setOpenAddFooter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/footer");
        const data = response.data;
        setAdd(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    const fetchExtraContact = async () => {
      try {
        const response = await axios.get("http://localhost:8080/extracontact");
        const data = response.data;
        setAllContact(data);
        console.log("cont", allContact)
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    const fetchSocial = async () => {
      try {
        const response = await axios.get("http://localhost:8080/socialfooter");
        const data = response.data;
        setAllSocial(data);
        console.log(add)
        console.log("link", data[0].link)
      } catch (error) {
        console.log(`Error getting Footer Home from frontend: ${error}`);
      }
    };
    fetchData();
    fetchExtraContact();
    fetchSocial();
  }, []);
  const [phoneError, setPhoneError] = useState('');
  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };
  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    setPhone(phoneNumber);

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit phone number');
    } else {
      setPhoneError('');
    }
  };
  const validateLink = (link) => {
    if (link && !validator.isURL(link)) {
      return 'Please enter a valid URL'; // If the link format is invalid
      console.log("validation error")
    }
    return ''; // Return an empty string if the link is valid
  };
  const [linkError, setLinkError] = useState('');
  const [link2Error, setLink2Error] = useState('');
  const [link3Error, setLink3Error] = useState('');
  const handleLinkChange = (e) => {
    const inputLink = e.target.value;
    setLink(inputLink);
    const error = validateLink(inputLink);
    setLinkError(error);
  };
  // const handleLink2Change = (e) => {
  //   const inputLink2 = e.target.value;
  //   setLink2(inputLink2);
  //   const error = validateLink(inputLink2);
  //   setLink2Error(error);
  // }
  // const handleLink3Change = (e) => {
  //   const inputLink3 = e.target.value;
  //   setLink3(inputLink3);
  //   const error = validateLink(inputLink3);
  //   setLink3Error(error);
  // }
  const handlePost = async () => {
    if (phone && !validatePhoneNumber(phone)) {
      Toastify({
        text: "Please enter a valid phone number (10 digits)",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
    // if (link && validateLink(link) || link && validateLink(link2) || link3 && validateLink(link3)) {
    //   Toastify({
    //     text: "Please enter a valid link to connect",
    //     duration: 3000,
    //     gravity: "top",
    //     position: 'right',
    //     backgroundColor: "#CA1616",
    //   }).showToast();
    //   return;
    // }
    try {
      const formData = new FormData();
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('address', address);
      // formData.append('social1', social1);
      // formData.append('social2', social2);
      // formData.append('social3', social3);
      // formData.append('link', link);
      // formData.append('link2', link2);
      // formData.append('link3', link3);
      // Loop through the inputs array of objects and append each input value individually
      // inputs.forEach((contact, index) => {
      //   formData.append(`contact[${index}][name]`, contact);
      // });
      console.log("phone",phone);
      // console.log("inputs",inputs);
      const response = await axios.post(
        "http://localhost:8080/footer/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

        }
      );

      setAdd(response.data);
      console.log("dddddd",add)
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
  const handlePostSocial = async () => {
    try {
      const formData = new FormData();
      formData.append('link', link);

      formData.append('socialmedia', socialmedia);

      if (link && validateLink(link)) {
        Toastify({
          text: "Please enter a valid link to connect",
          duration: 3000, // Duration in milliseconds
          gravity: "top", // 'top' or 'bottom'
          position: 'right', // 'left', 'center', 'right'
          backgroundColor: "#CA1616",
        }).showToast();
        return;
      }
      if (!link || !socialmedia) {
        Toastify({
          text: "Please Fill All Field",
          duration: 3000, // Duration in milliseconds
          gravity: "top", // 'top' or 'bottom'
          position: 'right', // 'left', 'center', 'right'
          backgroundColor: "#CA1616",
        }).showToast();
        return;
      }
      // Append each selected contact_video file individually

      const response = await axios.post(
        "http://localhost:8080/socialfooter/post",
        formData,
        {
          headers: {
            "link3-Type": "multipart/form-data",
          },
        }
      );

      setAllSocial(response.data);
      Toastify({
        text: "Added completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();
      window.location.reload()

    }
    catch (error) {

      console.log(`Error fetching post data ${error}`);
    }
  };
  const openUpdateForm = (id, index) => {
    console.log("idx", index)
    setIsUpdateFormVisible(true);
    setUpdateFooterId(id);
    // const updatecontact=allContact.filter(contact => contact.id === id);
    setUpdateExtraContactId(index)
    console.log("setUpdateExtraContactId", index)
    console.log("add", add)
    const selectedData = add.find((data) => data.id === id);
    if (selectedData) {
      setPhone(selectedData.phone || "");
      setEmail(selectedData.email || "");
      setAddress(selectedData.address || "");
      // setLink(selectedData.link || "");
      // setLink2(selectedData.link2 || "");
      // setLink3(selectedData.link3 || "");
    }
    // const extraContactData = allContact.filter((data) => data.footer_id === id);
    // console.log("allContact", allContact);
    // console.log("extraContactData", extraContactData);
    // if (extraContactData.length > 0) {
    //   const contactNames = extraContactData.map((contact) => contact.contact);
    //   setContact(contactNames);
    //   console.log("setContacts", contact);
    // }
  };
  useEffect(() => {
    if (isUpdateFormVisible) {
      const titleInputElement = document.getElementById('focus_input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
    if (openAddFooter) {
      const titleInputElement = document.getElementById('focus_phone');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
     if (openAddSocial) {
      const titleInputElement = document.getElementById('link_focus');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
    if (isSocialUpdateFormVisiable) {
      const titleInputElement = document.getElementById('focus_input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
    if (openExtraFormUpdate) {
      const titleInputElement = document.getElementById('focus_input');
      if (titleInputElement) {
        titleInputElement.focus();
      }
    }
  }, [isUpdateFormVisible,openAddFooter,openAddSocial,isSocialUpdateFormVisiable,openExtraFormUpdate]);
  const handleUpdate = async (id, index) => {
    console.log("updateExtraContactId", index)
    console.log("mainid", id)
    if (phone && !validatePhoneNumber(phone)) {
      Toastify({
        text: "Please enter a valid phone number (10 digits)",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
    // if (link && validateLink(link) || link && validateLink(link2) || link3 && validateLink(link3)) {
    //   Toastify({
    //     text: "Please enter a valid link to connect",
    //     duration: 3000,
    //     gravity: "top",
    //     position: 'right',
    //     backgroundColor: "#CA1616",
    //   }).showToast();
    //   return;
    // }
    try {
      const formData = new FormData();
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('address', address);
      
      // formData.append('link', link); // Append the selected image file
      // formData.append('link2', link2); // Append the selected image file
      // formData.append('link3', link3); // Append the selected image file
      // formData.append('updatedContact', contact); // Append the selected image file
      // contact.forEach((contact, index) => {
      //   formData.append(`updatedContact`, contact);
      // });

      const response = await axios.put(
        `http://localhost:8080/footer/update/${id}`,
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
      // setContact(prevContacts => {
      //   const updatedContacts = [...prevContacts]; // Create a copy of the contacts array
      //   updatedContacts[index] = formData.get('contact'); // Update the specific index with the new value
      //   return updatedContacts; // Set the state with the updated contacts array
      // });
      Toastify({
        text: "Updated completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();
      setIsUpdateFormVisible(false);
      window.location.reload()
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };
  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/footer/delete/${id}`
      );
      setAdd((prevData) =>
        prevData.filter((data) => data.id !== id)
      );
      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };
  // const handleFileChangeSocial1 = (e) => {
  //   const fileList = e.target.files[0];
  //   setSocial1(fileList);
  // };
  // const handleFileChangeSocial2 = (e) => {
  //   const fileList = e.target.files[0];
  //   setSocial2(fileList);
  // };
  // const handleFileChangeSocial3 = (e) => {
  //   const fileList = e.target.files[0];
  //   setSocial3(fileList);
  // };

  const handleAddInput = () => {
    setInputs([...inputs, '']); // Adding a new input field as a new object in the array
    // setContact([...contact, '']); // Adding an empty contact value for the new input
  };
  // const handleInputChange = (index, event) => {
  //   const newInputs = [...inputs];
  //   newInputs[index] = event.target.value;
  //   setInputs(newInputs);

  //   const newContacts = [...contact];
  //   newContacts[index] = event.target.value;
  //   setContact(newContacts);
  //   console.log("index", index);
  //   // console.log("add.id", add.id);
  //   openUpdateForm(add.id, index); // Pass updateFooterId and extracontactId to handleUpdate

  // };
  console.log("newInputs", contact);

  const openSocialUpdateForm = (id) => {
    setIsSocialUpdateFormVisible(true);
    setUpdateHomeId(id);
    const selectedData = allSocial.find((data) => data.id === id);

    // Set the default image names from the fetched data
    if (selectedData) {
      setLink(selectedData.link || "");

    }

  };
  const handleUpdateSocial = async (id) => {
    if (link && validateLink(link)) {
      Toastify({
        text: "Please enter a valid link to connect",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
    try {
      const formData = new FormData();
      formData.append('link', link);

      formData.append('socialmedia', socialmedia); // Append the selected image file

      const response = await axios.put(
        `http://localhost:8080/socialfooter/update/${id}`,
        formData, // Send the FormData object
        {
          headers: {
            "link3-Type": "multipart/form-data", // Set the link3 type to multipart/form-data
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
 
  const handleFileChange=(e)=>{
    const fileList = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'video/mp4', 'video/mpeg', 'video/quicktime'];
 
    if (fileList && allowedTypes.includes(fileList.type)) {
      // File type is allowed, you can process the file here
      console.log('File uploaded:', fileList);
      setSocialmedia(fileList);
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
  const returnFileSize = (number) => {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  };
  const handleDeleteSocial = async (id, index) => {
    try {
        const response = await axios.delete(
            `http://localhost:8080/socialfooter/delete/${id}`
        );
        console.log(id);
        console.log(response);

        setAllSocial((prevData) =>
            prevData.filter((data) => data.id !== id)
        );

        setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
        console.error(error);
    }
};
const handleAddExtra = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/extracontact/post",{contact}
  
    );
    setContact(response.data);
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
const handleUpdateExtraContact = async (id) => {
  try {
   

    const response = await axios.put(
      `http://localhost:8080/extracontact/update/${id}`,
     {contact}
    );
    console.log(response.data);
    setAllContact((prevAdd) =>
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
    setOpenExtraFormUpdate(false);
  } catch (error) {
    console.log(`Error in fetch edit data: ${error}`);
  }
};
const[updateExtraId,setUpdateExtraId]=useState("")
const openExtraUpdateForm = (id) => {
  setOpenExtraFormUpdate(true);
  setUpdateExtraId(id);
  const selectedData = allContact.find((data) => data.id === id);

  // Set the default image names from the fetched data
  if (selectedData) {
    setContact(selectedData.contact || "");

  }

};

const handleDeleteExtraContact = async (id, index) => {
  try {
      const response = await axios.delete(
          `http://localhost:8080/extracontact/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setAllContact((prevData) =>
          prevData.filter((data) => data.id !== id)
      );

      setDel((prev) => prev.filter((_, i) => i !== index));
  } catch (error) {
      console.error(error);
  }
};
const[openExtraFormAdd,setOpenExtraFormAdd]=useState(false)
const handleImageTypeandSave=(e)=>{
  const fileList = e.target.files[0];
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'video/mp4', 'video/mpeg', 'video/quicktime'];

  if (fileList && allowedTypes.includes(fileList.type)) {
    // File type is allowed, you can process the file here
    console.log('File uploaded:', fileList);
 setSocialmedia(fileList)
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
                <CardTitle tag="h4">Footer Table</CardTitle>
              </CardHeader>
              <div style={{ display: "flex", justifyContent: "right" }}
              >

                {/* <Button
                  className="btn-round"
                  color="primary"
                  type="button"
                  onClick={() => setOpenAddSocial(true)}
                >
                  Add Social Media
                </Button> */}
              </div>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>phone</th>
                      <th>email</th>
                      <th >address</th>
                      <th style={{width:"30vh"}}>Actions</th>

                    </tr>
                  </thead>
                  {/* {add &&
                    Array.isArray(add) &&
                    add.map((data, index) => (
                      <tbody key={data.id}>
                        <tr key={data.id}>
                          <td>{data.phone}</td>
                          <td>{data.email}</td>
                          <td>{data.address}</td>
                         
                          <td>
                            <img src={require("../assets/img/trash.png")} width={"37vh"} onClick={
                              () => handleDelete(data.id, index) // Calling handleDelete with the product's _id and index
                            } />
                            <img src={require("../assets/img/edit (1).png")} width={"45vh"} onClick={() => openUpdateForm(data.id)} />
                          </td>
                        </tr>
                      </tbody>
                    ))} */}
                    {add.length > 0 && Array.isArray(add) ? (
  add.map((data, index) => (
    <tbody key={data.id}>
      <tr key={data.id}>
        <td>{data.phone}</td>
        <td  >{data.email}</td>
        <td>{data.address}</td>
        <td  >
          <img
            src={require("../assets/img/trash.png")}
            width={"37vh"}
            onClick={() => handleDelete(data.id, index)}
          />
          <img
            src={require("../assets/img/edit (1).png")}
            width={"45vh"}
            onClick={() => openUpdateForm(data.id)}
          />
        </td>
      </tr>
    </tbody>
  ))
) : (
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td colSpan={2}>
        <Button
          className="btn-round"
          color="primary"
          type="button"
          onClick={() => setOpenAddFooter(true)}
        >
          Add content
        </Button>
      </td>
    </tr>
  </tbody>
)}
<thead className="text-primary">
  <tr>
    <th>link</th>
    <th colSpan={2}>social media</th>
    <th colSpan={3}>Actions
    <img
          src={require("../assets/img/sign.png")}
          width={"30vh"}
          style={{marginLeft:"3vh"}}
          onClick={() => setOpenAddSocial(true)}
          />
    </th>
  </tr>
</thead>
{allSocial &&
  Array.isArray(allSocial) &&
  allSocial.map((blog, index) => (
    <tbody key={blog.id}>
      <tr key={blog.id}>
        <td>{blog.link}</td>
        <td colSpan={2}>
          {blog.socialmedia && (
            <img
              src={`http://localhost:8080/` + blog.socialmedia}
              alt={`Contact Image`}
              height={'25%'} width={"25%"}
            />
          )}
        </td>
        <td colSpan={2}>
          <img
            src={require("../assets/img/trash.png")}
            width={"37vh"}
            onClick={() => handleDeleteSocial(blog.id, index)}
          />
          <img
            src={require("../assets/img/edit (1).png")}
            width={"45vh"}
            onClick={() => openSocialUpdateForm(blog.id)}
          />
        </td>
      </tr>
    </tbody>
  ))}
<tbody>
  <tr className="text-primary">
    <th colSpan={3}>CONTACT</th>
    <th colSpan={2}>ACTIONS 
    <img
          src={require("../assets/img/sign.png")}
          width={"30vh"}
          style={{marginLeft:"3vh"}}
          onClick={() =>setOpenExtraFormAdd(true)}
        />
    </th>
  </tr>
  {allContact.map((contact) => (
    <tr key={contact.id}>
      <td colSpan={3}>{contact.contact}</td>
      <td colSpan={2}>
        <img
          src={require("../assets/img/trash.png")}
          width={"37vh"}
          onClick={() => handleDeleteExtraContact(contact.id)}
        />
        <img
          src={require("../assets/img/edit (1).png")}
          width={"45vh"}
          onClick={() => openExtraUpdateForm(contact.id)}
        />
      
      </td>
    </tr>
  ))}
</tbody>

          
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
      {openAddFooter && (
          <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Footer</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>phone</label>
                        <Input
                          type="tel"
                          id='focus_phone'
                          onChange={handlePhoneChange}
                        />
                        {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}

                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>email</label>
                        <Input
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>address</label>
                        <Input
                          type="text"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                  <Row>
                  </Row>
                  {/* <Row>
                    <Col className="px-1" md="3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img src={require("../assets/img/sign.png")} alt="Add Field" onClick={handleAddInput} />
                    </Col>
                  </Row> */}
                  {/* {inputs.map((input, index) => (
                    <Row key={index}>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Extra Contact</label>
                          <Input
                            placeholder="optional"
                            type="text"
                            value={input}
                            onChange={(event) => handleInputChange(index, event)}
                            name="name"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  ))} */}
                  {/* <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Link</label>
                        <Input
                          type="text"
                          // onChange={(e) => setLink(e.target.value)}
                          onChange={handleLinkChange}
                        />
                      </FormGroup>
                      {linkError && <p style={{ color: 'red' }}>{linkError}</p>}

                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">social media 1 </label>
                        <input
                          type="file"
                          name="social1"
                          onChange={(e) => setSocial1(e.target.files[0])} // Update state with the selected file
                        />
                      </FormGroup>

                    </Col>
                  </Row> */}
                  {/* <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Link2</label>
                        <Input
                          type="text"
                          onChange={handleLink2Change}
                        />
                      </FormGroup>
                      {link2Error && <p style={{ color: 'red' }}>{link2Error}</p>}

                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <div>
                          <label>social media 2</label>
                          <Input
                            name="social2"
                            type="file"
                            onChange={(e) => setSocial2(e.target.files[0])} // Update state with the selected file
                          // disabled={fileLimit}
                          />

                          <label htmlFor="fileUpload"></label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row> */}
                  {/* <Row>                    <Col className="px-1" md="3">
                    <FormGroup>
                      <label>Link3</label>
                      <Input
                        type="text"
                        onChange={handleLink3Change}
                      />
                    </FormGroup>
                    {link3Error && <p style={{ color: 'red' }}>{link3Error}</p>}

                  </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup >
                        <div>
                          <label>social media 3</label>
                          <Input
                            name="social3"
                            type="file"
                            onChange={(e) => setSocial3(e.target.files[0])} // Update state with the selected file
                          // disabled={fileLimit}
                          />

                          <label htmlFor="fileUpload"></label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row> */}

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={handlePost}
                      // disabled={add.length > 0}
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
      {openAddSocial && (
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5"> Add Social Media</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>link</label>
                        <Input
                          value={link}
                          type="text"
                          id='link_focus'
                          onChange={handleLinkChange}
                        />
                      </FormGroup>
                      {linkError && <p style={{ color: 'red' }}>{linkError}</p>}

                    </Col>


                  </Row>
                  <Row>

                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <div>
                          <label>social media</label>
                          <Input
                            required
                            name="social1"
                            type="file"
                            onChange={handleImageTypeandSave} // Update state with the selected file
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
                        onClick={handlePostSocial}
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
            {isSocialUpdateFormVisiable && (
              <div>
                <CardHeader>
                  <CardTitle tag="h5">Update Social Media</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form >
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>link</label>
                          <Input
                            type="text"
                            id='focus_input'

                            value={link}
                            onChange={handleLinkChange}
                          />
                        </FormGroup>                        {linkError && <p style={{ color: 'red' }}>{linkError}</p>}

                      </Col>

                    </Row>
                    <Row>




                    </Row>
                    <Row>


                      <Col className="pl-1" md="4">
                        {/* <FormGroup>
                                               <label htmlFor="exampleInputEmail1">Social media </label>
                                               <input
                                                   type="file"
                                                   name="social3"
                                                   onChange={(e) => setSocialmedia(e.target.files[0])} // Update state with the selected file
                                               />
                                           </FormGroup> */}
                        <input type="file" onChange={handleFileChange} id="file-input" />
                        <div className="preview">
                          {socialmedia ? (
                            <div>
                              <p>
                                <b>File name:</b>{socialmedia.name}<br /> <b>file size: </b>{returnFileSize(socialmedia.size)}.
                              </p>
                              <img src={URL.createObjectURL(socialmedia)} alt={`socialmedia`} height={'50%'} width={"50%"} />
                            </div>
                          ) : (
                            <div>

                              <p>  <b>File name:</b> {allSocial.find((social) => social.id === updateHomeId)?.socialmedia}</p>
                              <img src={`http://localhost:8080/` + allSocial.find((social) => social.id === updateHomeId)?.socialmedia} alt={`socialmedia`} height={'50%'} width={"50%"} />
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
                          onClick={() => handleUpdateSocial(updateHomeId)}
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
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card className="card-user">
            {openExtraFormAdd && (
              <div>
                <CardHeader>
                  <CardTitle tag="h5">Add Extra Contact</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form >
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>extra contact</label>
                          <Input
                            type="text"
                            id='focus_input'

                            onChange={(e)=>setContact(e.target.value)}
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
                          onClick={handleAddExtra}
            ////////////////////////////////tests////////////////////////////////
                        >
                          Add
                        </Button>
                        <Button
                          className="btn-round"
                          color="secondary"
                          type="button"
                          onClick={() => setOpenExtraFormAdd(false)}
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
            {openExtraFormUpdate && (
              <div>
                <CardHeader>
                  <CardTitle tag="h5">Update Extra Contact</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form >
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>extra contact</label>
                          <Input
                            type="text"
                            value={contact}
                            id='focus_input'

                            onChange={(e)=>setContact(e.target.value)}
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
                          onClick={() => handleUpdateExtraContact(updateExtraId)}
            ////////////////////////////////tests////////////////////////////////
                        >
                          Update Footer
                        </Button>
                        <Button
                          className="btn-round"
                          color="secondary"
                          type="button"
                          onClick={() => setOpenExtraFormUpdate(false)}
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
                  <CardTitle tag="h5">Update Footer</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form >
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>phone</label>
                          <Input
                            type="text"
                            value={phone}
                            id='focus_input'

                            onChange={handlePhoneChange}
                          />
                          {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}

                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>email</label>
                          <Input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>address</label>
                          <Input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                          onClick={() => handleUpdate(updateFooterId)}
                        >
                          Update Footer
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

export default Footer