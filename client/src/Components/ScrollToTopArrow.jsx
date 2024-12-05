import React, { useState } from 'react';

const ScrollToTopArrow = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 50) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 50) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className="scrollTop" onClick={scrollTop} style={{ height: 40, display: showScroll ? 'flex' : 'none' }} >
            <ion-icon name="arrow-up-outline" ></ion-icon>
        </div>
    );
}

export default ScrollToTopArrow;
