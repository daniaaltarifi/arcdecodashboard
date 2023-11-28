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

function SpecialOffers() {
  const [product_name, setProduct_name] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [old_price, setOld_price] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [color_id, setColorId] = useState("");
  const [image_main, setImgMain] = useState("");
  const [image_slider, setImageSlider] = useState([]);
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateProductId, setUpdateProductId] = useState("");
  const [del, setDel] = useState([]);
  const [colors, setColors] = useState([]);

  const [categories, setCategories] = useState([]);
  const [openImage, setOpenImage] = useState(false);
  const [getImg, setGetImg] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const MAX_COUNT = 5;
  const [images, setImages] = useState([]);
  const [product_id, setProduct_id] = useState(null);
  const [message, setMessage] = useState("");




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1010/topselling/gettopselling"
        );
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting product from frontend: ${error}`);
      }
    };

 
    fetchData();
  }, []);


  const handlePost = async () => {
  

    try {
      // ... other data
      const response = await axios.post(
        "http://localhost:1010/topselling/add",
        {
          product_id,
        }
      );
      
      console.log("idd",response.data.product_id);
      // console.log("id",);

      setAdd(response.data);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };

  

  

 

  useEffect(() => {
    // Log getImg when it changes
    console.log("getimg", getImg);
  }, [getImg]);

  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1010/topselling/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setAdd((prevProduct) =>
        prevProduct.filter((product) => product.id !== id)
      );

      // setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };

  console.log("add", add);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Top Selling Product</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Product Id</label>
                        <Input
                          type="text"
                          onChange={(e) => setProduct_id(e.target.value)}
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
                      >
                        Add Product
                      </Button>
                    </div>
                  </Row>
                </Form>
  
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Products Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>product_name</th>
                        <th>price</th>
                        <th>stock</th>
                        <th>old_price</th>
                        <th>category_id</th>
                        <th>color_id</th>
                        {/* <th>img_main</th> */}
                        <th>image_slider</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(add) &&
                        add.map((product, index) => (
                          <tr key={product.p_id}>
                            <td>{product.product_name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.old_price}</td>
                            <td>{product.category_id}</td>
                            <td>{product.color_id}</td>
                            {/* <td>
                              <img src={product.imagePath} alt="" />
                            </td> */}
                            <td>
                              {Array.isArray(product.images) &&
                                product.images.map((image, imageIndex) => (
                                  <img
                                    src={`http://localhost:1010/${image.image_path}`}
                                    alt=""
                                    onError={(e) =>
                                      console.log("Image load error", e)
                                    }
                                    style={{ width: "100px", height: "100px" }}
                                  />
                                ))}
                            </td>
                            <td>
                      
                            </td>

                            <td>
                              <button
                                onClick={() => handleDelete(product.id)}
                              >
                                delete
                              </button>
                             
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
        <Row>
          <Col md="12">
            <Card className="card-user">
              {isUpdateFormVisible && (
                <div>
                  <CardHeader>
                    <CardTitle tag="h5">Update Product</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Product Name</label>
                            <Input
                              type="text"
                              onChange={(e) => setProduct_name(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Price</label>
                            <Input
                              type="text"
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">Stock </label>
                            <Input
                              type="text"
                              onChange={(e) => setStock(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Old Price</label>
                            <Input
                              type="text"
                              onChange={(e) => setOld_price(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Category</label>
                            <select
                              value={category_id}
                              onChange={(e) => setCategoryId(e.target.value)}
                            >
                              <option value="">Select a category</option>
                              {categories.map((category) => (
                                <option
                                  key={category.category_id}
                                  value={category.category_id}
                                >
                                  {category.category_name}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Color</label>
                            <select
                              value={color_id}
                              onChange={(e) => setColorId(e.target.value)}
                            >
                              <option value="">Select a color</option>
                              {colors.map((color) => (
                                <option
                                  key={color.color_id}
                                  value={color.color_id}
                                >
                                  {color.color_name}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
             
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

export default SpecialOffers;
