import React from 'react'
import { Link } from 'react-router-dom';
import IGI from "/IGI.png";
import SGL from "/SGL.png";
import BIS from "/BIS.png";
import logo from "/logo.png";

const Footer = () => {
    return (
        <div className="footerContainer">
            <div className="footer">
                <div className="leftnew">
                    {/* <h2 className="footer-title">
                        Get in Touch
                    </h2> */}
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    {/* <p className="sub-detail">
                        <ion-icon name="mail-outline"></ion-icon>
                        <span> admin@krivajewels.com</span>
                    </p>
                    <p className="sub-detail">
                        <ion-icon name="call-outline"></ion-icon>
                        <span> +91 86464 23532</span>
                    </p> */}
                    {/* <p className="sub-detail">
                        <ion-icon name="time-outline"></ion-icon>
                        <span>(09:00AM to 06:00PM Mon to Sat)</span>
                    </p> */}

                </div>
                <div className="center">
                    <div className="inner-center">
                        <div className="useful-links-container">
                            <h2 className='footer-title'>
                                Useful Links
                            </h2>
                            <ul className='useful-links'>
                                <li>
                                    <Link to="/">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/explore">
                                        Explore
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/customize-jewellery">
                                        Cutomize Jewellery
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about-us">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="useful-links-container">
                            <h2 className='footer-title'>
                                Information
                            </h2>
                            <ul className='useful-links'>
                                <li>
                                    <Link to="/why-choose-us">
                                        Why Choose Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/privacy-policy">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/term-and-conditions">
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/four-c">
                                        The 4 C’s of Diamonds
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="socialIcons">
                        <a target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="logo-facebook"></ion-icon>
                        </a>
                        <a target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="logo-facebook"></ion-icon>
                        </a>
                        <a target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="logo-facebook"></ion-icon>
                        </a>
                        <a target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="logo-youtube"></ion-icon>
                        </a>
                        <a target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="logo-linkedin"></ion-icon>
                        </a>
                        <a target="_blank" rel="noreferrer" className="icon">
                            <ion-icon name="logo-instagram"></ion-icon>
                        </a>
                    </div>
                </div>
                <div className="rightNew">
                    <h2 className='footer-title'>
                        About Us
                    </h2>
                    <p className='about-text'>
                        Ethical elegance, certified! Shine responsibly with IGI/SGL & BIS Hallmark assurance, piece after precious piece.
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