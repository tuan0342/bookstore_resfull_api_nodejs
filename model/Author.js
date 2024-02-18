const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId, // _id: 123414141414
      ref: "Book",
    },
  ],
});

let Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
