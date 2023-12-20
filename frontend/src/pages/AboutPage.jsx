import React from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';

function Dashboard() {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Sporting League Manager</h1>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <h2>Game Schedule</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Home Team</th>
                <th>Away Team</th>
                <th>Date/Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {/* Populate with game schedule data */}
            </tbody>
          </Table>
        </Col>
        <Col lg={6}>
          <h2>Team Roster</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Position</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {/* Populate with team roster data */}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Weather</Card.Title>
              {/* Weather component or API integration */}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Game Location Map</Card.Title>
              {/* Map component or API integration */}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Coach Communication Hub</Card.Title>
              {/* Chat or messaging component */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
