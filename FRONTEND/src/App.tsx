import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Users/Main';
import Login from './pages/auth/login';
import SignUp from './pages/auth/register';
import Notification from './pages/Users/Notification';
import Nopage from './pages/notFound/NoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Main />} />
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Notifications" element={<Notification />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Router>
  );
}

export default App;
