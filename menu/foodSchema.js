const mongoose = require('mongoose');
const foodSchema = mongoose.Schema;

//schema for food items
const foodItemSchema = new foodSchema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'], // Example categories
      required: true
    },
    imageUrl: {
      type: String,
      trim: true
    },
    available: {
      type: Boolean,
      default: true
    }
})

const Footitem = mongoose.model('menu',foodItemSchema);
module.exports = Footitem;
