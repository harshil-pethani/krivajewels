import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import SimpleTextComponent from '../Components/SimpleTextComponent';

const WhyChooseUs = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 20) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 20) {
            setShowScroll(false)
        }
    };

    const WhyChooseUsData = [
        {
            que: "Exquisite Custom Jewelry",
            hasSubQue: false,
            ans: [
                "At KrivaJewels, we design stunning jewelry to celebrate your most meaningful moments. We believe diamonds are more than just beautiful stones; they represent love and memories. That’s why every piece we make is crafted with care and attention to detail, ensuring you find something truly special.",
            ]
        },
        {
            que: "Certified Diamonds You Can Trust",
            hasSubQue: false,
            ans: [
                "We know how important trust is when buying diamonds. That's why all our lab-grown diamonds come with a certificate from top certification organizations like IGI and SGL. This certificate gives you key details about your diamond’s quality, metal, and how it was made. Plus, it helps protect the value of your jewelry if you ever decide to sell or trade it."
            ]
        },
        {
            que: "Skilled Craftsmanship You Can Count On",
            hasSubQue: false,
            ans: [
                "Over 20,000 happy customers worldwide trust KrivaJewels for their diamond jewelry. Our skilled craftsmen put their heart into every piece, making sure it’s perfect. If something goes wrong, we’ll fix it for you. Our goal is to give you the highest quality jewelry, so you’ll always feel confident about your purchase."
            ]
        },
        {
            que: "Amazing Prices for Beautiful Jewelry",
            hasSubQue: false,
            ans: [
                "At KrivaJewels, we offer incredible prices on diamond jewelry without compromising on quality. We believe everyone should have access to beautiful pieces, which is why our prices are affordable. Compare our prices, and you’ll see the difference. Don’t wait—your perfect piece of jewelry is waiting for you!"
            ]
        }
    ]

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className="WhyChooseUs" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar sendSearchQuery={(queryString) => { setSearchQuery(queryString); }} />
            <SimpleTextComponent data={WhyChooseUsData} title={"Why Choose Us"} subtitle={"Create Your Dream Custom Diamond Jewelry with Us"} />
            <Footer />
        </div>
    )
}

export default WhyChooseUs;