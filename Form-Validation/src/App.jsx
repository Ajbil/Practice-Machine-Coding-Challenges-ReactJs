import './App.css'
import InputComponent from './Components/InputComponent'
import {useState} from "react";
import useLocalStorage from './hooks/useLocalStorage';

/*
 Itusestwostatevariables:userInputtostorethevaluesenteredintoeachfieldanderrors
 totrackanyvalidationissues.Asuserstype, thehandleUserInputfunctionupdates
 userInputdynamicallyfortherelevant field
*/
function App(){
  const [userInput, setUserInput] = useState({
    firstName:"",
    lastName:"",
    mobile:"",
    password:""
  });

  const [errors, setErrors] = useState({
    firstName:"",
    lastName:"",
    mobile:"",
    password:""
  });

  // will hold the last valid submission in localStorage
  const[storedForm, setStoredForm] = useLocalStorage("userFormData",null);

  const isValidValue = () =>{
    //firstl initilize a new error object 
    const errorObj = {
      firstName:"",
      lastName:"",
      mobile:"",
      password:""
    };

    if(userInput.firstName.length < 5){
      errorObj.firstName = "Please enter a longer value";
    }else{
      errorObj.firstName ="";
    }

    if (userInput.lastName.length < 2) {
      errorObj.lastName = "Please enter a longer value";
    } else {
      errorObj.lastName = "";
    }

    if (userInput.mobile.length !== 10 || isNaN(userInput.mobile)) {
      errorObj.mobile = "Please enter a valid 10-digit mobile number";
    } else {
      errorObj.mobile = "";
    }


    if (userInput.password.length < 8) {
      errorObj.password = "Please enter a password with at least 8 characters";
    } else {
      errorObj.password = "";
    }

    setErrors(errorObj);

    //imp line
    return !Object.values(errorObj).some((error) => error !== "");
  };

  //here using only single function for handling user input so its bvery important to defien type to know which field user is typing 
  const handleUserInput = (e,type) => {
    let value = e.target.value;
    //imp line syntax
    let userNewInput = {...userInput, [type]:value};
    setUserInput(userNewInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = isValidValue();
    if(isValid){
      console.log("form is valid");
      // save current userInput into localStorage via hook
      setStoredForm(userInput);
    }
    else{
      console.log("form has error");
    }
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <InputComponent 
        name="First Name"
        type="text"
        onChange={(e) => handleUserInput(e, "firstName")}
        error={errors.firstName}
        />

        <InputComponent 
        name="last Name"
        type="text"
        onChange={(e) => handleUserInput(e, "lastName")}
        error={errors.lastName}
        />

        <InputComponent 
        name="Mobile"
        type="text"
        onChange={(e) => handleUserInput(e, "mobile")}
        error={errors.mobile}
        />

        <InputComponent 
        name="password"
        type="password"
        onChange={(e) => handleUserInput(e, "password")}
        error={errors.password}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}


export default App;