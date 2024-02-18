const bookController = require("../controllers/bookController");
const express = require("express");
const router = express.Router();

// ADD A BOOK
router.post("/", bookController.addABook);

// GET ALL BOOKS
router.get("/", bookController.getAllBooks);

// GET A BOOKS
router.get("/:id", bookController.getABooks);

// UPDATE A BOOK
router.put("/:id", bookController.updateBook);

// DELETE A BOOK
router.delete("/:id", bookController.deleteBook);

module.exports = router;
