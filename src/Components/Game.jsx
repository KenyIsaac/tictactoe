import React, { useState } from "react";
import { calculateWinner } from "./Winner";
import Grid from "./Grid";

const Game = () => {
  var count =0;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // Regresar si está ganado u ocupado
    if (winner || squares[i]) return;
    // Seleccionar cuadro
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Movimiento : ${move}` : "Reiniciar";
      return (
        <li key={move} className="goto-btn">
          <button onClick={() => jumpTo(move)} style = {{fontSize:"16px", backgroundColor:"black"}}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <Grid squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>Historial</h3>
          {renderMoves()}
        </div>
        <h3>{ winner? "Ganador: " + winner : stepNumber<9 ? "Siguiente jugador: " + xO : "Empate"}</h3>
      </div>
    </>
  );
};

export default Game;