import React, { useState, useEffect } from "react";
import {
  createTeam,
  deleteTeam,
  getFavorites,
} from "../../services/teamService";
import { removePokemonFromFavorite } from "../../services/teamService";

import { getTeams, removePokemonFromTeam } from "../../services/trainerService";

import "./TrainerProfilePage.css";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";

export default function TrainerProfilePage({ name, team, email, _id }) {
  const [teamName, setTeamName] = useState(null);
  const [favoritesState, setFavoritesState] = useState([]);
  const [teamsState, setTeamsState] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      const res = await getFavorites(_id);
      const favorites = await res.json();
      setFavoritesState(JSON.parse(favorites));
    };
    getPokemon();

    const getTeamsFromDb = async () => {
      const res = await getTeams(_id);
      const teams = await res.json();

      setTeamsState(teams);
    };
    getTeamsFromDb();
  }, [_id]);

  const handleChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleCreateTeam = async (event) => {
    event.preventDefault();
    await createTeam(teamName, email);
    setTeamsState([...teamsState, { name: teamName, pokemon: [] }]);
  };

  const handleRemoveTeam = async (event, teamId) => {
    event.preventDefault();
    console.log(teamId);
    await deleteTeam(teamId, _id);
    setTeamsState(teamsState.filter((team) => team._id !== teamId));
  };

  const handleRemoveFavorite = async (pokemonId) => {
    const res = await removePokemonFromFavorite(pokemonId, email);
  };

  const handleRemovePokemonFromTeam = async (teamId, pokemonId) => {
    const res = await removePokemonFromTeam(teamId, pokemonId, email);
  };

  const handleDeleteTeam = async (event) => {
    event.preventDefault();
    await deleteTeam(teamName, email);
  };

  return (
    <div className="trainerProfile">
      <h1 className="welcomeText">Hey {name}!</h1>
      <Card title="Favorite Pokemon">
        <div className="favoritesContainer">
          {favoritesState.length > 0 &&
            favoritesState.map((favorite) => (
              <div className="pokemonContainer">
                <div>
                  <Link to={`/pokemon/${favorite._id}`}>
                    <img
                      height="150"
                      width="150"
                      src={favorite.sprite}
                      alt=""
                    />
                  </Link>
                </div>
                <button
                  className="btn waves-effect waves-light"
                  onClick={() => handleRemoveFavorite(favorite._id)}
                >
                  <i className="material-icons delete">delete</i>
                </button>
              </div>
            ))}
        </div>
      </Card>
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
      <div>
        <h2>Your Teams:</h2>
        {teamsState &&
          teamsState.map((team) => (
            <Card
              title={
                <div>
                  {team.name}{" "}
                  <button
                    style={{ marginLeft: "32px" }}
                    className="waves-effect waves-light btn-small darken-4"
                    type="submit"
                    name="action"
                  >
                    Change Name
                  </button>
                  {team.pokemon && team.pokemon.length < 6 && (
                    <Link
                      to={{
                        pathname: "/",
                        state: { teamId: team._id },
                      }}
                      className="waves-effect waves-light btn-small blue darken-1"
                    >
                      Add Pokemon
                    </Link>
                  )}
                  <button
                    className="waves-effect waves-light btn-small red lighten-1"
                    onClick={(event) => handleRemoveTeam(event, team._id)}
                  >
                    Remove Team
                  </button>
                </div>
              }
            >
              <div className="favoritesContainer">
                {team.pokemon.length > 0 &&
                  team.pokemon.map((pokemon) => (
                    <div className="pokemonContainer">
                      <div>
                        <Link to={`/pokemon/${pokemon._id}`}>
                          <img
                            height="150"
                            width="150"
                            src={pokemon.sprite}
                            alt=""
                          />
                        </Link>
                      </div>
                      <button
                        className="btn waves-effect waves-light"
                        onClick={() =>
                          handleRemovePokemonFromTeam(team._id, pokemon._id)
                        }
                      >
                        <i className="material-icons delete">delete</i>
                      </button>
                    </div>
                  ))}
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
