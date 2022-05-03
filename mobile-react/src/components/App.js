import './App.css';
import { Routes, Route } from 'react-router-dom';
import Books from '../containers/Books';

function App() {
  return (
    <Routes>
      <Route exact path="/books" element={<Books />} />
      <Route path="*" element={<Books />} />
    </Routes>
  );
}

export default App;
