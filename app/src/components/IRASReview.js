/**
 * @author Kieran Hodgson
 * 
 * @description IRAS Review component - displays the IRAS Review form
 */
import { Tab, Tabs, Form, Col, Row, Container, FloatingLabel, Button } from "react-bootstrap";
import IRASReviewForm from "./IRASReviewForm";
import { useState, useEffect } from "react";
import axios from "axios";

function IRASReview(props) {

    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [short_name, setShortName] = useState("");
    const [studies, setStudies] = useState([]);
    const [irasAnswers, setIrasAnswers] = useState([]);
    const [formValues, setValues] = useState({
        studyID: "",
        ctInvestigationalMedicine: "",
        ctMedicalDevice: "",
        trialMedProduct: "",
        otherTrialNovel: "",
        otherBasicScience: "",
        section2Comments: "",
        cagRecDate: "",
        cagRecComments: "",
        ciNeedsClinicalDate: "",
        ciNeedsClinicalComments: "",
        sponsorNamedAdminDate: "",
        sponsorNamedAdminComments: "",
        summaryStudyLayDate: "",
        summaryStudyLayComments: "",
        sampleGroupDate: "",
        sampleGroupComments: "",
        idApproachDate: "",
        idApproachComments: "",
        caldicottDate: "",
        caldicottComments: "",
        durationStoredDate: "",
        durationStoredComments: "",
        termArchiveDate: "",
        termArchiveComments: "",
        sponsorNHSDate: "",
        sponsorAcademicDate: "",
        sponsorPharmaDate: "",
        sponsorMedDate: "",
        sponsorComments: "",
        indemnityNHSDate: "",
        indemnityOtherDate: "",
        indemnityComments: "",
        evidenceNHCTDate: "",
        requestHRAAddedDate: "",
        approveHRAAddedDate: "",
        hraComments: "",
    });

    if(props.authenticated === false){
        props.navigate('/login');
    }

        // fill answers array with blank values
        useEffect(() => {
            for (let i = 0; i < 100; i++) {
                answers.push("");
                irasAnswers.push("");
            }
            fetch("http://unn-w20002249.newnumyspace.co.uk/emt/api/studies", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    setStudies(json);
                    setLoading(true);
                })
                .catch((error) => console.error(error));
        }, []);

        //seperate useEffect to get answers from database due to reliance on short_name
        useEffect(() => {
            //get answers from database and setAnswers
            fetch("http://unn-w20002249.newnumyspace.co.uk/emt/api/answers?short_name=" + short_name, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    setAnswers(json);
                }
                )
                .catch((error) => console.error(error));
        }, [short_name]);
    
        const handleSelectChange = (e) => {
            setShortName(e.target.value);
            
            chooseValues(e.target.value, "studyID")
            console.log(answers);

        }

        function chooseValues(values, id) {
            setValues({
                ...formValues,
                [id]: values
            });

            //console.log(formValues);
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            const formData = new FormData();
            //for each key in formValues, add to formData
            for (const key in formValues) {
                formData.append(key, formValues[key]);
            }
            var url = "http://unn-w20002249.newnumyspace.co.uk/emt/api/iras";
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        alert("Study created successfully");
                    } else {
                        alert("Study creation failed, please try again");
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
                <Form>
                <IRASReviewForm chooseValues={chooseValues} answers={answers} editable={"y"}/>
                <Button variant="primary" type="submit" onClick={handleSubmit}> Submit </Button>
            </Form>
                </Row>
            </Container>

        </div>
    )


}

export default IRASReview;