import React,{useState,useEffect} from 'react'
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
function JoinTeam() {
    const [add, setAdd] = useState([]);
    const [selectedJoinId, setSelectedJoinId] = useState(null); // State for selected join ID
    const [cvUrl, setCvUrl] = useState(null); // State to hold the URL of the fetched CV

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:1010/jointeam/getjointeam");
            setAdd(response.data);
            console.log("add",add)

        } catch (error) {
            console.log(`Error getting Blog from frontend: ${error}`);
          }
        };
      
        fetchData();
      }, []);
  //  // Function to handle fetching CV for a specific row
  // const handleFetchCv = (id) => {
  //   setSelectedJoinId(id); // Set the selected join ID
  //   fetchCv(id); // Fetch CV data based on the selected ID
  // };

  const handleFetchCv = async (id) => {
    setSelectedJoinId(id);
    try {
      const response = await axios.get(`http://localhost:1010/jointeam/attachcv/${id}`);
      // Handle the CV data as needed
      // console.log('CV Data:', response.data);
console.log("id",id)
      // Set the URL of the fetched CV
      setCvUrl(`http://localhost:1010/jointeam/attachcv/${id}`);
      
    } catch (error) {
      console.log(`Error getting CV data: ${error}`);
    }
  };

  return (
    <div>
          <div className="content">
          <Row>
            <Col md="12" className='mt-5'>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Join Team Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>first_name</th>
                        <th>last_name</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>position</th>
                        <th>attach_cv</th>
                        <th>id</th>
                        <th>image</th>

                      </tr>
                    </thead>
                    {add &&
                      Array.isArray(add) &&
                      add.map((join, index) => (
                        <tbody key={join.id}>
                          <tr key={join.id}>
                            <td>{join.first_name}</td>
                            <td>{join.last_name}</td>
                            {/* <td>
                              <img src={blog.image_blog} alt="" />
                            </td> */}
                            <td>{join.email}</td>
                            <td>{join.phone}</td>
                            <td>{join.position}</td>
                            <td>{join.attach_cv}</td>
                            <td>{join.id}</td>
                            <td>
                            <Button
                              color="primary"
                              onClick={() => handleFetchCv(join.id)}
                            >
                              Fetch CV
                            </Button>
                          </td>
                          <td>  
                          {cvUrl && (
                  <div >
                    <a href={cvUrl} download >
                      Download CV
                    </a>
                  </div>
                )}
             </td>

                            {/* <td>
                              <button
                                onClick={
                                  () => handleDelete(blog.id_blogs, index) // Calling handleDelete with the product's _id and index
                                }
                              >
                                delete
                              </button>
                              <button
                                onClick={() => openUpdateForm(blog.id_blogs)}
                              >
                                update
                              </button>
                            </td> */}
                          </tr>
                        </tbody>
                      ))}
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

    </div>
  )
}

export default JoinTeam