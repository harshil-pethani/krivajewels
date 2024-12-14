import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import SimpleTextComponent from '../Components/SimpleTextComponent';
import { privacyPolicyData, tab_privacyPolicy } from '../Config/Static_data';

const PrivacyPolicyPage = () => {
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
        <div className="PrivacyPolicyPage" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar sendSearchQuery={(queryString) => { setSearchQuery(queryString); }} />
            <SimpleTextComponent data={privacyPolicyData} title={tab_privacyPolicy} />
            <Footer />
        </div>
    )
}

export default PrivacyPolicyPage;