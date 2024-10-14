import {Product} from '../../types/Product.tsx';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const CHECK_ID_REQUEST = 'CHECK_ID_REQUEST';
export const CHECK_ID_SUCCESS = 'CHECK_ID_SUCCESS';
export const CHECK_ID_FAILURE = 'CHECK_ID_FAILURE';

export const SELECT_PRODUCT = 'PRODUCT_DETAIL';

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products: Product[]) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error: any) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

// ADD PRODUCTS

export const addProductRequest = () => ({
  type: ADD_PRODUCT_REQUEST,
});

export const addProductSuccess = (product: Product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

export const addProductFailure = (error: any) => ({
  type: ADD_PRODUCT_FAILURE,
  payload: error,
});

// UPDATE PRODUCTS

export const updateProductRequest = () => ({
  type: UPDATE_PRODUCT_REQUEST,
});


export const updateProductFailure = (error: any) => ({
  type: UPDATE_PRODUCT_FAILURE,
  payload: error,
});

// VERIFICATION PRODUCT

export const checkIdRequest = () => ({
  type: CHECK_ID_REQUEST,
});

export const checkIdSuccess = (exists: boolean) => ({
  type: CHECK_ID_SUCCESS,
  payload: exists,
});

export const checkIdFailure = (error: string) => ({
  type: CHECK_ID_FAILURE,
  payload: error,
});

//DELETE PRODUCT

export const deleteProductRequest = () => ({
  type: DELETE_PRODUCT_REQUEST,
});


export const deleteProductFailure = (error: string) => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error,
});

// GET PRODUCT DETAIL

export const selectDetailProduct = (product: any) => ({
  type: SELECT_PRODUCT,
  payload: product,
});
