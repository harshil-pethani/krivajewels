import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { bucketURL, krivaDomain } from '../Config/API_constant'
import { tab_home, mobileNumber } from '../Config/Static_data';
import { toast, ToastContainer } from 'react-toastify';
import ImageMagnifier from './ImageMagnifier';
import { renderDescription } from '../Config/Common';

const SingleProduct = ({ productData }) => {
    const [currentMaterial, setCurrentMaterial] = useState("");
    const [currentImage, setCurrentImage] = useState(null);
    const [isVideo, setIsVideo] = useState(false);
    const [showMagnifier, setShowMagnifier] = useState(window.innerWidth > 800);

    useEffect(() => {
        const handleResize = () => {
            setShowMagnifier(window.innerWidth > 800);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (productData) {
            setCurrentImage(productData?.goldBannerImage || productData?.roseGoldBannerImage || productData?.silverBannerImage);
            productData?.goldBannerImage
                ? setCurrentMaterial("Yellow-Gold")
                : productData?.roseGoldBannerImage
                    ? setCurrentMaterial("Rose-Gold")
                    : productData?.silverBannerImage
                        ? setCurrentMaterial("White-Gold")
                        : setCurrentMaterial("");
            productData.goldFiles = [productData.goldBannerImage, ...productData.goldOtherImages];
            productData.silverFiles = [productData.silverBannerImage, ...productData.silverOtherImages];
            productData.roseGoldFiles = [productData.roseGoldBannerImage, ...productData.roseGoldOtherImages];
        }
    }, []);

    const inquireNow = (id) => {
        const message = `Hello, I want to do inquiry on below product - %0A ${krivaDomain}/explore/${id}`;

        window.open(`https://wa.me/${mobileNumber}?text=${message}`, "_blank");
    };

    return (
        productData &&
        <div className='single-product-component'>
            <ul className="bread-crumb">
                <li>
                    <Link to={"/"}>
                        {tab_home}
                    </Link>
                </li>
                &gt;
                <li>
                    <Link to={`/explore?category=${productData.category?._id}`}>
                        {productData.category?.title}
                    </Link>
                </li>
                &gt;
                <li>
                    <Link>
                        {productData.title}
                    </Link>
                </li>
            </ul>
            <div className="product-details">
                <div className="left">
                    <div className="selected-image">
                        {
                            isVideo
                                ? <video autoPlay loop src={`${bucketURL}/${currentImage}`}></video>
                                :
                                showMagnifier ?
                                    <ImageMagnifier imageUrl={`${bucketURL}/${currentImage}`} />
                                    : <img src={`${bucketURL}/${currentImage}`} alt="" />
                        }
                    </div>
                    <div className="image-selection">
                        {
                            currentMaterial === "Yellow-Gold"
                                ? productData.goldFiles?.map((image, index) => (
                                    <img key={index} onClick={() => { setCurrentImage(image); setIsVideo(false); }} src={`${bucketURL}/${image}`} alt="" className={currentImage === image ? 'active' : ''} />
                                ))
                                : (currentMaterial === "Silver-925" || currentMaterial === "White-Gold")
                                    ? productData.silverFiles?.map((image, index) => (
                                        <img key={index} onClick={() => { setCurrentImage(image); setIsVideo(false); }} src={`${bucketURL}/${image}`} alt="" className={currentImage === image ? 'active' : ''} />
                                    ))
                                    : currentMaterial === "Rose-Gold" && productData.roseGoldFiles?.map((image, index) => (
                                        <img key={index} onClick={() => { setCurrentImage(image); setIsVideo(false); }} src={`${bucketURL}/${image}`} alt="" className={currentImage === image ? 'active' : ''} />
                                    ))
                        }

                        {
                            (currentMaterial === "Yellow-Gold" && productData.goldVideo)
                                ?
                                <video onClick={() => { setCurrentImage(productData.goldVideo); setIsVideo(true); }} src={`${bucketURL}/${productData.goldVideo}`} alt="" className={currentImage === productData.goldVideo ? 'active' : ''} />
                                : ((currentMaterial === "Silver-925" && productData.silverVideo) || (currentMaterial === "White-Gold" && productData.silverVideo)) ?
                                    <video onClick={() => { setCurrentImage(productData.silverVideo); setIsVideo(true); }} src={`${bucketURL}/${productData.silverVideo}`} alt="" className={currentImage === productData.silverVideo ? 'active' : ''} />
                                    :
                                    (currentMaterial === "Rose-Gold" && productData.roseGoldVideo) &&
                                    <video onClick={() => { setCurrentImage(productData.roseGoldVideo); setIsVideo(true); }} src={`${bucketURL}/${productData.roseGoldVideo}`} alt="" className={currentImage === productData.roseGoldVideo ? 'active' : ''} />
                        }
                    </div>
                </div>
                <div className="right">
                    <p className="title">
                        {productData?.title}
                    </p>
                    <p className="category">
                        Category: <span className='value'> {productData?.category.title}</span>
                    </p>
                    <p className="category">
                        Sub Category: <span className='value'> {productData?.subCategory}</span>
                    </p>
                    <p className="category">
                        Diamond: <span className='value'>{productData?.diamond.title}</span>
                    </p>
                    <div className="material-container">
                        <span className='category'>
                            Select Material:
                        </span>
                        <div className="material-wrapper">
                            <ul className="material-selection">
                                <li onClick={() => {
                                    if (!productData?.goldBannerImage) {
                                        toast.warn(
                                            'This product is not available in Gold!',
                                            { position: 'top-right' }
                                        );
                                        return;
                                    }
                                    setCurrentMaterial("Yellow-Gold");
                                    setCurrentImage(productData?.goldBannerImage);
                                    setIsVideo(false);
                                }} title='Yello Gold' className={`material gold ${currentMaterial === "Yellow-Gold" ? "active" : ""}`} >
                                </li>
                                <li onClick={() => {
                                    if (!productData?.roseGoldBannerImage) {
                                        toast.warn(
                                            'This product is not available in Rose-gold!',
                                            { position: 'top-right' }
                                        );
                                        return;
                                    }
                                    setCurrentMaterial("Rose-Gold");
                                    setCurrentImage(productData?.roseGoldBannerImage);
                                    setIsVideo(false);
                                }} title='Rose Gold' className={`material rosegold ${currentMaterial === "Rose-Gold" ? "active" : ""}`}>
                                </li>
                                <li onClick={() => {
                                    if (!productData?.silverBannerImage) {
                                        toast.warn(
                                            'This product is not available in White-gold!',
                                            { position: 'top-right' }
                                        );
                                        return;
                                    }
                                    setCurrentMaterial("White-Gold");
                                    setCurrentImage(productData?.silverBannerImage);
                                    setIsVideo(false);
                                }} title='White Gold' className={`material whitegold ${currentMaterial === "White-Gold" ? "active" : ""}`}>
                                </li>
                                <li onClick={() => {
                                    if (!productData?.silverBannerImage) {
                                        toast.warn(
                                            'This product is not available in Silver!',
                                            { position: 'top-right' }
                                        );
                                        return;
                                    }
                                    setCurrentMaterial("Silver-925");
                                    setCurrentImage(productData?.silverBannerImage);
                                    setIsVideo(false);
                                }} title='Silver-925' className={`material silver ${currentMaterial === "Silver-925" ? "active" : ""}`}>
                                </li>
                            </ul>
                            <span className="material-value">
                                {currentMaterial}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => inquireNow(productData._id)} className="inquiry-btn">
                        Inquiry Now
                    </button>
                </div>
            </div>
            <div className="product-description">
                <p className="title">
                    Description
                </p>
                <span className="description">
                    {
                        renderDescription(productData?.description)
                    }
                </span>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SingleProduct