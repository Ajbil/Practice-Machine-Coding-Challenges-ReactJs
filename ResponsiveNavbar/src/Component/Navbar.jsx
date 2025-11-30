import React, {useState, useEffect} from "react";
import './Navbar.css'
const Navbar = () => {
    const [clickedItemId, setClickedItemId] = useState(0); // tracks currenlty selected option
    const [sandwichClicked, setSandwichClicked] = useState(false); // toggles visibility of hamburger menu
    const [isMobile, setIsMobile] = useState(window.innerWidth < 460); // checks during initila render if mobile

    //for navbar layouut to adapts when screen resized i attach a event listene 
    const updateIsMobile = () => {
        setIsMobile(window.innerWidth < 460);
    }

    useEffect(() => {
        //add event listenet for window resize
        window.addEventListener("resize", updateIsMobile);
        //clean up - removed listen when component unmoount --- preventing memory leaks
        return () => window.removeEventListener("resize", updateIsMobile);
    },[]);

    const data = [  // each option have a unique id
        {id:"option 1", title:"Option 1"},
        {id:"option 2", title:"Option 2"},
        {id:"option 3", title:"Option 3"},
        {id:"option 4", title:"Option 4"},
        {id:"option 5", title:"Option 5"},
    ];

//Now update which item selected using its ID
const handleClick = (clickedId) => {
    setClickedItemId(clickedId);
}

const handleSandwichClick = (e) => {
    e.stopPropagation();
    setSandwichClicked(!sandwichClicked);
}

const handleOptionClick = (e, clickedId) => {
    e.stopPropagation();
    setClickedItemId(clickedId);
    setSandwichClicked(false);
}


const getSandwichOptions = () => {
    let array = [];
    data.map((item) => {
        array.push(
            <div
            key = {item.id}
            id={item.id}
            className="sandwichOption"
            style={{backgroundColor: item.id === clickedItemId ? 'lightgrey': 'whitesmoke'}}
            onClick={(e) => handleOptionClick(e,item.id)}
            >
                {item.title}
            </div>
        );
    });
    return array;
};

    return (
        <div className="navbarContainer">
            <nav>
                {isMobile ? (
                    <div
                    className="sandwichContainer"
                    onClick={(e) => handleSandwichClick(e)}>
                        <div className="sandwichLayer"></div>
                        <div className="sandwichLayer"></div>
                        <div className="sandwichLayer"></div>
                        <div className="sandwichOptionContainer">
                            {sandwichClicked && getSandwichOptions()}
                        </div>
                    </div>
                ) : (
                    data.map((item) => {
                    return(
                    <div
                    key={item.id}
                    id={item.id}
                    onClick={() => handleClick(item.id)}
                    className="navbarOptions"
                    style={{
                        borderBottom: clickedItemId === item.id ? "5px solid black" : ""
                    }}
                    >
                        {item.title}
                    </div>
                )})
                ) 
                }
            </nav>
        </div>
    )
}
export default Navbar;