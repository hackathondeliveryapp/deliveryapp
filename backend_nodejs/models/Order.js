const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  item_id: {
    type: Schema.Types.ObjectId,
    ref: "items"
  },
  name: {
    type: String,
    required: true
  },
  cell_phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

module.exports = Post = mongoose.model("orders", PostSchema);
