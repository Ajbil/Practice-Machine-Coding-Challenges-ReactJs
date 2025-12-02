import {useEffect, useRef, useState} from "react"

const useDebounce = (value,interval) => {
    //holds the debounced value
    const[debouncedValue, setDebouncedValue] = useState(value);

    //tracks last update time
    const lastExecutionTime = useRef(Date.now());

    useEffect(() => {
        const timeElaspsed = Date.now() - lastExecutionTime.current;

        if(timeElaspsed > interval){
            //update immediately if enough time has pased
            setDebouncedValue(value);
            lastExecutionTime.current = Date.now();
        }
        else{
            const remainingTime= interval- timeElaspsed;

            const handler = setTimeout(() => {
                //update after the emaining delay
                setDebouncedValue(value);
                lastExecutionTime.current= Date.now();
            },remainingTime);

            return () => {
                clearTimeout(handler); // cleanup the timeout on value or interval change 
            };
        }
    },[value,interval]);

    return debouncedValue;
};


export default useDebounce;