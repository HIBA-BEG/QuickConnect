import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Users/Main';
import Login from './pages/auth/login';
import SignUp from './pages/auth/register';
import Notification from './pages/Users/Notification';
import Nopage from './pages/notFound/NoPage';
import ProtectedRoute from './Utils/ProtectedRoute';
import VideoCall from './Components/VideoCall';
import IndexChannel from './pages/Channel/IndexChannel';
import ChannelProvider from './Contexts/ChannelContext';

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

        <Route
          path="/channel" element={
            <ProtectedRoute>
              <ChannelProvider>
                <IndexChannel />
              </ChannelProvider>
            </ProtectedRoute>
          } />

        {/* <Route path="/users" element={<Main />} /> */}
        <Route path="/video" element={<VideoCall />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Router>
  );
}

export default App;
