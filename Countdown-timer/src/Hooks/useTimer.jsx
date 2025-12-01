import {useState, useEffect} from "react"

const useTimer = (hoursEntered, minutesEntered, secondsEntered, started, setStarted) => {
    let totalSecondsInput = 
    Number(secondsEntered)+
    Number(minutesEntered*60)+
    Number(hoursEntered*3600);
    console.log('started', started)
    const [secondsLeft, setSecondLeft] = useState(totalSecondsInput);

    useEffect(() => {
        if(!started) return;
        setSecondLeft(totalSecondsInput);
        let interval = setInterval(() => {
            setSecondLeft((prev) => {
                if(prev === 1){
                    clearInterval(interval);
                    setStarted(false);
                    return 0;
                }
                return prev-1;
            })
        },1000);

        return () => clearInterval(interval);
    }, [started, totalSecondsInput]);

    return {secondsLeft};
};

export default useTimer;