const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Order = require("../../models/Order.js");
const Item = require("../../models/Item.js");

router.get("/", (req, res) => {
  res.status(200).json({ nopostsfound: "No posts found" });
});

router.post("/create_order", (req, res) => {
  console.log("request to orders/create_order");
  //check if available order
  Item.findById(req.body.item_id)
    .then(item => {
      if (item.expired || item.accomplished) {
        res.json({
          message: "You cannot order this item"
        });
      } else {
        const newOrder = new Order({
          name: req.body.name,
          item_id: req.body.item_id,
          cell_phone: req.body.cell_phone,
          location: req.body.location
        });

        newOrder
          .save()
          .then(order => {
            res.json({
              order_id: order._id
            });

            //update the fields of 'item'
            item.current_people += 1;
            item.order.unshift({ order: order._id });

            //if the number of people reach the desired number
            if (item.current_people == item.number_people) {
              item.accomplished = true;
            }

            item
              .save()
              .then()
              .catch(err => console.log(err));
          })
          .catch(err => {
            console.log(err);
            res.json({ message: "error occurs" });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({ message: "error occurs" });
    });
});

router.delete("/delete_order", (req, res) => {
  console.log("request to orders/delete_order");

  Order.findById(req.body.order_id)
    .then(order => {
      Item.findById(order.item_id)
        .then(item => {
          const removeIndex = item.order
            .map(order => order.order.toString())
            .indexOf(req.body.order_id);
          item.order.splice(removeIndex, 1);
          item.current_people -= 1;
          item.save();
        })
        .catch(err => {
          console.log(err);
        });
      Order.findByIdAndDelete(order._id)
        .then(any => {
          console.log(any);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;

