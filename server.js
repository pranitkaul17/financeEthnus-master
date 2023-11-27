const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

//MongoDB connection 
mongoose.connect('mongodb://127.0.0.1:27017/saga', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const TransactionSchema = new mongoose.Schema({
  id: Number,
  description: String,
  cost: Number,
  date: { type: Date, default: Date.now },
})

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  transactionHistory: { type: [TransactionSchema], default: null },
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
  const { userName, userPassword } = req.body;

  try {
    const user = await User.findOne({
      username: userName,
      password: userPassword
    });
    if (user) {
      console.log('found user');
      res.json({ success: true, message: 'Login successful' });
    } else {
      console.log('User not found');
      res.json({ success: false, message: 'Login failed. User not found.' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/SignUp', async (req, res) => {
  const { userName, userPassword } = req.body;

  User.findOne({ userName }).then((existingUser) => {
    if (existingUser) {
      console.log('found existing user');
      res.json({ success: false, message: 'Signup failed. User already exists.' });
      return;
    }

    //Create new user 
    const newUser = new User({
      username: userName,
      password: userPassword,
    });
    return newUser.save();
  }).then(() => {
    console.log("Signned up succesfully!");
    res.json({ success: true, message: 'Signup successful', redirect: '/Home' });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  })

});

app.post('/transact', async (req, res) => {

  try {
    const { description, cost, date, userName } = req.body;
    // console.log(req.body);
    const currentUser = await User.findOne({ username: userName });


    if (currentUser) {
      if (!currentUser.transactionHistory) {
        currentUser.transactionHistory = [];
      }

      let newTransactionId;
      // console.log(currentUser.transactionHistory.length);
      if (currentUser.transactionHistory.length === 0) {
        // If TransactionHistory is empty, set id to 1
        newTransactionId = 1;
      } else {
        // If TransactionHistory is not empty, increment id based on the last transaction
        const lastTransaction = currentUser.transactionHistory[currentUser.transactionHistory.length - 1];
        newTransactionId = lastTransaction.id + 1;

      }


      const newTransaction = {
        id: newTransactionId,
        description: description,
        cost: cost,
        date: date || Date.now(),
      };

      currentUser.transactionHistory.push(newTransaction);

      await currentUser.save(); // Wait for the save operation to complete
      res.status(200).json({ message: 'Transaction added successfully' });
      console.log("Added");
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/transactions', async (req, res) => {
  try {
    const { userName } = req.query;

    if (!userName) {
      console.log("User NOT FOUND...");  // Log when userName is missing
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUser = await User.findOne({ username: userName });

    if (currentUser) {
      console.log("User found, sending transactions...");
      return res.status(200).json({ transactions: currentUser.transactionHistory });
    } else {
      console.log("User NOT FOUND...");
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

app.delete('/deleteTransaction', async (req, res) => {
  // console.log("Transaction");
  // In Express, when handling HTTP DELETE requests, the parameters are usually sent in the request URL and not in the request body.
  // Therefore, you should retrieve the parameters from the URL instead of the request body.
  try {
    const userName = req.query.userName;
    const id = req.query.id;
    console.log(userName);
    console.log(id);

    const currentUser = await User.findOne({ username: userName });

    if (!currentUser) {
      return res.status(404).json({ message: "Something went wrong." });
    }

    /*
    .findIndex(...): The findIndex method is an array method in JavaScript. It's used to find the index 
    of the first element in an array that satisfies a provided testing function. It takes a callback function as an argument.
    transaction => transaction.id === parseInt(id): This is an arrow function that is used as the testing function for findIndex. It takes a transaction as an argument (representing an element in the transactionHistory array), 
    and it checks if the id property of that transaction is equal to the parsed integer value of the id parameter.
    transaction.id: This assumes that each transaction object has an id property.
    parseInt(id): This converts the id parameter to an integer. The parseInt function parses a string and returns an integer.
    */
    const transactionToBeDeleted = currentUser.transactionHistory.findIndex(transaction => transaction.id === parseInt(id));

    if (transactionToBeDeleted === -1) {
      return res.status(404).json({ message: "Something went wrong." });
    }

    currentUser.transactionHistory.splice(transactionToBeDeleted, 1);

    await currentUser.save();

    return res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.put('/updateTransaction', async (req, res) => {
  try {
    const { description, cost, date, userName, id } = req.query;

    const currentUser = await User.findOne({ username: userName });

    if (currentUser) {
      const newTransaction = await User.findOneAndUpdate(
        { username:userName, 'transactionHistory.id': id },
        {
          $set: {
            'transactionHistory.$.description': description,
            'transactionHistory.$.cost': cost,
            'transactionHistory.$.date': date,
          },
        },
        {new:true}
      );
      res.status(200).json({message: 'Transaction updated successfully'});
    }else{
      res.status(404).json({message: 'No transaction history found'});
    }
  } catch {
    res.status(505).json({message: 'Internal Server Error'});
  }
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

