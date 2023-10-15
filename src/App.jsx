import { useState, useEffect, useMemo } from "react";
import "./App.css";
import Square from "./components/Square";
function App() {
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
    for (const element of lines) {
      const [a, b, c] = element;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return element;
      }
    }
    if (!squares.includes(null)) {
      return "Draw";
    }
    return null;
  }
  const [board, setBoard] = useState(Array(9).fill(null));
  // const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [stepNumber, setStepNumber] = useState(0);
  const [redLine, setRedLine] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [currentMove, setCurrentMove] = useState([Array(9).fill(null)]);
  const [isDisabledRedline, setIsDisabledRedline] = useState(false);

  useEffect(() => {
    if (stepNumber < history.length - 1) {
      setIsDisabledRedline(true);
    }
    if (stepNumber === history.length - 1) {
      setIsDisabledRedline(false);
    }
  }, [stepNumber]);
  const player = stepNumber % 2 === 0 ? "X" : "O";

  const message =
    winner === "Draw"
      ? `Draw!`
      : winner && stepNumber === history.length - 1
      ? `Winner is ${winner}`
      : `Next player is ${player}`;

  const handleSquareClick = (i) => {
    if ((winner && stepNumber === history.length - 1) || board[i]) return;

    const boardCopy = [...board];
    boardCopy[i] = player;

    setBoard(boardCopy);

    let currentWinner = calculateWinner(boardCopy);

    if (Array.isArray(currentWinner)) {
      setWinner(boardCopy[currentWinner[0]]);
      setRedLine(currentWinner);
    }
    if (currentWinner === "Draw") {
      setWinner(currentWinner);
    }
    if (stepNumber < history.length) {
      let historyCopy = history.slice(0, stepNumber + 1);
      setHistory([...historyCopy, boardCopy]);
      setStepNumber(historyCopy.length);

      let currentMoveCopy = currentMove.slice(0, stepNumber + 1);
      setCurrentMove([...currentMoveCopy, i]);
      setRedLine([]);
    } else {
      setHistory([...history, boardCopy]);
      setStepNumber(history.length);
      setCurrentMove([...currentMove, i]);
    }
  };
  const rows = [];

  for (let row = 0; row < 3; row++) {
    const cols = [];
    for (let col = 0; col < 3; col++) {
      const i = row * 3 + col;
      cols.push(
        <Square
          key={i}
          value={board[i]}
          onSquareClick={() => {
            handleSquareClick(i);
          }}
          isRed={redLine.includes(i)}
          isDisabledRedline={isDisabledRedline}
        />
      );
    }
    rows.push(
      <div key={row} className={`board-row`}>
        {cols}
      </div>
    );
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0 && move !== stepNumber) {
      description =
        "Go to move #" +
        move +
        ": [" +
        Math.floor(currentMove[move] / 3) +
        ", " +
        (currentMove[move] % 3) +
        "]";
    } else if (move > 0 && move === stepNumber) {
      description =
        `You are at move #${move}` +
        ": [" +
        Math.floor(currentMove[move] / 3) +
        ", " +
        (currentMove[move] % 3) +
        "]";
    }
    if (move === 0) {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {move === 0 ? (
          <button
            onClick={() => {
              setBoard(Array(9).fill(null));
              setStepNumber(move);
              setRedLine([]);
            }}
          >
            {" "}
            {description}
          </button>
        ) : (
          <button
            onClick={() => {
              setBoard(squares);
              setStepNumber(move);
            }}
          >
            {description}
          </button>
        )}
      </li>
    );
  });

  return (
    <>
      <div className="App">
        <div className="Board">{rows}</div>
        <div className="Info">
          <div>{message}</div>
        </div>
        <div className="Sort">
          <button
            onClick={() => {
              setIsAscending(!isAscending);
            }}
          >
            Toggle Sort
          </button>
        </div>
        <div className="History">
          <h3>History</h3>
          <ol>{isAscending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    </>
  );
}

export default App;
