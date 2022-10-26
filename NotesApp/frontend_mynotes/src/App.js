import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotesList from './components/Notes/NotesList';
import SingleNote from './components/Notes/SingleNote';
function App() {
  return (
    <Router>
      <div className='main-wrapper'>
        <div className="container  dark">
          <div className='app'>

            <Header />
            <Routes>
              <Route path="/" exact element={<NotesList />} />
              <Route path="/note/:id" element={<SingleNote />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
