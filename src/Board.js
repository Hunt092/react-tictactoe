import React from 'react'

let Square = ({onClick, value}) => {
    return (
      <button
        className="square"
        onClick={onClick}
      >
        {value}
      </button>
    );
  }

const Board = (props) => {
    const renderSquare = (i) => {
        return <Square value={props.squares[i]}
          onClick={() => props.onClick(i)}
        />;
      }
    return (
        <div className="board">
            <div className="board__row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board__row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board__row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

export default Board
