const Users = require("../models/Users"); //import table (models)
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken"); //import jwt installed
dotenv.config();
const secretKey = process.env.JWT_SECRET;
const { validator } = require("../Utils/Command");

module.exports = {
  get: async (req, res) => {
    const all = await Users.findAll();
    return res.send(all);
  },
  register: async (req, res) => {
    const validationError = validator(req);
    if (validationError) {
      return res.status(500).json({ errors: validationError });
    }
    const { name, username, password, role } = req.body;
    const newuser = await Users.create({
      name: name,
      username: username,
      password: password,
      role: role,
    });
    return res.status(200).json({ message: "User Created" });
  },
  login: async (req, res) => {
    const { username, password } = req.body; //from the frontend
    const loginuser = await Users.findOne({
      where: {
        username: username,
        password: password,
      },
      attributes: {
        exclude: ["password", "deletedAt"],
      },
    });
    if (!loginuser) {
      return res.status(404).json({ message: "Incorrect credentials" });
    }
    //stores user id inside JWT
    const payload = {
      id: loginuser.id,
    };
    const tkn = jwt.sign(payload, secretKey); //sign to encode payload using secretkey
    //store JWT in the cookies for the frontend
    res.cookie("token", tkn, {
      httpOnly: true, //only accessible by the backend
      secure: true, //for the ssl certificate (works in https environmnets)
      sameSite: "Strict",
      maxAge: 900000, //expiration date
    });
    return res
      .status(200)
      .json({ message: "Logged in successfully", token: tkn, user: loginuser });
  },
  getUser: async (req, res) => {
    const { token } = req.body;
    //verify that this token was generated by our backend (decode)
    const verify = jwt.verify(token, secretKey);
    if (verify) {
      const user = await Users.findByPk(verify.id);
      if (!user) {
        return res.status(404).json({ message: "user info not found" });
      }
      return res.status(200).json({ message: "user info found", user: user });
    } else {
      return res.status(401).json({ message: "error in verfying token" });
    }
  },
};
