import {useState, useEffect } from "react";

function readValueFromLS(key,initialValue){
    if(typeof window === "undefined") return initialValue;

    try{
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    }
    catch(err){
        console.error("Error reading localStorage key", key, err);
        return initialValue;
    }
};

export default function useLocalStorage(key, initialValue){
    const [storedValue, setStoredValue] = useState(() => readValueFromLS(key,initialValue));

    useEffect(() => {
        try{
            window.localStorage.setItem(key,JSON.stringify(storedValue));
        }
        catch(err){
            console.error("Error setting localStorage key", key, err);
        }
    }, [key,storedValue]);

    return [storedValue, setStoredValue];
};