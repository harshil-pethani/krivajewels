import React from 'react'
import { useNavigate } from 'react-router-dom';
import heroImg from '/heroImage2.jpg';
import exploreHeaderImg from '/exploreHeader.jpg';

const Header = ({ ExplorePage }) => {
    const navigate = useNavigate();
    return (
        <div id='homeHeader' className={ExplorePage ? "homeHeader explorePageHeader" : "homeHeader"}>
            <div className="background">
                <img src={ExplorePage ? exploreHeaderImg : heroImg} loading="lazy" alt="" />
            </div>
            <div className="content">
                {
                    ExplorePage ?
                        <>
                            <p className="title">
                                Add some sparkles to your life
                            </p>
                        </>
                        :
                        <>
                            <p className="title">
                                Jewellery
                            </p>
                            <p className="slogan">
                                that you'll love
                            </p>
                            <p className="desc">
                                We provide a wide variety of Jewellery, from earrings to bracelets. At Olimp, you will surely find even the rarest Jewellery.
                            </p>
                            <button onClick={() => { navigate("/explore") }} className="learnmore">
                                Explore <ion-icon name="arrow-forward"></ion-icon>
                            </button>
                        </>
                }
            </div>
        </div >
    )
}

export default Header