const { FieldPath, FieldValue } = require("firebase-admin/firestore");
const { connectDb } = require("./connectDb");

exports.addUser = (req, res) => {
  const db = connectDb();
  db.collection("users")
    .doc(req.body.uid)
    .set({
      userId: req.body.uid,
      favorites: [],
    })
    .then(res.send("User Added"))
    .catch((err) => res.status(500).send(err));
};

exports.getUser = (req, res) => {
  const { userId } = req.params;
  const db = connectDb();
  db.collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      const user = doc.data();
      res.send(user);
    })
    .catch((err) => res.status(500).send(err));
};

exports.getUserFavorites = (req, res) => {
  const db = connectDb();
  const { userId } = req.params;
  db.collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      const user = doc.data();

      if (!user) {
        res.status(400).send("Bad Request");
        return;
      }

      if (user.favorites?.length == 0) {
        res.send([]);
        return;
      }

      db.collection("plants")
        .where(FieldPath.documentId(), "in", user.favorites)
        .get()
        .then((snapshot) => {
          const favoritesList = snapshot.docs.map((doc) => {
            let plant = doc.data();
            plant.id = doc.id;
            return plant;
          });
          res.send(favoritesList);
        });
    })
    .catch((err) => res.status(500).send(err));
};

exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const { plantId, isFavorite } = req.body;

  const db = connectDb();
  let query = db.collection("users").doc(userId);

  if (isFavorite) {
    query = query.update({ favorites: FieldValue.arrayUnion(plantId) });
  } else {
    query = query.update({ favorites: FieldValue.arrayRemove(plantId) });
  }

  query
    .then(res.send("User updated successfully"))
    .catch((err) => res.status(500).send(err));
};
