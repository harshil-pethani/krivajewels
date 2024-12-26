import React from 'react'
import { Link } from 'react-router-dom';
import IGI from "/IGI.png";
import SGL from "/SGL.png";
import BIS from "/BIS.png";
import logo from "/logo.png";
import { aboutDescription, information, mailId, mobileNumber, tab_4Cs, tab_aboutUs, tab_customizeJewellery, tab_explore, tab_home, tab_privacyPolicy, tab_termsAndConditions, tab_whyChooseUs, usefulLinks } from '../Config/Static_data';

const Footer = () => {
    return (
        <div className="footerContainer">
            <div className="footer">
                <div className="leftnew">
                    <Link to="/" className="logo">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="center">
                    <div className="inner-center">
                        <div className="useful-links-container">
                            <h2 className='footer-title'>
                                {usefulLinks}
                            </h2>
                            <ul className='useful-links'>
                                <li>
                                    <Link to="/">
                                        {tab_home}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/explore">
                                        {tab_explore}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/customize-jewellery">
                                        {tab_customizeJewellery}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about-us">
                                        {tab_aboutUs}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="useful-links-container">
                            <h2 className='footer-title'>
                                {information}
                            </h2>
                            <ul className='useful-links'>
                                <li>
                                    <Link to="/why-choose-us">
                                        {tab_whyChooseUs}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/privacy-policy">
                                        {tab_privacyPolicy}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/term-and-conditions">
                                        {tab_termsAndConditions}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/four-c">
                                        {tab_4Cs}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="socialIcons">
                        <a href={`tel:${mobileNumber}`} target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="call-outline"></ion-icon>
                        </a>
                        <a href={`mailto:${mailId}`} target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="mail-outline"></ion-icon>
                        </a>
                        <a href='' target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="logo-facebook"></ion-icon>
                        </a>
                        <a href='' target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="logo-youtube"></ion-icon>
                        </a>
                        <a href='' target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="logo-linkedin"></ion-icon>
                        </a>
                        <a href='' target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="logo-instagram"></ion-icon>
                        </a>
                    </div>
                </div>
                <div className="rightNew">
                    <h2 className='footer-title'>
                        {tab_aboutUs}
                    </h2>
                    <p className='about-text'>
                        {aboutDescription}
                    </p>
                    <div className="certifications">
                        <div className="certification">
                            <img src={IGI} alt="" />
                        </div>
                        <div className="certification">
                            <img src={SGL} alt="" />
                        </div>
                        <div className="certification">
                            <img src={BIS} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer;