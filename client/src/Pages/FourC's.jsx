import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import carat from "/carat.jpeg";
import clarity from "/clarity.jpeg";
import color from "/color.jpg";
import diamond1 from "/reflection1.jpg";
import diamond2 from "/reflection2.jpg";
import diamond3 from "/reflection3.jpg";
import diamondShape from "/shapes.jpg";

const FourCs = () => {
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
        <div className="FourCs" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar sendSearchQuery={(queryString) => { setSearchQuery(queryString); }} />
            <div className="simple-text-component">
                <p className="section-title">
                    The 4 C's of Diamonds
                </p>
                <div className="text-content-container">
                    <p className="sub-title">
                        To simplify diamond grading, the 4Cs refer to cut, color, clarity, and carat weight - a universal language developed in collaboration with the International Gemological Institute (IGI).
                    </p>
                </div>
                <div className="text-content-container">
                    <div className="text-content">
                        <p className="content-title">
                            What Are the Four Cs of Diamonds?
                        </p>
                        <div className="content-description">
                            <p>
                                Before purchasing a diamond, it is critical to understand how to ensure you are getting what you pay for. Understanding how the value of a diamond is determined will also help you make trade-offs. You might prefer a larger stone with less clarity or minor flaws over a flawless but much smaller stone.
                            </p>
                            <p>
                                These four diamond qualities are the most important factors influencing its beauty and structure. The combination of these factors determines a diamond’s relative rarity and value. Within the diamond, the 4Cs interact with one another. They determine how the diamond appears and its quality. For example, the ability of a diamond to reflect light to your eyes is determined primarily by cut quality but also by color and clarity.
                            </p>
                        </div>
                    </div>
                    <div className="text-content">
                        <p className="content-title">
                            Carat
                        </p>
                        <div className="content-description">
                            <p>
                                The first of the four C’s that most people learn about is the carat weight, which is also the best indicator of a diamond’s size.
                            </p>
                            <p>
                                The weight of a diamond is measured in carats. The weight is rounded to two decimal places. One carat is equal to 0.2 grams. A half carat (0.50 carat) is thus equivalent to 0.10 grams. In contrast, 1 gram equals 5.00 carat. The greater the carat weight, the more unique the diamond and, as a result, the greater the price.
                            </p>
                        </div>
                        <div className="single-img-container">
                            <img className='carat' src={carat} alt="" />
                        </div>
                    </div>
                    <div className="text-content">
                        <p className="content-title">
                            Clarity
                        </p>
                        <div className="content-description">
                            <p>
                                The clarity of a diamond is determined by its inherent inclusions, typically tiny in size. According to expert analysts, the clarity of a diamond is determined by the defects associated with it. Contrary to popular belief, many specialists in diamond extraction and cutting agree that the clarity of such precious stones is strongly tied to the purity and rarity element associated with such assets.
                            </p>
                            <p>
                                When evaluating the clarity of a diamond, gemologists can be an excellent choice. A gemmologist thoroughly examines the product qualities and magnifies the product to note the clarity linked with the costly stone.
                            </p>
                        </div>
                        <div className="single-img-container">
                            <img src={clarity} alt="" />
                        </div>
                        <div className="table-container">
                            <table>
                                <tr>
                                    <td>VVS1</td>
                                    <td className='second-col'>Very Very Slightly Included 1</td>
                                    <td>Usually just one tiny inclusion visible only to a trained eye under 10x magnification.</td>
                                </tr>
                                <tr>
                                    <td>VVS-2</td>
                                    <td className='second-col'>Very Slightly Very Included 2</td>
                                    <td>Tiny inclusions visible only to a trained eye under 10x magnification.</td>
                                </tr>
                                <tr>
                                    <td>VS-1</td>
                                    <td className='second-col'>Very Slightly Included 1</td>
                                    <td>Very small inclusions visible with 10x magnification.</td>
                                </tr>
                                <tr>
                                    <td>VS-2</td>
                                    <td className='second-col'>Very Slightly Included 2</td>
                                    <td>Several very small inclusions visible with 10x magnification.</td>
                                </tr>
                                <tr>
                                    <td>SI-1</td>
                                    <td className='second-col'>Slightly Included 1</td>
                                    <td>Small inclusions visible with 10x magnification.</td>
                                </tr>
                                <tr>
                                    <td>SI-2</td>
                                    <td className='second-col'>Slightly Included 2</td>
                                    <td>Several small inclusions visible with 10x magnification.</td>
                                </tr>
                                <tr>
                                    <td>I-1</td>
                                    <td className='second-col'>Included 1</td>
                                    <td>Flaws that are visible to the naked eye.</td>
                                </tr>
                                <tr>
                                    <td>I-2</td>
                                    <td className='second-col'>Included 2</td>
                                    <td>Many flaws clearly visible to the naked eye that also decrease the brilliance.</td>
                                </tr>
                                <tr>
                                    <td>I-3</td>
                                    <td className='second-col'>Included 3</td>
                                    <td>Many flaws clearly visible to the naked eye which decrease the brilliance and compromise the structure of the diamond, making it more easily cracked or chipped</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="text-content">
                        <p className="content-title">
                            Color
                        </p>
                        <div className="content-description">
                            <p>
                                Diamonds are found in every color of the rainbow. The finest colour for a diamond is none at all or something that cannot be seen. Most people, however, are preoccupied with diamonds that are white or clear in color.
                            </p>
                            <p>
                                Light can easily flow through a colorless diamond, resulting in light dispersion as a rainbow’s hue. Colors range from entirely colorless to pale yellow. Differences between diamond grades are relatively subtle; therefore, grading is done under limited lighting, and color grading diamonds requires a skilled eye and many years of practice.
                            </p>
                        </div>
                        <div className="single-img-container">
                            <img src={color} alt="" />
                        </div>
                        <div className="table-container">
                            <table>
                                <tr>
                                    <td>D-E-F</td>
                                    <td>Colorless</td>
                                    <td>The highest color grade, extremely rare and completely free of color.</td>
                                </tr>
                                <tr>
                                    <td>G-H-I-J</td>
                                    <td>Near Colorless</td>
                                    <td>Slightly noticeable color, visible only under magnification.</td>
                                </tr>
                                <tr>
                                    <td>K-L-M</td>
                                    <td>Faint Color</td>
                                    <td>Noticeable warmth or faint yellow tint, especially in larger diamonds.</td>
                                </tr>
                                <tr>
                                    <td>N-O-P-Q-R</td>
                                    <td>Very Light Color</td>
                                    <td>Obvious yellow or brown tint, but still considered beautiful for some settings.</td>
                                </tr>
                                <tr>
                                    <td>S-Z</td>
                                    <td>Light Color</td>
                                    <td>Strong and noticeable yellow or brown tint, less desirable for fine jewelry.</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="text-content">
                        <p className="content-title">
                            Cut
                        </p>
                        <div className="content-description">
                            <p>
                                The Cut grade is the last and most important of the 4C’s. There can be no doubt that the Cut of a diamond is of utmost importance, as it has the greatest influence on its appearance. There is a direct relationship between the Cut of diamonds and the sparkle, fire, and brilliance they exhibit. In the case of an incorrectly proportioned diamond, i.e. one that is cut too deep or too shallow, the light will leak out of the bottom of the stone. It is important for light entering a diamond to bounce back up and not leak out the bottom or sides, which would render it dull and lifeless. Diamonds that are cut properly are brilliant in appearance. The light that enters a well-cut diamond reflects off all the sides, or the diamonds’ facets, and comes straight back up, imparting in the diamond a scintillating and otherworldly appearance. In fact, the Cut is so critical to a diamond’s appearance that even a diamond of exceptional quality can seem dull and lifeless if its grade is not high enough.
                            </p>
                            <p>
                                Recommended by Novita: Select only diamonds with Ideal Cut or Excellent Cut.
                            </p>
                        </div>
                        <div className="multi-img-container">
                            <div className="img-detail-container">
                                <div className="img-box">
                                    <img src={diamond1} alt="" />
                                </div>
                                <p className="img-title">
                                    Perfect Proportions
                                </p>
                                <p className="img-description">
                                    Ideal / Excellent Cut
                                </p>
                            </div>
                            <div className="img-detail-container">
                                <div className="img-box">
                                    <img src={diamond2} alt="" />
                                </div>
                                <p className="img-title">
                                    Too Shallow
                                </p>
                                <p className="img-description">
                                    Good Cut
                                </p>
                            </div>
                            <div className="img-detail-container">
                                <div className="img-box">
                                    <img src={diamond3} alt="" />
                                </div>
                                <p className="img-title">
                                    Too Deep
                                </p>
                                <p className="img-description">
                                    Good Cut
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-content">
                        <p className="content-title">
                            Diamond Shapes
                        </p>
                        <div className="single-img-container">
                            <img className='shapes' src={diamondShape} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FourCs;