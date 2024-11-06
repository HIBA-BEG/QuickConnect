import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Users/Main';
import Login from './pages/auth/login';
import SignUp from './pages/auth/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Main />} />
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
