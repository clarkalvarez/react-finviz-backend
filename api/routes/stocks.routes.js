module.exports = (app) => {
  const stocks = require("../controllers/stocks.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", stocks.create);

  // Retrieve all stocks
  router.get("/", stocks.findAll);

  app.use("/api/stocks", router);
};
