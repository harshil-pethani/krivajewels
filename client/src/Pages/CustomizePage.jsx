import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import { mobileNumber } from '../Config/Static_data';
import { customizationQueAns, customizationStepsData, customizeDescription, customizeJewellerySectionTitle, customizeProcess, customizeSlogan } from '../Config/Static_data';

const CustomizePage = () => {
    const [showScroll, setShowScroll] = useState(false);
    const [customizeForm, setCustomizeForm] = useState({ firstname: "", lastname: "", email: "", phone: "", budget: "", category: "", metal: "", metalTone: "", message: "" });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const localFilters = JSON.parse(sessionStorage.getItem("KrivaFilters"));
        setCategories(localFilters[0]?.data?.map((category) => (category.title)));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        const message = `FirstName: ${customizeForm.firstname}%0ALastname: ${customizeForm.lastname}%0AEmail: ${customizeForm.email}%0AMobile: ${customizeForm.phone}%0ABudget: ${customizeForm.budget}%0ACategory: ${customizeForm.category}%0AMetal: ${customizeForm.metal}%0AMetalTone: ${customizeForm.metalTone}%0AMessage: ${customizeForm.message}`;

        window.open(`https://wa.me/${mobileNumber}?text=${message}`, "_blank");
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
                <p className="section-title">
                    {customizeJewellerySectionTitle}
                </p>
                <p className="main-sub-title">
                    {customizeSlogan}
                </p>
                <p className="main-description">
                    {customizeDescription}
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
                            Submit<ion-icon name="arrow-forward"></ion-icon>
                        </button>
                    </div>
                </form>
                <p className="main-sub-title">
                    {customizeProcess}
                </p>
                {
                    customizationStepsData.map((data, index) => (
                        <div key={index} className="text-image-container">
                            <p className="sub-title">
                                {index + 1}. {data.title}
                            </p>
                            <div className="content">
                                <div className="left">
                                    <div className="imgBox">
                                        <img src={data.image} alt="" />
                                    </div>
                                </div>
                                <div className="right">
                                    <p className="desc">
                                        {data.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="text-content-container">
                    {
                        customizationQueAns.map((data, index) => (
                            <div className="text-content">
                                <p className="content-title">
                                    {data.que}
                                </p>
                                <div className="content-description">
                                    {
                                        data.ans.map((ansData, index) => (
                                            <p key={"ans" + index}>
                                                {ansData}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CustomizePage;