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
  "/",
  (req, res, next) => {
    console.log("Create a new thing.");
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

router.put(
  "/",
  (req, res, next) => {
    console.log("Modify a thing");
    next();
  },
  async (req, res, next) => {
    try {
      const thing = req.body;
      await Thing.findByIdAndUpdate(thing._id, thing);
      res.json(thing);
    } catch (error) {
      error.code = 400;
      error.message = "Error!";
      next(error);
    }
  }
);




module.exports = router;
