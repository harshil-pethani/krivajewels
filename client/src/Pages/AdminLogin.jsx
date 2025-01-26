import React, { useEffect, useState } from 'react';
import { forgotPassowrdApi, getAllFiltersApi, loginApi } from '../Config/API_constant';
import apiRequest from '../CommonUtil';
import { useLoader } from '../Contexts/LoaderContext';
import { ToastContainer, toast } from 'react-toastify';
import { braceletFilters, earringFilters, necklaceFilters, pendantsFilters, ringFilters } from '../Config/Static_data';

const AdminLogin = ({ setAdminLogged, setAdminDetails }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [forgotEmail, setForgotEmail] = useState("");
    const [activeBox, setActiveBox] = useState("loginBox");

    const { showLoader, hideLoader } = useLoader();

    const validateData = () => {
        if (!credentials.email || !credentials.password) {
            toast.error("Please fill all the fields!", {
                position: "top-right"
            });
            return false;
        }
        return true;
    }

    async function getAllFilters() {
        try {
            const res = await apiRequest(getAllFiltersApi, 'GET');
            const filters = [
                { name: "Category", disabled: false, data: res.data[0] },
                { name: "Diamond", disabled: false, data: res.data[1] },
                { name: "Sub Category", disabled: true, data: [] }
            ];
            sessionStorage.setItem("KrivaFilters", JSON.stringify(filters));
        } catch (e) {
            toast.error("Something went wrong !", {
                position: "top-right"
            });
        }
    }

    useEffect(() => {
        getAllFilters();
        sessionStorage.setItem("KrivaRingFilters", JSON.stringify(ringFilters));
        sessionStorage.setItem("KrivaEarringFilters", JSON.stringify(earringFilters));
        sessionStorage.setItem("KrivaPendantFilters", JSON.stringify(pendantsFilters));
        sessionStorage.setItem("KrivaBraceletFilters", JSON.stringify(braceletFilters));
        sessionStorage.setItem("KrivaNecklaceFilters", JSON.stringify(necklaceFilters));
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        showLoader();
        if (validateData()) {
            try {
                const data = await apiRequest(loginApi, 'POST', credentials, { withCredentials: true });
                setAdminLogged(true);
                setAdminDetails(data);
            } catch (e) {
            } finally {
                hideLoader();
            }
        }
    }

    const handleForgotBtn = async (e) => {
        e.preventDefault();
        if (!forgotEmail) {
            toast.error("Please fill all the fields!", {
                position: "top-right"
            });
            return;
        }
        showLoader();
        try {
            const res = await apiRequest(forgotPassowrdApi, 'POST', { email: forgotEmail }, { withCredentials: true });
            toast.success(res.message, {
                position: "top-right"
            });
        } catch (e) {
        } finally {
            hideLoader();
        }

    }

    return (
        <div className="adminlogin">
            {
                activeBox === "loginBox"
                &&
                <div className="loginBox">
                    <h2 className="title">
                        Welcome Back!
                    </h2>
                    <h3 className='slogan'>
                        Login to Continue
                    </h3>
                    <form>
                        <label htmlFor="email">
                            Email<span>*</span>
                        </label>
                        <input id="email" value={credentials.email} type="email" placeholder="Enter your Email" onChange={(e) => setCredentials({ ...credentials, email: e.target.value.toLowerCase() })} />

                        <label htmlFor="password">
                            Password<span>*</span>
                        </label>
                        <input id="password" value={credentials.password} placeholder="Enter your password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} type="password" />
                        <button onClick={handleLogin}>
                            Login
                        </button>
                    </form>
                    <span className="subLink" onClick={() => { setActiveBox("forgotBox") }}>
                        Forgot Password?
                    </span>
                </div>
            }
            {
                activeBox === "forgotBox"
                &&
                <div className="loginBox">
                    <h2 className="title">
                        Forgot Password ?
                    </h2>
                    <p className="instruction">
                        Enter your Email id. We will send you forgot password URL.
                    </p>
                    <form>
                        <label htmlFor="email">
                            Email<span>*</span>
                        </label>
                        <input id='email' value={forgotEmail} type="email" onChange={(e) => setForgotEmail(e.target.value.toLowerCase())} placeholder="Enter your Email" />
                        <button onClick={handleForgotBtn}>
                            Send
                        </button>
                    </form>
                    <span className="subLink" onClick={() => { setActiveBox("loginBox") }}>
                        Back to Login !
                    </span>
                </div>
            }
            <ToastContainer />
        </div>
    )
}

export default AdminLogin