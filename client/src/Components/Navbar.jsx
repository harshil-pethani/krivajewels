import { Link, useLocation } from 'react-router-dom';
import logo from "/logo.png";
import { useState } from 'react';
import { tab_4Cs, tab_aboutUs, tab_customize, tab_explore, tab_home, tab_privacyPolicy, tab_termsAndConditions, tab_whyChooseUs } from '../Config/Static_data';

const Navbar = () => {
    const location = useLocation();
    const currentRoute = location.pathname.split("/")[1];
    const [activeMenu, setActiveMenu] = useState(false);

    const handleOutsideClick = (e) => {
        if (e.target.className.includes("mobile-menu-container")) {
            setActiveMenu(false);
        }
    }

    return (
        <>
            <div className="navbar">
                <div className="leftNav">
                    <Link to="/">
                        KRIVA JEWELS
                    </Link>
                </div>
                <div className="rightNav">
                    <div className="menus">
                        <ul>
                            <li className={currentRoute === "" ? "active" : ""}>
                                <Link to="/">
                                    {tab_home}
                                </Link>
                            </li>
                            <li className={currentRoute === "explore" ? "active" : ""}>
                                <Link to="/explore">
                                    {tab_explore}
                                </Link>
                            </li>
                            <li className={currentRoute === "customize-jewellery" ? "active" : ""}>
                                <Link to="/customize-jewellery">
                                    {tab_customize}
                                </Link>
                            </li>
                            <li className={currentRoute === "about-us" ? "active" : ""}>
                                <Link to="/about-us">
                                    {tab_aboutUs}
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

                <div className={activeMenu ? "activeMenu mobile-menu-container" : "mobile-menu-container"} onClick={handleOutsideClick}>
                    <div className="mobileMenu">
                        <ul>
                            <li>
                                <Link className='logo'>
                                    <img src={logo} alt="" />
                                </Link>
                            </li>
                            <li className={currentRoute === "" ? "active" : ""}>
                                <Link to="/">
                                    <ion-icon name="home-outline"></ion-icon> {tab_home}
                                </Link>
                            </li>
                            <li className={currentRoute === "explore" ? "active" : ""}>
                                <Link to="/explore">
                                    <ion-icon name="compass-outline"></ion-icon> {tab_explore}
                                </Link>
                            </li>
                            <li className={currentRoute === "customize-jewellery" ? "active" : ""}>
                                <Link to="/customize-jewellery">
                                    <ion-icon name="hammer-outline"></ion-icon> {tab_customize}
                                </Link>
                            </li>
                            <li className={currentRoute === "four-c" ? "active" : ""}>
                                <Link to="/four-c">
                                    <ion-icon name="diamond-outline"></ion-icon> {tab_4Cs}
                                </Link>
                            </li>
                            <li className={currentRoute === "why-choose-us" ? "active" : ""}>
                                <Link to="/why-choose-us">
                                    <ion-icon name="help-circle-outline"></ion-icon> {tab_whyChooseUs}
                                </Link>
                            </li>
                            <li className={currentRoute === "term-and-conditions" ? "active" : ""}>
                                <Link to="/term-and-conditions">
                                    <ion-icon name="document-text-outline"></ion-icon> {tab_termsAndConditions}
                                </Link>
                            </li>
                            <li className={currentRoute === "privacy-policy" ? "active" : ""}>
                                <Link to="/privacy-policy">
                                    <ion-icon name="lock-closed-outline"></ion-icon> {tab_privacyPolicy}
                                </Link>
                            </li>
                            <li className={currentRoute === "about-us" ? "active" : ""}>
                                <Link to="/about-us">
                                    <ion-icon name="people-outline"></ion-icon> {tab_aboutUs}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;