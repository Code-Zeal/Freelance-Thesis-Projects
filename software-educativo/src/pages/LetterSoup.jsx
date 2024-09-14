import React, { useState, useEffect } from 'react';
import './LetterSoup.css';
import { Link } from 'react-router-dom';

const gridSize = 10;
const words = ["CUADERNO", "LIBRO", "BOLSO", "PLASTILINA","LEGOS","DIBUJO","ESCRIBIR"];

const App = () => {
  const [grid, setGrid] = useState([]);
  const [selection, setSelection] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundWordPositions, setFoundWordPositions] = useState({});
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const newGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
    words.forEach(word => placeWord(word, newGrid));
    fillEmptySpaces(newGrid);
    setGrid(newGrid);
  }, []);

  const canPlaceWord = (word, row, col, direction, grid) => {
    if (direction === 0 && col + word.length > gridSize) return false;
    if (direction === 1 && row + word.length > gridSize) return false;

    for (let i = 0; i < word.length; i++) {
      if (direction === 0 && grid[row][col + i] !== '') return false;
      if (direction === 1 && grid[row + i][col] !== '') return false;
    }
    return true;
  };

  const placeWord = (word, grid) => {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      const direction = Math.floor(Math.random() * 2); // 0: horizontal, 1: vertical

      if (canPlaceWord(word, row, col, direction, grid)) {
        for (let i = 0; i < word.length; i++) {
          if (direction === 0) {
            grid[row][col + i] = word[i];
          } else {
            grid[row + i][col] = word[i];
          }
        }
        placed = true;
      }
    }
  };

  const fillEmptySpaces = (grid) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
  };

  const startSelection = (row, col) => {
    setIsMouseDown(true);
    selectCell(row, col);
  };

  const continueSelection = (row, col) => {
    if (isMouseDown) {
      selectCell(row, col);
    }
  };

  const endSelection = () => {
    setIsMouseDown(false);
    checkWordFound();
    setSelectedCells([]);
    setSelection([]);
  };

  const selectCell = (row, col) => {
    const cell = `${row}-${col}`;
    if (!selectedCells.includes(cell)) {
      setSelectedCells([...selectedCells, cell]);
      setSelection([...selection, grid[row][col]]);
    }
  };

  const checkWordFound = () => {
    const selectedWord = selection.join('');
    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);

      // Almacenar las posiciones de las letras encontradas
      const positions = {};
      for (let i = 0; i < selectedWord.length; i++) {
        const cellIndex = selectedCells[i];
        positions[cellIndex] = true;
      }
      setFoundWordPositions(prev => ({ ...prev, [selectedWord]: positions }));
    }
  };

  useEffect(() => {
    if (foundWords.length >= words.length) {
      setWin(true);
    }
  }, [foundWords]);

  return (
    <div className='bg-words' id="mainLetterSoup">
      {!win ? (
        <>
        <div className='flex w-[80vw] mt-[5vh] justify-evenly'>

          <div className="grid">
            {grid.map((row, rowIndex) => (
              row.map((cell, colIndex) => {
                const cellId = `${rowIndex}-${colIndex}`;
                const isFound = Object.values(foundWordPositions).some(positions => positions[cellId]);
                return (
                  <div
                  key={cellId}
                  className={`cell ${selectedCells.includes(cellId) ? 'selected' : ''} ${isFound ? 'found' : ''}`}
                  onMouseDown={() => startSelection(rowIndex, colIndex)}
                  onMouseEnter={() => continueSelection(rowIndex, colIndex)}
                  onMouseUp={endSelection}
                  >
                    {cell}
                  </div>
                );
              })
            ))}
          </div>
          <ul style={{ listStyleType: 'disc' }} className="word-list" >
            {words.map(word => (
              <li  key={word} className={foundWords.includes(word) ? 'found' : ''}>
                {word}
              </li>
            ))}
          </ul>
            </div>
          <Link className='winButton' to={"/Menu"}>Volver</Link>
        </>
      ) : (
        <div className='winContainer'>
          <h1 className='winText'>¡Felicidades, has encontrado todas las palabras!</h1>
          <button className='winButton' onClick={() => window.location.reload()}>Volver a jugar</button>
        </div>
      )}
    </div>
  );
};

export default App;