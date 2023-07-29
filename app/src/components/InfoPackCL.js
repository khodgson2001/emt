/**
 * @author: Kieran Hodgson
 * 
 * @description: This component displays existing submitted study registration forms, displays them (uneditable) and then the user completes the information pack checklist based on that data.
 */

import { Tab, Tabs, Container, Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import SectionA from "./forms/newStudy/SectionA";
import SectionB from "./forms/newStudy/SectionB";
import InformationPackForm from "./InfoPackForm";
import axios from "axios";
function InformationPackCheclist(props) {

    const [answers, setAnswers] = useState([]); // array of all existing answers
    const [studies, setStudies] = useState([]); // array of all studies
    const [loading, setLoading] = useState(false); // boolean to check if the studies have been loaded
    const [short_name, setShortName] = useState(""); // short name of the study
    const [formValues, setValues] = useState({ // form values for submission
        studyID: "",
        rndEmailTo: "",
        acceptEmailComments: "",
        acceptEmailDate: "",
        hostRegFormDate: "",
        pharmacyDate: "",
        radiologyDate: "",
        pathologyDate: "",
        cardiologyDate: "",
        costingDate: "",
        fundingDate: "",
        ccrDate: "",
        caldicottDate: "",
        gcpDate: "",
        delegationDate: "",
        pirDate: "",
        step2Comments: "",
        contractCostDate: "",
        contractReviewDate: "",
        contractReadyDate: "",
        contractAgreedDate: "",
        emailFinanceDate: "",
        emailPharmacyDate: "",
        emailPathologyDate: "",
        emailLungFunctionDate: "",
        emailRadiologyDate: "",
        updateLPMSDate: "",
    });

    if (props.authenticated === false) {
        props.navigate('/login');
    }

    //function used to send email via custom API routed to mailgun
    //uses post request to send to api
    function sendEmail(to, toname, creator, comments) {
        let subject = "Study Acceptance";
        let html = `<h1>Study Acceptance</h1> 
        <p>Your study has been accepted. Please keep an eye on your emails for futher detail and contracts.</p>`;
        if (to === "") {
            alert("Please enter an email address");
            return;
        }
        if (comments !== "") {
            html += `<p>Comments: ${comments}</p>`;
        }
        const formData = new FormData(); // set formdata object to include required data for mailgun
        formData.set("to", to);
        formData.set("toname", toname);
        formData.set("subject", subject);
        formData.set("html", html);
        formData.set("text", 'A new study has been created');
        formData.set("tag", "newStudy");
        formData.set("replyto", creator);

        axios.post('http://unn-w20002249.newnumyspace.co.uk/emt/api/sendemail', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                method: 'POST',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

    }

    // fill answers array with blank values - fixes issue where answers array is empty on first render
    useEffect(() => {
        for (let i = 0; i < 100; i++) {
            answers.push("");
        }
        fetch(process.env.REACT_APP_API_LINK + "/studies", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }) //get studies from api 
            .then((response) => response.json())
            .then((json) => {
                setStudies(json); //set studies to json response
                setLoading(true); //set loading to true
            })
            .catch((error) => console.error(error));
    }, []);

    //seperate useEffect to get answers from api due to reliance on short_name
    useEffect(() => {
        //get answers from database and set to answers array
        fetch(process.env.REACT_APP_API_LINK + "/answers?short_name=" + short_name, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((json) => { setAnswers(json); })
            .catch((error) => console.error(error));
    }, [short_name]);

    //function to handle change of study selection - sets short name and calls chooseValues function
    const handleSelectChange = (e) => {
        setShortName(e.target.value);
        chooseValues(e.target.value, "studyID")
    }

    //sets values in formValues array - takes the existing formValues and updates with the new value
    function chooseValues(values, id) {
        setValues({
            ...formValues,
            [id]: values
        });
    }

    //function to send email from research and development to the user
    const handleEmailSend = (event) => {
        event.preventDefault(); //prevent default action of submit button
        sendEmail(formValues.rndEmailTo, "Research and Development", "EMT Portal", formValues.acceptEmailComments); //send email
        document.getElementById('email').setAttribute("disabled", "disabled"); //disable email input after sending
        chooseValues(new Date().toISOString().slice(0, 10), "acceptEmailDate"); //set send date to today
    }

    //function to handle submission of the form, taking in the event
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        //for each key in formValues, add to formData
        for (const key in formValues) {
            formData.append(key, formValues[key]);
        }

        var url = process.env.REACT_APP_API_LINK + "/infopack"; //url to post to

        //post to api
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                //if response is 200, alert success, else alert failure
                if (response.status === 200) {
                    alert("Information Pack Successfully Submitted");
                } else {
                    alert("Information Pack submission failed, please try again");
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }


    return (
        <div>
            <Container>
                <Row>
                    <FloatingLabel controlId="floatingSelect" label="Select a Study To Evaluate" >
                        <Form.Select onChange={handleSelectChange}>
                            <option value="">Select a Study </option>
                            {loading && studies.map((study) => (
                                <option key={study.short_name} value={study.short_name}>{study.name} ({study.short_name})</option>
                            ))}

                        </Form.Select>
                    </FloatingLabel>
                </Row>
                <Row>
                    <Col md="6">
                        <Tabs defaultActiveKey="sectionA" id="RegistrationForm">
                            <Tab eventKey="sectionA" title="Section A">
                                <SectionA chooseValues={false} answers={answers} editable={"n"} />
                            </Tab>
                            <Tab eventKey="sectionB" title="Section B">
                                <SectionB chooseValues={false} answers={answers} editable={"n"} />
                            </Tab>
                        </Tabs>
                    </Col>

                    <Col md="6">
                        <InformationPackForm handleSubmit={handleSubmit} sendEmail={handleEmailSend} chooseValues={chooseValues} answers={answers} editable={"y"} />
                        <br />
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Container>

        </div>
    )


}

export default InformationPackCheclist;