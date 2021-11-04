const express = require("express");
const Learning = require("../../database/models/learning");

const router = express.Router();

router.get("/", async (req, res) => {
  const learnings = await Learning.find();
  res.json(learnings);
});

router.get("/learning/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const searchedLearning = await Learning.findById(id);
    if (searchedLearning) {
      res.json(searchedLearning);
    } else {
      const error = new Error("Learning not found");
      error.code = 404;
      throw error;
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
});

router.post(
  "/new",
  (req, res, next) => {
    console.log("¡Ojo! Están creando un learning.");
    next();
  },
  async (req, res, next) => {
    try {
      const learning = req.body;
      const newLearning = await Learning.create(learning);
      res.json(newLearning);
    } catch (error) {
      error.code = 400;
      error.message = "Try again!";
      next(error);
    }
  }
);




module.exports = router;
