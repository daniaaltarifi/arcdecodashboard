import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
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
function Favicon() {
    const [add, setAdd] = useState([]);
    const [name, setName] = useState("");

    const [icon, setIcon] = useState("");

    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    const [del, setDel] = useState([]);
    const [updateHomeId, setUpdateHomeId] = useState("");


    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/favicon");
            const data = response.data;
            setAdd(data);
            console.log(add)
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
            formData.append('name', name);
            formData.append('icon', icon);

            if (!name || !icon) {
                Toastify({
                    text: "Please Fill All Field",
                    duration: 3000, // Duration in milliseconds
                    gravity: "top", // 'top' or 'bottom'
                    position: 'right', // 'left', 'center', 'right'
                    backgroundColor: "#CA1616",
                }).showToast();
                return;
            }
            // Append each selected contact_icon file individually

            const response = await axios.post(
                "http://localhost:8080/favicon/post",
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
            setName(selectedData.name || "");

        }

    };
    useEffect(() => {
        if (isUpdateFormVisible) {
            const nameInputElement = document.getElementById('focus_input');
            if (nameInputElement) {
                nameInputElement.focus();
            }
        }
    }, [isUpdateFormVisible]);
    const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const allowediconExtensions = ['mp4', 'mov', 'avi', 'mkv'];
    const handleUpdate = async (id) => {
        if (!name) {
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
            formData.append('name', name);

            formData.append('icon', icon); // Append the selected image file


            const response = await axios.put(
                `http://localhost:8080/favicon/update/${id}`,
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
                `http://localhost:8080/favicon/delete/${id}`
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
        setIcon(fileList);
    };
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Add Favicon</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="px-1" md="3">
                                            <FormGroup>
                                                <label>name</label>
                                                <Input
                                                    value={name}
                                                    type="text"
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col className="pl-1" md="4">
                                            <FormGroup>
                                                <label htmlFor="exampleInputEmail1">icon </label>
                                                <input
                                                    required
                                                    type="file"
                                                    name="icon"
                                                    accept=".jpg, .jpeg , .png, .gif"
                                                    onChange={(e) => setIcon(e.target.files[0])} // Update state with the selected file
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
                                <CardTitle tag="h4">Favicon Table</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>name</th>

                                            <th>icon</th>

                                        </tr>
                                    </thead>
                                    {add &&
                                        Array.isArray(add) &&
                                        add.map((blog, index) => (
                                            <tbody key={blog.id}>
                                                <tr key={blog.id}>
                                                    <td>{blog.name}</td>

                                                    <td>
                                                        <img src={`http://localhost:8080/` + blog.icon} alt={`about`} height={"50%"} width={"50%"} />

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
                                    <CardTitle tag="h5">Update Favicon</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form >
                                        <Row>
                                            <Col className="px-1" md="3">
                                                <FormGroup>
                                                    <label>name</label>
                                                    <Input
                                                        type="text"
                                                        id='focus_input'

                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>


                                        </Row>
                                        <Row>

                                            <Col className="pl-1" md="4">
                                                {/* <FormGroup>
                        <label htmlFor="exampleInputEmail1">icon </label>
                        <input
                          type="file"
                          name="icon"
                          accept=".mp4, .avi, .mov, .mkv, .flv , .jpg, .jpeg , .png, .gif"

                          onChange={(e) => setIcon(e.target.files[0])} // Update state with the selected file
                        />
                      </FormGroup> */}
                                                <input type="file" onChange={handleFileChange} id="file-input" accept=".jpg, .jpeg , .png, .gif"
 />
                                                <div className="preview">
                                                    {icon ? (
                                                        <div>
                                                            <p>
                                                                <b>File name:</b>{icon.name}<br /> <b>file size: </b>{returnFileSize(icon.size)}.
                                                            </p>
                                                            <img src={URL.createObjectURL(icon)} alt={`icon`} height={'50%'} width={"50%"} />
                                                        </div>
                                                    ) : (
                                                        <div>

                                                            <p>  <b>File name:</b> {add[0].icon}</p>
                                                            <img src={`http://localhost:8080/` + add.find((favicon) => favicon.id === updateHomeId)?.icon} alt={`icon`} height={'50%'} width={"50%"} />
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
        </>
    )
}

export default Favicon