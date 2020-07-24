import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PokedexPage.css";

import { getPokemonDetails } from "../../services/pokemon-api";
import {
  addPokemonToTeam,
  addPokemonToFavorite,
  removePokemonFromFavorite,
} from "../../services/teamService";

const PokedexPage = ({ match, email, user, location, history }) => {
  const [pokemon, setPokemon] = useState(null);
  const [userState, setUserState] = useState(user);

  useEffect(() => {
    (async () => {
      const pokemon = await getPokemonDetails(match.params.idx);
      setPokemon(pokemon.pokemon);
    })();
  }, [match.params.idx]);

  const handleAddTeam = async () => {
    console.log(history);
    const res = await addPokemonToTeam(
      location.state.teamId,
      pokemon._id,
      email
    );
    history.push("/trainer/");
  };

  const handleAddFavorite = async () => {
    console.log(history);
    const res = await addPokemonToFavorite(pokemon._id, email);
    const favorites = JSON.parse(await res.json());
    setUserState({
      ...userState,
      favorites,
    });
    history.push("/trainer/");
  };

  const handleRemoveFavorite = async () => {
    const res = await removePokemonFromFavorite(pokemon._id, email);
    const favorites = JSON.parse(await res);
    setUserState({
      ...userState,
      favorites,
    });
    history.push("/trainer/");
  };

  return (
    <div className="PokemonPage">
      {pokemon ? (
        <>
          <div className="PokemonPage-image">
            <span>
              <img height="250" src={pokemon.sprite} alt="" />
            </span>
          </div>
          <div>
            {location.state && location.state.teamId && (
              <button onClick={() => handleAddTeam(location.state.teamId)}>
                Add to Team
              </button>
            )}
            <button
              onClick={
                userState.favorites.some(
                  (favoritePokemon) => String(pokemon._id) === favoritePokemon
                )
                  ? handleRemoveFavorite
                  : handleAddFavorite
              }
            >
              {userState.favorites.some(
                (favoritePokemon) => String(pokemon._id) === favoritePokemon
              )
                ? "Remove from favorites"
                : "Add to favorites"}
            </button>
          </div>
          <div className="PokemonPage-pokemon">
            <span>Name:</span>
            <span>{pokemon.name}</span>
            <span>Type(s):</span>
            <span>
              <div>{pokemon.type1}</div>
              <div>{pokemon.type2}</div>
            </span>
            <span>Abilities:</span>
            <span>
              {pokemon.abilities.map((ability) => (
                <div>{ability}</div>
              ))}
            </span>
            <span>Stats:</span>
            <span>
              {pokemon.stats.map((stat) => (
                <div>
                  {stat.name} {stat.stat}
                </div>
              ))}
            </span>
            <Link to="/">Back to Index</Link>
          </div>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};
export default PokedexPage;
