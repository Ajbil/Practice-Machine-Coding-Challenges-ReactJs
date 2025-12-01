import React from "react";

const InputComponent = ({type, onChange, name, error}) => {
    return (
        <div className="input-holder">
            <label>{name}</label>
            <input type={type} onChange = {onChange}></input>
            {error.length > 0 && <p>{error}</p>}
        </div>
    );
};

export default InputComponent;

/*
Dynamic Label and Input:
 ● Thenameprop dynamically renders the label for each field.
 ● Thetypeprop ensures flexibility to handle different input types
*/