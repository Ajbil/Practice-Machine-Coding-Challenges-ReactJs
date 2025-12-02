import {useState, useEffect, useRef} from "react"

const useThrottle = (input, interval) => {
    const [value,setValue] = useState(input); /// holds the throttled value
    const prevCall = useRef(0); //tracks the last update time

    useEffect(() => {   
        //current timestamp
        const now = Date.now();
        const remainingTime = interval - (now - prevCall.current); 
        if(remainingTime > 0){
            const handler = setTimeout(() => {
                setValue(input);
                //update thhe last call timestmap
                prevCall.current = Date.now();
            },remainingTime);
            //ceanup timeout
            return () => clearTimeout(handler);
        }
        else{
            //update immediately if wenough time has alreaady passed 
            setValue(input);
            prevCall.current = now;
        }
    },[input,interval]); // re-run whenever input or interval changes 

    return value; // return throttled value
};

export default useThrottle;