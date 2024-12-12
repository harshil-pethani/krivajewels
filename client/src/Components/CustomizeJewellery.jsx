import React from 'react'
import customize from '/customize.png';
import { useNavigate } from 'react-router-dom';

const CustomizeJewellery = () => {
    const navigate = useNavigate();
    return (
        <div id='services' className="customize-jewellery-component">
            <div className="left">
                <p className="title">
                    Upload your Jewelry for Personalized evaluation & feedback
                </p>
                <p className="description">
                    Want to know more about your custom jewelry? Upload detailed photos and ask your specific questions. Our team will offer personalized insights, helping you learn more about your cherished pieces.
                </p>
                <button onClick={() => { navigate("/customize-jewellery") }} className="learnmore">
                    Learn more <ion-icon name="arrow-forward"></ion-icon>
                </button>
            </div>
            <div className="right">
                <img src={customize} alt="" />
            </div>
        </div>
    )
}

export default CustomizeJewellery