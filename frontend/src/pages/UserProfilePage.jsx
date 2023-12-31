import React from 'react';
import { Container, Row, Col, Card, ListGroup, Image } from 'react-bootstrap';

const UserProfilePage = ({ user }) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mt-4">
            <Card.Body>
              <Row>
                <Col md={4} className="text-center">
                  <Image 
                    src={"holder.js/100px180"} 
                    roundedCircle 
                    style={{ width: '150px', height: '150px' }} 
                    alt="Profile" 
                  />
                </Col>
                <Col md={8}>
                  <h3>{user.name}</h3>
                  <p>{user.title}</p>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                    <ListGroup.Item>Phone: {user.phone}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Header>User Settings</Card.Header>
            <Card.Body>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
