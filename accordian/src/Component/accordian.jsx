import React,{useState} from "react";
import './accordian.css'
const Accordian = () => {
    const [clickedAccordian, setClickedAccordian] = useState(null);

    const data = [
        {
            header:"Header 1",
            content:"Content 1",
        },
        {
            header:"Header 2",
            content:"Content 2",
        },
        {
            header:"Header 3",
            content:"Content 3",
        },
        {
            header:"Header 4",
            content:"Content 4",
        }
    ];

    const handleHeaderClick = (index) => {
        //toggle the accordian
        setClickedAccordian(clickedAccordian === index ? null : index);
    } 
    return (
        <div className="componentContainer">
            <h1>Accordian</h1>
            {data.map((item,index) => (
                <div key={index} className="accordianContainer">
                    <div className = "accordianHeader" onClick={() => handleHeaderClick(index)}>{item.header}</div>
                    {clickedAccordian === index && (
                        <div className="accordianBody">{item.content}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordian;