const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Item = require("../../models/Item.js");

router.get("/", (req, res) => {
  res.status(200).json({ nopostsfound: "No posts found" });
});

router.get("/get_items", (req, res) => {
  console.log("request to items/get_items");
  Item.find({
    expired: false,
    accomplished: false
  }).then(items => {
    res.status(200).json(items);
  });
});

router.post("/get_item", (req, res) => {
  console.log("request to items/get_item");
  Item.findById(req.body.item_id)
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        message: "error occurs"
      });
    });
});

router.post("/create_item", (req, res) => {
  console.log("request to items/create_item");
  console.log(req.body);
  const expiration = new Date(req.body.expiration);

  const newItem = new Item({
    number_people: req.body.number_people,
    menu: req.body.menu,
    store: req.body.store,
    expiration: expiration,
    delivery_time: req.body.delivery_time,
    original_price: req.body.original_price,
    discounted_price: req.body.discounted_price
  });

  newItem
    .save()
    .then(item => {
      res.json(item);
      const timer = setTimeout(() => {
        Item.findById(item._id).then(item => {
          if (!item.accomplished) {
            item.expired = true;
            item
              .save()
              .then(item => console.log("item " + item._id + " is expired"))
              .catch(err => console.log(err));
          }
        });
      }, expiration - Date.now());
    })
    .catch(err => console.log(err));
});

module.exports = router;
