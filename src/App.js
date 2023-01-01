import React from 'react';
import "./App.css";

var empty_grid = [];
for (var i=0; i<9; i++) {
  empty_grid[i] = Array(9).fill(null);
}

function getWinner(gr, sq) {
  var line = null;
  if (gr[sq] === gr[(sq+3)%9] && gr[sq] === gr[(sq+6)%9]) {
    line = 'col';
  } else if (sq % 3 === 0 && gr[sq] === gr[sq+1] && gr[sq] === gr[sq+2]) {
    line = 'row';
  } else if (sq % 3 === 1 && gr[sq] === gr[sq+1] && gr[sq] === gr[sq-1]) {
    line = 'row';
  } else if (sq % 3 === 2 && gr[sq] === gr[sq-1] && gr[sq] === gr[sq-2]) {
    line = 'row';
  } else if ([0,4,8].includes(sq) && gr[0] === gr[4] && gr[0] === gr[8]) {
    line = 'diag';
  } else if ([2,4,6].includes(sq) && gr[2] === gr[4] && gr[2] === gr[6]) {
    line = 'diag';
  }
  return line
}

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null))
  const [squares2, setSquares2] = React.useState(empty_grid)
  const [nextValue, setNextValue] = React.useState('X')
  const [winner, setWinner] = React.useState(null)
  const [nextGrid, setNextGrid] = React.useState(null)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(lsquare, ssquare) {
    if (winner || squares2[lsquare][ssquare]) {
      return
    }
    if (nextGrid != null && lsquare !== nextGrid) {
      return
    }
    const squares2Copy = [...squares2]
    squares2Copy[lsquare][ssquare] = nextValue
    setSquares2(squares2Copy)
    var gr = squares2Copy[lsquare]
    var line = getWinner(gr, ssquare)
    if (line) {
      const squaresCopy = [...squares]
      squaresCopy[lsquare] = nextValue
      setSquares(squaresCopy)
      var line2 = getWinner(squaresCopy, lsquare)
      if (line2) {
        setWinner(nextValue)
      }
    }
    
    if (nextValue === 'X') {
      setNextValue('O')
    } else {
      setNextValue('X')
    }
    setNextGrid(ssquare)
  }

  function restart() {
    setSquares(Array(9).fill(null))
    setSquares2(empty_grid)
    setWinner(null)
  }

  function renderSquare(l,s) {
    return (
      <button className="square" onClick={() => selectSquare(l,s)}>
        {squares2[l][s]}
      </button>
    )
  }

  function renderSmallGrid(i) {
    return (
      <div className="small-grid">
        <div className="board-row">
          {renderSquare(i,0)}
          {renderSquare(i,1)}
          {renderSquare(i,2)}
        </div>
        <div className="board-row">
          {renderSquare(i,3)}
          {renderSquare(i,4)}
          {renderSquare(i,5)}
        </div>
        <div className="board-row">
          {renderSquare(i,6)}
          {renderSquare(i,7)}
          {renderSquare(i,8)}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSmallGrid(0)}
        {renderSmallGrid(1)}
        {renderSmallGrid(2)}
      </div>
      <div className="board-row">
        {renderSmallGrid(3)}  
        {renderSmallGrid(4)}
        {renderSmallGrid(5)}
      </div>
      <div className="board-row">
        {renderSmallGrid(6)}
        {renderSmallGrid(7)}
        {renderSmallGrid(8)}  
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function App() {
  return <Game />
}

export default App