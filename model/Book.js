const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: { type: String, required: true },
  publishedDate: { type: String },
  genres: { type: [String] },
  author: {
    type: mongoose.Schema.Types.ObjectId, // _id: 123414141414
    ref: "Author",
  },
});

let Book = mongoose.model("Book", BookSchema);

module.exports = Book;
