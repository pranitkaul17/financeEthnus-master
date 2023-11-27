import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Div1 from './components/Div1';
import Div2 from './components/Div2';
import Div3 from './components/Div3';
import Div4 from './components/Div4';
import Div5 from './components/Div5';
import Login from './components/Registering/Login';
import SignUp from './components/Registering/SignUp';
import Home from './components/HomePage/Home';
import Transact from './components/TransactionHistory/Transact';
import Main from './components/APINews/Main';
import Graphs from './components/Graphs/Graphs';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* All Div components are rendered on the main path */}
          <Route path="/" element={<div>
            <Div1 />
            <Div2 />
            <Div3 />
            <Div4 />
            <Div5 />
          </div>} />

          {/* The Login component is rendered when the /login path is matched */}
          <Route path="/login" element={<Login />} />
          <Route path="/Sign" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Transact" element={<Transact />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Graphs" element={<Graphs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
