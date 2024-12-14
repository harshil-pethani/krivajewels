import React from 'react';
import product from '/product.png';
import crossDiamond from '/crossDiamond.png';
import support from '/support.png';
import { serviceDiamond, serviceGuidance, serviceProduction } from '../Config/Static_data';

const Services = () => {
    return (
        <div id='contact' className="services-component">
            <div className="service">
                <img className="cross-diamond" src={crossDiamond} alt="" />
                <p className="description">
                    {serviceDiamond}
                </p>
            </div>
            <div className="service">
                <img src={product} alt="" />
                <p className="description">
                    {serviceProduction}
                </p>
            </div>
            <div className="service">
                <img src={support} alt="" />
                <p className="description">
                    {serviceGuidance}
                </p>
            </div>
        </div>
    )
}

export default Services