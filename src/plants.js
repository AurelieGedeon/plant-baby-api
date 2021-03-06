const { connectDb } = require("./connectDb");

exports.addNewPlant = (req, res) => {
  if (
    !req.body.plantName ||
    !req.body.scientificName ||
    !req.body.water ||
    !req.body.sunlight ||
    !req.body.temperature ||
    !req.body.fertilizer ||
    !req.body.medium ||
    !req.body.humidity ||
    !req.body.repot ||
    !req.body.isFavorite
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
    repot: req.body.repot,
    image: req.body.image,
    isFavorite: false,
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

exports.getPlants = (req, res) => {
  const db = connectDb();
  db.collection("plants")
    .get()
    .then((snapshot) => {
      const plantList = snapshot.docs.map((doc) => {
        let plant = doc.data();
        plant.id = doc.id;
        return plant;
      });
      res.send(plantList);
    })
    .catch((err) => res.status(500).send(err));
};

exports.getOnePlant = (req, res) => {
  const db = connectDb();
  const { plantId } = req.params;
  db.collection("plants")
    .doc(plantId)
    .get()
    .then((doc) => {
      let singlePlant = doc.data();
      res.status(200).send(singlePlant);
    })
    .catch((err) => res.staus(500).send(err));
};

exports.updateFavorites = (req, res) => {
  const db = connectDb();
  const favorite = req.body.isFavorite;
  db.collection("plants")
    .doc(req.params.plantId)
    .update({ isFavorite: favorite })
    .then((doc) => res.status(202).send(doc))
    .catch((err) => res.status(500).send(err));
};
