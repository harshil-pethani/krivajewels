import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import design from "/Customize/design.png";
import approval from "/Customize/approval.png";
import certification from "/Customize/certification.png";
import inspection from "/Customize/inspection.png";
import order from "/Customize/order.png";
import production from "/Customize/production.png";
import quote from "/Customize/quote.png";
import returnImage from "/Customize/return.png";
import shipped from "/Customize/shipped.png";
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
                    Cutomize Jewellery
                </p>
                <p className="main-sub-title">
                    Jewellery customization process
                </p>
                <div className="text-image-container">
                    <p className="sub-title">
                        1. Design
                    </p>
                    <div className="content">
                        <div className="left">
                            <div className="imgBox">
                                <img src={design} alt="" />
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
                        2. Quote
                    </p>
                    <div className="content">

                        <div className="left">
                            <div className="imgBox">
                                <img src={quote} alt="" />
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
                        3. Design Approval
                    </p>
                    <div className="content">
                        <div className="left">
                            <div className="imgBox">
                                <img src={design} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <p className="desc">
                                After the Luxica has created design, we send a photo or digital rendering to the customer for approval, the customer can provide feedback and request any changes the want made.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-image-container">
                    <p className="sub-title">
                        4. Order Confirmation
                    </p>
                    <div className="content">
                        <div className="left">
                            <div className="imgBox">
                                <img src={order} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <p className="desc">
                                If the customer decides to proceed with the purchase, they can make an advance payment online using a secure payment system. Remain Payment at Product Delivery time in COD or Online.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-image-container">
                    <p className="sub-title">
                        5. Production
                    </p>
                    <div className="content">
                        <div className="left">
                            <div className="imgBox">
                                <img src={production} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <p className="desc">
                                Once the payment is received, Luxica begins the production process. Diamonds are carefully selected and expertly crafted into stunning pieces of Jewelry.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-image-container">
                    <p className="sub-title">
                        6. Inspection
                    </p>
                    <div className="content">
                        <div className="left">
                            <div className="imgBox">
                                <img src={inspection} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <p className="desc">
                                The finished piece is thoroughly inspected By Luxica’s Expert Team to ensure that it meets the customer's requirements and is of the highest quality.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-image-container">
                    <p className="sub-title">
                        7. Certifications
                    </p>
                    <div className="content">
                        <div className="left">
                            <div className="imgBox">
                                <img src={certification} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <p className="desc">
                                Luxica’s Provides IGI Certificate for Solitaire Diamonds and SGL Certificate for Jewelry. Also Provide Gold with Hallmarking.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-image-container">
                    <p className="sub-title">
                        8. Shipping & Delivery
                    </p>
                    <div className="content">
                        <div className="left">
                            <div className="imgBox">
                                <img src={shipped} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <p className="desc">
                                Once the piece is complete, Luxica ships it to the customer's address. They may offer free or expedited shipping with 100% Insurance.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-image-container">
                    <p className="sub-title">
                        9. Return & Exchange
                    </p>
                    <div className="content">
                        <div className="left">
                            <div className="imgBox">
                                <img src={returnImage} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <p className="desc">
                                Luxica offer 80% resale at that time of market value for Lab Grown Diamonds & 100% for Gold
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-content-container">
                    <div className="text-content">
                        <p className="content-title">
                            What are custom orders?
                        </p>
                        <div className="content-description">
                            <p>
                                It’s the most common question often asked, and the answer is when you don’t find any Jewelry from the store that you would like to buy. Still, if you love our craftsmanship, stones, and work, we will custom-make Jewelry for you, just share the reference images or ideas, and we will convert an idea into more .
                            </p>
                        </div>
                    </div>
                    <div className="text-content">
                        <p className="content-title">
                            What is the process of custom orders?
                        </p>
                        <div className="content-description">
                            <p>
                                We have a straightforward custom order process, and we keep the customer a part of the process throughout; below is the process cycle.
                            </p>
                            <p>
                                A. Once the order is received, we will share CAD with you for approval; If you need any changes, we will do it, and the revised CAD will be shared.
                            </p>
                            <p>
                                B. Once the CAD is confirmed, we will cut and polish the stones, and images/videos of stones will be shared for stone check before setting.
                            </p>
                            <p>
                                C. Upon confirmation, we will complete the ring, and if requested, we will also share process images.
                            </p>
                            <p>
                                D. Once the order is ready, we will share the final images and video before shipping, and then the Jewelry will be shipped.
                            </p>
                        </div>
                    </div>
                    <div className="text-content">
                        <p className="content-title">
                            What is the processing time?
                        </p>
                        <div className="content-description">
                            <p>
                                We usually need a total of 15-16 days for custom orders from CAD to Finish, but some designs take more time, but you will be informed beforehand. Please get in touch with us for more details.
                            </p>
                        </div>
                    </div>
                    <div className="text-content">
                        <p className="content-title">
                            Returns/Exchanges custom orders?
                        </p>
                        <div className="content-description">
                            <p>
                                While there is no industry-wide return policy for lab-grown diamond Jewelry, our clients have been consistently satisfied with their purchases over the past 5-6 years. We therefore offer a buy back guarantee of 80% of the market value at the time of return.
                            </p>
                        </div>
                    </div>
                    <div className="text-content">
                        <p className="content-title">
                            What jewelry options are available on custom orders?
                        </p>
                        <div className="content-description">
                            <p>
                                We accept custom order for Engagement Rings, Wedding Bands, Earrings, Necklace, Bracelets, Bangles, Pendant or any other diamond Jewelry.
                            </p>
                        </div>
                    </div>
                </div>
                <p className="main-sub-title">
                    Let's Talk About Your Dream Jewellery
                </p>
                <p className="main-description">
                    When You Have Some Doubts Regarding The Purchase Of Lab Grown Diamond Jewelry Which Impacts Your Mind, Then Freely Contact Us Or Fill Up The Below Form. We Give Our Best Response To Your Doubts.
                </p>
                <form autoComplete="off" action="">
                    <div className="form-item">
                        <label htmlFor="firstname">
                            First Name<span>*</span>
                        </label>
                        <input placeholder="Enter your First name" name='firstname' value={customizeForm.firstname} id="firstname" onChange={(e) => setCustomizeForm({ ...customizeForm, firstname: e.target.value })} type="text" />
                    </div>

                    <div className="form-item">
                        <label htmlFor="lastname">
                            Last Name<span>*</span>
                        </label>
                        <input placeholder="Enter your Last name" name='lastname' value={customizeForm.lastname} id="lastname" onChange={(e) => setCustomizeForm({ ...customizeForm, lastname: e.target.value })} type="text" />
                    </div>

                    <div className="form-item">
                        <label htmlFor="email">
                            Email<span>*</span>
                        </label>
                        <input placeholder="Enter your Email" name='email' value={customizeForm.email} id="email" onChange={(e) => setCustomizeForm({ ...customizeForm, email: e.target.value })} type="email" />
                    </div>

                    <div className="form-item">
                        <label htmlFor="phone">
                            Mobile<span>*</span>
                        </label>
                        <input placeholder="Enter your Mobile No." name='phone' value={customizeForm.phone} id="phone" onChange={(e) => setCustomizeForm({ ...customizeForm, phone: e.target.value })} type="text" />
                    </div>

                    <div className="form-item">
                        <label htmlFor="budget">
                            Budget<span>*</span>
                        </label>
                        <select name="budget" id="budget" value={customizeForm.budget} onChange={(e) => setCustomizeForm({ ...customizeForm, budget: e.target.value })}>
                            <option value="">Select Budget</option>
                            <option value="25-50k">25-50k</option>
                            <option value="50-100k">50-100k</option>
                            <option value="100-150k">100-150k</option>
                            <option value="150-200k">150-200k</option>
                            <option value="200-250k">200-250k</option>
                            <option value="250k+">250k+</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="category">
                            Category<span>*</span>
                        </label>
                        <select name="category" id="category" value={customizeForm.category} onChange={(e) => setCustomizeForm({ ...customizeForm, category: e.target.value })}>
                            <option value="">Select Category</option>
                            {
                                categories?.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="metal">
                            Metal<span>*</span>
                        </label>
                        <select name="metal" id="metal" value={customizeForm.metal} onChange={(e) => setCustomizeForm({ ...customizeForm, metal: e.target.value })}>
                            <option value="">Select Metal</option>
                            <option value="14k Gold">14k Gold</option>
                            <option value="18k Gold">18k Gold</option>
                            <option value="22k Gold">22k Gold</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="metalTone">
                            Metal Tone<span>*</span>
                        </label>
                        <select name="metalTone" id="metalTone" value={customizeForm.metalTone} onChange={(e) => setCustomizeForm({ ...customizeForm, metalTone: e.target.value })}>
                            <option value="">Select Metal Tone</option>
                            <option value="Yello Gold">Yello Gold</option>
                            <option value="White Gold">White Gold</option>
                            <option value="Rose Gold">Rose Gold</option>
                            <option value="Silver">Silver</option>
                        </select>
                    </div>

                    <div className="form-item custom-message">
                        <label htmlFor="message">
                            Comment or Message<span>*</span>
                        </label>
                        <textarea placeholder="Enter your Comment or brief message" name='message' value={customizeForm.message} id="message" onChange={(e) => setCustomizeForm({ ...customizeForm, message: e.target.value })} type="text"></textarea>
                    </div>

                    <div className="btn-container">
                        <button onClick={submitForm} type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default CustomizePage;