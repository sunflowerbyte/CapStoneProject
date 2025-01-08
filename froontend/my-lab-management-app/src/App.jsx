import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Maintenance from './components/Maintenance';
import Inventory from './components/Inventory';
import Notices from './components/Notices';


function App() {
  return (
    <Router>
      <Routes>

        {/*Public Routes*/}
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<Register/>} />

        {/*Protected Routes*/}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/notices" element={<Notices />} />
      </Routes>
    </Router>
  );
}

export default App;
