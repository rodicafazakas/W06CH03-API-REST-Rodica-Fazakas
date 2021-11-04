const express = require("express");
const Thing = require("../../database/models/thing");

const router = express.Router();

router.get("/", async (req, res) => {
  const things = await Thing.find({});
  res.json(things);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const searchedThing = await Thing.findById(id);
    if (searchedThing) {
      res.json(searchedThing);
    } else {
      const error = new Error("Thing not found");
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
    console.log("¡Ojo! Están creando a thing.");
    next();
  },
  async (req, res, next) => {
    try {
      const thing = req.body;
      const newThing = await Thing.create(thing);
      res.json(newThing);
    } catch (error) {
      error.code = 400;
      error.message = "Try again!";
      next(error);
    }
  }
);




module.exports = router;
