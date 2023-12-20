import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import GamesTable from '../components/GamesTable';
import { useOutletContext } from 'react-router-dom';
import TeamPlayers from '../components/TeamPlayers';

// import CommunicationHubCard from './CommunicationHubCard';

const DashboardPage = () => {
  
  const { user, setUser } = useOutletContext(); 
  const [teamId, setTeamId] = useState(null);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [teamName, setTeamName] = useState(''); 


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
          <h1 className="text-center">{'Team Dashboard - teamName' || 'Team Dashboard'}</h1>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          {teamId ? (
            <GamesTable teamId={teamId} user={user}/>
          ) : (
            <Spinner animation="border" />
          )}
        </Col>
        <Col md={6}>
          {teamId ? (
            <TeamPlayers players={teamPlayers} />
          ) : (
            <Spinner animation="border" />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;


