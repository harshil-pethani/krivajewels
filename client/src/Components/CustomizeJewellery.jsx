import React from 'react'
import customize1 from '/customize1.jpg';
import customize2 from '/customize22.jpg';
import customize3 from '/customize3.jpg';
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
                <img className="small" src={customize1} alt="" />
                <img src={customize2} alt="" />
                <img src={customize3} alt="" />
            </div>
        </div>
    )
}

export default CustomizeJewellery