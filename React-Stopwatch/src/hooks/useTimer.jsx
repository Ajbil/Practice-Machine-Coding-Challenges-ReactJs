//his custom hook encapsulates reusable timer logic like start, pause, and reset using React state and effects, allowing multiple components to share the same timer behavior without duplicating code.
//this hook will return the currenttimer value and setter function ,, which can be used by other components direclty in their code for showing the timer
import {useState, useEffect} from "react";

const useTimer = (initialValue, active, paused, completed) => {
    const [current, setCurrent] = useState(initialValue);

    useEffect(() => {
        let handler;
        if(completed){
            //reset when complete
            setCurrent(initialValue);
        }
        else if(active && !paused){
            handler = setInterval(() => {
                // Increment timer
                setCurrent((prev) => prev+1);
            },1000);
        }

        return () => clearInterval(handler);
    }, [active, paused, completed, initialValue]);

    return { current, setCurrent};
};

export default useTimer;