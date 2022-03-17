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

exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const favorites = req.body.favorites;
  const db = connectDb();
  db.collection("users")
    .doc(userId)
    .update({ favorites: favorites })
    .then(res.send("User updated successfully"))
    .catch((err) => res.status(500).send(err));
};
