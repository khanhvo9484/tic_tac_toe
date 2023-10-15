import React from "react";
import "./StepBtnStyle.css";
const StepBtn = ({
  setBoard,
  setStepNumber,
  squares,
  move,
  description,
  isCurrentMove,
}) => {
  let moveClass = "step-btn";
  if (isCurrentMove) {
    moveClass = moveClass + " current-move";
  }
  return (
    <button
      className={moveClass}
      onClick={() => {
        setBoard(squares);
        setStepNumber(move);
      }}
    >
      {description}
    </button>
  );
};

export default StepBtn;
