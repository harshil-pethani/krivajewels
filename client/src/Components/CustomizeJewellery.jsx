import React from 'react'
import customize from '/customize.png';
import { useNavigate } from 'react-router-dom';
import { customizeJewellerySlogan, customizeJewelleryTitle } from '../Config/Static_data';

const CustomizeJewellery = () => {
    const navigate = useNavigate();

    return (
        <div id='services' className="customize-jewellery-component">
            <div className="left">
                <p className="title">
                    {customizeJewelleryTitle}
                </p>
                <p className="description">
                    {customizeJewellerySlogan}
                </p>
                <button onClick={() => { navigate("/customize-jewellery") }} className="learnmore">
                    Explore <ion-icon name="arrow-forward"></ion-icon>
                </button>
            </div>
            <div className="right">
                <img src={customize} alt="" />
            </div>
        </div>
    )
}

export default CustomizeJewellery;