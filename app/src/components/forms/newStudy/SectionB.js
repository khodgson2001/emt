import { Form, FloatingLabel, Row, Col } from "react-bootstrap";
import '../../css/form.css';

function SectionB({ chooseValues, handleUpload , editable, answers }) {


    function findIndex(val, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].emt_questions_id === val) {
                return i;
            }
        }
    }

    return (
        <div>
            <Form.Group controlId="HRADate">
                <FloatingLabel label="HRA Date">
                    <Form.Control type="date" defaultValue={                                     
                                 answers[findIndex('16', answers)] ? answers[findIndex('16', answers)].answers : ''   } disabled={editable === "n" ? true : false} placeholder="Enter HRA Date" onChange={(e)=> chooseValues(e.target.value, 'hra')}/>
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="IndemityDate">
                <FloatingLabel label="Indemity Date">
                    <Form.Control type="date" defaultValue={                                     
                                 answers[findIndex('17', answers)] ? answers[findIndex('17', answers)].answers : ''   } disabled={editable === "n" ? true : false} placeholder="Enter Indemity Date" onChange={(e)=> chooseValues(e.target.value, 'indemnity')}/>
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="CaldicottComplete" className="buttonBorder">
                <Row >
                    <Col sm={6} style={{ float: 'left' }}><Form.Label>Caldicott Complete</Form.Label></Col>
                    <Col sm={3}><Form.Check inline required name='caldicott' type="radio" disabled={editable === "n" ? true : false} label="Yes" onChange={(e)=> chooseValues(e.target.value, 'caldicott')} /></Col>
                    <Col sm={3}><Form.Check inline required name='caldicott' type="radio" disabled={editable === "n" ? true : false} label="No" onChange={(e)=> chooseValues(e.target.value, 'caldicott')} /></Col>
                </Row>

            </Form.Group>

            <Form.Group controlId="GCP-PI">
                <FloatingLabel label="GCP-PI">
                    <Form.Control type="text" defaultValue={                                     
                                 answers[findIndex('19', answers)] ? answers[findIndex('19', answers)].answers : ''   } disabled={editable === "n" ? true : false} placeholder="Enter GCP-PI" onChange={(e)=> chooseValues(e.target.value, 'gcp')} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="AgreedSupportServices" className="buttonBorder">
                <Row>
                <Col sm={4}style={{ float: 'left' }}><Form.Label >Agreed Support Services</Form.Label></Col>
                <Col sm={8}><Form.Check type="checkbox" name="SupportServices" disabled={editable === "n" ? true : false} value="Radiology" label="Radiology" />
                <Form.Check type="checkbox" name="SupportServices" disabled={editable === "n" ? true : false} value="Pharmacy" label="Pharmacy" />
                <Form.Check type="checkbox" name="SupportServices" disabled={editable === "n" ? true : false} value="Pathology" label="Pathology" />
                <Form.Check type="checkbox" name="SupportServices" disabled={editable === "n" ? true : false} value="Cardiology" label="Cardiology" />
                <Form.Check type="checkbox" name="SupportServices" disabled={editable === "n" ? true : false} value="Lung Function" label="Lung Function" />
                <Form.Check type="checkbox" name="SupportServices" disabled={editable === "n" ? true : false} value="N/A" label="N/A" /> </Col>
                </Row>
            </Form.Group>

            <Form.Group controlId="FinanceAvailable" className="buttonBorder">
                <Row>
                <Col sm={6} style={{ float: 'left' }}><Form.Label>Finance Available</Form.Label></Col>
                <Col sm={3}><Form.Check inline required disabled={editable === "n" ? true : false} name="FinanceAvailable" type="radio" label="Yes" onChange={(e)=> chooseValues(e.target.value, 'financeAvailable')}/></Col>
                <Col sm={3}><Form.Check inline required disabled={editable === "n" ? true : false} name="FinanceAvailable" type="radio" label="No" onChange={(e)=> chooseValues(e.target.value, 'financeAvailable')}/></Col>
                </Row>
            </Form.Group>

            <Form.Group controlId="SIVDate">
                <FloatingLabel label="SIV Date">
                <Form.Control defaultValue={                                     
                                 answers[findIndex('22', answers)] ? answers[findIndex('22', answers)].answers : ''   } type="date" disabled={editable === "n" ? true : false} placeholder="Enter SIV Date" onChange={(e)=> chooseValues(e.target.value, 'siv')}/>
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="CollectionEthnicity" className="buttonBorder">
                <Row>
                <Col sm={6} style={{float: 'left'}}><Form.Label>Collection of Ethnicity</Form.Label></Col>
                <Col sm={3}><Form.Check type="radio" inline required name='coe' disabled={editable === "n" ? true : false} label="Yes" onChange={(e)=> chooseValues(e.target.value, 'coe')}/></Col>
                <Col sm={3}><Form.Check type="radio" inline required name='coe' disabled={editable === "n" ? true : false} label="No" onChange={(e)=> chooseValues(e.target.value, 'coe')}/></Col>
                </Row>
            </Form.Group>

            <Form.Group controlId="CollectionYOB" className="buttonBorder">
                <Row>
                <Col sm={6} style={{float: 'left'}}><Form.Label>Collection of YOB</Form.Label></Col>
                <Col sm={3}><Form.Check type="radio" inline required name="coyob" disabled={editable === "n" ? true : false} label="Yes" onChange={(e)=> chooseValues(e.target.value, 'coyob')}/></Col>
                <Col sm={3}><Form.Check type="radio" inline required name="coyob" disabled={editable === "n" ? true : false} label="No" onChange={(e)=> chooseValues(e.target.value, 'coyob')}/></Col>
                </Row>
            </Form.Group>

            <Form.Group controlId="DocumentsForSubmission" className="buttonBorder">
                <Form.Label>Documents for Submission</Form.Label>
{/*                 <Form.Select aria-label="Documents for Submission">
                    <option disabled={editable === "n" ? true : false} value="Protocol">Protocol</option>
                    <option disabled={editable === "n" ? true : false} value="PIS">PIS</option>
                    <option disabled={editable === "n" ? true : false} value="Consent">Consent</option>
                    <option disabled={editable === "n" ? true : false} value="GP">GP Letter</option>
                    <option disabled={editable === "n" ? true : false} value="StudyPosters">Study Posters</option>
                    <option disabled={editable === "n" ? true : false} value="Leaflets">Study Leaflets</option>
                </Form.Select> */}
                <Form.Control name="sendimage" disabled={editable === "n" ? true : false} type="file" onClick={(e) => handleUpload(e.target.files[0])} />
            </Form.Group>


        </div>

    )


}

export default SectionB;