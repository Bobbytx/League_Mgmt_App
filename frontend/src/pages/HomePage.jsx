import Features from '../components/Features';
import { Container, Row, Col } from 'react-bootstrap';
import heroImage from '../assets/images/hero2.jpg';

export const HomePage = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="image-overlay-container">
              <img src={heroImage} className="img-fluid" alt="Baseball field" />
              <div className="red-overlay"></div>
              <div className="overlay-text">
                <h1>Welcome to your League Manager</h1>
                <p>Manage your league efficiently</p>
              </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Features />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
