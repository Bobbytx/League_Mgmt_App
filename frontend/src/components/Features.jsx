import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import catCoach from '../assets/images/cat_coach.png';
import catCommish from '../assets/images/cat_commish.png';
import catPlayer from '../assets/images/cat_player.png';

const Features = () => {
  return (
    <Container fluid id="features">
      <h2>Features</h2>
      <Row>
        <Col>
          <Card>
            <Card.Img variant="top" src={catCommish} />
            <Card.Body>
              <Card.Title>Create A League</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Commisioners</Card.Subtitle>
              <Card.Text>
                As a league commissioner, you have the power to create and manage leagues effortlessly
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={catCoach} />
            <Card.Body>
              <Card.Title>Manage Your Team</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Coaches</Card.Subtitle>
              <Card.Text>Take charge of your team's journey to victory with our platform.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={catPlayer} />
            <Card.Body>
              <Card.Title>View Your Schedule and Stats</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Players</Card.Subtitle>
              <Card.Text>Join the action and play your heart out with our user-friendly platform.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Container>
  );
};

export default Features;
