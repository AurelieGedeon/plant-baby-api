const express = require("express");
const cors = require("cors");
const {
  addNewPlant,
  getPlants,
  getOnePlant,
  updateFavorites,
} = require("./src/plants");

const { addUser, getUser, updateUser } = require("./src/users");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/plants", addNewPlant);
app.get("/plants", getPlants);
app.get("/plants/:plantId", getOnePlant);
app.patch("/plants/:plantId", updateFavorites);

app.post("/users", addUser);
app.get("users/:userId", getUser);
app.patch("users/:userId", updateUser);

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}...`);
});
