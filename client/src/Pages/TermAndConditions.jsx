import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import SimpleTextComponent from '../Components/SimpleTextComponent';
import { tab_termsAndConditions, TermsAndConditionsData } from '../Config/Static_data';

const TermsAndConditions = () => {
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
        <div className="TermsAndConditions" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar sendSearchQuery={(queryString) => { setSearchQuery(queryString); }} />
            <SimpleTextComponent data={TermsAndConditionsData} title={tab_termsAndConditions} />
            <Footer />
        </div>
    )
}

export default TermsAndConditions;