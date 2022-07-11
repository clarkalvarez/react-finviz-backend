module.exports = (app) => {
  const news = require("../controllers/news.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", news.create);

  // Retrieve all stocks
  router.get("/", news.findAll);

  app.use("/api/news", router);
};
