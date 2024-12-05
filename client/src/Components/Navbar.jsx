import React, { useEffect, useState } from 'react';
import logo from "/logoSingle.png";
import { Link } from 'react-router-dom';

const Navbar = ({ sendSearchQuery }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

    // useEffect(() => {
    //     const handler = setTimeout(() => {
    //         setDebouncedSearchQuery(searchQuery);
    //     }, 500);

    //     return () => {
    //         clearTimeout(handler);
    //     };
    // }, [searchQuery]);

    // useEffect(() => {
    //     sendSearchQuery(debouncedSearchQuery);
    // }, [debouncedSearchQuery]);

    return (
        <>
            <div className="navbar">
                <div className="leftNav">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="rightNav">
                    <div className="menus">
                        <ul>
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
                                    Customize
                                </Link>
                            </li>
                            <li>
                                <Link to="/about-us">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* <div className="mobileNavbar">
                <div className="topNavbar">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className={currentRoute === "services" ? "servicePageMobile bottomNavbar" : "bottomNavbar"}>
                    <button onClick={() => { navigate("/services") }} className="navBtn joinNow">
                        Join Now
                    </button>
                    <button onClick={() => { navigate("/demo-class") }} className="navBtn freeClass">
                        Demo Class
                    </button>
                </div>
                <div className={activeMenu ? "active hamburger" : "hamburger"} onClick={() =>
                    setActiveMenu(!activeMenu)
                }>
                    <div className="line1 line"></div>
                    <div className="line2 line"></div>
                    <div className="line3 line"></div>
                </div>

                <div className={activeMenu ? "activeMenu mobileMenu" : "mobileMenu"}>
                    <ul>
                        <li className={currentRoute ? "" : "active"}>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li className={currentRoute === "about" ? "active" : ""}>
                            <Link to="/about">
                                About Us
                            </Link>
                        </li>
                        <li className={currentRoute === "services" ? "active" : ""}>
                            <Link to="/services">
                                Services
                            </Link>
                        </li>
                        <li className={currentRoute === "contact" ? "active" : ""}>
                            <Link to="/contact">
                                Contact Us
                            </Link>
                        </li>
                        <li className={currentRoute === "referral" ? "active" : ""}>
                            <Link to="/referral">
                                Referral
                            </Link>
                        </li>
                    </ul>

                    <div className="menuBottom">
                        <p className="menuSlogan">
                            Remote Learn offers a new and refreshing approach to achieving your goals.
                        </p>
                        <div className="shortLinks">
                            <a target="_blank" rel="noreferrer" >
                                <ion-icon name="logo-instagram"></ion-icon>
                            </a>
                            <a target="_blank" rel="noreferrer">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                        </div>
                        <p className="emailId">
                            <span>EMAIL: </span>admin@remotelearn.org
                        </p>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Navbar