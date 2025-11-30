import React from 'react';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Register from './components/register';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Analytics />
    </>
  );
}

export default App;
