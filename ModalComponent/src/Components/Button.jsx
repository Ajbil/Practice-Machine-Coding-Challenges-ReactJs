import React from "react";

const Button = ({text, handle1Click}) => {
    return (
        <button onClick={handle1Click}>
            {text}
        </button>
    )
}

export default Button;