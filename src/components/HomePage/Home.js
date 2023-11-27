import React from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate=useNavigate();
  return (
    <div className="home-container">
      <div className="sidebar">
        <h2>My App</h2>
        <a href="#transaction-history">Transaction History</a>
        {/* Add more navigation links here */}
      </div>

      <div className="content">
        <div className="card" id="transaction-history">
          <h2>Transaction History</h2>
          <p>This is an example transaction history content.</p>
          {/* Explore button added */}
          <button className="explore-button"
          onClick={()=> navigate("/Transact")}
          >Explore</button>
          {/* Add your transaction history content here */}
        </div>
      </div>
    </div>
  );
};

export default Home;
