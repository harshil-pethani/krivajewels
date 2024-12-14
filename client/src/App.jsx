import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import { useEffect, useState } from "react";
import AdminLogin from "./Pages/AdminLogin";
import AdminSettings from "./Pages/AdminSettings";
import AdminCategory from "./Pages/AdminCategory";
import AdminProducts from "./Pages/AdminProducts";
import ExplorePage from "./Pages/ExplorePage";
import AboutUsPage from "./Pages/AboutUsPage";
import ScrollToTop from "./Components/ScrollToTop";
import apiRequest from "./CommonUtil";
import { checkAdminApi } from "./Config/API_constant";
import AdminDiamonds from "./Pages/AdminDiamonds";
import SingleProduct from "./Pages/SingleProductPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermAndConditions";
import WhyChooseUs from "./Pages/WhyChooseUs";
import FourCs from "./Pages/FourC's";
import CustomizePage from "./Pages/CustomizePage";
import AdminReset from "./Pages/AdminReset";

const App = () => {
  const [adminLogged, setAdminLogged] = useState(false);
  const [adminDetails, setAdminDetails] = useState({});

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const data = await apiRequest(checkAdminApi, 'GET', null, { withCredentials: true }, true);
        setAdminLogged(true);
        setAdminDetails(data.admin);
      } catch (e) {
        setAdminLogged(false);
      }
    }
    checkAdmin();
  }, []);

  return (
    <ScrollToTop>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route exact path="/about-us" element={<AboutUsPage />} />
        <Route exact path="/why-choose-us" element={<WhyChooseUs />} />
        <Route exact path="/term-and-conditions" element={<TermsAndConditions />} />
        <Route exact path="/four-c" element={<FourCs />} />
        <Route exact path="/customize-jewellery" element={<CustomizePage />} />
        <Route exact path="/explore" element={<ExplorePage />} />
        <Route exact path="/explore/:id" element={<SingleProduct />} />
        <Route exact path="/admin" element={adminLogged ? <Navigate to="/admin/categories" /> : <AdminLogin setAdminDetails={setAdminDetails} setAdminLogged={setAdminLogged} />} />
        <Route exact path="/admin/reset_password" element={adminLogged ? <Navigate to="/admin/settings" /> : < AdminReset />} />
        <Route exact path="/admin/settings" element={adminLogged ? <AdminSettings setAdminLogged={setAdminLogged} adminDetails={adminDetails} setAdminDetails={setAdminDetails} /> : <AdminLogin setAdminDetails={setAdminDetails} setAdminLogged={setAdminLogged} />} />
        <Route exact path="/admin/categories" element={adminLogged ? <AdminCategory setAdminLogged={setAdminLogged} adminDetails={adminDetails} setAdminDetails={setAdminDetails} /> : <AdminLogin setAdminDetails={setAdminDetails} setAdminLogged={setAdminLogged} />} />
        <Route exact path="/admin/diamonds" element={adminLogged ? <AdminDiamonds setAdminLogged={setAdminLogged} adminDetails={adminDetails} setAdminDetails={setAdminDetails} /> : <AdminLogin setAdminDetails={setAdminDetails} setAdminLogged={setAdminLogged} />} />
        <Route exact path="/admin/products" element={adminLogged ? <AdminProducts setAdminLogged={setAdminLogged} adminDetails={adminDetails} setAdminDetails={setAdminDetails} /> : <AdminLogin setAdminDetails={setAdminDetails} setAdminLogged={setAdminLogged} />} />
      </Routes>
    </ScrollToTop>
  )
}

export default App