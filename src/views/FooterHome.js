import React, { useEffect, useState } from 'react'
import axios from 'axios';
import validator from 'validator';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Table,
    CardTitle,
} from "reactstrap";
import Tables from "./Tables";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css'; // Import the styles
function FooterHome() {
    const [add, setAdd] = useState([]);
    const [link, setLink] = useState("");

    const [socialmedia, setSocialmedia] = useState("")

    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    const [del, setDel] = useState([]);
    const [updateHomeId, setUpdateHomeId] = useState("");


    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/footerhome");
            const data = response.data;
            setAdd(data);
            console.log(add)
            console.log("link1", data[0].link1)
        } catch (error) {
            console.log(`Error getting Blog from frontend: ${error}`);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const validateLink = (link) => {

        if (link && !validator.isURL(link)) {
            return 'Please enter a valid URL'; // If the link format is invalid
        }

        return ''; // Return an empty string if the link is valid
    };
    const [link1Error, setLink1Error] = useState('');
    const handleLinkChange = (e) => {
        const inputLink = e.target.value;
        setLink(inputLink);

        const error = validateLink(inputLink);
        setLink1Error(error);
    };
    const handlePost = async () => {
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
            if (!socialmedia) {
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
                "http://localhost:8080/footerhome/post",
                formData,
                {
                    headers: {
                        "link3-Type": "multipart/form-data",
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
            window.location.reload()

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
            setLink(selectedData.link || "");

        }

    };
    useEffect(() => {
        if (isUpdateFormVisible) {
            const link1InputElement = document.getElementById('focus_input');
            if (link1InputElement) {
                link1InputElement.focus();
            }
        }
    }, [isUpdateFormVisible]);

    const handleUpdate = async (id) => {
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
                `http://localhost:8080/footerhome/update/${id}`,
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

    const handleDelete = async (id, index) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/footerhome/delete/${id}`
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
        setSocialmedia(fileList);
    };
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5"> Add Footer In Main Section</CardTitle>
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
                                                    onChange={handleLinkChange}
                                                />
                                            </FormGroup>
                                            {link1Error && <p style={{ color: 'red' }}>{link1Error}</p>}

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
                                                        onChange={(e) => setSocialmedia(e.target.files[0])} // Update state with the selected file
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
                                <CardTitle tag="h4">Footer Home Table</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>link</th>

                                            <th>social media</th>
                                        </tr>
                                    </thead>
                                    {add &&
                                        Array.isArray(add) &&
                                        add.map((blog, index) => (
                                            <tbody key={blog.id}>
                                                <tr key={blog.id}>
                                                    <td>{blog.link}</td>

                                                    <td>
                                                        {blog.socialmedia && (

                                                            <img
                                                                src={`http://localhost:8080/` + blog.socialmedia}
                                                                alt={`Contact Image`}
                                                                height={'20%'} width={"20%"}
                                                            />
                                                        )}
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
                                    <CardTitle tag="h5">Update Footer Home</CardTitle>
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
                                                </FormGroup>                        {link1Error && <p style={{ color: 'red' }}>{link1Error}</p>}

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

                                                            <p>  <b>File name:</b> {add.find((social) => social.id === updateHomeId)?.socialmedia}</p>
                                                            <img src={`http://localhost:8080/` + add.find((social) => social.id === updateHomeId)?.socialmedia} alt={`socialmedia`} height={'50%'} width={"50%"} />
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

export default FooterHome