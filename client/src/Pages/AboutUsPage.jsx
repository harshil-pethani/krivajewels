import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import value from "/Customize/value.png";
import vision from "/Customize/eye.png";
import mission from "/Customize/mission.png";
import { mobileNumber } from '../Config/API_constant';

const CustomizePage = () => {
    const [showScroll, setShowScroll] = useState(false);
    const [customizeForm, setCustomizeForm] = useState({ firstname: "", lastname: "", email: "", phone: "", budget: "", category: "", metal: "", metalTone: "", message: "" });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const localFilters = JSON.parse(localStorage.getItem("KrivaFilters"));
        setCategories(localFilters[0]?.data?.map((category) => (category.title)));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        const message = `FirstName: ${customizeForm.firstname}%0ALastname: ${customizeForm.lastname}%0AEmail: ${customizeForm.email}%0AMobile: ${customizeForm.phone}%0ABudget: ${customizeForm.budget}%0ACategory: ${customizeForm.category}%0AMetal: ${customizeForm.metal}%0AMetalTone: ${customizeForm.metalTone}%0AMessage: ${customizeForm.message}`;

        const phoneNumber = mobileNumber;
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 20) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 20) {
            setShowScroll(false)
        }
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className="CustomizePage" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar sendSearchQuery={(queryString) => { setSearchQuery(queryString); }} />
            <div className="simple-text-component">
                <p className="title">
                    About Us
                </p>
                <div className="text-content-container">
                    <div className="text-content">
                        <div className="content-description">
                            <p>
                                Where Beauty Meets Sustainability And Ethics. Our Story Began With A Passion For Lab Grown Diamonds And A Deep Commitment To Creating A Better World.
                            </p>
                            <p>
                                We Know Lab Diamonds. You Know You. We Want To Share Our Extensive Knowledge Of Lab Grown Diamond Jewelry With You So, You Can Find The Right Engagement Ring, Wedding Band, Or Whatever Piece That You’re Looking For. It’s Dignified Moment For Ourselves To Serve You Better Love Symbolism Lab Grown Diamond Jewelry.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-image-container">
                    <p className="sub-title">
                        Value
                    </p>
                    <div className="content">
                        <div className="left">
                            <div className="imgBox">
                                <img src={value} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <p className="desc">
                                Integrity, Transparency, Accountability And Credibility Are The Values We Cherish And Adhere To In All Aspects Of Dealings With Our Employees, Clients And Associates.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-image-container">
                    <p className="sub-title">
                        Vision
                    </p>
                    <div className="content">

                        <div className="left">
                            <div className="imgBox">
                                <img src={vision} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <p className="desc">
                                After the design has been finalized, Luxica provides the customer with a quote for the custom piece of Jewelry. The quote includes the Price of Gold, Lab Grown Diamond, and making charge.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-image-container">
                    <p className="sub-title">
                        Mission
                    </p>
                    <div className="content">
                        <div className="left">
                            <div className="imgBox">
                                <img src={mission} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <p className="desc">
                                After the Luxica has created design, we send a photo or digital rendering to the customer for approval, the customer can provide feedback and request any changes the want made.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CustomizePage;