import React, { useState } from "react";
import "./App.css";

interface ICoordinates {
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [points, setPoints] = useState<ICoordinates[]>([]);
  const [poppedPoints, setPoppedPoints] = useState<ICoordinates[]>([]);

  // This function adds a point to the array when the screen is clicked
  const addPoint = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX - 7.5, y: clientY - 7.5 }]);
    setPoppedPoints([]);
  };

  // This function removes the last point added to the coordinates array
  const removePoint = () => {
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    if (!poppedPoint) return;
    setPoppedPoints([...poppedPoints, poppedPoint]);
    setPoints(newPoints);
  };

  // This function adds the last point removed to the coordinates array
  const redoPoint = () => {
    const poppedPoint = poppedPoints.pop();
    if (!poppedPoint) return;
    setPoints([...points, poppedPoint]);
  };

  return (
    <>
      <div className="buttonContainer">
        <button onClick={removePoint}>UNDO</button>
        <button onClick={redoPoint}>REDO</button>
        <button onClick={() => setPoints([])}>RESET</button>
      </div>
      <div className="container" onClick={addPoint}>
        {points.length > 0 ? (
          points.map((point: ICoordinates, idx: number) => (
            <span
              key={idx}
              className="point"
              style={{ top: point.y, left: point.x }}
            ></span>
          ))
        ) : (
          <div
            style={{
              height: "100vh",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontSize: "40px",
            }}
          >
            Click on the screen to place some points!
          </div>
        )}
      </div>
    </>
  );
};

export default App;
