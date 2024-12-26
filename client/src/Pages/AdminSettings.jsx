
import React, { useState } from 'react'
import AdminSide from '../Components/AdminSide'
import AdminTop from '../Components/AdminTop'
import { toast, ToastContainer } from 'react-toastify'
import apiRequest from '../CommonUtil'
import { updateAdminDataApi, updateAdminPasswordApi } from '../Config/API_constant'
import { useLoader } from '../Contexts/LoaderContext'

const AdminSettings = ({ adminDetails, setAdminDetails, setAdminLogged }) => {
    const [passwordData, setPasswordData] = useState({ curPassword: "", newPassword: "", retypePassword: "" })
    const [userData, setUserData] = useState({ ...adminDetails });
    const [refreshAdminDetails, setRefreshAdminDetails] = useState(false);
    const { showLoader, hideLoader } = useLoader();

    const updateAdminData = async (e) => {
        e.preventDefault();
        if (!userData.username || !userData.email) {
            toast.error("Please fill out all the Fields.", {
                position: "top-right"
            });
            return;
        } else if (userData.username.length < 5) {
            toast.error("Please enter Valid Username (Minimum 5 characters)", {
                position: "top-right"
            });
            return;
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email))) {
            toast.error("Please enter valid Email address", {
                position: "top-right"
            });
            return;
        }

        showLoader();
        try {
            const data = await apiRequest(updateAdminDataApi, 'POST', {
                email: userData.email,
                username: userData.username
            }, { withCredentials: true });
            setAdminDetails(userData);
            setRefreshAdminDetails(!refreshAdminDetails);
            toast.success(data.message, {
                position: "top-right"
            });
        } catch (error) {
            // console.log(error);
            setUserData({ ...adminDetails });
        } finally {
            hideLoader();
        }
    };

    const updateAdminPassword = async (e) => {
        e.preventDefault();
        if (!passwordData.curPassword || !passwordData.newPassword || !passwordData.retypePassword) {
            toast.error("Please fill out all the Fields.", {
                position: "top-right"
            });
            return;
        } else if (passwordData.newPassword.length < 6) {
            toast.error("Password length is short (Minimum 6 characters required)", {
                position: "top-right"
            });
            return;
        } else if (passwordData.newPassword !== passwordData.retypePassword) {
            toast.error("New password and retype new password must be same", {
                position: "top-right"
            });
            return;
        }

        showLoader();
        try {
            const data = await apiRequest(updateAdminPasswordApi, 'POST', passwordData, { withCredentials: true });
            setPasswordData({ curPassword: "", newPassword: "", retypePassword: "" });
            toast.success(data.message, {
                position: "top-right"
            });
        } catch (error) {
            // console.log(error);
        } finally {
            hideLoader();
        }
    };

    return (
        <>
            <div>
                <AdminTop adminDetails={adminDetails} />
                <div className="adminMainContent">
                    <AdminSide adminDetails={adminDetails} setAdminLogged={setAdminLogged} />
                    {
                        <div className="right adminSettings">
                            <div className="titleHeader">
                                <h2 className="title">
                                    Settings
                                </h2>
                            </div>
                            <form className='form'>
                                <div className="fields">
                                    <div className="formField">
                                        <div className="dateBox">
                                            <div className="subFormField">
                                                <label className="fieldTitle" htmlFor="username">
                                                    Update Username<span>*</span>
                                                </label>
                                                <input onChange={(e) => setUserData({ ...userData, username: e.target.value })} id="username" value={userData?.username} type="text" placeholder="Enter your Username" />
                                            </div>
                                            <div className="subFormField">
                                                <label className="fieldTitle" htmlFor="email">
                                                    Update Email<span>*</span>
                                                </label>
                                                <input onChange={(e) => setUserData({ ...userData, email: e.target.value.toLowerCase() })} id="email" value={userData?.email} type="text" placeholder="Enter your Email" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='submit' onClick={updateAdminData}>
                                    Update Data
                                </button>
                            </form>

                            <form className="form2">
                                <label className="fieldTitle">
                                    Update Password
                                </label>
                                <div className="formField">
                                    <div className="dateBox">
                                        <div className="subFormField">
                                            <label className="fieldTitle" htmlFor="curPassword">
                                                Current Password<span>*</span>
                                            </label>
                                            <input id="curPassword" value={passwordData.curPassword} onChange={(e) => setPasswordData({ ...passwordData, curPassword: e.target.value })} type="password" placeholder="Enter Current Password" />
                                        </div>
                                        <div className="subFormField">
                                            <label className="fieldTitle" htmlFor="newPassword">
                                                New Password<span>*</span>
                                            </label>
                                            <input id='newPassword' value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} type="password" placeholder="Enter New Password" />
                                        </div>
                                        <div className="subFormField">
                                            <label className="fieldTitle" htmlFor="renewPassword">
                                                Re-enter New Password<span>*</span>
                                            </label>
                                            <input id='renewPassword' value={passwordData.retypePassword} onChange={(e) => setPasswordData({ ...passwordData, retypePassword: e.target.value })} type="password" placeholder="Confirm New Password" />
                                        </div>
                                    </div>
                                </div>
                                <button className="submit" onClick={updateAdminPassword}>
                                    Update Password
                                </button>
                            </form>
                        </div>
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default AdminSettings    