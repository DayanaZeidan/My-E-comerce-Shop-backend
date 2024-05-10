const multer = require("multer");
//to check if the user's role allow him to do an action
const auth = (roles) => {
  return async (req, res, next) => {
    const { role } = req.body;
    if (!roles.includes(role)) {
      return res
        .status(401)
        .json({ message: "you're not authorized to perform this action" });
    }
    next();
  };
};



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  enctype: "multipart/form-data" //encoding type
});
module.exports = { auth, upload };
