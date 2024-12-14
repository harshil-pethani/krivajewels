import React from 'react'
import { useNavigate } from 'react-router-dom';
import heroImg from '/headerbg2.png';
import exploreHeaderImg from '/exploreHeader2.png';
import { exploreSlogan, homeSlogan, jewellerySubTitle, jewelleryTitle } from '../Config/Static_data';

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
                                {exploreSlogan}
                            </p>
                        </>
                        :
                        <>
                            <p className="title">
                                {jewelleryTitle}
                            </p>
                            <p className="slogan">
                                {jewellerySubTitle}
                            </p>
                            <p className="desc">
                                {homeSlogan}
                            </p>
                            <button onClick={() => { navigate("/explore") }} className="learnmore">
                                Explore <ion-icon name="arrow-forward"></ion-icon>
                            </button>
                        </>
                }
            </div>
        </div>
    )
}

export default Header