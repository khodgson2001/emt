/**
 * @author Kieran Hodgson
 * 
 * @description IRAS Review form component - contains the questions for the IRAS Review form
 */

import { Tab, Tabs, Form, FloatingLabel } from "react-bootstrap";
import './css/form.css';

function IRASReviewForm({answers, chooseValues}) {

    // function to find the index of a value in an array
    function findIndex(val, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].emt_questions_id === val) {
                return i;
            }
        }
    }

    return (
        <div>
                <Tabs defaultActiveKey="2" id="iras">
                    <Tab eventKey="2" title="IRAS Section 2">
                        <Form.Group controlId="2">
                            <FloatingLabel label="CT of investigational medicine">
                                <Form.Control 
                                type="date" placeholder="CT of investigational medicine" defaultValue={answers[findIndex('54', answers)] ? answers[findIndex('54', answers)].answers : ''} onChange={(e) => {chooseValues(e.target.value, "ctInvestigationalMedicine")}}/>
                            </FloatingLabel>
                            <FloatingLabel label="CT of investigational medical device">
                                <Form.Control type="date" placeholder="CT of investigational medical device" defaultValue={answers[findIndex('55', answers)] ? answers[findIndex('55', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "ctMedicalDevice")} />
                            </FloatingLabel>
                            <FloatingLabel label="Combined trial med product/device">
                                <Form.Control type="date" placeholder="Combined trial med product/device" defaultValue={answers[findIndex('56', answers)] ? answers[findIndex('56', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "trialMedProduct")} />
                            </FloatingLabel>
                            <FloatingLabel label="Other Clinical Trial novel intervention">
                                <Form.Control type="date" placeholder="Other Clinical Trial novel intervention" defaultValue={answers[findIndex('57', answers)] ? answers[findIndex('57', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "otherTrialNovel")}/>
                            </FloatingLabel>
                            <FloatingLabel label="Other - basic science/questionnaires/qualitive method/human tissue etc.">
                                <Form.Control type="date" placeholder="Other - basic science/questionnaires/qualitive method/human tissue etc." defaultValue={answers[findIndex('58', answers)] ? answers[findIndex('58', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "otherBasicScience")}/>
                            </FloatingLabel>
                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('59', answers)] ? answers[findIndex('59', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "section2Comments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="4" title="IRAS Section 4">
                        <Form.Group controlId="4">
                            <FloatingLabel label="CAG-REC needed when no patient consent">
                                <Form.Control type="date" placeholder="CAG-REC needed when no patient consent" defaultValue={answers[findIndex('60', answers)] ? answers[findIndex('60', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "cagRecDate")}/>
                            </FloatingLabel>
                            
                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('61', answers)] ? answers[findIndex('61', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "cagRecComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="3-1" title="IRAS Section A3-1">
                        <Form.Group controlId="A3-1">
                            <FloatingLabel label="CI - Needs to be clinical">
                                <Form.Control type="date" placeholder="CI - Needs to be clinical" defaultValue={answers[findIndex('62', answers)] ? answers[findIndex('62', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "ciNeedsClinicalDate")}/>
                            </FloatingLabel>
                            
                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('63', answers)] ? answers[findIndex('63', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "ciNeedsClinicalComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="4-5" title="IRAS Section A4, A5">
                        <Form.Group controlId="A4-5">
                            <FloatingLabel label="Sponsor - Always named admin person on IRAS form">
                                <Form.Control type="date" placeholder="Sponsor - Always named admin person on IRAS form" defaultValue={answers[findIndex('64', answers)] ? answers[findIndex('64', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "sponsorNamedAdminDate")}/>
                            </FloatingLabel>
                            
                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('65', answers)] ? answers[findIndex('65', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "sponsorNamedAdminComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="6-1" title="IRAS Section A6-1">
                        <Form.Group controlId="A6-1">
                            <FloatingLabel label="Summary should be all of study in lay">
                                <Form.Control type="date" placeholder="Summary should be all of study in lay" defaultValue={answers[findIndex('66', answers)] ? answers[findIndex('66', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "summaryStudyLayDate")}/>
                            </FloatingLabel>
                            
                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('67', answers)] ? answers[findIndex('67', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "summaryStudyLayComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="15" title="IRAS Section A15">
                        <Form.Group controlId="A15">
                            <FloatingLabel label="Sample group or cohort (speciality)">
                                <Form.Control type="date" placeholder="Sample group or cohort (speciality)" defaultValue={answers[findIndex('68', answers)] ? answers[findIndex('68', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "sampleGroupDate")}/>
                            </FloatingLabel>
                            
                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('69', answers)] ? answers[findIndex('69', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "sampleGroupComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="27" title="IRAS Section A27.1">
                        <Form.Group controlId="A27">
                            <FloatingLabel label="Identification and approach of patients be by an appropriate staff member. Complies with Data Protection.">
                                <Form.Control type="date" placeholder="Identification and approach of patients be by an appropriate staff member. Complies with Data Protection." defaultValue={answers[findIndex('70', answers)] ? answers[findIndex('70', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "idApproachDate")}/>
                            </FloatingLabel>
                            
                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('71', answers)] ? answers[findIndex('71', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "idApproachComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="36" title="IRAS Section A36">
                        <Form.Group controlId="A36">
                            <FloatingLabel label="Caldicott">
                                <Form.Control type="date" placeholder="Caldicott" defaultValue={answers[findIndex('72', answers)] ? answers[findIndex('72', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "caldicottDate")}/>
                            </FloatingLabel>
                            
                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('73', answers)] ? answers[findIndex('73', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "caldicottComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="43" title="IRAS Section A43">
                        <Form.Group controlId="A43">
                            <FloatingLabel label="Duration of personal data to be stored">
                                <Form.Control type="date" placeholder="Duration of personal data to be stored" defaultValue={answers[findIndex('74', answers)] ? answers[findIndex('74', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "durationStoredDate")}/>
                            </FloatingLabel>
                            
                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('75', answers)] ? answers[findIndex('75', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "durationStoredComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="44" title="IRAS Section A44">
                        <Form.Group controlId="A44">
                            <FloatingLabel label="Length of term for Archive storage">
                                <Form.Control type="date" placeholder="Length of term for Archive storage" defaultValue={answers[findIndex('56', answers)] ? answers[findIndex('76', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "termArchiveDate")}/>
                            </FloatingLabel>
                            
                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('77', answers)] ? answers[findIndex('77', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "termArchiveComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="64.1" title="IRAS Section A64.1">
                        <Form.Group controlId="A64.1">
                            <FloatingLabel label="Sponsor Organisation - NHS/HSC">
                                <Form.Control type="date" placeholder="Sponsor Organisation - NHS/HSC" defaultValue={answers[findIndex('78', answers)] ? answers[findIndex('78', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "sponsorNHSDate")}/>
                            </FloatingLabel>
                            <FloatingLabel label="Sponsor Organisation - Academic">
                                <Form.Control type="date" placeholder="Sponsor Organisation - Academic" defaultValue={answers[findIndex('79', answers)] ? answers[findIndex('79', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "sponsorAcademicDate")}/>
                            </FloatingLabel>
                            <FloatingLabel label="Sponsor Organisation - Pharmaceutical Industry">
                                <Form.Control type="date" placeholder="Sponsor Organisation - Pharmaceutical Industry" defaultValue={answers[findIndex('80', answers)] ? answers[findIndex('80', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "sponsorPharmaDate")}/>
                            </FloatingLabel>
                            <FloatingLabel label="Sponsor Organisation - Medical Device">
                                <Form.Control type="date" placeholder="Sponsor Organisation - Medical Device" defaultValue={answers[findIndex('81', answers)] ? answers[findIndex('81', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "sponsorMedDate")}/>
                            </FloatingLabel>
                            
                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('82', answers)] ? answers[findIndex('82', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "sponsorComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="76.1" title="IRAS Section A76.1">
                        <Form.Group controlId="A76.1">
                            <FloatingLabel label="Indemnity Insurance Cover - NHS">
                                <Form.Control type="date" placeholder="Indemnity Insurance Cover - NHS" defaultValue={answers[findIndex('83', answers)] ? answers[findIndex('83', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "indemnityNHSDate")}/>
                            </FloatingLabel>
                            <FloatingLabel label="Indemnity Insurance Cover - Other">
                                <Form.Control type="date" placeholder="Indemnity Insurance Cover - Other" defaultValue={answers[findIndex('84', answers)] ? answers[findIndex('84', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "indemnityOtherDate")}/>
                            </FloatingLabel>

                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('85', answers)] ? answers[findIndex('85', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "indemnityComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="C" title="IRAS Section Part C">
                        <Form.Group controlId="PartC">
                            <FloatingLabel label="Evidence of NHCT is on form as and approved site">
                                <Form.Control type="date" placeholder="Evidence of NHCT is on form as and approved site" defaultValue={answers[findIndex('86', answers)] ? answers[findIndex('86', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "evidenceNHCTDate")}/>
                            </FloatingLabel>
                            <FloatingLabel label="Request HRA approval for site added">
                                <Form.Control type="date" placeholder="Request HRA approval for site added" defaultValue={answers[findIndex('87', answers)] ? answers[findIndex('87', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "requestHRAAddedDate")}/>
                            </FloatingLabel>
                            <FloatingLabel label="HRA approval revieved for site added">
                                <Form.Control type="date" placeholder="HRA approval revieved for site added" defaultValue={answers[findIndex('88', answers)] ? answers[findIndex('88', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "approveHRAAddedDate")}/>
                            </FloatingLabel>

                            <FloatingLabel label="Comments">
                                <Form.Control type="textarea" placeholder="Comments" defaultValue={answers[findIndex('89', answers)] ? answers[findIndex('89', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "hraComments")}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Tab>
                    
                </Tabs>
        </div>
    )


}

export default IRASReviewForm;