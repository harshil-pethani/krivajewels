import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import SimpleTextComponent from '../Components/SimpleTextComponent';

const TermsAndConditions = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 20) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 20) {
            setShowScroll(false)
        }
    };

    const TermsAndConditionsData = [
        {
            que: "Overview",
            hasSubQue: false,
            ans: [
                "This Website Is Operated By Luxica Jewels. Throughout The Site, The Terms “we”, “us” And “our” Refer To Luxica Jewels. Luxica Jewels Offers This Website, Including All Information, Tools And Services Available From This Site To You, The User, Conditioned Upon Your Acceptance Of All Terms, Conditions, Policies And Notices Stated Here.",
                "by Visiting Our Site And/ Or Purchasing Something From Us, You Engage In Our “service” And Agree To Be Bound By The Following Terms And Conditions (“terms Of Service”, “terms”), Including Those Additional Terms And Conditions And Policies Referenced Herein And/or Available By Hyperlink. These Terms Of Service Apply To All Users Of The Site, Including Without Limitation Users Who Are Browsers, Vendors, Customers, Merchants, And/ Or Contributors Of Content.",
                "please Read These Terms Of Service Carefully Before Accessing Or Using Our Website. By Accessing Or Using Any Part Of The Site, You Agree To Be Bound By These Terms Of Service. If You Do Not Agree To All The Terms And Conditions Of This Agreement, Then You May Not Access The Website Or Use Any Services. If These Terms Of Service Are Considered An Offer, Acceptance Is Expressly Limited To These Terms Of Service.",
                "any New Features Or Tools Which Are Added To The Current Store Shall Also Be Subject To The Terms Of Service. You Can Review The Most Current Version Of The Terms Of Service At Any Time On This Page. We Reserve The Right To Update, Change Or Replace Any Part Of These Terms Of Service By Posting Updates And/or Changes To Our Website. It Is Your Responsibility To Check This Page Periodically For Changes. Your Continued Use Of Or Access To The Website Following The Posting Of Any Changes Constitutes Acceptance Of Those Changes."
            ]
        },
        {
            que: "Online Store Terms",
            hasSubQue: false,
            ans: [
                "By Agreeing To These Terms Of Service, You Represent That You Are At Least The Age Of Majority In Your State Or Province Of Residence, Or That You Are The Age Of Majority In Your State Or Province Of Residence And You Have Given Us Your Consent To Allow Any Of Your Minor Dependents To Use This Site.",
                "you May Not Use Our Products For Any Illegal Or Unauthorized Purpose Nor May You, In The Use Of The Service, Violate Any Laws In Your Jurisdiction (including But Not Limited To Copyright Laws).",
                "you Must Not Transmit Any Worms Or Viruses Or Any Code Of A Destructive Nature.",
                "a Breach Or Violation Of Any Of The Terms Will Result In An Immediate Termination Of Your Services."
            ]
        },
        {
            que: "General Conditions",
            hasSubQue: false,
            ans: [
                "We Reserve The Right To Refuse Service To Anyone For Any Reason At Any Time.",
                "you Understand That Your, May Be Transferred Unencrypted And Involve (a) Transmissions Over Various Networks; And (b) Changes To Conform And Adapt To Technical Requirements Of Connecting Networks Or Devices. Bank Account Information Is Always Encrypted During Transfer Over Networks.",
                "you Agree Not To Reproduce, Duplicate, Copy, Sell, Resell Or Exploit Any Portion Of The Service, Use Of The Service, Or Access To The Service Or Any Contact On The Website Through Which The Service Is Provided, Without Express Written Permission By Us.",
                "the Headings Used In This Agreement Are Included For Convenience Only And Will Not Limit Or Otherwise Affect These Terms."
            ]
        },
        {
            que: "Accuracy, Completeness And Timelines Of Information",
            hasSubQue: false,
            ans: [
                "We Are Not Responsible If Information Made Available On This Site Is Not Accurate, Complete Or Current. The Material On This Site Is Provided For General Information Only And Should Not Be Relied Upon Or Used As The Sole Basis For Making Decisions Without Consulting Primary, More Accurate, More Complete Or More Timely Sources Of Information. Any Reliance On The Material On This Site Is At Your Own Risk.",
                "this Site May Contain Certain Historical Information. Historical Information, Necessarily, Is Not Current And Is Provided For Your Reference Only. We Reserve The Right To Modify The Contents Of This Site At Any Time, But We Have No Obligation To Update Any Information On Our Site. You Agree That It Is Your Responsibility To Monitor Changes To Our Site."
            ]
        },
        {
            que: "Modifications To The Prices",
            hasSubQue: false,
            ans: [
                "Prices For Our Products Are Subject To Change Without Notice.",
                "we Reserve The Right At Any Time To Modify Or Discontinue The Service (or Any Part Or Content Thereof) Without Notice At Any Time.",
                "we Shall Not Be Liable To You Or To Any Third-party For Any Modification, Price Change, Suspension Or Discontinuance Of The Service."
            ]
        }
    ]

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className="TermsAndConditions" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar sendSearchQuery={(queryString) => { setSearchQuery(queryString); }} />
            <SimpleTextComponent data={TermsAndConditionsData} title={"Terms & Conditions"} />
            <Footer />
        </div>
    )
}

export default TermsAndConditions;