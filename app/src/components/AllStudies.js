/**
 * @author: Kieran Hodgson
 * 
 * @description: This component displays all studies based on what has been returned from the database. It also offers the ability to manage and delete studies.
 */

import { Card, Dropdown, Row, Col, Badge, Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";

function AllStudies(props) {

    const [studies, setStudies] = useState([]); // array of all studies
    const [loading, setLoading] = useState(false); // boolean to check if the studies have been loaded
    const [searchTerm, setSearchTerm] = useState(''); // search term for the search bar


    //fetch all studies from the database
    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "/studies", {headers : {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }})
            .then((response) => response.json())
            .then((json) => {
                setStudies(json);
                setLoading(true);
            })
            .catch((error) => console.error(error));
    }, []);

    //function to calculate the time since the last edit
    function calculateTimeSinceLastEdit(lastEdit) {
        //get difference between last edit and now
        var difference = new Date().getTime() - new Date(lastEdit.replace(/[-]/g, '/')).getTime();
        var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
        return daysDifference;
    }

    //sets the labelling colour using bootstrap classes
    function setLabelColour(daysDifference) {
        if (daysDifference < 7) {
            return "success";
        } else if (daysDifference < 14) {
            return "warning";
        } else {
            return "danger";
        }
    }

    //function to handle the search bar
    const searchHandler = (event) => { setSearchTerm(event) }

    //combines the name of a study and its description and checks if it includes the search term
    const searchStudies = (value) => {
        const fullname = value.name + " " + value.description;
        return fullname.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if(props.authenticated === false){
        props.navigate("/login");
    }


    return (
        <div>
            <h1>All Studies</h1>
            <Container>
                <Col md={{ span: "4", offset: "8" }}><Search searchTerm={searchTerm} handler={searchHandler} /></Col>
                <br />
                <Row lg="3">
                    {loading && studies.filter(searchStudies).map((study) => ( //filters the studies based on the search term, mapping by short name
                        <div key={study.short_name}>
                            <Col>
                                <Card style={{ width: '100%' }}>
                                    <Card.Body>
                                        <Card.Title>{study.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{study.short_name}</Card.Subtitle>
                                        <Card.Text>
                                            {study.description}
                                        </Card.Text>

                                        <Badge pill bg={study.colour}> {study.tag} </Badge>
                                        <br />
                                        <Badge pill bg={setLabelColour(calculateTimeSinceLastEdit(study.lastEdit))}>
                                            {calculateTimeSinceLastEdit(study.lastEdit)} {(calculateTimeSinceLastEdit(study.lastEdit) > 1) ? "days" : "day"} since last edit
                                        </Badge>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Manage Study
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <LinkContainer to={{ "pathname": "/study", "search": "?short_name=" + study.short_name }}>
                                                    <Dropdown.Item>Manage Study</Dropdown.Item>
                                                </LinkContainer>
                                                <Dropdown.Item onClick={
                                                    () => {
                                                        let deleteData = new FormData();
                                                        deleteData.set("short_name", study.short_name);
                                                        axios.post(process.env.REACT_APP_API_LINK + "/study/delete", deleteData, {
                                                            headers: { 'Content-Type': 'multipart/form-data' }
                                                        })
                                                            .then((response) => {
                                                                //clearing the cache to ensure the study is removed from display
/*                                                              cannot work with cache if the service is served using http     
                                                                caches.keys().then((names) => {
                                                                    names.forEach((name) => {
                                                                        caches.delete(name);
                                                                    });
                                                                }); */
                                                                console.log(response);
                                                                alert("Study deleted");
                                                                window.location.reload(); // force a reload of the page to ensure the study is removed from display
                                                            },
                                                                (error) => {
                                                                    console.log(error);
                                                                }
                                                            )
                                                    }
                                                }> Delete Study </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <br />
                        </div>
                    ))
                    }
                </Row>
            </Container>
        </div>);



}

export default AllStudies;