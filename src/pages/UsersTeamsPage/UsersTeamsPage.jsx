import React from "react";

export default function UsersTeamsPage({ match, email }) {
  useEffect(() => {
    (async () => {
      const pokemon = await getUserTeams(match.params.idx);
      setPokemon(pokemon);
    })();
  }, [match.params.idx]);

  return (
    <div>
      {user.forEach((user) => {
        return (
        <div className="card horizontal">
          <div className="card-content">
            <span className="card-title">{team.name}</span>
          </div>
        </div>
        )
      }}
    </div>
  );
}
