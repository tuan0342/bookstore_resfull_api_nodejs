const Author = require("../model/Author");
const Book = require("../model/Book");

const authorController = {
  // ADD AUTHOR
  addAuthor: async (req, res, next) => {
    try {
      const newAuthor = new Author(req.body);
      const savedAuthor = await newAuthor.save();
      res.status(201).json(savedAuthor);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET ALL AUTHOR
  getAllAuthor: async (req, res, next) => {
    try {
      const authors = await Author.find();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET AN AUTHOR
  getAnAuthor: async (req, res, next) => {
    try {
      const author = await Author.findById(req.params.id).populate("books");
      res.status(200).json(author);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // UPDATE AUTHOR
  updateAuthor: async (req, res, next) => {
    try {
      const author = await Author.findById(req.params.id);
      await author.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE AUTHOR
  deleteAuthor: async (req, res, next) => {
    try {
      await Book.updateMany(
        { author: req.params.id }, // tìm author có params.id
        { author: null } // xóa tác giả đó khỏi 'book'
      );
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authorController;
