import {useState} from "react"

export default function VirtualizedList({list, height, width, itemHeight}){
    const [indices, setIndices] = useState([0,Math.floor(height/itemHeight)]);
    const visibleList = list.slice(indices[0],indices[1]+1);

    const handleScroll = (e) => {
        const {scrollTop } = e.target;
        console.log(scrollTop);
        const newStartIndex  = Math.floor(scrollTop/itemHeight);
        const newEndIndex = newStartIndex + Math.floor(height/ itemHeight);
        setIndices([newStartIndex,newEndIndex])
    }
    return (
        <div className="container" onScroll={handleScroll} style={{height,width, backgroundColor:"grey", margin: "200px",overflow:"auto"}}>
        <div style={{height: list.length * itemHeight, position:'relative'}}>
        {
            visibleList.map((item,index) => {
                const actualIndex = indices[0] + index;
                return (
                    <div 
                    key={indices[0]+index} 
                    style={{
                        height:itemHeight, 
                        backgroundColor:"coral", 
                        borderTop: '5px solid grey',
                        position:'absolute',
                        // top:(indices[0] + index)*itemHeight,
                        transform: `translateY(${actualIndex * itemHeight}px)`,
                        width:"100%",
                        textAlign:"center"
                        }}>
                        {"Item " + item}
                    </div>
                )
            })
        }
        </div>
        </div>
    )
}