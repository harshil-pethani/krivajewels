import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import SimpleTextComponent from '../Components/SimpleTextComponent';

const PrivacyPolicyPage = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 20) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 20) {
            setShowScroll(false)
        }
    };

    const privacyPolicyData = [
        {
            que: "What Do We Do With Your Information?",
            hasSubQue: false,
            ans: [
                "When You Purchase Something From Our Store, As Part Of The Buying And Selling Process, We Collect The Personal Information You Give Us Such As Your Name, Address And Email Address.",
                "When You Browse Our Store, We Also Automatically Receive Your Computer’s Internet Protocol (IP) Address In Order To Provide Us With Information That Helps Us Learn About Your Browser And Operating System.",
                "Email Marketing (if Applicable): With Your Permission, We May Send You Emails About Our Store, New Products And Other Updates."
            ]
        },
        {
            que: "Consent",
            hasSubQue: true,
            ans: [
                {
                    que: "How Do You Get My Consent?",
                    ans: [
                        "When You Provide Us With Personal Information To Complete A Transaction, Verify Your Credit Card, Place An Order, Arrange For A Delivery Or Return A Purchase, We Imply That You Consent To Our Collecting It And Using It For That Specific Reason Only.",
                        "If We Ask For Your Personal Information For A Secondary Reason, Like Marketing, We Will Either Ask You Directly For Your Expressed Consent, Or Provide You With An Opportunity To Say No."
                    ]
                },
                {
                    que: "How Do I Withdraw My Consent?",
                    ans: [
                        "If After You Opt-in, You Change Your Mind, You May Withdraw Your Consent For Us To Contact You, For The Continued Collection, Use Or Disclosure Of Your Information, At Any Time, By Contacting Us At luxicajewels@gmail.com",
                        "Luxica Jewels, #Tower – A, 406, Diamond World, Mini Bazar, Surat – 395006 Gujarat (india)"
                    ]
                }
            ]
        },
        {
            que: "Disclosure",
            hasSubQue: false,
            ans: [
                "We May Disclose Your Personal Information If We Are Required By Law To Do So Or If You Violate Our Terms Of Service."
            ]
        },
        {
            que: "Shopify",
            hasSubQue: false,
            ans: [
                "Our Store Is Hosted On Shopify Inc. They Provide Us With The Online E-commerce Platform That Allows Us To Sell Our Products And Services To You.",
                "your Data Is Stored Through Shopify’s Data Storage, Databases And The General Shopify Application. They Store Your Data On A Secure Server Behind A Firewall."
            ]
        },
        {
            que: "Security",
            hasSubQue: false,
            ans: [
                "To Protect Your Personal Information, We Take Reasonable Precautions And Follow Industry Best Practices To Make Sure It Is Not Inappropriately Lost, Misused, Accessed, Disclosed, Altered Or Destroyed.",
                "if You Provide Us With Your Information, The Information Is Encrypted Using Secure Socket Layer Technology (SSL)",
                "although No Method Of Transmission Over The Internet Or Electronic Storage Is 100% Secure, We Follow All Pci-dss Requirements And Implement Additional Generally Accepted Industry Standards."
            ]
        },
        {
            que: "Age Of Consent",
            hasSubQue: false,
            ans: [
                "By Using This Site, You Represent That You Are At Least The Age Of Majority In Your State Or Province Of Residence, Or That You Are The Age Of Majority In Your State Or Province Of Residence And You Have Given Us Your Consent To Allow Any Of Your Minor Dependents To Use This Site."
            ]
        },
        {
            que: "Limitation Of Liability",
            hasSubQue: false,
            ans: [
                "This Disclaimer Of Liability Applies To Any Damages Or Injury Caused By Any Failure Or Performance, Error, Omission, Interruption, Deletion, Defect, Delay In Operation Or Transmission, Computer Virus, Act Of God, Communication Line Failure, Theft Or Destruction Or Unauthorized Access To, Alteration Of, Or Use Of Record, Whether For Breach Of Contract, Tortuous Behaviour, Negligence, Or Under Any Other Cause Of Action. You Also Specifically Acknowledge That Luxicajewels.com Is Not Liable For Your Defamatory, Offensive, Infringing Or Illegal Materials Or Conduct Or That Of Third Parties.",
                "we As A Merchant Shall Be Under No Liability Whatsoever In Respect Of Any Loss Or Damage Arising Directly Or Indirectly Out Of The Decline Of Authorization For Any Transaction, On Account Of The Cardholder Having Exceeded The Present Limit Mutually Agreed By Us With Our Acquiring Bank From Time To Time.",
                "the Law Of Certain Countries May Not Allow Limitations On Warranties Or Damages As Described Above. If Such Law Applies To You, Some Or All Of The Above Disclaimers, Exclusions Or Warranties May Not Apply To You And You May Have Additional Rights. However, In No Event Shall luxicajewels.com’s Aggregate Liability To You For All Claims, Damages, Losses, And Causes Of Action Exceed The Amount Paid To Luxicajewels.com By You For Accessing Luxicajewels.com Web Site."
            ]
        }
    ]

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className="PrivacyPolicyPage" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar sendSearchQuery={(queryString) => { setSearchQuery(queryString); }} />
            <SimpleTextComponent data={privacyPolicyData} title={"Privacy Policy"} />
            <Footer />
        </div>
    )
}

export default PrivacyPolicyPage;