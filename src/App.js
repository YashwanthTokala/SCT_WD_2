import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [circleColor, setCircleColor] = useState("#dce9ff");

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (t) => {
    const ms = t % 1000;
    const sec = Math.floor(t / 1000) % 60;
    const min = Math.floor(t / 60000) % 60;
    const hr = Math.floor(t / 3600000);
    return `${hr.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${Math.floor(ms / 10)
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setRunning(true);
    setCircleColor("#c8f7c5");
  };

  const handlePause = () => {
    setRunning(false);
    setCircleColor("#fff3cd");
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
    setCircleColor("#f8d7da");
  };

  const handleLap = () => {
    setLaps(prevLaps => [...prevLaps, time]);
    setCircleColor("#bee5eb");
  };

  return (
    <div className="py-5 text-center min-vh-100 text-dark" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20230618/original/pngtree-24-hour-countdown-timer-with-3d-arrow-picture-image_3750325.jpg")', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}> 
      <div className="card shadow-lg p-5 mx-auto stopwatch-card text-dark" style={{ maxWidth: '500px', borderRadius: '20px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
        <h2 className="mb-4 fw-bold text-primary">⏱ Stylish Stopwatch</h2>

        <div className="clock-face mx-auto my-4 position-relative" style={{ backgroundImage: 'url("https://thumbs.dreamstime.com/b/chronometer-stopwatch-empty-click-face-d-render-illustration-77292223.jpg?w=768")', backgroundSize: 'cover', backgroundPosition: 'center', width: '220px', height: '220px', borderRadius: '50%' }}>
          <svg width="220" height="220">
            <defs>
              <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor={circleColor} />
              </radialGradient>
            </defs>
            <circle cx="110" cy="110" r="100" stroke={circleColor} strokeWidth="5" fill="url(#grad)" />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="24" fill="#343a40">
              {formatTime(time)}
            </text>
          </svg>
        </div>

        <div className="d-flex justify-content-center gap-2 flex-wrap my-4">
          {!running ? (
            <button className="btn btn-success btn-lg px-4 shadow" onClick={handleStart}>Start</button>
          ) : (
            <button className="btn btn-warning btn-lg px-4 shadow" onClick={handlePause}>Pause</button>
          )}
          <button className="btn btn-danger btn-lg px-4 shadow" onClick={handleReset}>Reset</button>
          <button className="btn btn-info btn-lg px-4 shadow text-white" onClick={handleLap} disabled={!running}>Lap</button>
        </div>

        {laps.length > 0 && (
          <div className="lap-section">
            <h5 className="text-secondary">Lap Times</h5>
            <ul className="list-group shadow-sm">
              {laps.map((lapTime, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between bg-light">
                  <span>Lap {index + 1}</span>
                  <span>{formatTime(lapTime)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
