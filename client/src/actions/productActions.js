// Get All Products
export const getProduct =
  (keyword = '', currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {};

// Create Product
export const createProduct = (productData) => async (dispatch) => {};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {};
