import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, FloatingLabel, Row, Col } from 'react-bootstrap';
import '../../css/form.css';

function SectionA({ chooseValues, editable, answers }) {
    const [researchers, setResearchers] = useState([]);

    //fetch all researchers from the database
    useEffect(() => {
        axios.get("http://unn-w20002249.newnumyspace.co.uk/emt/api/researchers", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                setResearchers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        // if the editable parameter passed in is 'n', then disable all the fields
        if (editable === 'n') {
            if (answers[3] && answers[3].answers === 'Yes') {
                document.getElementById('portAdoptY').checked = true;
            } else if (answers[3] && answers[3].answers === 'No') {
                document.getElementById('portAdoptN').checked = true;
            } else if (answers[3] && answers[3].answers === 'N/A') {
                document.getElementById('portAdoptNA').checked = true;
            }
        }
    }, [answers, editable]);

    function editMessage() {
        if (editable === "y") {
            return(
            <Row>
                <Col sm={12}>
                    <Form.Text className="text-muted">
                        Upon submission, this value will not be editable. Please ensure this is correct before submitting.
                    </Form.Text>
                </Col>
            </Row>
            )
        }
    }

    function findIndex(val, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].emt_questions_id === val) {
                return i;
            }
        }
    }

    return (
        <div>
            <Form.Group controlId="StudyTitle">
                <FloatingLabel label="Study Title">
                    <Form.Control type="text" required disabled={editable === "n" ? true : false} placeholder="Enter Study Title" defaultValue={                                     
                                 answers[findIndex('1', answers)] ? answers[findIndex('1', answers)].answers : ''   } onChange={(e) => chooseValues(e.target.value, "name")} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="StudyShortName">
                <FloatingLabel label="Study Short Name">
                    <Form.Control type="text" required disabled={editable === "n" ? true : false} placeholder="Enter Study Short Name" defaultValue={                                     
                                 answers[findIndex('2', answers)] ? answers[findIndex('2', answers)].answers : ''   } onChange={(e) => chooseValues(e.target.value, "short_name")} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="IrasNhctRef">
                <FloatingLabel label="IRAS/NHCT Ref">
                    <Form.Control type="text" required disabled={editable === "n" ? true : false} placeholder="Enter IRAS/NHCT Ref" defaultValue={                                     
                                 answers[findIndex('3', answers)] ? answers[findIndex('3', answers)].answers : ''   } onChange={(e) => chooseValues(e.target.value, "iras")} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="PortfolioAdopted" className='buttonBorder'>
                <Row>
                    <Col sm={6}>
                        <Form.Label style={{ float: 'left' }}>Portfolio Adopted</Form.Label>
                    </Col>
                    <Col sm={2}>
                        <Form.Check id='portAdoptY' type="radio" inline required disabled={editable === "n" ? true : false} name="PortfolioAdopted" value="Yes" label="Yes" onChange={(e) => chooseValues(e.target.value, "portfolioAdopted")} />
                    </Col>
                    <Col sm={2}>
                        <Form.Check id='portAdoptN' type="radio" inline required disabled={editable === "n" ? true : false} name="PortfolioAdopted" value="No" label="No" onChange={(e) => chooseValues(e.target.value, "portfolioAdopted")} />
                    </Col>
                    <Col sm={2}>
                        <Form.Check id='portAdoptNA' type="radio" inline required disabled={editable === "n" ? true : false} name="PortfolioAdopted" value="N/A" label="N/A" onChange={(e) => chooseValues(e.target.value, "portfolioAdopted")} /></Col>
                </Row>
                {editMessage()}
            </Form.Group>

            <Form.Group controlId="PortfolioID">
                <FloatingLabel label="Portfolio ID">
                    <Form.Control type="text" required disabled={editable === "n" ? true : false} placeholder="Enter Portfolio ID" defaultValue={                                     
                                 answers[findIndex('5', answers)] ? answers[findIndex('5', answers)].answers : ''   } onChange={(e) => chooseValues(e.target.value, "portfolioId")} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="FundingCategory" className='buttonBorder'>
                <Row>
                    <Col sm={6}><Form.Label style={{ float: 'left' }}>Funding Category</Form.Label></Col>
                    <Col sm={3}><Form.Check type="radio" inline required disabled={editable === "n" ? true : false} name="FundingCategory" value="Commercial" label="Commercial" onChange={(e) => chooseValues(e.target.value, "fundingCat")} /></Col>
                    <Col sm={3}><Form.Check type="radio" inline required disabled={editable === "n" ? true : false} name="FundingCategory" value="Non-Commercial" label="Non-commercial" onChange={(e) => chooseValues(e.target.value, "fundingCat")} /></Col>
                </Row>
                {editMessage()}

            </Form.Group>

            <Form.Group controlId="SiteInvited" className='buttonBorder'>
                <Row>
                    <Col sm={6}>
                        <Form.Label style={{ float: 'left' }}>Site Invited</Form.Label>
                    </Col>
                    <Col sm={3}>
                        <Form.Check type="radio" inline required disabled={editable === "n" ? true : false} name='SiteInvited' value='Yes' label="Yes" onChange={(e) => chooseValues(e.target.value, 'siteInvited')} />
                    </Col>
                    <Col sm={3}>
                        <Form.Check type="radio" inline required disabled={editable === "n" ? true : false} name='SiteInvited' value='No' label="No" onChange={(e) => chooseValues(e.target.value, 'siteInvited')} />
                    </Col>
                </Row>
                {editMessage()}
            </Form.Group>

            <Form.Group controlId="SiteSelected">
                <FloatingLabel label="Site Selected (Recieved full HRA study pack)">
                    <Form.Control type="text" required disabled={editable === "n" ? true : false} placeholder="Enter Site Selected" defaultValue={                                     
                                 answers[findIndex('8', answers)] ? answers[findIndex('8', answers)].answers : ''   } onChange={(e) => chooseValues(e.target.value, 'siteSelected')} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="ChiefInvestigator">
                <FloatingLabel label="Chief Investigator">
                    {editable === 'n' ?
                        <Form.Control type="text" disabled placeholder="Enter Chief Investigator" value={answers[findIndex('9', answers)] ? researchers[answers[findIndex('9', answers)].answers - 1].first_name + " " + researchers[answers[findIndex('9', answers)].answers - 1].last_name : ''} />
                        :
                        <Form.Select aria-label="Chief Investigator" defaultValue={                                     
                            answers[findIndex('9', answers)] ? answers[findIndex('9', answers)].answers : 'NONE'} required onChange={(e) => chooseValues(e.target.value, "chiefInvestigator")}>
                            <option disabled={editable === "n" ? true : false} value="NONE">Select Chief Investigator</option>
                            {researchers.map((researcher) => (
                                <option disabled={editable === "n" ? true : false} value={researcher.id} key={researcher.id}>{researcher.first_name} {researcher.last_name}</option>
                            ))}
                        </Form.Select>
                    }

                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="PrincipalInvestigator">
                <FloatingLabel label="Principal Investigator">
                    {editable === 'n' ?
                        <Form.Control type="text" disabled placeholder="Enter Principal Investigator" value={answers[findIndex('10', answers)] ? researchers[answers[findIndex('10', answers)].answers - 1].first_name + " " + researchers[answers[findIndex('10', answers)].answers - 1].last_name : ''} />
                        :
                        <Form.Select aria-label="Principal Investigator" defaultValue={                                     
                            answers[findIndex('10', answers)] ? answers[findIndex('10', answers)].answers : 'NONE'} required onChange={(e) => chooseValues(e.target.value, "principleInvestigator")}>

                            <option disabled={editable === "n" ? true : false} value="">Select Principal Investigator</option>
                            {researchers.map((researcher) => (
                                <option disabled={editable === "n" ? true : false} value={researcher.id} key={researcher.id}>{researcher.first_name} {researcher.last_name}</option>
                            ))}
                        </Form.Select>
                    }
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="ResearchLead">
                <FloatingLabel label="Research Lead">
                    {editable === 'n' ?
                        <Form.Control type="text" disabled placeholder="Enter Research Lead" value={answers[findIndex('11', answers)] ? researchers[answers[findIndex('11', answers)].answers - 1].first_name + " " + researchers[answers[findIndex('11', answers)].answers - 1].last_name : ''} />
                        :
                        <Form.Select aria-label="Research Lead" defaultValue={                                     
                            answers[findIndex('11', answers)] ? answers[findIndex('11', answers)].answers : 'NONE'} required onChange={(e) => chooseValues(e.target.value, "researchLead")}>

                        <option disabled={editable === "n" ? true : false} value="">Select Research Lead</option>
                        {researchers.map((researcher) => (
                            <option disabled={editable === "n" ? true : false} value={researcher.id} key={researcher.id}>{researcher.first_name} {researcher.last_name}</option>
                        ))}
                    </Form.Select>
                    }
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="SiteLocation">
                <FloatingLabel label="Site Location">
                    {editable === 'n' ?
                        <Form.Control type="text" disabled placeholder="Enter Site Location" value={answers[findIndex('12', answers)] ? answers[findIndex('12', answers)].answers : ''} />
                        :
                    <Form.Select aria-label="Site Location" defaultValue={                                     
                        answers[findIndex('12', answers)] ? answers[findIndex('12', answers)].answers : ''   } required onChange={(e) => chooseValues(e.target.value, 'siteLocation')} >
                        <option disabled={editable === "n" ? true : false} value="">Select Location</option>
                        <option disabled={editable === "n" ? true : false} value="NTGH">NTGH</option>
                        <option disabled={editable === "n" ? true : false} value="WGH">WGH</option>
                        <option disabled={editable === "n" ? true : false} value="NSECH">NSECH</option>
                        <option disabled={editable === "n" ? true : false} value="Community">Community</option>
                        <option disabled={editable === "n" ? true : false} value="Other">Other</option>
                    </Form.Select>
                    }
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="SiteRecruitmentTarget">
                <FloatingLabel label="Site Recruitment Target">
                    <Form.Control type="text" required disabled={editable === "n" ? true : false} placeholder="Enter Site Recruitment Target" defaultValue={                                     
                                 answers[findIndex('13', answers)] ? answers[findIndex('13', answers)].answers : ''   } onChange={(e) => chooseValues(e.target.value, 'recruitmentTarget')} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="RecruitStartDate">
                <FloatingLabel label="Recruit Start Date">
                    <Form.Control type="date" required disabled={editable === "n" ? true : false} placeholder="Enter Recruit Start Date" defaultValue={                                     
                                 answers[findIndex('14', answers)] ? answers[findIndex('14', answers)].answers : ''   } onChange={(e) => chooseValues(e.target.value, 'startDate')} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="RecruitEndDate">
                <FloatingLabel label="Recruit End Date">
                    <Form.Control type="date" required disabled={editable === "n" ? true : false} placeholder="Enter Recruit End Date" defaultValue={                                     
                                 answers[findIndex('15', answers)] ? answers[findIndex('15', answers)].answers : ''   } onChange={(e) => chooseValues(e.target.value, 'endDate')} />
                </FloatingLabel>
            </Form.Group>

        </div>

    )
}

export default SectionA;