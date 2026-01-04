import {useState, useEffect, useRef} from "react";

function InfiniteScrollUsingIntersectionObserverAPI(){
    const [data, setData] = useState([... new Array(60)]);
    const [loading , setLoading] = useState(false);

    function loadMore(){
        setLoading(true);
        setTimeout(() => {
            setData((prev) => [...prev, ... new Array(10)]);
            setLoading(false);
        },100);
    };

    const refList  = useRef([]); // initlize it with aarray 

    useEffect(() => {
        const observer = new IntersectionObserver(function(entries) { // Now here see i have assigned observer to observe each row , so when chnage will come in any nodes visibility how will Intersection observer communicate back , for that we pass this callback function here  , this fun will be invoked internally when any visibility chnages so that control comes back from browser to js -- and in this callback function as a paramter i get any array of all those elements on which i have atttached observer 
            // console.log(entries);
            if(entries[0].isIntersecting){
                observer.unobserve(entries[0].target);
                loadMore();
            }
        });
        
        //i need to observer only th last ele,emnt 
        const lastElement = refList.current[refList.current.length -1];
        observer.observe(lastElement);

        ///cleanup
        return () => {
            observer.disconnect();
        }
    }, [data.length]);
    
    return (
        <div style={{height : "265px", overflowY :"auto", border:"10px solid white"}}>
            {
                data.map((row, index) => {
                    return (
                        <div ref={(el) => (refList.current[index] = el)} key ={index} className="row">
                            {index}
                        </div>
                    )
                })
            }
            {loading && <div>Loading ...</div>}
        </div>
    );
};

export default InfiniteScrollUsingIntersectionObserverAPI;