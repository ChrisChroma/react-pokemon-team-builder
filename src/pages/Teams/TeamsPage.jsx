import React, { useState, useEffect } from "react";

import { getAllTeams } from "../../services/teamService";

import "./TeamsPage.css";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";

export default function TrainerProfilePage() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const getAllTeamsDB = async () => {
      const res = await getAllTeams();
      const teams = await res.json();
      setTrainers(teams);
    };
    getAllTeamsDB();
  }, []);

  return (
    <div className="trainerProfile">
      <h1 className="welcomeText">Trainers!</h1>
      {trainers &&
        trainers.map((trainer) => (
          <Card title={trainer.name}>
            {trainer.teams &&
              trainer.teams.map((team) => (
                <div className="favoritesContainer">
                  <h5>Team name: {team.name}</h5>
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
                      </div>
                    ))}
                </div>
              ))}
          </Card>
        ))}
    </div>
  );
}
