
import React ,{useEffect,useState}from "react";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";

function Dashboard() {
  const [slider, setSlider] = useState([]);
  const [partner, setPartner] = useState([]);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [header, setHeader] = useState([]);
  const [footerHome, setFooterHome] = useState([]);
  const [pages, setPages] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/slider");
        setSlider(response.data);
        console.log("[slider]",slider)
      } catch (error) {
        console.log(`Error getting news from frontend: ${error}`);
      }
    };
    const fetchFooterHome = async () => {
      try {
          const response = await axios.get("http://localhost:8080/footerhome");
          const data = response.data;
          setFooterHome(data);
      } catch (error) {
          console.log(`Error getting Blog from frontend: ${error}`);
      }
  };
  
  const fetchPages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/newpage");
      const data = response.data;
      setPages(data);
    } catch (error) {
      console.log(`Error getting data from frontend: ${error}`);
    }
  };

    fetchData();
    fetchFooterHome()
    fetchPages()
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/partner");
        setPartner(response.data);
      } catch (error) {
        console.log(`Error getting partner from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/typeofservices");
        setServices(response.data);
      } catch (error) {
        console.log(`Error getting partner from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/newpage`);
        if (response.data && response.data.length > 0) {
          setHeader(response.data);
          console.log("add", response.data);
        } else {
          setHeader(null); // If no data, set data to null
        }
      } catch (error) {
        console.log(`Error getting data from backend: ${error}`);
      }
    };

    fetchData();
  }, []);
  
  const handleUpdateClick = () => {
    setIsUpdateClicked(true);
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-image text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">sliders</p>
                      <CardTitle tag="p">{slider.length}</CardTitle>
                      <p />
                    </div>
                  </Col>

                  
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                {/* <div className="stats">
                  {isUpdateClicked ? (
                    <p className="card-category">sliders</p>
                  ) : (
                    <i className="fas fa-sync-alt" onClick={handleUpdateClick} />
                  )}
                  <CardTitle tag="p">
                    {isUpdateClicked ? slider.length : ""}
                  </CardTitle>
                  <p />
                </div> */}
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-map-big text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">partners</p>
                      <CardTitle tag="p">{partner.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                {/* <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div> */}
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">services</p>
                      <CardTitle tag="p">{services.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                {/* <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div> */}
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-layout-11 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Header</p>
                      <CardTitle tag="p">{header.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                 
                </Row>
               
              </CardBody>
              <CardFooter>
                <hr />
             
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-book-bookmark " />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Footer Home</p>
                      <CardTitle tag="p">{footerHome.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
            
                </Row>
               
              </CardBody>
              <CardFooter>
                <hr />
             
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-album-2 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Pages</p>
                      <CardTitle tag="p">{pages.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                 
                </Row>
               
              </CardBody>
              <CardFooter>
                <hr />
             
              </CardFooter>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">services Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Email Statistics</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row> */}
      </div>
    </>
  );
}

export default Dashboard;
