import React, {useState} from "react";
import Button from '../Components/Button.jsx'
import Modal from '../Components/Modal.jsx'

// very important 
// props : handleClick:A function passed from the parent component to close the modal.
// The function will be defined on the parent level,and will be given to the modal component as a prop

const Homepage = () => {
    const [displayModal, setDisplayModal] = useState(false);
    
    const handleOpenClick = () => {
        setDisplayModal(true);
    }

    const handleCloseClick = () => {
        setDisplayModal(false);
    }

    return (
        <div>
            <h1>Home Page</h1>
            <Button  text ={'Show Modal'} handle1Click = {handleOpenClick}/>
            {displayModal && <Modal handle11Click={handleCloseClick} />}
        </div>
    )
}

export default Homepage;