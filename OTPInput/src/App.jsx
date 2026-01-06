import { useState, useRef,useEffect} from "react";
import "./App.css"

const OTP_DIGIT_COUNT = 5; // my this component is modular and scalable as i can change any day this digit count acc to need like 4 digit or 6 digit otp 

export default function App(){
  const [optInput, setOtpInput] = useState(new Array(OTP_DIGIT_COUNT).fill(""));
  //Now for focusing on the input text box and chanign focus i need refence of iput for that useRef hook is needed 
  const refArr = useRef([]);   //VVIMP 

  //Now i want wehn reload auto focus on first input foic -- useEffect 
  useEffect(() =>{
    refArr.current[0]?.focus();  // nulllish collapsing imp to prevent app from crashing 
  },[]);

  const handleChange = (e,index) =>{
    const value = e.target.value;
    // console.log(value);
    if(isNaN(value))return;
    const newValue = value.trim();  // very imp as i dont want whitespace to be considerd 
    
    //here i will set otpinput and how to do it is very imp ,, dont change the input array directly always make a copy , as rray are passed by reference 
    const newArr = [...optInput];
    newArr[index] = newValue.slice(-1); // here now i want whatever use type i want to assign only th last number to my current index use slice(-1)
    setOtpInput(newArr);

    //now after setting current input box i want to move to next- focus on it 
    newValue && refArr.current[index+1]?.focus();  // here newValue && very imp to add becasue i want to move to next index only if its not whitespce 
  }

  const handleOnKeyDown = (e,index) => {
    // console.log(e);
    //Here very imp bug i noticed that backspace is triggered after wards first i move to rpevious index -- i want pehle current index ki value pe backspace run ho and then i move my ref to previosu index
    if(!e.target.value && e.key === "Backspace"){
      refArr.current[index-1]?.focus();
    }
  }

  return <div className="App">
    <h1>OTP Input</h1> 
    {
      optInput.map((input,index)=>{
        return <input 
        className="otp-input" 
        key={index} 
        type="text" 
        value={optInput[index]}
        ref={(input) => (refArr.current[index] = input)} // VVIMP -- Now i want each input box to be one refence array so i need to tie input to refArr.current(its an array so i need to pprovide index )
        onChange={(e) => handleChange(e,index)}// here very imp to inclde key when using map otherwise marks deducted , // next imp  step is to bind my input box with otp Array
        onKeyDown={(e) => handleOnKeyDown(e,index)}//Now i want that on backspace press i mive to rpeveiosu inoput box for that onlKeyDown event is there 
        ></input>
      })
    }
  </div>
}