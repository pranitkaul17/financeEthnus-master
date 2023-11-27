// TransactionHistory.js

import React from 'react';
import Field from './Field';
import { useState } from 'react';
import { useSelector } from 'react-redux'; // Import the `useSelector` hook
import axios from 'axios';
// import selectUser from '../../features/userSlice';
function Transact() {

  const [transactions, getTransactions] = useState([]);

  const [description, getDiscription] = useState('');
  const [cost, getCost] = useState('');
  const [date, getDate] = useState('');

  const user = useSelector((state) => state.user);
  const userName = user.user.userName;

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/transactions?userName=${userName}`);
      console.log("erert");
      // console.log(response.data.transactions);
      getTransactions(response.data.transactions);
    } catch (error) {
      console.log("erert", error.message);
    }
  }

  // fetchTransactions();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/transact', {
        description,
        cost,
        date,
        userName: user.user.userName,
      })
      fetchTransactions();

      getDiscription('');
      getCost('');
      getDate('');
    } catch (error) {
      console.log("User NOT FOUND...")
      console.log(error.message);
    }
  }

  const handleTransactionUpdate = async (id) => {
    try {
      const selectedTransaction = transactions.find((transaction) => transaction.id === id);
      getDiscription(selectedTransaction.description);
      getCost(selectedTransaction.cost);
      getDate(selectedTransaction.date);

      const response = await axios.put('http://localhost:3000/updateTransaction', {
        params: {
          description: selectedTransaction.description,
          cost: selectedTransaction.cost,
          date: selectedTransaction.date,
          userName: userName,
          id: id,
        }
      })
      fetchTransactions();
      getDiscription('');
      getCost('');
      getDate('');
    } catch (error){
      console.log(error);
    }
  }



  /*return (
    <div>
      <div className="card">
        <h2>Transaction History</h2>
        <div className="InputArea">
          <form className="transaction-form">
            <div className="form-row">
              <label htmlFor="description">Description:</label>
              <input type="text"
                id="description"
                name="description"
                className="input-field"
                value={description}
                onChange={(e) => getDiscription(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="cost">Cost:</label>
              <input
                type="text"
                id="cost"
                name="cost"
                className="input-field"
                value={cost}
                onChange={(e) => getCost(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="date">Date:</label>
              <input type="date"
                id="date"
                name="date"
                className="input-field"
                value={date}
                onChange={(e) => getDate(e.target.value)}
              />
            </div>

            <button type="submit"
              className="submit-button"
              onClick={handleSubmit}>
              Submit
            </button>
            <button type="update"
              className="submit-button"
              onClick={handleTransactionUpdate}>
              Update
            </button>
          </form>
        </div>
      </div>
      <Field
        transactions={transactions}
        onDelete={fetchTransactions}
        onUpdate={handleTransactionUpdate}
      />
    </div>

  );
};*/
return (
  <div className="transaction-history-container">
    <div className="card">
      <h2>Transaction History</h2>
      <div className="input-area">
        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="description">Description:</label>
            <input type="text"
              id="description"
              name="description"
              className="input-field"
              value={description}
              onChange={(e) => getDiscription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label htmlFor="cost">Cost:</label>
            <input
              type="text"
              id="cost"
              name="cost"
              className="input-field"
              value={cost}
              onChange={(e) => getCost(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label htmlFor="date">Date:</label>
            <input type="date"
              id="date"
              name="date"
              className="input-field"
              value={date}
              onChange={(e) => getDate(e.target.value)}
            />
          </div>

          <div className="button-container">
            <button type="submit" className="submit-button">Submit</button>
            {/* Removed the Update button as its functionality is not clear */}
          </div>
        </form>
      </div>
    </div>
    <Field
      transactions={transactions}
      onDelete={fetchTransactions}
      onUpdate={handleTransactionUpdate}
    />
  </div>
);
};

export default Transact;
