import {useState} from "react";
import useTimer from './hooks/useTimer.jsx';
import './App.css';

function App(){
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [completed, setCompleted] = useState(false);

  const {current} = useTimer(10,active,paused,completed);

  const handleStartOrResumeClick = () => {
    setActive(true);
    setCompleted(false); // reset the completed state
    setPaused(false);
  };

  const handlePauseButtonClick = () => {
    setPaused(true);
  }

  const handleStopButtonClick = () => {
    setCompleted(true);
    setActive(false);
    setPaused(false); 
  };


  return (
    <>
      <h1 className="header">React Timer</h1>
      <div className="container">
        <div className="card">
        {/* Start/Resume Button */}
        <button className="btn"
        onClick={handleStartOrResumeClick}
        disabled={active && !paused} // disabled when running
        >
          {paused ? "Resume" : "Start"}
        </button>

        {/* Pause Button */}
        <button className="btn" onClick={handlePauseButtonClick}
        disabled={!active || paused}>
          Pause
        </button>

        {/* Timer Display */}
        <div className="lbl">Current : {current}</div>

        {/* Stop Button */}
        <button className="btn" onClick={handleStopButtonClick} disabled={completed}>
          Stop
        </button>
      </div>
      </div>
      
    </>
  );
}

export default App;