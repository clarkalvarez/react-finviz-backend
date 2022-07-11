const { stockInfo } = require("../../stockInfo");
const db = require("../models");
const Stocks = db.stocks;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  const stockCode = req.query.stockCode;
  const response = await stockInfo(stockCode);

  // Validate request
  if (
    !stockCode ||
    !response.marketcap ||
    !response.prevClose ||
    !response.avgVolume ||
    !response.price ||
    !response.volume ||
    !response.change ||
    !response.changeColor ||
    !response.image
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Stocks.findById(stockCode)
    .then((data) => {
      if (data) {
        const stocksBody = {
          stockCode,
          image: response.image.value,
          marketcap: response.marketcap.value,
          prevClose: response.prevClose.value,
          avgVolume: response.avgVolume.value,
          price: response.price.value,
          volume: response.volume.value,
          change: response.change.value,
          changeColor: response.changeColor.value,
        };
        Stocks.findByIdAndUpdate(stockCode, stocksBody, {
          useFindAndModify: false,
        })
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update Stocks with id=${id}. Maybe Tutorial was not found!`,
              });
              return;
            }
            res.send({ message: "Stocks was updated successfully." });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Stocks with id=" + id,
            });
          });
        return;
      }
      if (!data) {
        // Create a Stocks
        const saveStocks = new Stocks({
          _id: stockCode,
          stockCode,
          image: response.image.value,
          marketcap: response.marketcap.value,
          prevClose: response.prevClose.value,
          avgVolume: response.avgVolume.value,
          price: response.price.value,
          volume: response.volume.value,
          change: response.change.value,
          changeColor: response.changeColor.value,
        });

        // Save Tutorial in the database
        saveStocks
          .save(saveStocks)
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
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const stockCode = req.query.stockCode;
  // var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  const response = await stockInfo(stockCode);
  res.send(response);
};
