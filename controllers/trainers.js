const Trainer = require("../models/user");
const Pokemon = require("../models/pokemon");

async function getTrainerTeams(req, res) {
  const trainerDocuments = await Trainer.find({ _id: req.params.trainerId });
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
  res.status(200).json(trainers[0].teams);
}

async function createTeam(req, res) {
  try {
    const trainer = await Trainer.findOne({ email: req.body.email });
    trainer.team.push({ name: req.body.name, pokemon: [] });
    trainer.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
}

async function addToTeam(req, res) {
  const trainer = await Trainer.findOne({ email: req.body.email });
  const team = trainer.team.id(req.params.teamId);
  const pokemon = await Pokemon.findOne({ _id: req.params.pokemonId });
  team.pokemon.push(pokemon._id);
  trainer.save();
}

async function deleteFromTeam(req, res) {
  const trainer = await Trainer.findOne({ email: req.body.email });
  const team = trainer.team.id(req.params.teamId);
  team.pokemon = team.pokemon.filter(
    (favorite) => String(favorite) !== req.params.pokemonIdx
  );
  trainer.save();
  res.sendStatus(200);
}

async function addToFavorites(req, res) {
  const trainer = await Trainer.findOne({ email: req.body.email });
  const pokemon = await Pokemon.findOne({ _id: req.params.pokemonId });
  trainer.favorites.push(pokemon._id);
  trainer.save();
  res.status(200).json(JSON.stringify(trainer.favorites));
}

async function getFavorites(req, res) {
  console.log("req.params", req.params);
  const trainer = await Trainer.findOne({ _id: req.params.trainerId });
  const pokemonPromises = trainer.favorites.map(async (favorite) => {
    const pokemonDocument = Pokemon.findOne({ _id: favorite });
    return (await pokemonDocument).toObject();
  });
  const pokemon = await Promise.all(pokemonPromises);

  res.status(200).json(JSON.stringify(pokemon));
}

async function deleteFromFavorites(req, res) {
  console.log("trainers/deleteFromFavorites");
  const trainer = await Trainer.findOne({ email: req.body.email });
  trainer.favorites = trainer.favorites.filter(
    (favorite) => String(favorite) !== req.params.pokemonIdx
  );
  trainer.save();
  res.status(200).json(JSON.stringify(trainer.favorites));
}

async function addToFavorites(req, res) {
  console.log("trainers/addToFavorites");
  const trainer = await Trainer.findOne({ email: req.body.email });
  const team = trainer.team.id(req.params.teamId);
  const pokemon = await Pokemon.findOne({ _id: req.params.pokemonId });
  team.pokemon.push(pokemon._id);
  trainer.save();
}

async function deleteFromFavorites(req, res) {
  console.log("trainers/deleteFromFavorites");
  const trainer = await Trainer.findOne({ email: req.user.email });
  const team = trainer.team.id(req.params.teamId);
  console.log("team", team);
  team.pokemon.splice(req.params.pokemonIdx, 1);
  console.log("req.params.pokemonIdx", req.params.pokemonIdx);
  trainer.save();
  res.redirect("/trainers");
}

async function index(req, res, next) {
  console.log("trainers/index");
  const trainer = await Trainer.findOne({ email: req.user.email });
  const teams = await trainer.team.map(async (team) => {
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

  if (!trainer) {
    res.redirect("/");
  } else {
    res.render("trainers/index", {
      user: trainer,
      teams: await Promise.all(teams),
    });
  }
}

module.exports = {
  index,
  addToTeam,
  deleteFromTeam,
  createTeam,
  addToFavorites,
  deleteFromFavorites,
  getFavorites,
  getTrainerTeams,
};
