import React, { useEffect, useRef, useState } from 'react'
import AdminTop from '../Components/AdminTop';
import AdminSide from '../Components/AdminSide';
import { useLoader } from '../Contexts/LoaderContext';
import { useConfirmation } from '../Contexts/ConfirmationContext';
import { createProductApi, deleteProductApi, getAllCategoriesApi, getAllDiamondsApi, getAllProductApi, getAllProductsApi, getUploadS3Url, updateProductApi } from '../Config/API_constant';
import apiRequest from '../CommonUtil';
import Loader from '../Components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import ProductsContainer from '../Components/ProductsContainer';
import FilterContainer from '../Components/FilterContainer';

const AdminProducts = ({ adminDetails, setAdminDetails, setAdminLogged }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState("");

    const { showLoader, hideLoader } = useLoader();
    const { requestConfirmation } = useConfirmation();
    const [materialChange, setMaterialChange] = useState({});

    const [newProduct, setNewProduct] = useState({ title: "", goldBannerImage: null, goldOtherImages: [], goldVideo: null, roseGoldBannerImage: null, roseGoldOtherImages: [], roseGoldVideo: null, silverBannerImage: "", silverOtherImages: [], silverVideo: null, description: "", category: "", subCategory: "", diamond: "" });
    const [updateProduct, setUpdateProduct] = useState({ title: '', goldBannerImage: null, goldOtherImages: [], goldVideo: null, roseGoldBannerImage: null, roseGoldOtherImages: [], roseGoldVideo: null, silverBannerImage: "", silverOtherImages: [], silverVideo: null, category: '', subCategory: '', diamond: '', description: '' });
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategoriesAddProduct, setSubCategoriesAddProduct] = useState([]);
    const [subCategoriesUpdateProduct, setSubCategoriesUpdateProduct] = useState([]);
    const [diamonds, setDiamonds] = useState([]);
    const [refreshProducts, setRefreshProducts] = useState(false);
    const anyUpdate = useRef(false);
    const scrollContainerRef = useRef(null);

    // Filter related
    const isFetching = useRef(false);
    const [selectedOptions, setSelectedOptions] = useState([[], [], []]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [hasMoreProduct, setHasMoreProduct] = useState(true);
    const initialCall = useRef(true);

    const getSubCategory = (selectedCategoryId) => {
        let subCategoryData = [];
        for (let i = 0, catLength = categories.length; i < catLength; i++) {
            if (categories[i]._id === selectedCategoryId) {
                if (categories[i].title.toLowerCase() === "ring") {
                    subCategoryData = JSON.parse(sessionStorage.getItem("KrivaRingFilters"));
                } else if (categories[i].title.toLowerCase() === "earrings") {
                    subCategoryData = JSON.parse(sessionStorage.getItem("KrivaEarringFilters"));
                } else if (categories[i].title.toLowerCase() === "pendants") {
                    subCategoryData = JSON.parse(sessionStorage.getItem("KrivaPendantFilters"));
                } else if (categories[i].title.toLowerCase() === "bracelet") {
                    subCategoryData = JSON.parse(sessionStorage.getItem("KrivaBraceletFilters"));
                } else if (categories[i].title.toLowerCase() === "necklace") {
                    subCategoryData = JSON.parse(sessionStorage.getItem("KrivaNecklaceFilters"));
                }
                break;
            }
        }
        return subCategoryData;
    }

    useEffect(() => {
        async function getAllCategories() {
            try {
                const data = await apiRequest(getAllCategoriesApi, 'GET');
                setCategories(data?.data || []);
            } catch (error) {
                // console.error('Failed to fetch categories:', error);
            }
        }
        async function getAllDiamonds() {
            try {
                const data = await apiRequest(getAllDiamondsApi, 'GET');
                setDiamonds(data?.data || []);
            } catch (error) {
                // console.error('Failed to fetch categories:', error);
            }
        }
        getAllDiamonds();
        getAllCategories();
    }, []);

    const resetAddProductForm = () => {
        setSubCategoriesAddProduct([]);
        setNewProduct({ title: "", goldBannerImage: null, goldOtherImages: [], goldVideo: null, roseGoldBannerImage: null, roseGoldOtherImages: [], roseGoldVideo: null, silverBannerImage: "", silverOtherImages: [], silverVideo: null, description: "", category: "", subCategory: "", diamond: "" });
    };

    const getUniqueFileName = (fileName, forImage = true) => {
        let uniqueFilename
        if (forImage)
            uniqueFilename = `ProductImages/${fileName}_${Date.now()}`;
        else
            uniqueFilename = `ProductVideos/${fileName}_${Date.now()}`;
        return uniqueFilename;
    }

    const getPresignedUrls = async (files) => {
        const requests = files.map((file) =>
            axios.get(getUploadS3Url, {
                params: { filename: file.uniqueName, contentType: file.type },
            })
        );
        const responses = await Promise.all(requests);
        return responses.map((res) => res.data);
    };

    // Function to upload files to S3 using pre-signed URLs
    const uploadFilesToS3 = async (files, presignedUrls) => {
        const uploadRequests = files.map((file, index) => {
            const { uploadUrl } = presignedUrls[index];
            return axios.put(uploadUrl, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });
        });
        await Promise.all(uploadRequests);
    };

    const addProduct = async (e) => {
        e.preventDefault();
        if (!newProduct.title || !newProduct.description || !newProduct.category || !newProduct.diamond) {
            toast.error("Please fill all the fields!", {
                position: "top-right"
            });
            return;
        } else if (!(newProduct.goldBannerImage || newProduct.silverBannerImage || newProduct.roseGoldBannerImage)) {
            toast.error("Upload Atleast one Banner Image!", {
                position: "top-right"
            });
            return;
        }
        showLoader();
        const createProductPayload = {
            title: newProduct.title,
            description: newProduct.description,
            category: newProduct.category,
            subCategory: newProduct.subCategory,
            diamond: newProduct.diamond,
            goldBannerImage: "",
            goldOtherImages: [],
            goldVideo: "",
            silverBannerImage: "",
            silverOtherImages: [],
            silverVideo: "",
            roseGoldBannerImage: "",
            roseGoldOtherImages: [],
            roseGoldVideo: "",
        }
        if (newProduct.goldOtherImages.length) {
            for (let i = 0, arrLength = newProduct.goldOtherImages.length; i < arrLength; i++) {
                newProduct.goldOtherImages[i].uniqueName = getUniqueFileName(newProduct.title.replace(/\s+/g, '').slice(0, 7) + `_gold${i}`);
                createProductPayload.goldOtherImages.push(newProduct.goldOtherImages[i].uniqueName);
            }
        }
        if (newProduct.silverOtherImages.length) {
            for (let i = 0, arrLength = newProduct.silverOtherImages.length; i < arrLength; i++) {
                newProduct.silverOtherImages[i].uniqueName = getUniqueFileName(newProduct.title.replace(/\s+/g, '').slice(0, 7) + `_silver${i}`);
                createProductPayload.silverOtherImages.push(newProduct.silverOtherImages[i].uniqueName);
            }
        }
        if (newProduct.roseGoldOtherImages.length) {
            for (let i = 0, arrLength = newProduct.roseGoldOtherImages.length; i < arrLength; i++) {
                newProduct.roseGoldOtherImages[i].uniqueName = getUniqueFileName(newProduct.title.replace(/\s+/g, '').slice(0, 7) + `_rosegold${i}`);
                createProductPayload.roseGoldOtherImages.push(newProduct.roseGoldOtherImages[i].uniqueName);
            }
        }
        createProductPayload.goldVideo = newProduct.goldVideo
            ? (newProduct.goldVideo.uniqueName = getUniqueFileName(newProduct.title.replace(/\s+/g, '').slice(0, 7) + `_goldvideo`, false))
            : undefined;
        createProductPayload.goldBannerImage = newProduct.goldBannerImage
            ? (newProduct.goldBannerImage.uniqueName = getUniqueFileName(newProduct.title.replace(/\s+/g, '').slice(0, 7) + `_goldbanner`, true))
            : undefined;
        createProductPayload.silverVideo = newProduct.silverVideo
            ? (newProduct.silverVideo.uniqueName = getUniqueFileName(newProduct.title.replace(/\s+/g, '').slice(0, 7) + `silvervideo`, false))
            : undefined;
        createProductPayload.silverBannerImage = newProduct.silverBannerImage
            ? (newProduct.silverBannerImage.uniqueName = getUniqueFileName(newProduct.title.replace(/\s+/g, '').slice(0, 7) + `_silverbanner`, true))
            : undefined;
        createProductPayload.roseGoldVideo = newProduct.roseGoldVideo
            ? (newProduct.roseGoldVideo.uniqueName = getUniqueFileName(newProduct.title.replace(/\s+/g, '').slice(0, 7) + `_rosegoldvideo`, false))
            : undefined;
        createProductPayload.roseGoldBannerImage = newProduct.roseGoldBannerImage
            ? (newProduct.roseGoldBannerImage.uniqueName = getUniqueFileName(newProduct.title.replace(/\s+/g, '').slice(0, 7) + `_rosegoldbanner`, true))
            : undefined;

        const allFiles = [...newProduct.goldOtherImages, ...newProduct.silverOtherImages, ...newProduct.roseGoldOtherImages, newProduct.goldVideo, newProduct.silverVideo, newProduct.roseGoldVideo, newProduct.goldBannerImage, newProduct.silverBannerImage, newProduct.roseGoldBannerImage].filter(Boolean);
        const presignedUrls = await getPresignedUrls(allFiles);
        await uploadFilesToS3(allFiles, presignedUrls);
        try {
            const data = await apiRequest(createProductApi, 'POST', createProductPayload, { withCredentials: true });
            setRefreshProducts(!refreshProducts);
            anyUpdate.current = true;
            toast.success(data.message, {
                position: "top-right"
            });
        } catch (error) {
            // console.log(error);
        } finally {
            hideLoader();
            setShowPopup("");
            resetAddProductForm();
        }
    }

    const deleteProduct = async (id) => {
        const isConfirmed = await requestConfirmation('Are you sure you want to delete this Product?');
        if (isConfirmed) {
            showLoader();
            try {
                const data = await apiRequest(`${deleteProductApi}/${id}`, 'DELETE', null, { withCredentials: true });
                toast.success(data.message, {
                    position: "top-right"
                });
                setRefreshProducts(!refreshProducts);
                anyUpdate.current = true;
            } catch (error) {
                // console.error('Failed to fetch categories:', error);
            } finally {
                hideLoader();
            }
        }
    }

    const handleUpdateProduct = async (e, id) => {
        e.preventDefault();
        showLoader();
        const updateProductPayload = {
            title: updateProduct.title,
            description: updateProduct.description,
            category: updateProduct.category,
            subCategory: updateProduct.subCategory,
            diamond: updateProduct.diamond
        }
        try {
            const data = await apiRequest(`${updateProductApi}/${id}`, 'PUT', updateProductPayload, { withCredentials: true });
            setRefreshProducts(!refreshProducts);
            anyUpdate.current = true;
            toast.success(data.message, {
                position: "top-right"
            });
        } catch (error) {
            // console.log(error);
        } finally {
            hideLoader();
            setShowPopup("");
            setUpdateProduct({});
        }
    };

    async function getAllProducts(searchQuery = "") {
        if (isFetching.current) return;
        if (initialCall.current) {
            initialCall.current = false;
        }
        isFetching.current = true;
        setIsLoading(true);
        try {
            const categoryFilters = selectedOptions[0].map((filter) => (filter._id))
            const diamondFilters = selectedOptions[1].map((filter) => (filter._id))
            const subCategoryFilters = selectedOptions[2].map((filter) => (filter._id));
            const apiPath = getAllProductApi + `?page=${page}&limit=10&searchQuery=${searchQuery}`;

            const data = await apiRequest(apiPath, 'POST', { filters: [categoryFilters, diamondFilters, subCategoryFilters] });
            setProducts((prev) => [...prev, ...data.products]);
            setHasMoreProduct(data.hasMoreProduct);
        } catch (error) {
            // console.error('Failed to fetch Products:', error);
        } finally {
            isFetching.current = false;
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setProducts([]);
        setHasMoreProduct(true);
        if (page === 1 && (initialCall.current || anyUpdate.current)) {
            setIsLoading(true);
            getAllProducts(searchQuery);
        } else {
            setPage(1);
        }
        setPage(1);
    }, [refreshProducts]);

    const loadMore = () => {
        try {
            if (hasMoreProduct) {
                setPage((prev) => prev + 1);
            }
        } catch (error) {
        }
    };

    return (
        <>
            <div>
                {
                    showPopup === "addProduct" &&
                    (
                        <div className="mailPopUpLayer addCategory">
                            {

                                <div className="popUpBox">
                                    <ion-icon onClick={() => { setShowPopup(""); resetAddProductForm(); }} name="close-circle-outline"></ion-icon>
                                    <h2 className="popuptitle">
                                        Add New Product
                                    </h2>
                                    <form autoComplete="off" action="">
                                        <label htmlFor="productTitle">
                                            Title<span>*</span>
                                        </label>
                                        <input placeholder="Enter Product title" name='title' value={newProduct.title} id="productTitle" onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} type="text" />

                                        <label htmlFor="productDescription">
                                            Description<span>*</span>
                                        </label>
                                        <textarea placeholder="Enter Product description" name='description' value={newProduct.description} id="productDescription" onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} type="text"></textarea>

                                        <label htmlFor="productCategory">
                                            Category<span>*</span>
                                        </label>
                                        <select value={newProduct.category} placeholder="Select Category" id="productCategory" onChange={(e) => { setSubCategoriesAddProduct(getSubCategory(e.target.value)); setNewProduct({ ...newProduct, category: e.target.value }) }}>
                                            <option value="">Select Category</option>
                                            {
                                                categories.map((category) => (
                                                    <option name={category.title} key={category._id} value={category._id}>{category.title}</option>
                                                ))
                                            }
                                        </select>

                                        <label htmlFor="productSubCategory">
                                            Sub Category
                                        </label>
                                        <select disabled={!subCategoriesAddProduct.length} value={newProduct.subCategory} placeholder="Select Sub Category" id="productSubCategory" onChange={(e) => { setNewProduct({ ...newProduct, subCategory: e.target.value }) }}>
                                            <option value="">Select Sub Category</option>
                                            {
                                                subCategoriesAddProduct.map((subCat) => (
                                                    <option name={subCat.title} key={subCat._id} value={subCat._id}>{subCat.title}</option>
                                                ))
                                            }
                                        </select>

                                        <label htmlFor="productDiamond">
                                            Diamond<span>*</span>
                                        </label>
                                        <select value={newProduct.diamond} placeholder="Select Diamond" id="productDiamond" onChange={(e) => { setNewProduct({ ...newProduct, diamond: e.target.value }) }}>
                                            <option value="">Select Diamond</option>
                                            {
                                                diamonds.map((diamond) => (
                                                    <option key={diamond._id} value={diamond._id}>{diamond.title}</option>
                                                ))
                                            }
                                        </select>

                                        <label htmlFor="goldBannerImage">
                                            Banner Image for Gold<span>*</span>
                                        </label>
                                        <input name='goldBannerImage' id="goldBannerImage" onChange={(e) => setNewProduct({ ...newProduct, goldBannerImage: e.target.files[0] })} type="file" accept="image/*" />

                                        <label htmlFor="goldFiles">
                                            Other images & Video for Gold<span>*</span>
                                        </label>
                                        <input name='goldFiles' id="goldFiles" onChange={(e) => {
                                            const files = Array.from(e.target.files);
                                            if (files.length > 4) {
                                                toast.error("You can select a maximum of 4 files!", {
                                                    position: "top-right"
                                                });
                                                e.target.value = null;
                                            } else {
                                                const video = files.filter((file) => file.type.startsWith("video/"));
                                                if (video.length > 1) {
                                                    toast.error("You can select a maximum of 1 Video!", {
                                                        position: "top-right"
                                                    });
                                                    e.target.value = null;
                                                }
                                                const images = files.filter((file) => file.type.startsWith("image/"));
                                                setNewProduct((prev) => ({
                                                    ...prev,
                                                    goldOtherImages: images,
                                                    goldVideo: video[0]
                                                }));
                                            }
                                        }} type="file" multiple accept="image/*,video/*" />

                                        <label htmlFor="silverBannerImage">
                                            Banner Image for Silver<span>*</span>
                                        </label>
                                        <input name='silverBannerImage' id="silverBannerImage" onChange={(e) => setNewProduct({ ...newProduct, silverBannerImage: e.target.files[0] })} type="file" accept="image/*" />

                                        <label htmlFor="silverFiles">
                                            Other images & Video for Silver<span>*</span>
                                        </label>
                                        <input name='silverFiles' id="silverFiles" onChange={(e) => {
                                            const files = Array.from(e.target.files);
                                            if (files.length > 4) {
                                                toast.error("You can select a maximum of 4 files!", {
                                                    position: "top-right"
                                                });
                                                e.target.value = null;
                                            } else {
                                                const video = files.filter((file) => file.type.startsWith("video/"));
                                                if (video.length > 1) {
                                                    toast.error("You can select a maximum of 1 Video!", {
                                                        position: "top-right"
                                                    });
                                                    e.target.value = null;
                                                }
                                                const images = files.filter((file) => file.type.startsWith("image/"));
                                                setNewProduct((prev) => ({
                                                    ...prev,
                                                    silverOtherImages: images,
                                                    silverVideo: video[0]
                                                }));
                                            }
                                        }} type="file" multiple accept="image/*,video/*" />

                                        <label htmlFor="roseGoldBannerImage">
                                            Banner Image for Rose-gold<span>*</span>
                                        </label>
                                        <input name='roseGoldBannerImage' id="roseGoldBannerImage" onChange={(e) => setNewProduct({ ...newProduct, roseGoldBannerImage: e.target.files[0] })} type="file" accept="image/*" />

                                        <label htmlFor="roseGoldFiles">
                                            Other images & Video for RoseGold<span>*</span>
                                        </label>
                                        <input name='roseGoldFiles' id="roseGoldFiles" onChange={(e) => {
                                            const files = Array.from(e.target.files);
                                            if (files.length > 4) {
                                                toast.error("You can select a maximum of 4 files!", {
                                                    position: "top-right"
                                                });
                                                e.target.value = null;
                                            } else {
                                                const video = files.filter((file) => file.type.startsWith("video/"));
                                                if (video.length > 1) {
                                                    toast.error("You can select a maximum of 1 Video!", {
                                                        position: "top-right"
                                                    });
                                                    e.target.value = null;
                                                }
                                                const images = files.filter((file) => file.type.startsWith("image/"));
                                                setNewProduct((prev) => ({
                                                    ...prev,
                                                    roseGoldOtherImages: images,
                                                    roseGoldVideo: video[0]
                                                }));
                                            }
                                        }} type="file" multiple accept="image/*,video/*" />

                                        <div className="btn-container">
                                            <button onClick={() => { setShowPopup(""); resetAddProductForm(); }} className="btn-secondary" type="submit">
                                                Cancel
                                            </button>
                                            <button onClick={addProduct} type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            }
                        </div>
                    )
                }
                {
                    showPopup === "updateProduct" &&
                    (
                        <div className="mailPopUpLayer addCategory">
                            {

                                <div className="popUpBox">
                                    <ion-icon onClick={() => setShowPopup("")} name="close-circle-outline"></ion-icon>
                                    <h2 className="popuptitle">
                                        Update Product
                                    </h2>
                                    <form autoComplete="off" action="">
                                        <label htmlFor="productTitle">
                                            Title<span>*</span>
                                        </label>
                                        <input placeholder="Enter Product title" name='title' value={updateProduct.title} id="productTitle" onChange={(e) => setUpdateProduct({ ...updateProduct, title: e.target.value })} type="text" />

                                        <label htmlFor="productDescription">
                                            Description<span>*</span>
                                        </label>
                                        <textarea placeholder="Enter Product description" name='description' value={updateProduct.description} id="productDescription" onChange={(e) => setUpdateProduct({ ...updateProduct, description: e.target.value })} type="text"></textarea>

                                        <label htmlFor="productCategory">
                                            Category <span>*</span>
                                        </label>
                                        <select value={updateProduct.category} placeholder="Select Category" id="productCategory" onChange={(e) => { setSubCategoriesUpdateProduct(getSubCategory(e.target.value)); setUpdateProduct({ ...updateProduct, category: e.target.value }) }}>
                                            <option value="">Select Category</option>
                                            {
                                                categories.map((category) => (
                                                    <option key={category._id} value={category._id}>{category.title}</option>
                                                ))
                                            }
                                        </select>

                                        <label htmlFor="productSubCategory">
                                            Sub Category
                                        </label>
                                        <select disabled={!subCategoriesUpdateProduct.length} value={updateProduct.subCategory} placeholder="Select Sub Category" id="productSubCategory" onChange={(e) => { setUpdateProduct({ ...updateProduct, subCategory: e.target.value }) }}>
                                            <option value="">Select Sub Category</option>
                                            {
                                                subCategoriesUpdateProduct.map((subCat) => (
                                                    <option name={subCat.title} key={subCat._id} value={subCat._id}>{subCat.title}</option>
                                                ))
                                            }
                                        </select>

                                        <label htmlFor="productDiamond">
                                            Diamond<span>*</span>
                                        </label>
                                        <select value={updateProduct.diamond} placeholder="Select Diamond" id="productDiamond" onChange={(e) => { setUpdateProduct({ ...updateProduct, diamond: e.target.value }) }}>
                                            <option value="">Select Diamond</option>
                                            {
                                                diamonds.map((diamond) => (
                                                    <option key={diamond._id} value={diamond._id}>{diamond.title}</option>
                                                ))
                                            }
                                        </select>

                                        <div className="btn-container">
                                            <button onClick={() => setShowPopup("")} className="btn-secondary" type="submit">
                                                Cancel
                                            </button>
                                            <button onClick={(e) => handleUpdateProduct(e, updateProduct._id)} type="submit">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            }
                        </div>
                    )
                }
                <AdminTop adminDetails={adminDetails} />
                <div className="adminMainContent">
                    <AdminSide adminDetails={adminDetails} setAdminLogged={setAdminLogged} />
                    <div ref={scrollContainerRef} className="right AdminProducts">
                        <div className="titleHeader">
                            <h2 className="title">
                                Products
                            </h2>
                            <button onClick={() => { setShowPopup("addProduct") }}>
                                Add Product
                            </button>
                        </div>

                        <FilterContainer
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                            setProducts={setProducts}
                            page={page}
                            setPage={setPage}
                            hasMoreProduct={hasMoreProduct}
                            setHasMoreProduct={setHasMoreProduct}
                            setIsLoading={setIsLoading}
                            getAllProducts={getAllProducts}
                            initialCall={initialCall}
                        />
                        <ProductsContainer productData={products} materialChange={materialChange} setMaterialChange={setMaterialChange} isLoading={isLoading} isForAdminPanel={true} getSubCategory={getSubCategory} setSubCategoriesUpdateProduct={setSubCategoriesUpdateProduct} setUpdateProduct={setUpdateProduct} setShowPopup={setShowPopup} deleteProduct={deleteProduct} />
                        {isLoading && <Loader />}
                        {
                            (hasMoreProduct && !isLoading) && (
                                <button style={{ margin: "auto", marginTop: "10px" }} onClick={loadMore}>
                                    Load More <ion-icon name="arrow-forward"></ion-icon>
                                </button>)
                        }
                    </div>
                </div>
            </div >
            <ToastContainer />
        </>
    )
}

export default AdminProducts;