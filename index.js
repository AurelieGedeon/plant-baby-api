const express = require("express");
const cors = require("cors");
const { addNewPlant } = require("./src/plants");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/plants", addNewPlant);

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}...`);
});
