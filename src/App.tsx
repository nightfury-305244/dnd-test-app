import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Designer from './components/Designer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Designer />} />
      </Routes>
    </Router>
  );
}

export default App;
