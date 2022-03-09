const express = require("express");
const cors = require("cors");
const { addNewPlant, getPlants, getOnePlant } = require("./src/plants");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/plants", addNewPlant);

app.get("/plants", getPlants);

app.get("/plants/:plantId", getOnePlant);

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}...`);
});
