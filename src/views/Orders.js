
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

function Orders() {
    //modify the variable $ route based on db
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRole_id] = useState("");
 
  const [add, setAdd] = useState([]);

  const [del, setDel] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //modify route
        const response = await axios.get("http://localhost:1010/order/getorder");
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting news from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (order_id, index) => {
    try {
                 //modify route
      const response = await axios.delete(
        `http://localhost:1010/order/delete/${order_id}`
      );
      console.log(order_id);
      console.log(response);

      setAdd((prevOrder) =>
      prevOrder.filter((order) => order.order_id !== order_id)
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
                  <CardTitle tag="h4">Orders Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>First_name</th>
                        <th>Last_name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Zip_Postal_code</th>
                        <th>Delivery_Method</th>
                        <th>Carditem</th>
                        <th>total</th>
                  
                      </tr>
                    </thead>
                    {add &&
                      Array.isArray(add) &&
                      add.map((order,index) => (
                        <tbody key={order.order_id}>
                          <tr >
                            <td>{order.First_name}</td>
                            <td>{order.Last_name}</td>
                            <td>{order.Phone}</td>
                            <td>{order.Email}</td>
                            <td>{order.Address}</td>
                            <td>{order.City}</td>
                            <td>{order.Country}</td>
                            <td>{order.Zip_Postal_code}</td>
                            <td>{order.Delivery_Method}</td>
                            <td>{order.Carditem}</td>
                            <td>{order.total}</td>
                            
                            <td>
                              <button
                                 onClick={() =>
                                    handleDelete(order.order_id,index) // Calling handleDelete with the product's _id and index
                                  }
                              >
                                delete
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
    </>
  );
}

export default Orders;
