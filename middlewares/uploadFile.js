const formidable = require("formidable");
const path = require("path");

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
    let data = await form.parse(req);
    console.log(">>> ", data);
    if (data) {
      res.json({ ok: true });
    }
  } catch (error) {
    next(error);
    return;
  }
};

module.exports = uploadFile;
