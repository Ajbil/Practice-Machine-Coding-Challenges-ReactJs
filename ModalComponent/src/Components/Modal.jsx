import React from "react"
import Button from './Button.jsx'
import './Modal.css'
const Modal = ({handle11Click}) => {
    return (
        <div className="modalOverlay">
            <div className="modalBody">
                <div className="modalHeader">
                    <span>Header</span>
                    <Button text = "Close" handle1Click={handle11Click} className="closeButton"/>
                </div>
                <div className="modalContent">
                    This is the modal content.
                </div>
            </div>
        </div>
    )
}

export default Modal;