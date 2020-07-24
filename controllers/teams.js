const Pokemon = require("../models/pokemon");
const Trainer = require("../models/user");

async function remove(req, res) {
  console.log("req.params", req.params);
  const trainer = await Trainer.findOne({ _id: req.params.trainerId });
  trainer.team = trainer.team.filter(
    (team) => String(team._id) !== String(req.params.teamId)
  );
  console.log(trainer);
  trainer.save();
  res.sendStatus(200);
}

async function updateName(req, res) {
  const trainer = await Trainer.findOne({ email: req.user.email });
  let team = trainer.team.id(req.params.teamId);
  team.name = req.body.name;
  console.log("req.body", req.body);
  trainer.save();
  res.redirect("/trainers");
}

async function getTeams(req, res) {
  const trainerDocuments = await Trainer.find({});
  const trainerPromises = trainerDocuments.map(async (trainer) => {
    const team = trainer.team.map(async (team) => {
      const pokemonPromises = await team.pokemon.map(async (pokemonId) => {
        const pokemonDocument = Pokemon.findOne({ _id: pokemonId });
        return (await pokemonDocument).toObject();
      });
      const pokemon = await Promise.all(pokemonPromises);

      return {
        _id: team._id,
        name: team.name,
        pokemon: pokemon,
      };
    });
    return {
      name: trainer.name,
      avatar: trainer.avatar,

      teams: await Promise.all(team),
    };
  });

  const trainers = await Promise.all(trainerPromises);
  res.status(200).json(trainers);
}

module.exports = {
  getTeams,
  remove,
  updateName,
};
