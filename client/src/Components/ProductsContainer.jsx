import React from 'react'
import { bucketURL } from '../Config/API_constant'
import { Link } from 'react-router-dom'

const ProductsContainer = ({ homepage, productData, materialChange, setMaterialChange, isLoading, isForAdminPanel, setUpdateProduct, setShowPopup, deleteProduct }) => {
    return (
        <div className={homepage ? "jewellery-card-container forHome" : "jewellery-card-container"}>
            {
                (productData.length === 0 && !isLoading) ?
                    <h1 className='no-data'>
                        No products available
                    </h1>
                    :
                    productData.map((jewellery, index) => (
                        <div key={index} className={isForAdminPanel ? "jewellery-card admin-card" : "jewellery-card"}>
                            <Link to={`/explore/${jewellery._id}`} className="imgBox">
                                <img className="jewellery-image" src={
                                    materialChange[jewellery._id] === "rosegold"
                                        ? `${bucketURL}/${jewellery.roseGoldBannerImage}`
                                        : (materialChange[jewellery._id] === "silver" || materialChange[jewellery._id] === "whitegold")
                                            ? `${bucketURL}/${jewellery.silverBannerImage}`
                                            : `${bucketURL}/${jewellery.goldBannerImage}`} alt={jewellery.title} />
                            </Link>
                            <div className="card-details">
                                <div>
                                    <Link to={`/explore/${jewellery._id}`} className="jewellery-title" title={jewellery.title}>
                                        {jewellery.title}
                                    </Link>
                                    <p className="jewellery-description">
                                        {jewellery.description}
                                    </p>
                                    <ul className="material-container">
                                        <li onClick={() => setMaterialChange({ ...materialChange, [jewellery._id]: "gold" })} title='Yello Gold' className={`material gold ${(materialChange[jewellery._id] === "gold" || !materialChange[jewellery._id]) ? "active" : ""}`} >
                                        </li>
                                        <li onClick={() => setMaterialChange({ ...materialChange, [jewellery._id]: "rosegold" })} title='Rose Gold' className={`material rosegold ${materialChange[jewellery._id] === "rosegold" ? "active" : ""}`}>
                                        </li>
                                        <li onClick={() => setMaterialChange({ ...materialChange, [jewellery._id]: "whitegold" })} title='White Gold' className={`material whitegold ${materialChange[jewellery._id] === "whitegold" ? "active" : ""}`}>
                                        </li>
                                        <li onClick={() => setMaterialChange({ ...materialChange, [jewellery._id]: "silver" })} title='Silver' className={`material silver ${materialChange[jewellery._id] === "silver" ? "active" : ""}`}>
                                        </li>
                                    </ul>
                                </div>
                                {
                                    isForAdminPanel ?
                                        <div className="actionBtns">
                                            <button className="edit" onClick={(e) => { setUpdateProduct({ ...jewellery, category: jewellery.category_detail._id, diamond: jewellery.diamond_detail._id }); setShowPopup("updateProduct"); }}>
                                                <ion-icon name="pencil-outline"></ion-icon>
                                            </button>
                                            <button className="delete" onClick={() => deleteProduct(jewellery._id)}>
                                                <ion-icon name="trash-outline"></ion-icon>
                                            </button>
                                        </div>
                                        :
                                        <button className="inquiry-btn">
                                            Inquiry Now<ion-icon name="arrow-forward"></ion-icon>
                                        </button>
                                }
                            </div>
                        </div>
                    ))
            }
        </div >
    )
}

export default ProductsContainer