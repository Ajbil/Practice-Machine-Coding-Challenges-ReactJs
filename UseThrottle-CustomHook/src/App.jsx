import { useState } from "react";

import useThrottle from "./Hooks/useThrottle";

function App(){
  const [userInput, setUserInput] = useState(""); // captures live user input
  //throttles value updates every 5 sec
  const throttledValue = useThrottle(userInput,5000);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <input
      type="text"
      placeholder="Type here ..."
      onChange={handleChange}></input>
      <div>Live Input : {userInput}</div>
      <div>Throttled OOutput: {throttledValue}</div>
    </div>
  );
};  

export default App;