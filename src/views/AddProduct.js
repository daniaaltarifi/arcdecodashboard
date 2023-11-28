import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";

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

function AddProduct() {
  const [product_name, setProduct_name] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [old_price, setOld_price] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [color_id, setColorId] = useState("");
  const [model_id, setModelId] = useState("");
  const [image_main, setImgMain] = useState("");
  const [image_slider, setImageSlider] = useState([]);
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateProductId, setUpdateProductId] = useState("");
  const [colors, setColors] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]); // Array to store selected colors
  const [categories, setCategories] = useState([]);
  const [openImage, setOpenImage] = useState(false);
  const [getImg, setGetImg] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const MAX_COUNT = 5;
  const [images, setImages] = useState([]);
  const [product_id, setProduct_id] = useState(null);
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState("");
  const [screen, setScreen] = useState("");
  const [battery, setBattery] = useState("");
  const [camera_front, setCameraFront] = useState("");
  const [camera_back, setCameraBack] = useState("");
  const [material, setMaterial] = useState("");
  const [gpu, setGpu] = useState("");
  const [cpu, setCpu] = useState("");
  const [type_charger, setTypeCharger] = useState("");
  const [typeId, setTypeId] = useState("");
  const [openImageUpdate, setOpenImageUpdate] = useState(false);
  const [color_name, setColor_name] = useState("");
  const [image_color, setImage_color] = useState("");
  const [imagesColorArr, setImagesColorArr] = useState([]);
const[fullColorData,setFullColorData]=useState([])
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const handleProductIdChange = (e) => {
    setProduct_id(e.target.value);
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };
  const handleUploadFilesColor = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };
  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const fileURLs = [];

    chosenFiles.forEach((file) => {
      const objectURL = URL.createObjectURL(file);
      fileURLs.push(objectURL);
    });

    setImageSlider(fileURLs);
    handleUploadFiles(chosenFiles);
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };
  const handleFileEventColor = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const fileURLs = [];

    chosenFiles.forEach((file) => {
      const objectURL = URL.createObjectURL(file);
      fileURLs.push(objectURL);
    });

    setImageSlider(fileURLs);
    handleUploadFilesColor(chosenFiles);
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1010/productdetails/getproductdetails"
        );
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting product from frontend: ${error}`);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://monkfish-app-wyvrc.ondigitalocean.app/category/getproducts"
        );
        setCategories(response.data); // Assuming the response contains the list of categories
      } catch (error) {
        console.log(`Error fetching categories: ${error}`);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1010/color/getproductdetails"
        );
        const colorOptions = response.data.map((color) => ({
          value: color.color_id,
          label: color.color_name,
        }));
        setColors(colorOptions); // Convert data to format accepted by react-select
      } catch (error) {
        console.log(`Error fetching colors: ${error}`);
      }
    };
    const fetchModels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1010/model/getproducts"
        );
        setModels(response.data); // Assuming the response contains the list of colors
      } catch (error) {
        console.log(`Error fetching models: ${error}`);
      }
    };
    fetchCategories();
    fetchColors();
    fetchModels();
    fetchData();
  }, []);
  // Handle color selection
  const handleColorChange = (selectedOptions) => {
    const selectedColorNames = selectedOptions.map((option) => option.label);
    setColor_name(selectedColorNames);
    console.log("selectedColors", selectedColorNames);
  };

  const handlePost = async () => {
    if (!category_id) {
      alert("Please select a category.");
      return;
    }

    try {
      const imageUrls = image_slider.join(",");
      // ... other data
      const response = await axios.post(
        "http://localhost:1010/productdetails/add",
        {
          product_name,
          price,
          stock,
          old_price,
          category_id,
          // colors: selectedColors, // Pass the array of selected color IDs
          // model_id,
          details,
          screen,
          battery,
          camera_front,
          camera_back,
          material,
          gpu,
          cpu,
          type_charger,
          typeId,
          image_main,
          image_slider: imageUrls, // Pass the string of image URLs
        }
      );

      const newProductId = response.data.p_id;
      setProduct_id(newProductId); // Set the product_id state variable

      console.log("id", newProductId);
      // console.log("id",product_id)
      console.log(response.data);
      setAdd(response.data);
      setOpenImage(true);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };


  const openUpdateForm = (p_id) => {
    setIsUpdateFormVisible(true);
    setUpdateProductId(p_id);
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1010/newimgproducts/images/${product_id}`
      );
      const relativePaths = response.data.images;
      setGetImg(relativePaths); // Update getImg state with absolute image URLs
    } catch (error) {
      console.log(`Error fetching images: ${error}`);
    }
  };

  const fetchColorData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1010/color/getproductdetails/${product_id}`
      );
      const relativePaths = response.data;
      console.log("imagecolor",imagesColorArr)
      setImagesColorArr(relativePaths); // Update getImg state with absolute image URLs
    } catch (error) {
      console.log(`Error fetching color images: ${error}`);
    }
  };

  
  const handleUpload = async () => {
    try {
      if (!product_id) {
        alert("Please enter a product ID.");
        return;
      }

      const formData = new FormData();
      formData.append("product_id", product_id);
      images.forEach((image) => {
        formData.append("image_path", image);
      });
      const response = await axios.post(
        "http://localhost:1010/newimgproducts/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setMessage(response.data.message);
      fetchImages(); // Call fetchImages here
      setOpenImage(false);
      console.log("getimg", getImg);
    } catch (error) {
      console.error("Error uploading images:", error);
      setMessage("Image upload failed");
    }
  };
  const handleUploadColor = async () => {
    try {
      if (!product_id) {
        alert("Please enter a product ID.");
        return;
      }

      const formData = new FormData();
      formData.append("product_id", product_id);
     
      // Post the selected color to the "color" table
      formData.append("color_name", color_name);
      imagesColorArr.forEach((image_color) => {
        formData.append("image_color", image_color);
      });
      const colorResponse = await axios.post(
        "http://localhost:1010/color/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFullColorData(colorResponse)
console.log("colcolorResponseors",fullColorData)

console.log("colors",color_name)
      console.log("Color added:", colorResponse.data);
      setMessage(colorResponse.data.message);
      fetchColorData();
      // fetchImages(); // Call fetchImages here
      // setOpenImage(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setMessage("Image upload failed");
    }
  };
  useEffect(() => {
    console.log("getimg", getImg);
  }, [getImg]);
  useEffect(() => {
    console.log("colorimg", imagesColorArr);
  }, [imagesColorArr]);

  const handleUpdate = async (
    p_id,
    product_name,
    price,
    stock,
    old_price,
    category_id,
    color_id,
    model_id,
    details,
    screen,
    battery,
    camera_front,
    camera_back,
    material,
    gpu,
    cpu,
    type_charger,
    typeId,
    image_main,
    image_slider
  ) => {
    try {
      setUpdateProductId(p_id);

      const response = await axios.put(
        `http://localhost:1010/productdetails/edit/${p_id}`,
        {
          product_name,
          price,
          stock,
          old_price,
          category_id,
          color_id,
          model_id,
          details,
          screen,
          battery,
          camera_front,
          camera_back,
          material,
          gpu,
          cpu,
          type_charger,
          typeId,
          image_main,
          image_slider, // Pass the array of image URLs
        }
      );
      console.log("hello");
      console.log(response.data);
      setAdd("res", response.data);
      setIsUpdateFormVisible(false);
      setOpenImageUpdate(true);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };
  const [id, setId] = useState("");

  const handleUpdateImg = async () => {
    try {
      if (!product_id) {
        alert("Please enter a product ID.");
        return;
      }

      const formData = new FormData();
      formData.append("product_id", product_id);
      images.forEach((image) => {
        formData.append("image_path", image);
      });
      const response = await axios.put(
        `http://localhost:1010/newimgproducts/images/${product_id}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      fetchImages(); // Call fetchImages here
      setOpenImageUpdate(false);
      console.log("getimg", getImg);
    } catch (error) {
      console.error("Error updateing images:", error);
      setMessage("Image upload failed");
    }
  };
  const handleDelete = async (p_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1010/productdetails/delete/${p_id}`
      );
      console.log(p_id);
      console.log(response);

      setAdd((prevProduct) =>
        prevProduct.filter((product) => product.p_id !== p_id)
      );
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
                <CardTitle tag="h5">Add Product</CardTitle>
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
                    <Col className="pl-1 mt-4" md="6">
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
                        <label>Model</label>
                        <select
                          value={model_id}
                          onChange={(e) => setModelId(e.target.value)}
                        >
                          <option value="">Select a Model</option>
                          {models.map((model) => (
                            <option key={model.model_id} value={model.model_id}>
                              {model.model_name}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Details</label>
                        <Input
                          type="text"
                          onChange={(e) => setDetails(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Screen</label>
                        <Input
                          type="text"
                          onChange={(e) => setScreen(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Battery</label>
                        <Input
                          type="text"
                          onChange={(e) => setBattery(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Camera front</label>
                        <Input
                          type="text"
                          onChange={(e) => setCameraFront(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Camera Back</label>
                        <Input
                          type="text"
                          onChange={(e) => setCameraBack(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Material</label>
                        <Input
                          type="text"
                          onChange={(e) => setMaterial(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Gpu</label>
                        <Input
                          type="text"
                          onChange={(e) => setGpu(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Cpu</label>
                        <Input
                          type="text"
                          onChange={(e) => setCpu(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Type Charger</label>
                        <Input
                          type="text"
                          onChange={(e) => setTypeCharger(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Type id</label>
                        <Input
                          type="text"
                          onChange={(e) => setTypeId(e.target.value)}
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
                <Row>
                  {openImage && (
                    <div>
                      <Col className="pl-1" md="6">
                        <div>
                          <label htmlFor="productId">Product ID:</label>
                          <input
                            type="text"
                            id="productId"
                            value={product_id}
                            disabled
                            onChange={handleProductIdChange}
                          />
                        </div>
                      </Col>

                      <Col className="pl-1" md="6">
                        <FormGroup
                          action="/addproduct"
                          method="POST"
                          enctype="multipart/form-data"
                        >
                          <div>
                            <label>image slider</label>
                            <Input
                              name="image_path"
                              type="file"
                              multiple
                              onChange={handleFileEvent}
                              disabled={fileLimit}
                            />

                            <label htmlFor="fileUpload"></label>
                          </div>
                          <Select
                            isMulti
                            options={colors}
                            
                            // value={colors.filter(
                            //   (color) => selectedColors.includes(color.label) // Change 'value' to 'label'
                            // )}
                            onChange={handleColorChange}
                          />
                           <label>color image </label>
                            <Input
                              name="image_color"
                              type="file"
                              multiple
                              onChange={handleFileEventColor}
                              disabled={fileLimit}
                            />

                            <label htmlFor="fileUpload"></label>
                        </FormGroup>

                        {message && <p>{message}</p>}

                        <div className="update ml-auto mr-auto">
                        <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={handleUploadColor}
                          >
                            Add Color
                          </Button>
                          <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={handleUpload}
                          >
                            Add Image
                          </Button>
                        </div>
                      </Col>
                    </div>
                  )}
                </Row>
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
                        <th>color name</th>
                        <th>model_id</th>
                        <th>details</th>
                        <th>screen</th>
                        <th>battery</th>
                        <th>cameraFront</th>
                        <th>cameraBack</th>
                        <th>material</th>
                        <th>gpu</th>
                        <th>cpu</th>
                        <th>typeCharger</th>
                        <th>typeId</th>
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
                            <td>{product.color_name}</td>
                            <td>{product.model_id}</td>
                            <td>{product.details}</td>
                            <td>{product.screen}</td>
                            <td>{product.battery}</td>
                            <td>{product.camera_front}</td>
                            <td>{product.camera_back}</td>
                            <td>{product.material}</td>
                            <td>{product.gpu}</td>
                            <td>{product.cpu}</td>
                            <td>{product.type_charger}</td>
                            <td>{product.typeId}</td>
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
                              <button
                                onClick={() => handleDelete(product.p_id)}
                              >
                                delete
                              </button>
                              <button
                                onClick={() => openUpdateForm(product.p_id)}
                              >
                                update
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
                    {" "}
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
                        <Col className="pl-1 mt-4" md="6">
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
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Model</label>
                            <select
                              value={model_id}
                              onChange={(e) => setModelId(e.target.value)}
                            >
                              <option value="">Select a Model</option>
                              {models.map((model) => (
                                <option
                                  key={model.model_id}
                                  value={model.model_id}
                                >
                                  {model.model_name}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                        {/* <Select
                          isMulti
                          options={colors}
                          value={colors.filter((color) =>
                            selectedColors.includes(color.value)
                          )}
                          onChange={handleColorChange}
                        /> */}
                      </Row>
                      <Row>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Details</label>
                            <Input
                              type="text"
                              onChange={(e) => setDetails(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Screen</label>
                            <Input
                              type="text"
                              onChange={(e) => setScreen(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Battery</label>
                            <Input
                              type="text"
                              onChange={(e) => setBattery(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Camera front</label>
                            <Input
                              type="text"
                              onChange={(e) => setCameraFront(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Camera Back</label>
                            <Input
                              type="text"
                              onChange={(e) => setCameraBack(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Material</label>
                            <Input
                              type="text"
                              onChange={(e) => setMaterial(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Gpu</label>
                            <Input
                              type="text"
                              onChange={(e) => setGpu(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Cpu</label>
                            <Input
                              type="text"
                              onChange={(e) => setCpu(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Type Charger</label>
                            <Input
                              type="text"
                              onChange={(e) => setTypeCharger(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Type id</label>
                            <Input
                              type="text"
                              onChange={(e) => setTypeId(e.target.value)}
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
                            onClick={() =>
                              handleUpdate(
                                updateProductId,
                                product_name,
                                price,
                                stock,
                                old_price,
                                category_id,
                                color_id,
                                model_id,
                                details,
                                screen,
                                battery,
                                camera_front,
                                camera_back,
                                material,
                                gpu,
                                cpu,
                                type_charger,
                                typeId,
                                image_main,
                                image_slider
                              )
                            }
                          >
                            Update Product
                          </Button>
                        </div>
                      </Row>
                    </Form>
                    <Row>
                      {openImage && (
                        <div>
                          <Col className="pl-1" md="6">
                            <div>
                              <label htmlFor="productId">Product ID:</label>
                              <input
                                type="text"
                                id="productId"
                                value={product_id}
                                // disabled
                                onChange={handleProductIdChange}
                              />
                            </div>
                          </Col>

                          <Col className="pl-1" md="6">
                            <FormGroup
                              action="/addproduct"
                              method="POST"
                              enctype="multipart/form-data"
                            >
                              <div>
                                <label>image slider</label>
                                <Input
                                  name="image_path"
                                  type="file"
                                  multiple
                                  onChange={handleFileEvent}
                                  disabled={fileLimit}
                                  enctype="multipart/form-data"

                                />

                                <label htmlFor="fileUpload"></label>
                              </div>

                              {/* {image_slider.map((imageUrl, index) => (
                            <div key={index}>
                        <img src={imageUrl} alt="" />
                      </div>
                    ))} */}
                            </FormGroup>

                            {message && <p>{message}</p>}

                            <div className="update ml-auto mr-auto">
                              <Button
                                className="btn-round"
                                color="primary"
                                type="button"
                                onClick={handleUpdateImg}
                              >
                                Add Image
                              </Button>
                            </div>
                          </Col>
                        </div>
                      )}
                    </Row>
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

export default AddProduct;
