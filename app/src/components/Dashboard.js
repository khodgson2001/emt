/**
 * @author: Kieran Hodgson
 * 
 * @description: This component displays a range of statistics about the studies that are currently active. It makes use of the react-google-charts library to display the data in alternative views.
 */

import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

function Dashboard(props) {

    const [studies, setStudies] = useState([]); // array of all studies
    const [loading, setLoading] = useState(false); // boolean to check if the studies have been loaded


    let awaitingApproval = 0; // counter for studies awaiting approval
    let requiresAction = 0; // counter for studies requiring action
    let sevenDaysOld = 0; // counter for studies that have not been edited in 7 days

    //function to calculate the time since the last edit
    function calculateTimeSinceLastEdit(lastEdit) {
        //get difference between last edit and now
        var difference = new Date().getTime() - new Date(lastEdit.replace(/[-]/g, '/')).getTime();
        var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
        return daysDifference;
    }



    useEffect(() => {
        if (props.authenticated === false) {
            props.navigate('/login');
        }

        fetch("http://unn-w20002249.newnumyspace.co.uk/emt/api/studies", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }) //fetch all studies from the database
            .then((response) => response.json())
            .then((json) => {
                setStudies(json); //sets the studies array with the returned data
                setLoading(true); //sets the loading boolean to true
            })
            .catch((error) => console.error(error));
    }, []);

    //parse through the studies array and increment the counters based on the status of the study
    for (let i = 0; i < studies.length; i++) {
        if (studies[i].emt_statuses_id === "2") {
            awaitingApproval++;
        }
        else if (studies[i].emt_statuses_id === "3") {
            requiresAction++;
        }
        else if (calculateTimeSinceLastEdit(studies[i].lastEdit) > 7) {
            sevenDaysOld++;
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {loading &&
                <Container>
                    <Row md="3" sm="1">
                        <Col>
                            <Card className="bg-success" style={{ width: '100%', height: '100%' }}>
                                <Card.Body style={{ height: '100%' }}>
                                    <Card.Title >{studies.length} studies active</Card.Title>
                                </Card.Body>
                            </Card>
                            <br />
                        </Col>

                        <Col>

                            <Card className="bg-warning" style={{ width: '100%', height: '100%' }}>
                                <Card.Body>
                                    <Card.Title>{awaitingApproval} studies awaiting approval</Card.Title>
                                </Card.Body>
                            </Card>
                            <br />

                        </Col>

                        <Col>

                            <Card className="bg-danger" style={{ width: '100%', height: '100%' }}>
                                <Card.Body>
                                    <Card.Title>{requiresAction} studies requiring urgent action</Card.Title>
                                </Card.Body>
                                <br />

                            </Card>
                        </Col>
                    </Row>

                    <br />
                    <Row md="2" sm="1">
                        <Col>
                            <Card style={{ width: '100%', padding: '10px' }}>
                                <Card.Body>
                                    <Card.Title>Studies awaiting approval</Card.Title>
                                    <Chart chartType='PieChart'
                                        data={[['Status', 'Number of studies'], ['Awaiting Approval', awaitingApproval], ['Requires Action', requiresAction]]}
                                        options={{}}
                                        width='100%'
                                        height='400px' />
                                </Card.Body>
                            </Card>
                            <br />

                        </Col>
                        <Col>
                            <Card style={{ width: '100%', padding: '10px' }}>
                                <Card.Body>
                                    <Card.Title>Studies awaiting approval</Card.Title>
                                    <Chart chartType='BarChart'
                                        data={[['Status', 'Number of studies'], ['Awaiting Approval', awaitingApproval], ['Requires Action', requiresAction], ['Active', studies.length], ['Waiting for > 7 days', sevenDaysOld]]}
                                        options={{}}
                                        width='100%'
                                        height='400px' />
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            }
        </div>
    );
}

export default Dashboard;