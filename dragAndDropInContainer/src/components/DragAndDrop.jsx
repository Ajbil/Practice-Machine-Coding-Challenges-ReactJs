import { useState , useRef} from "react";

export default function DragAndDrop ({InitialData}){
    // console.log(InitialData);
    const [data, setData] = useState(InitialData);

    const dragItem = useRef(null);
    const dragContainer = useRef(null);

    const handleDragStart = (e,item,container) => { // Now this item and contianeer i will use when i will perform drop , SO I NEED TO STORE THEN DOM NODE REFERNCE IT MEANS IN REACT FOR THIS USE useRef hoomk
        e.target.style.opacity = "0.5";
        dragItem.current = item;
        dragContainer.current = container;
    }

    const handleDragEnd = (e) => {
        e.target.style.opacity = "1"
    }

    const handleDrop = (e,targetContainer) => {
        // here i will chnage the stete - logic is here 
        const item = dragItem.current; // 1. capture item to drop from ref
        const sourceContainer = dragContainer.current;  //2. capture container from where drag started 
        setData((prev) => { // use callback to change stae 
            const newData = {...prev}; // shallow copy of prev state
            newData[sourceContainer] = newData[sourceContainer].filter((i)=>i !== item); // remoe that item from source contsiner
            newData[targetContainer] = [...newData[targetContainer], item]; //add that item to target container
            return newData; //return new state
        })
    }

    const handleDragOver = (e) =>{
        e.preventDefault();
    }

    return <div style={{display:"flex", justifyContent: "space-around"}}>
        {
            Object.keys(data).map((container,index) => {
                return <div key={index}
                onDrop = {(e) => handleDrop(e, container)}  // here i need to pass infotmatioon that on which co tianeer i droppped 
                onDragOver={handleDragOver}  // VERY VERY IMP AS BY DEFAULT DROP IS PREVERNTED BY BROWSEERR 
                style={{
                    background:"#f0f0f0",
                    padding:"1rem",
                    width: 250, // in react by default it turns to 250 px
                    minHeight: 300 //This is important for UX. Even if a column is empty (like if you move all "Todo" items to "In Progress"), the column stays visible as a drop zone rather than collapsing to zero height.
                }}>
                        <h2>{container}</h2>
                        {data[container].map((item,idx) =>{
                            return <div key={idx}
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, item ,container)} // here i need to pass infirmation that from which container and which item i am draggging
                            onDragEnd={handleDragEnd}
                            style={{
                                userSelect:"none", //This is a pro-tip for drag-and-drop. It prevents the text inside the card from being accidentally highlighted/selected while the user is trying to drag the item
                                padding:16,
                                margin:"0 0 8px 0",
                                backgroundColor : "white",
                                cursor: "move"  // good visual effect when we drag and drop
                            }}>
                                {item}
                            </div>
                        })}
                </div>
            })
        }
    </div>
}