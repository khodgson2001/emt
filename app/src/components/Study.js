/**
 * @author Kieran Hodgson
 * 
 * @description Study component - displays the Study forms (section A and B forms)
 */

import { Card, Row, Col, Button, Form, Tabs, Tab, Accordion, Alert } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import IRASReviewForm from "./IRASReviewForm";
import SectionA from "./forms/newStudy/SectionA";
import SectionB from "./forms/newStudy/SectionB";
import InformationPackForm from "./InfoPackForm";


function Study(props) {
    const [studies, setStudies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const [statuses, setStatuses] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [answers, setAnswers] = useState([]);

    if (props.authenticated === false) { // if user is not logged in, redirect to login page
        props.navigate("/login");
    }

    // fill answers array with blank values
    useEffect(() => {
        for (let i = 0; i < 100; i++) {
            answers.push("");
        }
    }, []);

    const short_name = searchParams.get("short_name");

    const [formValues, setValues] = useState({
        name: "",
        short_name: short_name,
        principleInvestigator: "",
        chiefInvestigator: "",
        researchLead: "",
        description: "",
        emt_statuses_id: "1",
        portfolioAdopt: "",
    });

    function chooseValues(values, id) {
        setValues({
            ...formValues,
            [id]: values
        });
    }

    function deleteFile(filename) { // delete a file from the database and the server
        const formData = new FormData();
        formData.set("filename", filename);
        axios.post('http://unn-w20002249.newnumyspace.co.uk/emt/api/files/delete', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                alert("File deleted successfully");
            }

            )
    }

    const handleEditSubmit = (event) => { // handle submission of an edited study
        event.preventDefault(); // prevent default form submission
        const formData = new FormData(); // create new form data object

        formValues.name !== "" ? formData.set("name", formValues.name) : formData.set("name", studies[0].name); // if the value is not empty, set the value to the form data, otherwise set the value to the current value in the database
        formValues.description !== "" ? formData.set("description", formValues.description) : formData.set("description", studies[0].description); 
        formValues.emt_statuses_id !== "" ? formData.set("emt_statuses_id", formValues.emt_statuses_id) : formData.set("emt_statuses_id", studies[0].emt_statuses_id);
        formData.set("short_name", formValues.short_name); // set the short name to the current short name

        axios.post("http://unn-w20002249.newnumyspace.co.uk/emt/api/study/update", formData, // post the form data to the update study endpoint
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                alert("Study updated successfully"); // alert the user that the study has been updated
            })
            .catch((error) => {
                alert("Error updating study"); // alert the user that there was an error updating the study
                console.log(error);
            }
            )
    }

    //all fetch requests that depend on short_name
    useEffect(() => {
        fetch("http://unn-w20002249.newnumyspace.co.uk/emt/api/studies?short_name=" + short_name, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setStudies(json);
                setLoading(true);
            })
            .catch((error) => console.error(error));

        fetch("http://unn-w20002249.newnumyspace.co.uk/emt/api/files?short_name=" + short_name, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setFileNames(json);
            }
            )
            .catch((error) => console.error(error));

        fetch("http://unn-w20002249.newnumyspace.co.uk/emt/api/answers?short_name=" + short_name, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setAnswers(json);
            }
            )
            .catch((error) => console.error(error));

    }, [short_name]);

    useEffect(() => {
        fetch("http://unn-w20002249.newnumyspace.co.uk/emt/api/statuses", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setStatuses(json);
            })
            .catch((error) => console.error(error));
    }, []);



    return (
        <div>
            {short_name == null ?
                <div>
                    <h1>Study not found</h1>
                </div>
                :
                loading &&
                <Row>
                    <Col md="4">
                        <Card>
                            <Card.Body>
                                <Card.Title as="h1">{studies[0].name} </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{studies[0].short_name}</Card.Subtitle>
                                <Card.Text>
                                    {studies[0].description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title as="h1">Edit Study Details</Card.Title>

                                <Form>
                                    <Form.Group controlId="name">
                                        <Form.Label>Study Name</Form.Label>
                                        <Form.Control type="text" placeholder={studies[0].name} defaultValue={formValues.name} onChange={(e) => chooseValues(e.target.value, "name")} />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="description">
                                        <Form.Label>Study Description</Form.Label>
                                        <Form.Control type="text" placeholder={studies[0].description} onChange={(e) => chooseValues(e.target.value, "description")} />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="emt_statuses_id">
                                        <Form.Label>EMT Status</Form.Label>
                                        <Form.Control as="select" defaultValue={studies[0].emt_statuses_id} onChange={(e) => chooseValues(e.target.value, "emt_statuses_id")}>
                                            {statuses.map((status) => (
                                                <option key={status.id} value={status.id}>{status.tag}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <br />
                                    <Button variant="primary" type="submit" onClick={handleEditSubmit}>
                                        Submit
                                    </Button>
                                </Form>

                            </Card.Body>
                        </Card>
                        <br />
                        <Card style={{ width: '100%' }}>
                            <Accordion defaultActiveKey="0">
                                <Card.Body>
                                    <Accordion.Item eventKey="completedForms">
                                        <Accordion.Header><Card.Title as="h2">Completed Forms</Card.Title></Accordion.Header>
                                        <Accordion.Body>
                                            <Alert variant="danger">
                                                <Alert.Heading>Warning</Alert.Heading>
                                                <p>
                                                    These are <strong>LIVE</strong> forms, please do not edit them unless you are sure you know what you are doing.
                                                </p>
                                            </Alert>
                                            <Tabs defaultActiveKey="0" id="completedForms">
                                                <Tab eventKey="registration" title="Study Registration">
                                                    <br />
                                                    <Col>
                                                        <Form>
                                                            <Tabs defaultActiveKey="sectionA" id="RegistrationForm">
                                                                <Tab eventKey="sectionA" title="Section A">
                                                                    <SectionA chooseValues={chooseValues} editable={true} answers={answers} />
                                                                </Tab>
                                                                <Tab eventKey="sectionB" title="Section B">
                                                                    <SectionB chooseValues={chooseValues} editable={true} answers={answers} />
                                                                </Tab>
                                                            </Tabs>
                                                        </Form>
                                                    </Col>
                                                </Tab>
                                                <Tab eventKey="checklist" title="Info Pack Checklist">
                                                    <br />
                                                    <Col>
                                                        <InformationPackForm chooseValues={chooseValues} editable={true} answers={answers} />
                                                    </Col>
                                                </Tab>
                                                <Tab eventKey="iras" title="IRAS Review">
                                                    <br />
                                                    <IRASReviewForm chooseValues={chooseValues} editable={true} answers={answers} />
                                                </Tab>
                                            </Tabs>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Card.Body>
                            </Accordion>
                        </Card>
                        <br />
                        <Card style={{ width: '100%' }}>
                            <Accordion defaultActiveKey="0">
                                <Card.Body>
                                    <Accordion.Item eventKey="uploadedFiles">
                                        <Accordion.Header><Card.Title as="h2">PDF's</Card.Title></Accordion.Header>
                                        <Accordion.Body>
                                            <Tabs defaultActiveKey="registration" id="pdfs">
                                                {fileNames.map((file) => (
                                                    <Tab key={file.fileName} eventKey={file.fileName} title={file.fileName}>
                                                        <Row>
                                                            <Col>
                                                                <a href={"http://unn-w20002249.newnumyspace.co.uk/emt/api/fileuploads/" + file.fileName}>
                                                                    <Button variant="primary" type="button">
                                                                        Open File
                                                                    </Button>
                                                                </a>
                                                            </Col>
                                                            <Col>
                                                                <Button variant="danger" type="button" onClick={() => deleteFile(file.fileName)}>
                                                                    Delete File
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Tab>
                                                ))}
                                            </Tabs>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Card.Body>
                            </Accordion>
                        </Card>
                    </Col>
                </Row>
            }

        </div>
    );

}

export default Study;