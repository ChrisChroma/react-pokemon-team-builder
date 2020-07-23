import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PokedexPage.css";

import { getPokemonDetails } from "../../services/pokemon-api";
import {
  addPokemonToTeam,
  addPokemonToFavorite,
  removePokemonFromFavorite,
} from "../../services/teamService";

const PokedexPage = ({ match, email, user }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    (async () => {
      const pokemon = await getPokemonDetails(match.params.idx);
      setPokemon(pokemon);
    })();
  }, [match.params.idx]);

  const handleAddTeam = async () => {
    const res = addPokemonToTeam(pokemon.id);
    console.log("res", res);
  };

  const handleAddFavorite = async () => {
    const res = addPokemonToFavorite(pokemon.id);
    console.log("res", res);
  };

  const handleRemoveFavorite = async () => {
    const res = removePokemonFromFavorite(pokemon.id);
    console.log("res", res);
  };

  return (
    <div className="PokemonPage">
      {pokemon ? (
        <>
          <div className="PokemonPage-image">
            <span>
              <img height="250" src={pokemon.sprites.front_default} alt="" />
            </span>
          </div>
          <div>
            <button onClick={handleAddTeam}>Add to Team</button>
            <button
              onClick={
                user.favorites.find((pokemon) => pokemon.id)
                  ? handleRemoveFavorite
                  : handleAddFavorite
              }
            >
              Favorite
            </button>
          </div>
          <div className="PokemonPage-pokemon">
            <span>Name:</span>
            <span>{pokemon.name}</span>
            <span>Type(s):</span>
            <span>
              {pokemon.types.map((type) => (
                <div key={type.type.name}>{type.type.name}</div>
              ))}
            </span>
            <span>Base Experience:</span>
            <span>{pokemon.base_experience}</span>
            <span>Height:</span>
            <span>{pokemon.height}</span>
            <span>Weight:</span>
            <span>{pokemon.weight}</span>
            <span>Abilities:</span>
            <span>
              {pokemon.abilities.map((ability) => (
                <div key={ability.ability.name}>{ability.ability.name}</div>
              ))}
            </span>
            <span>Speed:</span>
            <span>{pokemon.stats[0].base_stat}</span>
            <span>Special-Defense:</span>
            <span>{pokemon.stats[1].base_stat}</span>
            <span>Special-Attack:</span>
            <span>{pokemon.stats[2].base_stat}</span>
            <span>Defense:</span>
            <span>{pokemon.stats[3].base_stat}</span>
            <span>Attack:</span>
            <span>{pokemon.stats[4].base_stat}</span>
            <span>HP:</span>
            <span>{pokemon.stats[5].base_stat}</span>
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
