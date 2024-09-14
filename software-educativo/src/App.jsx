// App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Puzzle from './pages/Puzzle.jsx';
import Numbers from './pages/Numbers.jsx';
import Words from './pages/Words.jsx';
import LetterSoup from './pages/LetterSoup.jsx';
const App = () => {





  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/letterSoup" element={<LetterSoup />} />
        <Route path="/numbers" element={<Numbers />} />
        <Route path="/words" element={<Words />} />
      </Routes>
  );
};

export default App;