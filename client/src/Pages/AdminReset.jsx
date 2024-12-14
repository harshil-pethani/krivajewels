import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordApi, resetTokenVerify } from '../Config/API_constant';
import { ToastContainer, toast } from 'react-toastify';
import { useLoader } from '../Contexts/LoaderContext';
import apiRequest from '../CommonUtil';

const AdminReset = () => {
    const [credentials, setCredentials] = useState({ newPassword: "", retypePassword: "" });
    const [tokenVerified, setTokenVerified] = useState(false);
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    const [tokenErrorMsg, setTokenErrorMsg] = useState("Wait For a Moment ... ");
    const location = useLocation();
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();

    const checkToken = async (token) => {
        try {
            showLoader();
            const res = await apiRequest(resetTokenVerify, 'POST', { token }, { withCredentials: true });
            setTokenVerified(true);
            setUserId(res.userId);
        } catch (e) {
            setTokenVerified(false);
            if (e.response.status === 400 || e.response.status === 500) {
                toast.error(e.response.data.message, {
                    position: "top-right"
                });
                setTokenErrorMsg(e.response.data.message);
            } else {
                toast.error("Sorry, Something went wrong - Please try after some time", {
                    position: "top-right"
                });
                setTokenErrorMsg("Sorry, Something went wrong - Please try after some time.");
            }
        } finally {
            hideLoader();
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenVal = queryParams.get("reset_password_token");
        setToken(tokenVal);
        checkToken(tokenVal);
    }, []);

    const validateData = () => {
        if (!credentials.newPassword || !credentials.retypePassword) {
            toast.error("Please fill out all the Fields ", {
                position: "top-right"
            });
            return false;
        } else if (credentials.newPassword.length < 6) {
            toast.error("Password should be more than 6 characters", {
                position: "top-right"
            });
            return false;
        } else if (credentials.newPassword !== credentials.retypePassword) {
            toast.error("Both field must be same", {
                position: "top-right"
            });
            return false;
        }
        return true;
    }

    const setPassword = async (e) => {
        e.preventDefault();
        if (validateData()) {
            try {
                showLoader();
                const res = await apiRequest(resetPasswordApi, 'PUT', { userId, token, ...credentials }, { withCredentials: true });
                toast.success(res.message, {
                    position: "top-right"
                });
                navigate("/admin")
            } catch (e) {
            } finally {
                hideLoader();
            }
        }
    }

    return (
        <>
            {
                tokenVerified ?
                    <div className="adminlogin">
                        <div className="loginBox">
                            <h2 className="title">
                                Reset Password
                            </h2>
                            <form>
                                <label htmlFor="password">
                                    New Password<span>*</span>
                                </label>
                                <input placeholder="Enter new Password" id='password' value={credentials.newPassword} type="password" onChange={(e) => setCredentials({ ...credentials, newPassword: e.target.value })} />

                                <label htmlFor="retypepassword">
                                    Retype Password<span>*</span>
                                </label>
                                <input placeholder="Confirm new Password" id='retypepassword' value={credentials.retypePassword} onChange={(e) => setCredentials({ ...credentials, retypePassword: e.target.value })} type="password" />
                                <button onClick={setPassword}>
                                    Submit
                                </button>
                            </form>
                            <span className="subLink" onClick={() => navigate("/admin")}>
                                Back to Login !
                            </span>
                        </div>
                    </div>
                    :
                    <div className="adminlogin">
                        <div className="loginBox">
                            <h1 style={{ textAlign: "center", fontSize: "26px" }} className="slogan">
                                {tokenErrorMsg}
                                <br />
                                <br />

                                <span style={{ fontSize: "20px", textDecoration: "underline" }} className="subLink" onClick={() => navigate("/admin")}>
                                    Back to Login !
                                </span>
                            </h1>
                        </div>
                    </div>
            }
            <ToastContainer />
        </>
    )
}

export default AdminReset;