const Book = require("../model/Book");
const Author = require("../model/Author");

const bookController = {
  // ADD A BOOK
  addABook: async (req, res, next) => {
    try {
      const newBook = new Book(req.body);
      const savedBook = await newBook.save();
      if (req.body.author) {
        const author = Author.findById(req.body.author);
        await author.updateOne({
          $push: { books: savedBook._id },
        });
      }
      res.status(200).json(savedBook);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET ALL BOOKS
  getAllBooks: async (req, res, next) => {
    try {
      const allBooks = await Book.find();
      res.status(200).json(allBooks);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET A BOOK
  getABooks: async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id).populate("author");
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // UPDATE A BOOK
  updateBook: async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
      await book.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE A BOOK
  deleteBook: async (req, res, next) => {
    try {
      await Author.updateMany(
        { books: req.params.id }, // tìm những cuốn sách của 'author' đó.
        { $pull: { books: req.params.id } } // xóa cuốn sách đó khỏi trường 'books' của 'author'
      );
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = bookController;
