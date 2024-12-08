import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const PomodoroTimer = () => {
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            toast(isWorkTime ? "Time for a break!" : "Back to work!");
            setIsWorkTime(!isWorkTime);
            return isWorkTime ? breakDuration : workDuration;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isWorkTime, workDuration, breakDuration]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(workDuration);
    setIsWorkTime(true);
  };

  const handleWorkDurationChange = (e) => {
    const value = Math.max(1, Math.min(60, Number(e.target.value)));
    setWorkDuration(value * 60);
    setTimeLeft(value * 60);
  };

  const handleBreakDurationChange = (e) => {
    const value = Math.max(1, Math.min(60, Number(e.target.value)));
    setBreakDuration(value * 60);
  };

  return (
    <div>
      <Toaster />
      <h1>{isWorkTime ? "Work Time" : "Break Time"}</h1>
      <div>{formatTime(timeLeft)}</div>
      <div>
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <label>
          Work Duration (minutes):
          <input
            type="number"
            value={workDuration / 60}
            onChange={handleWorkDurationChange}
            disabled={isRunning}
          />
        </label>
      </div>
      <div>
        <label>
          Break Duration (minutes):
          <input
            type="number"
            value={breakDuration / 60}
            onChange={handleBreakDurationChange}
            disabled={isRunning}
          />
        </label>
      </div>
    </div>
  );
};

export default PomodoroTimer;
