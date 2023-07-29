/**
 * @author Kieran Hodgson
 * 
 * @description New Researcher component - displays the New Researcher form and handles submission
 */

import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

function NewResearcher(props){

    if(props.authenticated === false){ // if not logged in, redirect to login page
        props.navigate('/login');
    }

    const [formValues, setValues] = useState({   // set initial state of form values
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        });

    const handleChange = (event) =>{ // update form values when changed
        setValues({
            ...formValues, // spread operator to keep existing values
            [event.target.name]: event.target.value // update changed value
        })

    }
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent default action of the button in use

        const formData = new FormData(); // create new form data object

        //for each key in formValues, add to formData
        for (const key in formValues) { formData.append(key, formValues[key]); }
        

        axios.post(process.env.REACT_APP_API_LINK + "/researchers/insert/", formData, { // post form data to api with authentication header
            headers: {
                'Content-Type': 'multipart/form-data',
                method: 'POST',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
                })
            .then((response) => {
                if(response.status === 200){ // if response is ok, alert user and redirect to researcher page
                alert("Researcher Added Successfully");
                props.navigate('/researcher');
                } else { // if response is not ok, alert user and log response
                    alert("Error Adding Researcher");
                    console.log(response);
                }
            })
            .catch((error) => {  // if error, alert user and log error
                alert("Error Adding Researcher");
                console.log(error);
            });
    }


    return(
    <div>
    <Container className="col-md-8" >

        <Row>
            <Form id="NewUser" >
                <Col>
                    <h1>New Researcher</h1>
                    <Form.Group controlId="name">
                    <Row>

                        <Col md={6}>
                        <FloatingLabel controlId="floatingInput" label="First Name">
                            <Form.Control type="text" placeholder="Enter Name" name="first_name" onChange={handleChange} />
                        </FloatingLabel>
                        </Col>
                        <Col md={6}>
                        <FloatingLabel controlId="floatingInput" label="Last Name">
                            <Form.Control type="text" name="last_name" onChange={handleChange} placeholder="Enter Name" />
                        </FloatingLabel>
                        </Col>
                        </Row>

                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <FloatingLabel controlId="floatingInput" label="Email address">
                            <Form.Control type="email" name="email" onChange={handleChange} placeholder="
                            Enter email" />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" />
                        </FloatingLabel>
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={handleSubmit}>
                        Submit
                    </Button>
                    

                </Col>
            </Form>
        </Row>
    </Container>

</div>

    )
}

export default NewResearcher;