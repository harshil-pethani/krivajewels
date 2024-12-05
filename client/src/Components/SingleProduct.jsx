import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { bucketURL } from '../Config/API_constant'

const SingleProduct = ({ productData }) => {
    const [currentMaterial, setCurrentMaterial] = useState("gold");
    const [currentImage, setCurrentImage] = useState(null);
    const [isVideo, setIsVideo] = useState(false);

    useEffect(() => {
        if (productData) {
            setCurrentImage(productData?.goldBannerImage || productData?.silverBannerImage || productData?.roseGoldBannerImage);
            productData.goldFiles = [productData.goldBannerImage, ...productData.goldOtherImages];
            productData.silverFiles = [productData.silverBannerImage, ...productData.silverOtherImages];
            productData.roseGoldFiles = [productData.roseGoldBannerImage, ...productData.roseGoldOtherImages];
        }
    }, []);

    return (
        productData &&
        <div className='single-product-component'>
            <ul className="bread-crumb">
                <li>
                    <Link to={"/"}>
                        Home
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
                                : <img src={`${bucketURL}/${currentImage}`} alt="" />
                        }
                    </div>
                    <div className="image-selection">
                        {
                            currentMaterial === "gold"
                                ? productData.goldFiles?.map((image, index) => (
                                    <img key={index} onClick={() => { setCurrentImage(image); setIsVideo(false); }} src={`${bucketURL}/${image}`} alt="" className={currentImage === image ? 'active' : ''} />
                                ))
                                : (currentMaterial === "silver" || currentMaterial === "whitegold")
                                    ? productData.silverFiles?.map((image, index) => (
                                        <img key={index} onClick={() => { setCurrentImage(image); setIsVideo(false); }} src={`${bucketURL}/${image}`} alt="" className={currentImage === image ? 'active' : ''} />
                                    ))
                                    : productData.roseGoldFiles?.map((image, index) => (
                                        <img key={index} onClick={() => { setCurrentImage(image); setIsVideo(false); }} src={`${bucketURL}/${image}`} alt="" className={currentImage === image ? 'active' : ''} />
                                    ))
                        }

                        {
                            currentMaterial === "gold"
                                ?
                                <video onClick={() => { setCurrentImage(productData.goldVideo); setIsVideo(true); }} src={`${bucketURL}/${productData.goldVideo}`} alt="" className={currentImage === productData.goldVideo ? 'active' : ''} />
                                : (currentMaterial === "silver" || currentMaterial === "whitegold") ?
                                    <video onClick={() => { setCurrentImage(productData.goldVideo); setIsVideo(true); }} src={`${bucketURL}/${productData.silverVideo}`} alt="" className={currentImage === productData.goldVideo ? 'active' : ''} />
                                    :
                                    <video onClick={() => { setCurrentImage(productData.goldVideo); setIsVideo(true); }} src={`${bucketURL}/${productData.roseGoldVideo}`} alt="" className={currentImage === productData.goldVideo ? 'active' : ''} />
                        }
                    </div>
                </div>
                <div className="right">
                    <p className="title">
                        {productData?.title}
                    </p>
                    <p className="description">
                        {productData?.description}
                    </p>
                    <p className="category">
                        Category: <span className='value'> {productData?.category.title}</span>
                    </p>
                    <p className="category">
                        Diamond: <span className='value'>{productData?.diamond.title}</span>
                    </p>
                    <div className="material-container">
                        <span className='category'>
                            Select Material:
                        </span>
                        <ul className="material-selection">
                            <li onClick={() => { setCurrentMaterial("gold"); setCurrentImage(productData?.goldBannerImage); setIsVideo(false); }} title='Yello Gold' className={`material gold ${currentMaterial === "gold" ? "active" : ""}`} >
                            </li>
                            <li onClick={() => { setCurrentMaterial("rosegold"); setCurrentImage(productData?.roseGoldBannerImage); setIsVideo(false); }} title='Rose Gold' className={`material rosegold ${currentMaterial === "rosegold" ? "active" : ""}`}>
                            </li>
                            <li onClick={() => { setCurrentMaterial("whitegold"); setCurrentImage(productData?.silverBannerImage); setIsVideo(false); }} title='White Gold' className={`material whitegold ${currentMaterial === "whitegold" ? "active" : ""}`}>
                            </li>
                            <li onClick={() => { setCurrentMaterial("silver"); setCurrentImage(productData?.silverBannerImage); setIsVideo(false); }} title='Silver' className={`material silver ${currentMaterial === "silver" ? "active" : ""}`}>
                            </li>
                        </ul>
                        <span className="material-value">
                            {currentMaterial}
                        </span>
                    </div>
                    <button className="inquiry-btn">
                        Inquiry Now<ion-icon name="arrow-forward"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct