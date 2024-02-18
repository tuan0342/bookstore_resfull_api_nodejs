const authorController = require("../controllers/authorController");
const express = require("express");
const router = express.Router();

// ADD AUTHOR
router.post("/", authorController.addAuthor);

// GET ALL AUTHOR
router.get("/", authorController.getAllAuthor);

// GET ALL AUTHOR
router.get("/:id", authorController.getAnAuthor);

// UPDATE AUTHOR
router.put("/:id", authorController.updateAuthor);

// DELETE AUTHOR
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;
