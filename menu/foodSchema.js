const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//schema for food items
const foodItemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      unique:true
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
    },
    username: {
      type:String,
      unique:true,
      required: true
    },
    password: {
      required: true,
      type: String
    }
})

foodItemSchema.pre('save',async function(next){
  const Ps = this;
  if(!Ps.isModified('password')) return next();
 
  try {
    const salt = await bcrypt.genSalt(10);
    const Password = await bcrypt.hash(Ps.password,salt);
    Ps.password = Password;
    next();
  } catch (error) {
    return next(error);
  }
})

foodItemSchema.methods.comparePassword = async function(pwd){
  try {
    console.log(pwd,' ',this.password);
    const isMatch = await bcrypt.compare(pwd , this.password);
    return isMatch;
  } 
  catch (err) {
    throw err;
  }
}

const Footitem = mongoose.model('menu',foodItemSchema);
module.exports = Footitem;
