import {useState} from "react";

const threshold = 20;  // i will use this to call loadMore function  

function InfiniteScrollDomApi(){
    const [data, setData] = useState([... new Array(40)]);
    const [loading, setLoading] = useState(false);  //this loading state is very good optimisation we didi here , see gemeini to undersatnd , as when user hits threshold , it prevent the setTimeout dunction to get called more that 50+ times because scroll event fires dozens of time per second 

    function loadMore() {
        setLoading(true);
        setTimeout(() => {
            setData((prev) => [...prev, ...new Array(10)]);
            setLoading(false);
        },1000);
    }

    function handleScroll(event){
        // console.log(event.target.scrollTop);
        // console.log(event.target.clientHeight);
        // console.log(event.target.scrollHeight);
        // -- formula for finding remaining scroll = scrollHeight - (clientHeoght + scrollTop)
        const scrollTop  = event.target.scrollTop;
        const clientHeight = event.target.clientHeight;
        const scrollHeight = event.target.scrollHeight;

        const remainingScroll  = scrollHeight - (scrollTop + clientHeight);
        // console.log(remainingScroll);
        if(remainingScroll < threshold && !loading){ 
            loadMore();
        }
    };
    
    return (
        <div onScroll={handleScroll}
        style={{height: "265px", overflowY :"auto", border:"10px solid white", alignItems:"center", margin: "200px"}}>
            {
                data.map((row,index) => {
                    return (
                        <div key={index} >
                            {index}
                        </div>
                    );
                })
            }
            {loading && <div>Loading ...</div>}
        </div>
    );
}

export default InfiniteScrollDomApi;