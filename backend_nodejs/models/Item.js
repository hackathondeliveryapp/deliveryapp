const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  number_people: {
    type: Number,
    required: true
  },
  menu: {
    type: String,
    required: true
  },
  store: {
    type: String,
    required: true
  },
  expiration: {
    type: Date
  },
  delivery_time: {
    type: Date
  },
  current_people: {
    type: Number,
    default: 0
  },
  order: [
    {
      order: {
        type: Schema.Types.ObjectId,
        ref: "orders"
      }
    }
  ],
  original_price: {
    type: Number,
    required: true
  },
  discounted_price: {
    type: Number,
    required: true
  },
  accomplished: {
    type: Boolean,
    default: false
  },
  expired: {
    type: Boolean,
    default: false
  }
});

module.exports = Post = mongoose.model("items", PostSchema);
