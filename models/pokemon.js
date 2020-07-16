const mongoose = require("mongoose");

let pokemonSchema = new mongoose.Schema({
  order: Number,
  name: String,
  sprite: String,
  type1: String,
  type2: String,
  abilities: [String],
  stats: [Object],
  moves: [String],
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
