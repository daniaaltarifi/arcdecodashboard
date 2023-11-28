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
  const [extraContact, setExtraContact] = useState("");
  const [social1, setSocial1] = useState("")
  const [social2, setSocial2] = useState("")
  const [social3, setSocial3] = useState("")
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updateFooterId, setUpdateFooterId] = useState("");
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");

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

    fetchData();
  }, []);

  // const validatePhoneNumber = (phoneNumber) => {
  //   const phonePattern = new RegExp(/\(\d{3}\)\s*\d{3}-\d{4}/);
  //   return phonePattern.test(phoneNumber); // Check validity for non-empty phone number
  // };
  // const validatePhoneNumber = (phoneNumber) => {
  //   const isValidPhoneNumber = validator.isMobilePhone(phoneNumber)
  //   return (isValidPhoneNumber)
  //  }


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
//validate link
const validateLink = (link) => {
 
   if (link && !validator.isURL(link)) {
    return 'Please enter a valid URL'; // If the link format is invalid
    console.log("validation error")
  }

  return ''; // Return an empty string if the link is valid
};
  const [link1Error, setLink1Error] = useState('');
  const [link2Error, setLink2Error] = useState('');
  const [link3Error, setLink3Error] = useState('');

  const handleLink1Change = (e) => {
    const inputLink = e.target.value;
    setLink1(inputLink);

    const error = validateLink(inputLink);
    setLink1Error(error);
  };
  const handleLink2Change = (e) => {
    const inputLink2 = e.target.value;
    setLink2(inputLink2);
    const error = validateLink(inputLink2);
    setLink2Error(error);
  }
  const handleLink3Change = (e) => {
    const inputLink3 = e.target.value;
    setLink3(inputLink3);
    const error = validateLink(inputLink3);
    setLink3Error(error);
  }


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
  if (link1 && validateLink(link1) || link1 && validateLink(link2) ||link3 && validateLink(link3)) {
    Toastify({
      text: "Please enter a valid link to connect",
      duration: 3000,
      gravity: "top",
      position: 'right',
      backgroundColor: "#CA1616",
    }).showToast();
    return;
  }
    try {
      const formData = new FormData();
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('extraContact', extraContact);
      formData.append('social1', social1);
      formData.append('social2', social2);
      formData.append('social3', social3);
      formData.append('link1', link1);
      formData.append('link2', link2);
      formData.append('link3', link3);

      // Append each selected contact_video file individually

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
    setUpdateFooterId(id);

    const selectedData = add.find((data) => data.id === id);

    // Set the default image names from the fetched data
    if (selectedData) {
      setPhone(selectedData.phone || "");
      setEmail(selectedData.email || "");
      setAddress(selectedData.address || "");
      setLink1(selectedData.link1 || "");
      setLink2(selectedData.link2 || "");
      setLink3(selectedData.link3 || "");

      setExtraContact(selectedData.extraContact);

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
    // if (!phone || !email || !address || !link1 || !link2 || !link3) {
    //   Toastify({
    //     text: "Please Fill All Field",
    //     duration: 3000, // Duration in milliseconds
    //     gravity: "top", // 'top' or 'bottom'
    //     position: 'right', // 'left', 'center', 'right'
    //     backgroundColor: "#CA1616",
    //   }).showToast();
    //   return;
    // }

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
    if (link1 && validateLink(link1) || link1 && validateLink(link2) ||link3 && validateLink(link3)) {
      Toastify({
        text: "Please enter a valid link to connect",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
    try {
      const formData = new FormData();
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('extraContact', extraContact); // Append the selected image file
      formData.append('social1', social1); // Append the selected image file
      formData.append('social2', social2); // Append the selected image file
      formData.append('social3', social3); // Append the selected image file
      formData.append('link1', link1); // Append the selected image file
      formData.append('link2', link2); // Append the selected image file
      formData.append('link3', link3); // Append the selected image file

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

  const handleFileChangeSocial1 = (e) => {
    const fileList = e.target.files[0];
    setSocial1(fileList);
  };
  const handleFileChangeSocial2 = (e) => {
    const fileList = e.target.files[0];
    setSocial2(fileList);
  };
  const handleFileChangeSocial3 = (e) => {
    const fileList = e.target.files[0];
    setSocial3(fileList);
  };
  return (
    <>
      <div className="content">
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
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Extra Contact</label>
                        <Input
                          placeholder='optional'
                          type="text"
                          onChange={(e) => setExtraContact(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Link1</label>
                        <Input
                          type="text"
                          // onChange={(e) => setLink1(e.target.value)}
                          onChange={handleLink1Change}
                        />
                      </FormGroup>
                      {link1Error && <p style={{ color: 'red' }}>{link1Error}</p>}

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


                  </Row>
                  <Row>
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
                  </Row>
                  <Row>                    <Col className="px-1" md="3">
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
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Footer Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>phone</th>
                      <th>email</th>
                      <th>address</th>
                      <th>extraContact</th>
                      <th>social media1</th>
                      <th>Link1</th>
                      <th>social media2</th>
                      <th>Link2</th>
                      <th>social media3</th>
                      <th>Link3</th>

                    </tr>
                  </thead>
                  {add &&
                    Array.isArray(add) &&
                    add.map((data, index) => (
                      <tbody key={data.id}>
                        <tr key={data.id}>
                        <td>{data.phone }</td>
                          <td>{data.email}</td>
                          <td>{data.address}</td>
                          <td>{data.extraContact}</td>
                          
                          <td>
                          <td>
  {data.social1 && data.link1 ? (
    <a href={data.link1}>
      <img src={`http://localhost:8080/` + data.social1} alt={`Contact Video`} height={"50%"} width={"50%"} />
    </a>
  ) : null}
</td>
                          </td>
                          <td>{data.link1}</td>

                          <td>
                            {data.social2 && data.link2 ? (

                              <img src={`http://localhost:8080/` + data.social2} alt={`Contact Video`} height={"50%"} width={"50%"} />
                            ) : (
                              ""
                            )}

                          </td>
                          <td>{data.link2}</td>

                          <td>
                            {data.social3 && data.link3?(

                              <img src={`http://localhost:8080/` + data.social3} alt={`Contact Video`} height={"50%"} width={"50%"} />
                            ):(
                              ""
                            )}

                          </td>
                          <td>{data.link3}</td>
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
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Extra Contact</label>
                          <Input
                            placeholder='optional'
                            type="text"
                            value={extraContact}
                            onChange={(e) => setExtraContact(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Link1</label>
                          <Input
                            type="text"
                            value={link1}
                            onChange={handleLink1Change}
                            />
                        </FormGroup>
                        {link1Error && <p style={{ color: 'red' }}>{link1Error}</p>}

                      </Col>
                      <Col className="pl-1" md="3">
                      <input type="file" onChange={handleFileChangeSocial1} id="file-input" style={{marginRight:"10%"}}/>
    </Col>

   <Col>
   
    <div className="preview" >
      {social1 ? (
        <div style={{ display: 'flex',alignItems:"center"}}>
           <div>

            <p style={{marginTop:"10%"}}>
              <b>File name:</b> {social1.name}.
            </p>
           </div>
            {/* <p style={{marginLeft:"30%",width:"90%"}}><b>File size: </b>{returnFileSize(social1.size)}</p> */}
          <img src={URL.createObjectURL(social1)} alt={`social`} height={'10%'} width={"10%"} style={{ marginLeft: '10px' }} />
        </div>
      ) : add[0].social1 && add[0].link1 ?(
        <div style={{ display: 'flex' }}>
          <div>
            <p style={{marginTop:"10%"}}><b>File name:</b> {add[0].social1}</p>
          </div>
          <img src={`http://localhost:8080/` + add[0].social1} alt={`social`} height={'10%'} width={"10%"} style={{ marginLeft: '10px' }} />
        </div>
      ): ""}
    </div>
    {/* </div> */}
    </Col>

                    </Row>
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Link2</label>
                          <Input
                            type="text"
                            value={link2}
                            onChange={handleLink2Change}
                            />
                        </FormGroup>
                        {link2Error && <p style={{ color: 'red' }}>{link2Error}</p>}

                      </Col>
                      <Col className="pl-1" md="3">
                        {/* <FormGroup>
                          <label htmlFor="exampleInputEmail1">social media 2 </label>
                          <input
                            type="file"
                            name="image_data"
                            onChange={(e) => setSocial2(e.target.files[0])} // Update state with the selected file
                          />
                        </FormGroup> */}
               <input type="file" onChange={handleFileChangeSocial2} id="file-input" style={{marginRight:"10%"}}/>
    </Col>

   <Col>
   
    <div className="preview" >
      {social2 ? (
        <div style={{ display: 'flex',alignItems:"center"}}>
           <div>

            <p style={{marginTop:"10%"}}>
              <b>File name:</b> {social2.name}.
            </p>
           </div>
            {/* <p style={{marginLeft:"30%",width:"90%"}}><b>File size: </b>{returnFileSize(social1.size)}</p> */}
          <img src={URL.createObjectURL(social2)} alt={`social`} height={'10%'} width={"10%"} style={{ marginLeft: '10px' }} />
        </div>
      ) : add[0].social2 && add[0].link2 ?(
        <div style={{ display: 'flex' }}>
          <div>
            <p style={{marginTop:"10%"}}><b>File name:</b> {add[0].social2}</p>
          </div>
          <img src={`http://localhost:8080/` + add[0].social2} alt={`social`} height={'10%'} width={"10%"} style={{ marginLeft: '10px' }} />
        </div>
      ): ""}
    </div>
    {/* </div> */}
    </Col>
                    </Row>
                    <Row>

                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Link3</label>
                          <Input
                            type="text"
                            value={link3}
                           onChange={handleLink3Change}
                        
                          />
                        </FormGroup>
                        {link3Error && <p style={{ color: 'red' }}>{link3Error}</p>}

                      </Col>
                      <Col className="pl-1" md="3">
                        {/* <FormGroup>
                          <label htmlFor="exampleInputEmail1">social media 3 </label>
                          <input
                            type="file"
                            name="image_data"
                            onChange={(e) => setSocial3(e.target.files[0])} // Update state with the selected file
                          />
                        </FormGroup> */}
                         {/* <div className="input-row" style={{ display: 'flex' }}> */}
    <input type="file" onChange={handleFileChangeSocial3} id="file-input" style={{marginRight:"10%"}}/>
    </Col>

   <Col>
   
    <div className="preview" >
      {social3 ? (
        <div style={{ display: 'flex',alignItems:"center"}}>
           <div>

            <p style={{marginTop:"10%"}}>
              <b>File name:</b> {social3.name}.
            </p>
           </div>
            {/* <p style={{marginLeft:"30%",width:"90%"}}><b>File size: </b>{returnFileSize(social1.size)}</p> */}
          <img src={URL.createObjectURL(social3)} alt={`social`} height={'10%'} width={"10%"} style={{ marginLeft: '10px' }} />
        </div>
      ) : add[0].social3 && add[0].link3? (
        <div style={{ display: 'flex' }}>
          <div>
            <p style={{marginTop:"10%"}}><b>File name:</b> {add[0].social3}</p>
          </div>
          <img src={`http://localhost:8080/` + add[0].social3} alt={`social`} height={'10%'} width={"10%"} style={{ marginLeft: '10px' }} />
        </div>
      ) : ""}
    </div>
 
    </Col>

    <p style={{color:"#EFAE4D",fontWeight:600}}>Warning: "You should insert the link along with its icon to have it displayed in the footer."
 </p>
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