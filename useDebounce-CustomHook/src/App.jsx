import React, {useState} from "react";
import useDebounce from "./components/useDebounce.jsx";


const App = () =>{
  //holds raw user inout
  const [inputValue, setInputValue] = useState("");

  //debounces the input after a 5 sec delay
  const debouncedValue = useDebounce(inputValue,5000);

  const handleChange = (e) => {
    //update the input state
    setInputValue(e.target.value);
  };

  return (
    <>
      <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder="Type to search..."></input>
      <div>Live User Input : {inputValue}</div>
      <div>Debounced value : {debouncedValue}</div>
    </>
  );
}

export default App;