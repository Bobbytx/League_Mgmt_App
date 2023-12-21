import React from 'react';
import { Table } from 'react-bootstrap';

const TeamPlayers = ({ players }) => {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Player Name</th>
          <th>Position</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr key={index}>
            <td>{player.player_name ? player.player_name : 'Unnamed Player'}</td>
            <td>{player.position ? player.position : 'N/A'}</td>
            <td>{player.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TeamPlayers;
