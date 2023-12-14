
import axios from "axios";
import React, { useState,useEffect } from "react";

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
import Test from "./Test";



function TradeIn() {
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [your_device, setYour_device] = useState("");
  const [up_to, setUp_to] = useState("");
  const [category_id, setCategory_id] = useState(""); // Separate state for image
  const [del, setDel] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1010/tradein/gettrades");
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  const handlePost = async () => {
    
    try {
      const response = await axios.post(
        "http://localhost:1010/tradein/add",
        {
            your_device: your_device, // Use the provided title
            up_to: up_to, // Use the provided date
            category_id: category_id, // Use the provided details
        
        }
      );
      console.log(response.data);
      // Call the onSave callback with the data
      setAdd(response.data);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };
  const openUpdateForm = (id) => {
    setIsUpdateFormVisible(true);
    setUpdateId(id);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1010/tradein/edit/${id}`,
        {
            your_device: your_device, // Use the provided title
            up_to: up_to, // Use the provided date
            category_id: category_id, // Use the provided details
        }
      );
      console.log(response.data);
      setAdd((prevAdd) =>
        prevAdd.map((device) =>
        device.id === id ? response.data : device
        )
      );
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:1010/tradein/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setAdd((prevDevice) =>
      prevDevice.filter((device) => device.id !== id)
      );

      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };
  const [displayTest, setDisplayTest] = useState(false);

  const handledisplay=() => {
setDisplayTest(true)  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add TradeIn</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>your Device</label>
                        <Input
                          type="text"
                          onChange={(e) => setYour_device(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>up to</label>
                        <Input
                          type="text"
                          onChange={(e) => setUp_to(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">category id </label>
                        <Input
                          type="text"
                          onChange={(e) => setCategory_id(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                 

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        onClick={handledisplay}
                      >
                        Add TradeIn
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {displayTest && <Test />}

        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">TradeIn Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Your Device</th>
                        <th>Up To</th>
                        <th>Category Id</th>
                      </tr>
                    </thead>
                    {add &&
                      Array.isArray(add) &&
                      add.map((device, index) => (
                        <tbody key={device.id}>
                          <tr key={device.id}>
                            <td>{device.your_device}</td>
                            <td>{device.up_to}</td>
                          
                            <td>{device.category_id}</td>

                            <td>
                              <button
                                onClick={
                                  () => handleDelete(device.id, index) // Calling handleDelete with the product's _id and index
                                }
                              >
                                delete
                              </button>
                              <button
                                onClick={() => openUpdateForm(device.id)}
                              >
                                update
                              </button>
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
                    <CardTitle tag="h5">Update TradeIn</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Your Device</label>
                            <Input
                              type="text"
                              value={your_device}
                              onChange={(e) => setYour_device(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>up to</label>
                            <Input
                              type="text"
                              value={up_to}
                              onChange={(e) => setUp_to(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>category id</label>
                            <Input
                              type="text"
                              value={category_id}
                              onChange={(e) => setCategory_id(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                            onClick={() => handleUpdate(updateId)}
                          >
                            Update TradeIn
                          </Button>
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

export default TradeIn;
