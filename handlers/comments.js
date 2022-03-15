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
  const data = req.body;
  console.log(data);

  const image = req.file ? req.file.path : " ";
  db.query(
    "INSERT INTO comments (image,projectId,userId,content) VALUES ($1,$2,$3,$4)",
    [image, data.projectId, data.userId, data.content]
  )
    .then((data) => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
};

// const get = (req, res) => {
//   db.query("SELECT * FROM comments WHERE projectId = $1", [req.params.id])
//     .then(({ rows }) => {
//       res.send(rows);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const get = (req, res) => {
  db.query(
    "SELECT comments,* ,users.name FROM comments INNER JOIN users ON comments.userId = users.id WHERE comments.projectId = $1",
    [req.params.id]
  )
    .then(({ rows }) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { upload, addComment, get };
