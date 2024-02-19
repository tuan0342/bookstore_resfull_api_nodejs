const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const formidable = require("formidable");
const { v2: cloudinary } = require("cloudinary");
const authorRoute = require("./routes/author");
const bookRouter = require("./routes/book");
const uploadFile = require("./middlewares/uploadFile");

const app = express();

// CONNECT TO DB
const db = require("./db/index");
db.connect();

// CUSTOM HANDLE ERROR
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
}

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
app.use(errorHandler);

// ROUTES
app.use("/v1/author", authorRoute);
app.use("/v1/book", bookRouter);

app.post("/upload-file-to-cloud", uploadFile, async (req, res) => {
  try {
    const { files } = req;
    const myFile = files.profileImage;

    if (Array.isArray(myFile)) {
      // multiple file upload
      const fileUploadPromise = myFile.map(async (file) => {
        const cloudRes = await cloudinary.uploader.upload(file.filepath);
        console.log(cloudRes);
      });
      await Promise.all(fileUploadPromise);
      res.json({ ok: true });
    } else {
      const cloudRes = await cloudinary.uploader.upload(myFile.filepath, {
        // resource_type: "video",
        resource_type: "image",
      });
      res.json({ ...cloudRes });
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/:publicId/delete-file-from-cloud", async (req, res) => {
  try {
    const publicId = req.params.publicId;

    const cloudRes = await cloudinary.uploader.destroy(publicId);
    res.json({ ...cloudRes });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
