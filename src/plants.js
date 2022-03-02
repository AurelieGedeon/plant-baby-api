const { connectDb } = require("./connectDb");

exports.newPlant = (req, res) => {
  if (
    !req.body.plantName ||
    req.body.scientificName ||
    req.body.water ||
    req.body.sunlight ||
    req.body.temperature ||
    req.body.temperature ||
    req.body.fertilizer ||
    req.body.humidity
  ) {
    res.status(400).send({
      success: false,
      message: "Invalid request",
    });
    return;
  }
  const newPlant = {
    plantName: req.body.plantName,
    scientificName: req.body.scientificName,
    water: req.body.water,
    humidity: req.body.humidity,
    sunlight: req.body.sunlight,
    temperature: req.body.temperature,
    medium: req.body.medium,
    fertilizer: req.body.fertilizer,
  };
  const db = connectDb();
  db.collection("plants")
    .add(newPlant)
    .then(() => res.status(200).send("New plant added"))
    .catch((err) =>
      res.status(500).send({
        sucess: false,
        message: err.message,
        error: err,
      })
    );
};