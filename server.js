const express = require("express");
const app = express();
const logger = require("morgan");
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");

require("dotenv").config();
require("./config/database");

const userRouter = require("./routes/users");
const teamRouter = require("./routes/teams");
const trainerRouter = require("./routes/trainers");
const pokemonRouter = require("./routes/pokemon");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/", trainerRouter);
app.use("/", pokemonRouter);
app.use("/", teamRouter);

app.listen(port, () => {
  console.log(`Express is listening on port ${port}.`);
});
