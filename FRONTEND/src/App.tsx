import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Users/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
