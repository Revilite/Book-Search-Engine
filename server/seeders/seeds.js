const db = require("../config/connection");
const { User } = require("../models");

db.once("open", async () => {
  try{
    await User.deleteMany({});
    await User.create({username: "Revilite", email: "procoder165@gmail.com", password: "mrbutterman"});

    console.log("DB seeded");
    process.exit(0);
  }
  catch (err) {
    throw err;
  }
})