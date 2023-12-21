import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../utilities';

const GamesTable = ({ teamId, user, setGameLocation }) => {
  const [games, setGames] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editGameData, setEditGameData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGameData, setNewGameData] = useState({
    league: '',
    home_team: '', 
    away_team: '',
    game_date: '',
    location: '',
  });

  const fetchTeamGames = async () => {
    try {
      const response = await api.get(`http://localhost:8000/api/v1/games/team-games/${teamId}/`);
      setGames(response.data);
      if (response.data && response.data.length > 0) {
        setGameLocation(response.data[0].location);
        console.log("Setting game location in GamesTable:", response.data[0].location);
      }
    } catch (error) {
      console.error("Error fetching team games:", error);
    }
  };

  useEffect(() => {
    fetchTeamGames();
  }, [teamId]);

  const isCoach = user && user.role === 'coach';

  const handleEditClick = (game) => {
    console.log("Editing game data:", game);
    setEditGameData(game);
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    if (!editGameData.id) {
      console.error("No game ID found for editing");
      return;
    }
    try {
      await api.post(`http://localhost:8000/api/v1/games/edit-game/${editGameData.id}/`, {
        game_date: editGameData.game_date,
        location: editGameData.location
      });
      setShowEditModal(false);
      fetchTeamGames(); // Refresh the games list after editing
    } catch (error) {
      console.error("Error updating game schedule:", error);
    }
  };

  const handleDeleteGame = async () => {
    if (!editGameData.id) {
      console.error("No game ID found for deletion");
      return;
    }
    try {
      await api.delete(`http://localhost:8000/api/v1/games/delete-game/${editGameData.id}/`);
      setShowEditModal(false);
      fetchTeamGames(); // Refresh the games list after deletion
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const handleAddGame = async () => {
    const gameData = {
        ...newGameData,
        league: parseInt(newGameData.league),
        home_team: parseInt(newGameData.home_team),
        away_team: parseInt(newGameData.away_team)
    };

    try {
        await api.post('http://localhost:8000/api/v1/games/add-game/', gameData);
        setShowAddModal(false);
        fetchTeamGames(); // Refresh the games list after adding a new game
    } catch (error) {
        console.error("Error adding new game:", error);
    }
};
  
  const handleModalChange = (e) => {
    setEditGameData({ ...editGameData, [e.target.name]: e.target.value });
  };

  const handleNewModalChange = (e) => {
    setNewGameData({ ...newGameData, [e.target.name]: e.target.value });
  };

  
  return (
    <>
      <Row>
        <Col>
          <h2>Team Schedule</h2>
        </Col>
        <Col className="text-right">
          <Button onClick={() => setShowAddModal(true)}>Add New Game</Button>
        </Col>
      </Row>

{/* Add Game Modal */}
{showAddModal && (
  <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Add New Game</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Home Team ID</Form.Label>
          <Form.Control 
            type="integer"
            name="home_team"
            value={newGameData.home_team}
            onChange={handleNewModalChange}
            placeholder="Enter Home Team ID"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Away Team ID</Form.Label>
          <Form.Control 
            type="integer"
            name="away_team"
            value={newGameData.away_team}
            onChange={handleNewModalChange}
            placeholder="Enter Away Team ID"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Game Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="game_date"
            value={newGameData.game_date}
            onChange={handleNewModalChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={newGameData.location}
            onChange={handleNewModalChange}
            placeholder="Enter Location"
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
      <Button variant="primary" onClick={handleAddGame}>Add Game</Button>
    </Modal.Footer>
  </Modal>
)}

      <Table striped hover>
        <thead>
          <tr>
            <th>League ID</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Game Date</th>
            <th>Location</th>
            {isCoach && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={index}>
              <td>{game.league}</td>
              <td>{game.home_team}</td>
              <td>{game.away_team}</td>
              <td>{new Date(game.game_date).toLocaleString()}</td>
              <td>{game.location}</td>
              {isCoach && (
                <td>
                  <Button onClick={() => handleEditClick(game)}>Edit</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Game Schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Game Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="game_date"
                  value={new Date(editGameData.game_date).toISOString().slice(0, -1)}
                  onChange={handleModalChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={editGameData.location}
                  onChange={handleModalChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDeleteGame}>Delete</Button>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default GamesTable;