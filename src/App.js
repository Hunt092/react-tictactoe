import { useState } from 'react';
import './App.css';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function App() {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null)
  }])
  const [stepNumber, setStepNumber] = useState(0)
  const [XisNext, setXisNext] = useState(true)

  const handelClick = (i) => {
    const newhistory = history.slice(0, stepNumber + 1)
    const current = newhistory[newhistory.length - 1];
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = XisNext ? 'X' : 'O';
    setHistory(newhistory.concat([{
      squares: squares
    }]))
    setStepNumber(newhistory.length)
    setXisNext(!XisNext)
  }
  const progress = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0)
  }


  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => progress(move)}>{desc}</button>
      </li>
    );
  });

  const current = history[stepNumber]

  const winner = calculateWinner(current.squares);
  let style;
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
    style = { "color": 'green', 'transform': 'scale(2) translateX(25%)' }
  } else {
    status = 'Next player: ' + (XisNext ? 'X' : 'O');
    style = { "color": 'inherit' }
  }

  return (
    <div className="Game">
      <div className="game__board">
        <Board squares={current.squares}
          onClick={(i) => handelClick(i)} />
      </div>
      <div className="game__info">
        <div style={style}>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>

  );
}

export default App;
