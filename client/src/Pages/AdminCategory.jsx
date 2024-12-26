import React, { useEffect, useState } from 'react'
import AdminTop from '../Components/AdminTop';
import AdminSide from '../Components/AdminSide';
import { bucketURL, createCategoryApi, deleteCategoryApi, getAllCategoriesApi, getUploadS3Url, updateCategoryApi } from '../Config/API_constant';
import { ToastContainer, toast } from 'react-toastify';
import { useLoader } from '../Contexts/LoaderContext';
import apiRequest from '../CommonUtil';
import Loader from '../Components/Loader';
import { useConfirmation } from '../Contexts/ConfirmationContext';
import axios from 'axios';

const AdminCategory = ({ adminDetails, setAdminDetails, setAdminLogged }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState("");
    const [newCategory, setNewCategory] = useState({ title: "", file: null });
    const [updateCategory, setUpdateCategory] = useState({});
    const [categories, setCategories] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [refreshCategories, setRefreshCategories] = useState(false);

    const { showLoader, hideLoader } = useLoader();
    const { requestConfirmation } = useConfirmation();

    const addCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.title || !newCategory.file) {
            toast.error("Please fill all the fields!", {
                position: "top-right"
            });
            return;
        }
        showLoader();
        const fileParts = newCategory.file.name.split('.');
        const fileExtension = fileParts.pop();
        const baseName = fileParts.join('.');
        const uniqueFilename = `Categories/${baseName}_${Date.now()}.${fileExtension}`;
        try {
            const { data: { uploadUrl } } = await axios.get(getUploadS3Url, {
                params: {
                    filename: uniqueFilename,
                    contentType: newCategory.file.type,
                },
            });
            await apiRequest(uploadUrl, 'PUT', newCategory.file, {
                headers: {
                    'Content-Type': newCategory.file.type,
                }
            })
            const data = await apiRequest(createCategoryApi, 'POST', {
                title: newCategory.title,
                categoryImage: uniqueFilename
            }, { withCredentials: true });
            setRefreshCategories(!refreshCategories);
            toast.success(data.message, {
                position: "top-right"
            });
        } catch (error) {
            // console.log(error);
        } finally {
            hideLoader();
            setShowPopup("");
            setNewCategory({ title: "", file: null });
        }
    }

    const deleteCategory = async (id) => {
        const isConfirmed = await requestConfirmation('Are you sure you want to delete this Category?');
        if (isConfirmed) {
            showLoader();
            try {
                const data = await apiRequest(`${deleteCategoryApi}/${id}`, 'DELETE', null, { withCredentials: true });
                toast.success(data.message, {
                    position: "top-right"
                });
                setRefreshCategories(!refreshCategories);
            } catch (error) {
                // console.error('Failed to fetch categories:', error);
            } finally {
                hideLoader();
            }
        }
    }

    const handleUpdateCategory = async (e, id) => {
        e.preventDefault();
        showLoader();
        try {
            if (updateCategory.file) {
                const { data: { uploadUrl } } = await axios.get(getUploadS3Url, {
                    params: {
                        filename: updateCategory.categoryImage,
                        contentType: updateCategory.file.type,
                    },
                });
                await axios.put(uploadUrl, updateCategory.file, {
                    headers: {
                        'Content-Type': updateCategory.file.type,
                    }
                });
            }
            const data = await apiRequest(`${updateCategoryApi}/${id}`, 'PUT', {
                title: updateCategory.title,
                categoryImage: updateCategory.categoryImage
            }, { withCredentials: true });
            setRefreshCategories(!refreshCategories);
            toast.success(data.message, {
                position: "top-right"
            });
        } catch (error) {
            // console.log(error);
        } finally {
            hideLoader();
            setShowPopup("");
            setUpdateCategory({});
        }
    };

    useEffect(() => {
        setIsLoading(true);
        async function getAllCategories() {
            try {
                const data = await apiRequest(getAllCategoriesApi, 'GET');
                setCategories(data?.data || []);
                let x = [];
                for (let i = 0, catLength = data?.data.length; i < catLength; i++) {
                    x[data?.data[i]._id] = `${bucketURL}/${data?.data[i].categoryImage}?cacheBust=${Math.random()}`;
                };
                setImageUrls(x);
            } catch (error) {
                // console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoading(false);
            }
        }
        getAllCategories();
    }, [refreshCategories]);

    return (
        <>
            <div>
                {
                    showPopup === "addCategory" &&
                    (
                        <div className="mailPopUpLayer addCategory">
                            {

                                <div className="popUpBox">
                                    <ion-icon onClick={() => setShowPopup("")} name="close-circle-outline"></ion-icon>
                                    <h2 className="popuptitle">
                                        Add New Category
                                    </h2>
                                    <form autoComplete="off" action="">
                                        <label htmlFor="categoryTitle">
                                            Title<span>*</span>
                                        </label>
                                        <input placeholder="Enter category title" name='title' value={newCategory.title} id="categoryTitle" onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })} type="text" />

                                        <label htmlFor="categoryImage">
                                            Image<span>*</span>
                                        </label>
                                        <input name='categoryImage' id="categoryImage" onChange={(e) => setNewCategory({ ...newCategory, file: e.target.files[0] })} type="file" />

                                        <div className="btn-container">
                                            <button onClick={() => setShowPopup("")} className="btn-secondary" type="submit">
                                                Cancel
                                            </button>
                                            <button onClick={addCategory} type="submit">
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
                    showPopup === "updateCategory" &&
                    (
                        <div className="mailPopUpLayer addCategory">
                            {

                                <div className="popUpBox">
                                    <ion-icon onClick={() => setShowPopup("")} name="close-circle-outline"></ion-icon>
                                    <h2 className="popuptitle">
                                        Update Category
                                    </h2>
                                    <form autoComplete="off" action="">
                                        <label htmlFor="categoryTitle">
                                            Title<span>*</span>
                                        </label>
                                        <input placeholder="Enter category title" name='title' value={updateCategory.title} id="categoryTitle" onChange={(e) => setUpdateCategory({ ...updateCategory, title: e.target.value })} type="text" />
                                        <label htmlFor="categoryImage">
                                            Image<span>*</span> ({updateCategory.categoryImage})
                                        </label>
                                        <input name='categoryImage' id="categoryImage" onChange={(e) => setUpdateCategory({ ...updateCategory, file: e.target.files[0] })} type="file" />

                                        <div className="btn-container">
                                            <button onClick={() => setShowPopup("")} className="btn-secondary" type="submit">
                                                Cancel
                                            </button>
                                            <button onClick={(e) => handleUpdateCategory(e, updateCategory._id)} type="submit">
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
                    <div className="right adminCategory">
                        <div className="titleHeader">
                            <h2 className="title">
                                Categories
                            </h2>
                            <button onClick={() => { setShowPopup("addCategory") }}>
                                Add Category
                            </button>
                        </div>
                        <div className="categoryContainer">
                            {
                                isLoading ?
                                    <Loader /> :
                                    categories.length === 0 ?
                                        <h1 className='no-data'>
                                            No Categories available
                                        </h1>
                                        :
                                        categories.map((category, index) => (

                                            <div key={category._id} className="categoryBox">
                                                <div className="imgBox">
                                                    <img className="categoryImage" src={imageUrls[category._id]} alt={category.title} />
                                                </div>
                                                <p className="categoryTitle">
                                                    {category.title}
                                                </p>
                                                <div className="actionBtns">
                                                    <button className="edit" onClick={() => { setUpdateCategory(category); setShowPopup("updateCategory") }}>
                                                        <ion-icon name="pencil-outline"></ion-icon>
                                                    </button>
                                                    <button className="delete" onClick={() => deleteCategory(category._id)}>
                                                        <ion-icon name="trash-outline"></ion-icon>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default AdminCategory