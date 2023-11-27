// Field.js
import React from 'react';
// import { useState } from 'react';
import { useSelector } from 'react-redux'; // Import the `useSelector` hook
import axios from 'axios';

function Field({ transactions ,onDelete,onUpdate }) {

  const user = useSelector((state) => state.user);
  const userName = user.user.userName;

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete('http://localhost:3000/deleteTransaction', {
        params: {
          id: id,
          userName: userName,
        },
      });

      onDelete();

    } catch (e) {
      console.log(e.message);
    }
  }

  const handleUpdate = async (id) => {
    onUpdate(id);
  }

  return (
    <div className="field-container">
      <table className="field-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Cost</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.cost}</td>
              <td>{transaction.date}</td>
              <td>
                <button
                  onClick={() => handleDelete(transaction.id)}
                >Delete</button>
              </td>
              <td>
                <button
                onClick={()=> handleUpdate(transaction.id)}
                > Update</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default Field;
