const data = require("../data");

module.exports.getAllUsers = async (req, res, next) => {
  const { number, page } = req.query;
  const allUser = data.slice(0, number, page);
  res.render("home.ejs", { allUser: allUser });
};

module.exports.getRandomUser = (req, res, next) => {
  const randomUser = (data.sort(() => 0.5 - Math.random()).slice(0, 1));
  res.render("home.ejs", { allUser: randomUser });
};

module.exports.addUser = async (req, res, next) => {
  const { name, gender, photoUrl, contact, address } = req.body;
  if (name && gender && photoUrl && contact && address) {
    await data.push(req.body);
  }
  else{
    console.log("Pleas Provide all required data")
  }
  res.json(data);
};

module.exports.detailsUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const foundUser = await data.find((user) => user.id === Number(id));
  res.send(foundUser);
};

module.exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const newUser = await data.find((user) => user.id === Number(id));
  newUser.id = Number(id);
  newUser.name = req.body.name;
  res.send(newUser);
};

module.exports.updateUserData = async (req, res, next) => {
  const { id } = req.params;
  const newUser = await data.find((user) => user.id === Number(id));
  newUser.id = Number(id);
  const { name, gender, photoUrl, contact, address } = req.body;
  if (name && gender && photoUrl && contact && address) {
    newUser.name = name;
    newUser.gender = gender;
    newUser.photoUrl = photoUrl;
    newUser.contact = contact;
    newUser.address = address;
  }
  res.send(newUser);
};

module.exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const filter = { _id: id };
  const newUser = await data.filter((user) => user.id !== Number(id));
  res.send(newUser);
};