import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Home, NotFound } from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page-not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/page-not-found" />} />
      </Routes>
    </Router>
  );
};

export default App;
