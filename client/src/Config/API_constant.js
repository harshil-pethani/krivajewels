export const domain = "";
export const krivaDomain = "https://krivajewel.com";
// export const domain = "http://localhost:5000";

export const bucketURL = "https://krivajewelsfiles.s3.ap-south-1.amazonaws.com";
// const domain = "";

// Auth API
// export const registerApi = `${domain}/api/auth/register`;
export const loginApi = `${domain}/api/auth/login`;
export const logoutApi = `${domain}/api/auth/logout`;
export const forgotPassowrdApi = `${domain}/api/auth/forgotpassword`;
export const resetTokenVerify = `${domain}/api/auth/reset_token_verify`;
export const resetPasswordApi = `${domain}/api/auth/resetpassword`;
export const checkAdminApi = `${domain}/api/auth/checkadmin`;
export const updateAdminDataApi = `${domain}/api/auth/updatedata`;
export const updateAdminPasswordApi = `${domain}/api/auth/updatepassword`;

// Products API
export const getAllProductsApi = `${domain}/api/product`;
export const createProductApi = `${domain}/api/product/create`;
export const updateProductApi = `${domain}/api/product/update`;
export const deleteProductApi = `${domain}/api/product`;
export const singleProductApi = `${domain}/api/product/find`;
export const recent5ProductApi = `${domain}/api/product/recent5`;

// Categories API
export const getAllCategoriesApi = `${domain}/api/category`;
export const createCategoryApi = `${domain}/api/category/create`;
export const updateCategoryApi = `${domain}/api/category/update`;
export const deleteCategoryApi = `${domain}/api/category`;

// Diamonds API
export const getAllDiamondsApi = `${domain}/api/diamond`;
export const createDiamondApi = `${domain}/api/diamond/create`;
export const updateDiamondApi = `${domain}/api/diamond/update`;
export const deleteDiamondApi = `${domain}/api/diamond`;

export const getAllFiltersApi = `${domain}/api/product/allfilters`;

export const getAllProductApi = `${domain}/api/product`;

export const getUploadS3Url = `${domain}/api/s3/upload-url`;
// "proxy": "",


