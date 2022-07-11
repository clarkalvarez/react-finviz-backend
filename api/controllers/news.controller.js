const { news } = require("../../news");
const db = require("../models");
const News = db.news;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  const stockCode = req.query.stockCode;
  const response = await news(stockCode);

  // Validate request
  if (!stockCode || !response) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  News.findById(stockCode)
    .then((data) => {
      if (data) {
        const newsBody = {
          news: response.news,
        };
        News.findByIdAndUpdate(stockCode, newsBody, {
          useFindAndModify: false,
        })
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update News with id=${stockCode}. Maybe Tutorial was not found!`,
              });
              return;
            }
            res.send({ message: "News was updated successfully." });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating News with id=" + stockCode,
            });
          });
        return;
      }
      if (!data) {
        // Create a Stocks
        const saveNews = new News({
          _id: stockCode,
          news: response.news,
        });

        // Save Tutorial in the database
        saveNews
          .save(saveNews)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Tutorial.",
            });
          });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const stockCode = req.query.stockCode;
  // var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  const response = await stockInfo(stockCode);
  res.send(response);
};
