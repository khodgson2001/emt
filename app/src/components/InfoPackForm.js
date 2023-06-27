/**
 * @author Kieran Hodgson
 * 
 * @description This component contains the form for the information pack. It is used in the InformationPack.js component.
 */

import { Tab, Tabs, Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
function InformationPackForm({chooseValues, editable, answers, sendEmail}) {

    //function to find the index of a value in an array
    function findIndex(val, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].emt_questions_id === val) {
                return i;
            }
        }
    }

//add onclick for send acceptance email updating the email date etc. 
//answers[findIndex("24", answers)] ? answers[findIndex("24", answers)].answers : ''
    return (
        <div>
            <Form>
                <Tabs defaultActiveKey="step1" id="checklist">
                    <Tab eventKey="step1" title="Step 1">
                        <Form.Group controlId="HostReg">
                            <br />
                            <Form.Label as="h4">Host Registration Recieved</Form.Label>
                            <FloatingLabel label="Send To">
                                <Form.Control id='email' type="email" required disabled={editable === "n" ? true : false} defaultValue={                                     
                                 answers[findIndex('26', answers)] ? answers[findIndex('26', answers)].answers : ''   } onChange={(e) => chooseValues(e.target.value, "rndEmailTo")} placeholder=" " />

                            </FloatingLabel>
    
                            <FloatingLabel label="Comments">
                                <Form.Control as="textarea" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('27', answers)] ? answers[findIndex('27', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "acceptEmailComments")} placeholder="Comments" />
                            </FloatingLabel>
                            <br />
                            <Button onClick={sendEmail}> Send Acceptance Email</Button>
                            <br />
                        </Form.Group>
                    </Tab>
                    <Tab eventKey="step2" title="Step 2">
                        <Form.Group controlId="InHouseSetup">
                            <br />
                            <Row>
                                <Form.Label as="h4" >In House Setup Docs to be checked</Form.Label>
                                </Row>
                            <Row>
                                <FloatingLabel label="LIP checklist: Host Registration Form">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('29', answers)] ? answers[findIndex('29', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "hostRegFormDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <Row>
                                <FloatingLabel label="Pharmacy">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('30', answers)] ? answers[findIndex('30', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "pharmacyDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Radiology">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('31', answers)] ? answers[findIndex('31', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "radiologyDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Pathology">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('33', answers)] ? answers[findIndex('33', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "pathologyDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Cardiology">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('35', answers)] ? answers[findIndex('35', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "cardiologyDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Costing Tool">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('36', answers)] ? answers[findIndex('36', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "costingDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Funding Recieved">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('37', answers)] ? answers[findIndex('37', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "fundingDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Cost Centre Review Date">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('38', answers)] ? answers[findIndex('38', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "ccrDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Caldicott">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('39', answers)] ? answers[findIndex('39', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "caldicottDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="GCP/CV Date">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('40', answers)] ? answers[findIndex('40', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "gcpDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Delegation Log">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('41', answers)] ? answers[findIndex('41', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "delegationDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                            <FloatingLabel label="PI Responsibility Form">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('42', answers)] ? answers[findIndex('42', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "pirDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Comments">
                                    <Form.Control as="textarea" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('43', answers)] ? answers[findIndex('43', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "step2Comments")} placeholder="Comments" />
                                </FloatingLabel>
                            </Row>
                        </Form.Group>
                    </Tab>
                    <Tab eventKey="step3" title="Step 3">
                        <br />
                        <Form.Label as="h4">Finance and Contract</Form.Label>
                        <br />
                        <Form.Group controlId="FinanceContract">
                            <Row>
                                <FloatingLabel label="Contract checked against costing tool">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('44', answers)] ? answers[findIndex('44', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "contractCostDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Contract reviewed">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('45', answers)] ? answers[findIndex('45', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "contractReviewDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Contract ready to be signed">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('46', answers)] ? answers[findIndex('46', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "contractReadyDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                                
                            </Row>
                            <br />
                            <Row>
                                <FloatingLabel label="Contract agreed with Deputy Director of R&D or OP Service Manager OSM">
                                    <Form.Control type="date" required disabled={editable === "n" ? true : false} defaultValue={answers[findIndex('47', answers)] ? answers[findIndex('47', answers)].answers : ''} onChange={(e) => chooseValues(e.target.value, "contractAgreedDate")} placeholder="Enter Date Completed" />
                                </FloatingLabel>
                                
                            </Row>
                        </Form.Group>
                    </Tab>
                    <Tab eventKey="step4" title="Step 4">
                        <br />
                        <Form.Label as="h4">Confirmation of C&C (Automated Email)</Form.Label>
                        <br />
                        <Form.Label as="h5">Check to CC deptartment into email</Form.Label>
                        <Form.Group controlId="EmailCC">
                            <Row>
                                <Col>
                                    <Form.Check type="checkbox" name="EmailCC" value="Finances" label="Jemma/Norman (if finances)" onChange={(e) => chooseValues(e.target.value, "emailFinanceDate")} />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Check type="checkbox" name="EmailCC" value="Pharmacy" label="Pharmacy" onChange={(e)=> chooseValues(e.target.value, 'emailPharmacyDate')} />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Check type="checkbox" name="EmailCC" value="Pathology" label="Pathology" onChange={(e)=> chooseValues(e.target.value, 'emailPathologyDate')} />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Check type="checkbox" name="EmailCC" value="Radiology" label="Radiology" onChange={(e)=> chooseValues(e.target.value, 'emailRadiologyDate')}/>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Check type="checkbox" name="EmailCC" value="Lung Function" label="Lung Function" onChange={(e)=> chooseValues(e.target.value, 'emailLungFunctionDate')}/>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Check type="checkbox" name="EmailCC" value="Update LPMS" label="Update LPMS" onChange={(e)=> chooseValues(e.target.value, 'updateLPMSDate')}/>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Tab>
                </Tabs>
            </Form>
        </div>
    )


}

export default InformationPackForm;