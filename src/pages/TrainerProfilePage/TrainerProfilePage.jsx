import React, { useState } from "react";
import { createTeam } from "../../services/teamService";

export default function TrainerProfilePage({ name, team, email }) {
  const [teamName, setTeamName] = useState(null);

  const handleChange = (event) => {
    console.log(event.target.value);
    setTeamName(event.target.value);
  };

  const handleCreateTeam = async (event) => {
    event.preventDefault();
    await createTeam(teamName, email);
  };

  return (
    <div>
      <form onSubmit={handleCreateTeam}>
        <label htmlFor="teamName">Team Name:</label>
        <input
          id="teamName"
          onChange={handleChange}
          value={teamName}
          type="text"
        />
        <button type="submit">Create Team</button>
      </form>
      <ul>{team && team.map((pokemon) => <li>{pokemon.name}</li>)}</ul>
    </div>
  );
}
