/**
 * @author Kieran Hodgson
 * 
 * @description New Study component - displays the New Study forms (section A and B forms)
 */

import { Tab, Tabs, Row, Col, Container, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';
//import nesecary libraries and components

import SectionA from "./forms/newStudy/SectionA";
import SectionB from "./forms/newStudy/SectionB";

import './css/form.css';
//import the section A and B forms

function NewStudy(props) {


    const [formValues, setValues] = useState({ // set form values
        name: "",
        short_name: "",
        principleInvestigator: "",
        chiefInvestigator: "",
        researchLead: "",
        description: "",
        emt_statuses_id: "1",
        iras: "",
        portfolioAdopted: "",
        portfolioId: "",
        fundingCat: "",
        siteInvited: "",
        siteSelected: "",
        siteLocation: "",
        recruitmentTarget: "",
        startDate: "",
        endDate: "",
        hra: "",
        indemnity: "",
        caldicott: "",
        gcp: "",
        agreedSS: [],
        financeAvailable: "",
        siv: "",
        coe: "",
        coyob: "",
    });
    const [files, setFiles] = useState(); // initialise files array for what needs to be uploaded
    const [answers, setAnswers] = useState([]);

    if(props.authenticated === false){ // if user is not logged in, redirect to login page
        props.navigate('/login');
    }

    // fill answers array with blank values
    useEffect(() => {
        for (let i = 0; i < 100; i++) {
            setAnswers(answers => [...answers, ""]);
        }
    }, []);


    const handleUpload = (files) => { setFiles(files) } // set files to be uploaded

    const handleSubmit = (event) => { // handle form submission
        event.preventDefault(); // prevent default form submission
        const formData = new FormData();
        // for each key in formValues, add to formData
        for (const key in formValues) { formData.append(key, formValues[key]); }

        // validate form data
        if(formData.get('name') === "" || formData.get('short_name') === ""
        /**
         * validation for all required fields - needs enabling soon
         *  || formData.get('principleInvestigator') === "" || formData.get('chiefInvestigator') === "" 
        || formData.get('researchLead') === "" || formData.get('description') === "" || 
        formData.get('iras') === "" || formData.get('portfolioAdopted') === "" || 
        formData.get('portfolioId') === "" || formData.get('fundingCat') === "" || 
        formData.get('siteInvited') === "" || formData.get('siteSelected') === "" || 
        formData.get('siteLocation') === "" || formData.get('recruitmentTarget') === "" || 
        formData.get('startDate') === "" || formData.get('endDate') === "" || formData.get('hra') === "" || 
        formData.get('indemnity') === "" || formData.get('caldicott') === "" || formData.get('gcp') === "" || 
        formData.get('agreedSS') === "" || formData.get('financeAvailable') === "" || formData.get('siv') === "" || formData.get('coe') === "" || formData.get('coyob') === "")
         * 
        */
        ){
            alert("Please fill in all required fields"); // alert user to fill in all required fields
        } else {
            
        var url = process.env.REACT_APP_API_LINK + "/study/insert";
        axios.post(url, formData, { // post form data to api
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.status === 200) { // if response is successful
                    alert("Study created successfully"); // alert user to successful study creation
                    let url = "/study?short_name=" + formData.get("short_name"); // redirect url to study page
                    let emailsSent = []; // array to store email addresses sent to
                    
                    let toGet = ['principleInvestigator', 'chiefInvestigator', 'researchLead'];

                    //for each item in toGet, get the researcher details
                    toGet.forEach(function (item) {
                        if(!(emailsSent.includes(formData.get(item)))){ // if email has not been sent to
                        fetch('http://unn-w20002249.newnumyspace.co.uk/emt/api/researchers?id=' + formData.get(item), {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            let email = data[0].email;
                            let name = data[0].first_name + " " + data[0].last_name;
                            sendEmail(email, name, 'kieran2.hodgson@northumbria.ac.uk');
                            emailsSent.push(formData.get(item));
                        });
                    }
                    });
                    props.navigate(url); // redirect to study page
                } else {
                    alert("Study creation failed, please try again"); // alert user to failed study creation
                }
            })
            .catch((error) => {
                console.log(error); // log error
            });

        if (files != null) { // if files are prepped to be uploaded
            const file = new FormData(); // create new form data
            file.set("sendimage", files); // set file to be uploaded
            file.set("short_name", formValues.short_name); // set short name of study - this is used as the association between the file and study

            axios.post(process.env.REACT_APP_API_LINK + "/uploadFile", file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    method: 'POST',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    }
    
    function chooseValues(values, id) { // function to set form values
        setValues({ // set form values
            ...formValues,  // spread operator to keep existing values
            [id]: values
        });
    }


    function sendEmail(to, toname, creator) { // function to send emails using the email API which uses mailgun
        let subject = "New Study Created - " + formValues.short_name;
        let html = `<h1>New Study: ` + formValues.name + `</h1> 
        <p>A new study has been created. 
        Please review it on the <a href="http://unn-w20002249.newnumyspace.co.uk/emt/app/study?short_name=` + formValues.short_name + `">EMT Portal</a>.
        You have been emailed as you are selected as a researcher, if this is a mistake, please contact your line manager to investigate.</p>`;
        const formData = new FormData();
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

    return (
        <div>
            <Container className="col-md-8" >
                <Row>
                    <Form id="RegistrationForm" >
                        <Col>
                            <Tabs defaultActiveKey="sectionA" id="RegistrationForm">
                                <Tab eventKey="sectionA" title="Section A">
                                    <SectionA chooseValues={chooseValues} answers={answers} />
                                </Tab>
                                <Tab eventKey="sectionB" title="Section B">
                                    <SectionB chooseValues={chooseValues} answers={answers} handleUpload={handleUpload} />
                                </Tab>
                            </Tabs>
                        </Col>

                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Container>

        </div>


    )
}

export default NewStudy;