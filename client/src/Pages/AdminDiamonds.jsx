import React, { useEffect, useState } from 'react'
import AdminTop from '../Components/AdminTop';
import AdminSide from '../Components/AdminSide';
import { ToastContainer, toast } from 'react-toastify';
import { useLoader } from '../Contexts/LoaderContext';
import apiRequest from '../CommonUtil';
import Loader from '../Components/Loader';
import { useConfirmation } from '../Contexts/ConfirmationContext';
import { bucketURL, createDiamondApi, deleteDiamondApi, getAllDiamondsApi, getUploadS3Url, updateDiamondApi } from '../Config/API_constant';
import axios from 'axios';

const AdminDiamonds = ({ adminDetails, setAdminDetails, setAdminLogged }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState("");
    const [newDiamond, setNewDiamond] = useState({ title: "", file: null });
    const [updateDiamond, setUpdateDiamond] = useState({});
    const [diamonds, setDiamonds] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [refreshDiamonds, setRefreshDiamonds] = useState(false);

    const { showLoader, hideLoader } = useLoader();
    const { requestConfirmation } = useConfirmation();

    const addDiamond = async (e) => {
        e.preventDefault();
        if (!newDiamond.title || !newDiamond.file) {
            toast.error("Please fill all the fields!", {
                position: "top-right"
            });
            return;
        }
        showLoader();
        const fileParts = newDiamond.file.name.split('.');
        const fileExtension = fileParts.pop();
        const baseName = fileParts.join('.');
        const uniqueFilename = `Diamonds/${baseName}_${Date.now()}.${fileExtension}`;
        try {

            const { data: { uploadUrl } } = await axios.get(getUploadS3Url, {
                params: {
                    filename: uniqueFilename,
                    contentType: newDiamond.file.type,
                },
            });
            await apiRequest(uploadUrl, 'PUT', newDiamond.file, {
                headers: {
                    'Content-Type': newDiamond.file.type,
                }
            })
            const data = await apiRequest(createDiamondApi, 'POST', {
                title: newDiamond.title,
                diamondImage: uniqueFilename
            }, { withCredentials: true });
            setRefreshDiamonds(!refreshDiamonds);
            toast.success(data.message, {
                position: "top-right"
            });
        } catch (error) {
            // console.log(error);
        } finally {
            hideLoader();
            setShowPopup("");
            setNewDiamond({ title: "", file: null });
        }
    }

    const deletediamond = async (id) => {
        const isConfirmed = await requestConfirmation('Are you sure you want to delete this Diamond?');
        if (isConfirmed) {
            showLoader();
            try {
                const data = await apiRequest(`${deleteDiamondApi}/${id}`, 'DELETE', null, { withCredentials: true });
                toast.success(data.message, {
                    position: "top-right"
                });
                setRefreshDiamonds(!refreshDiamonds);
            } catch (error) {
                // console.error('Failed to fetch categories:', error);
            } finally {
                hideLoader();
            }
        }
    }

    const handleUpdateDiamond = async (e, id) => {
        e.preventDefault();
        showLoader();
        try {
            if (updateDiamond.file) {
                const { data: { uploadUrl } } = await axios.get(getUploadS3Url, {
                    params: {
                        filename: updateDiamond.diamondImage,
                        contentType: updateDiamond.file.type,
                    },
                });
                await axios.put(uploadUrl, updateDiamond.file, {
                    headers: {
                        'Content-Type': updateDiamond.file.type,
                    }
                });
            }
            const data = await apiRequest(`${updateDiamondApi}/${id}`, 'PUT', {
                title: updateDiamond.title,
                diamondImage: updateDiamond.diamondImage
            }, { withCredentials: true });
            setRefreshDiamonds(!refreshDiamonds);
            toast.success(data.message, {
                position: "top-right"
            });
        } catch (error) {
            // console.log(error);
        } finally {
            hideLoader();
            setShowPopup("");
            setUpdateDiamond({});
        }
    };

    useEffect(() => {
        setIsLoading(true);
        async function getAllDiamonds() {
            try {
                const data = await apiRequest(getAllDiamondsApi, 'GET');
                setDiamonds(data?.data || []);
                let x = [];
                for (let i = 0, diamondsLength = data?.data.length; i < diamondsLength; i++) {
                    x[data?.data[i]._id] = `${bucketURL}/${data?.data[i].diamondImage}?cacheBust=${Math.random()}`;
                };
                setImageUrls(x);
            } catch (error) {
                // console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoading(false);
            }
        }
        getAllDiamonds();
    }, [refreshDiamonds]);

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
                                        Add New Diamond
                                    </h2>
                                    <form autoComplete="off" action="">
                                        <label htmlFor="diamondTitle">
                                            Title<span>*</span>
                                        </label>
                                        <input placeholder="Enter Diamond title" name='title' value={newDiamond.title} id="diamondTitle" onChange={(e) => setNewDiamond({ ...newDiamond, title: e.target.value })} type="text" />

                                        <label htmlFor="diamondImage">
                                            Image<span>*</span>
                                        </label>
                                        <input name='diamondImage' id="diamondImage" onChange={(e) => setNewDiamond({ ...newDiamond, file: e.target.files[0] })} type="file" />

                                        <div className="btn-container">
                                            <button onClick={() => setShowPopup("")} className="btn-secondary" type="submit">
                                                Cancel
                                            </button>
                                            <button onClick={addDiamond} type="submit">
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
                    showPopup === "updateDiamond" &&
                    (
                        <div className="mailPopUpLayer addCategory">
                            {

                                <div className="popUpBox">
                                    <ion-icon onClick={() => setShowPopup("")} name="close-circle-outline"></ion-icon>
                                    <h2 className="popuptitle">
                                        Update Diamond
                                    </h2>
                                    <form autoComplete="off" action="">
                                        <label htmlFor="diamondTitle">
                                            Title<span>*</span>
                                        </label>
                                        <input placeholder="Enter Diamond title" name='title' value={updateDiamond.title} id="diamondTitle" onChange={(e) => setUpdateDiamond({ ...updateDiamond, title: e.target.value })} type="text" />
                                        <label htmlFor="diamondImage">
                                            Image<span>*</span> ({updateDiamond.diamondImage})
                                        </label>
                                        <input name='diamondImage' id="diamondImage" onChange={(e) => setUpdateDiamond({ ...updateDiamond, file: e.target.files[0] })} type="file" />

                                        <div className="btn-container">
                                            <button onClick={() => setShowPopup("")} className="btn-secondary" type="submit">
                                                Cancel
                                            </button>
                                            <button onClick={(e) => handleUpdateDiamond(e, updateDiamond._id)} type="submit">
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
                                Diamonds
                            </h2>
                            <button onClick={() => { setShowPopup("addCategory") }}>
                                Add Diamond
                            </button>
                        </div>
                        <div className="categoryContainer">
                            {
                                isLoading ?
                                    <Loader /> :
                                    diamonds.length === 0 ?
                                        <h1 className='no-data'>
                                            No Diamonds available
                                        </h1>
                                        :
                                        diamonds.map((diamond, index) => (

                                            <div key={diamond._id} className="categoryBox">
                                                <div className="imgBox">
                                                    <img className="categoryImage" src={imageUrls[diamond._id]} alt={diamond.title} />
                                                </div>
                                                <p className="categoryTitle">
                                                    {diamond.title}
                                                </p>
                                                <div className="actionBtns">
                                                    <button className="edit" onClick={() => { setUpdateDiamond(diamond); setShowPopup("updateDiamond") }}>
                                                        <ion-icon name="pencil-outline"></ion-icon>
                                                    </button>
                                                    <button className="delete" onClick={() => deletediamond(diamond._id)}>
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

export default AdminDiamonds