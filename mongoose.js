// mongoose.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/saga', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const TransactionSchema = new mongoose.Schema({
  id:Number,
  discription:String,
  cost:Number,
  date:{type:Date, default:Date.now},
})

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  transactionHistory:{type:[TransactionSchema],default: null},
});

const User = mongoose.model('User', userSchema);

module.exports = User;