/**
 * @author Kieran Hodgson
 * 
 * @description Researchers component - displays the Researchers page
 */

import {useState, useEffect} from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Search from "./Search";
import { LinkContainer } from "react-router-bootstrap";
//import nesecary libraries and components


function Researchers(props){
    const [researchers, setResearchers] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const searchHandler = (event) => { setSearchTerm(event) } // handle the search bar


    const searchUsers = (value) => { // combine the values of the researcher and check if it includes the search term
        const fullname = value.id + " " + value.first_name + " " + value.last_name + " " + value.email; // combine all the values into one string
        return fullname.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if(props.authenticated === false){ // if the user is not authenticated, redirect to the login page
        props.navigate("/login");
    }

    useEffect(() => { // fetch all researchers from the database
        axios.get(process.env.REACT_APP_API_LINK + "/researchers", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                setResearchers(response.data);
                setLoading(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    

    return(
        <div>
           <Container>
            <h1> Researchers </h1>
            <Row>
                <Col md={{span:"2"}} style={{paddingTop: '1.5em'}}>
                    <LinkContainer to="/researcher/new">
                    <Button variant="success"> Create Researcher </Button>
                    </LinkContainer>
                    </Col>
                <Col md={{span:"4", offset:"6"}}><Search searchTerm={searchTerm} handler={searchHandler} /></Col>
            </Row>
                <br />
                <Row lg="3">
                    {loading && researchers.filter(searchUsers).map((user) => (
                        <div key={user.id}>
                            <Col>
                                <Card style={{ width: '100%' }}>
                                    <Card.Body>
                                        <Card.Title>{user.first_name + " " + user.last_name}</Card.Title>
                                        <Card.Text>
                                            {user.email}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <br />
                        </div>
                    ))
                    }
                </Row>
            </Container>
        </div>
    );



}

export default Researchers;