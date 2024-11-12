import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Users/Main';
import Login from './pages/auth/login';
import SignUp from './pages/auth/register';
import Notification from './pages/Users/Notification';
import Nopage from './pages/notFound/NoPage';
import ProtectedRoute from './Utils/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
                <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Notifications"
          element={
            <ProtectedRoute>
                <Notification />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/users" element={<Main />} /> */}
        {/* <Route path="/Notifications" element={<Notification />} /> */}
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Router>
  );
}

export default App;
