import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import { aboutUsData, aboutUsWithImages, tab_aboutUs } from '../Config/Static_data';

const CustomizePage = () => {
    const [showScroll, setShowScroll] = useState(false);

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
                    {tab_aboutUs}
                </p>
                <div className="text-content-container">
                    <div className="text-content">
                        <div className="content-description">
                            {
                                aboutUsData.map((data, index) => (
                                    <p key={index}>
                                        {data}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {
                    aboutUsWithImages.map((data, index) => (
                        <div className="text-image-container">
                            <p className="sub-title">
                                {data.title}
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
            </div>
            <Footer />
        </div>
    )
}

export default CustomizePage;