import Dashboard from './pages/Dashboard';
import Register from './pages/register';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard/>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
