import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Card} from 'react-bootstrap';
import GamesTable from '../components/GamesTable';
import { useOutletContext } from 'react-router-dom';
import TeamPlayers from '../components/TeamPlayers';
import Weather from '../components/Weather';
import GameMap from '../components/GameMap';

// import CommunicationHubCard from './CommunicationHubCard';

const DashboardPage = () => {
  
  const { user, setUser } = useOutletContext(); 
  const [teamId, setTeamId] = useState(null);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [teamName, setTeamName] = useState(''); 
  const [gameLocation, setGameLocation] = useState('');


useEffect(() => {
  const fetchTeamDetails = async () => {
    try {
      if (user) {
        const response = await axios.get('http://localhost:8000/api/v1/users/team/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        console.log(response.data); 
        setTeamId(response.data.teamId);
        setTeamName(response.data.teamName);
      }
    } catch (error) {
      console.error("Error fetching team details:", error);
    } 
  };

  fetchTeamDetails();
}, [user]);

const fetchTeamPlayers = async () => {
  if (!teamId) return;

  try {
    const response = await axios.get(`http://localhost:8000/api/v1/teams/${teamId}/players`, {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    });
    setTeamPlayers(response.data); 
  } catch (error) {
    console.error("Error fetching team players:", error);
  }
};

useEffect(() => {
  fetchTeamPlayers();
}, [teamId]);


return (
  <Container fluid>
    <Row className="mb-4">
      <Col>
        <h1 className="text-center">{teamName || 'Team Dashboard'}</h1>
      </Col>
    </Row>

    <Row className="mb-2">
        <Col lg={6}>
          <Card className="h-100">
            <Card.Body>
              {teamId ? (
                <GamesTable teamId={teamId} user={user} setGameLocation={setGameLocation} />
              ) : (
                <Spinner animation="border" />
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="h-100">
            <Card.Body>
              <h2>Team Roster</h2>
              {teamId ? (
                <TeamPlayers players={teamPlayers} />
              ) : (
                <Spinner animation="border" />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

    <Row>
      <Col lg={4} className="mb-4">
        <Card>
          <Card.Body>
            <Card.Title>Weather</Card.Title>
                <Weather teamId={teamId} />
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} className="mb-4">
        <Card>
          <Card.Body>
            <Card.Title>Upcoming Game Location Map</Card.Title>
                <GameMap location={gameLocation} />
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} className="mb-4">
        <Card>
          <Card.Body>
            <Card.Title>Coach Communication Hub</Card.Title>
            <p> Coming Soon... </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
};

export default DashboardPage;


