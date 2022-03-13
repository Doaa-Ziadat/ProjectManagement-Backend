const db = require("../database/connection");

const multer = require("multer");
const path = require("path");

// upload image / file

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");
// multiply:  .array('images',3)

const addComment = (req, res) => {
  // req.files.path for multiply files
  db.query("INSERT INTO comments (image) VALUES ($1)", [req.file.path])
    .then((data) => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

const get = (req, res) => {
  db.query("SELECT * FROM comments")
    .then(({ rows }) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { upload, addComment, get };
