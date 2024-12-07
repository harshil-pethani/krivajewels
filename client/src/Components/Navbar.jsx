import { Link, useLocation } from 'react-router-dom';
import logo from "/logo.png";
import { useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const currentRoute = location.pathname.split("/")[1];
    const [activeMenu, setActiveMenu] = useState(false);

    return (
        <>
            <div className="navbar">
                <div className="leftNav">
                    <Link to="/">
                        {/* <img src={logo} alt="" /> */}
                        {/* Kriva Jewels */}
                        KRIVA JEWELS
                    </Link>
                </div>
                <div className="rightNav">
                    <div className="menus">
                        <ul>
                            <li className={currentRoute === "" ? "active" : ""}>
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            <li className={currentRoute === "explore" ? "active" : ""}>
                                <Link to="/explore">
                                    Explore
                                </Link>
                            </li>
                            <li className={currentRoute === "customize-jewellery" ? "active" : ""}>
                                <Link to="/customize-jewellery">
                                    Customize
                                </Link>
                            </li>
                            <li className={currentRoute === "about-us" ? "active" : ""}>
                                <Link to="/about-us">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mobileNavbar">
                <div className="topNavbar">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className={activeMenu ? "active hamburger" : "hamburger"} onClick={() =>
                    setActiveMenu(!activeMenu)
                }>
                    <div className="line1 line"></div>
                    <div className="line2 line"></div>
                    <div className="line3 line"></div>
                </div>

                <div className={activeMenu ? "activeMenu mobile-menu-container" : "mobile-menu-container"}>
                    <div className="mobileMenu">
                        <ul>
                            <li>
                                <Link className='logo'>
                                    <img src={logo} alt="" />
                                </Link>
                            </li>
                            <li className={currentRoute === "" ? "active" : ""}>
                                <Link to="/">
                                    <ion-icon name="home-outline"></ion-icon> Home
                                </Link>
                            </li>
                            <li className={currentRoute === "explore" ? "active" : ""}>
                                <Link to="/explore">
                                    <ion-icon name="compass-outline"></ion-icon> Explore
                                </Link>
                            </li>
                            <li className={currentRoute === "customize-jewellery" ? "active" : ""}>
                                <Link to="/customize-jewellery">
                                    <ion-icon name="hammer-outline"></ion-icon> Customize
                                </Link>
                            </li>
                            <li className={currentRoute === "term-and-conditions" ? "active" : ""}>
                                <Link to="/four-c">
                                    <ion-icon name="diamond-outline"></ion-icon> 4 C’s of Diamonds
                                </Link>
                            </li>
                            <li className={currentRoute === "why-choose-us" ? "active" : ""}>
                                <Link to="/why-choose-us">
                                    <ion-icon name="help-circle-outline"></ion-icon> Why Choose Us
                                </Link>
                            </li>
                            <li className={currentRoute === "term-and-conditions" ? "active" : ""}>
                                <Link to="/term-and-conditions">
                                    <ion-icon name="document-text-outline"></ion-icon> Terms & Conditions
                                </Link>
                            </li>
                            <li className={currentRoute === "privacy-policy" ? "active" : ""}>
                                <Link to="/privacy-policy">
                                    <ion-icon name="lock-closed-outline"></ion-icon> Privacy Policy
                                </Link>
                            </li>
                            <li className={currentRoute === "about-us" ? "active" : ""}>
                                <Link to="/about-us">
                                    <ion-icon name="people-outline"></ion-icon> About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar