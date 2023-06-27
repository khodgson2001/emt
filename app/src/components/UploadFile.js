import { Row, Col, Container, Button, Form, Card, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';

function UploadFile(props) {
    const [files, setFiles] = useState();
    const [studies, setStudies] = useState();
    const [short_name, setShortName] = useState();

    if(props.authenticated === false){
        props.navigate('/login');
    }

    const handleUpload = (files) => {
        setFiles(files);
        console.log(files);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!files || !short_name){
            alert("Please select a file and study");
            return;
        }
        const file = new FormData();
        file.set("sendimage", files);
        file.set("short_name", short_name);
        axios.post("http://unn-w20002249.newnumyspace.co.uk/emt/api/uploadFile", file, {
            headers: {
                'Content-Type': 'multipart/form-data',
                method: 'POST',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                console.log(response.data);
                alert("File Uploaded Successfully");
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {
        axios.get("http://unn-w20002249.newnumyspace.co.uk/emt/api/studies/", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                setStudies(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div>
            <Container className="col-md-8" >
                <Card style={{width:'100%'}}>
                    <Card.Header as={'h2'}>Upload File</Card.Header>
                    <Card.Body>
                        <Row>
                            <Form.Group>
                                <FloatingLabel label="Study">
                                <Form.Control as="select" name="short_name" onChange={(e) => setShortName(e.target.value)}>
                                    <option value="">Select a Study</option>
                                    {studies && studies.map((study) => (
                                        <option key={study.short_name} value={study.short_name}>{study.short_name}</option>
                                    ))}
                                </Form.Control>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="DocumentsForSubmission" >
                                <Form.Label>PDF's for Submission</Form.Label>
                                <Form.Control name="sendimage" type="file" accept=".pdf" onChange={(e) => handleUpload(e.target.files[0])} />
                            </Form.Group>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm={{span:2, offset: 5}}>
                            <Button variant="primary" type="button" onClick={handleSubmit}>
                                Submit
                            </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            </Container>
        </div>
    )
}

export default UploadFile;