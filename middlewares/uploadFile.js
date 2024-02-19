const formidable = require("formidable");
const path = require("path");
const { CLOUD_SECRET, CLOUD_NAME, CLOUD_KEY } = require("../cloud-config");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  api_secret: CLOUD_SECRET,
  api_key: CLOUD_KEY,
  cloud_name: CLOUD_NAME,
});

// ---- fix error type file (ts)
// import { File } from "formidable"
// declare global {
//   namespace Express {
//     interface Request {
//       files: { [key: string]: File | File[] }
//     }
//   }
// }

const uploadFile = async (req, res, next) => {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(
      __dirname.substr(0, __dirname.lastIndexOf(`/`)),
      "public",
      "img"
    ),
    keepExtensions: true,
    filename: (name, ext, part, form) => {
      return `${name}_${Date.now()}${ext}`;
    },
  });

  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     next(err);
  //     return;
  //   }
  //   res.json({ fields: files });
  // });

  try {
    let [fields, files] = await form.parse(req);

    if (!req.body) req.body = {};

    for (let key in fields) {
      const value = fields[key];
      if (value) req.body[key] = value[0];
    }

    if (!req.files) req.files = {};

    for (let key in files) {
      const value = files[key];
      if (value) {
        if (value.length > 1) {
          req.files[key] = value;
        } else {
          req.files[key] = value[0];
        }
      }
    }

    next();

    // if (data) {
    //   res.json({ ok: true });
    // }
  } catch (error) {
    next(error);
    return;
  }
};

module.exports = uploadFile;
