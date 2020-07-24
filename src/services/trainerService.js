const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export async function getTeams(trainerId) {
  return fetch(`${BASE_URL}/trainers/${trainerId}/teams`, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
  });
}

export async function removePokemonFromTeam(teamId, pokemonId, email) {
  return fetch(`${BASE_URL}/trainers/teams/remove/${teamId}/${pokemonId}`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      email,
    }),
  });
}
