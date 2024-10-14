import {Dispatch} from 'redux';
import productApi from '../../api/ProductApi.tsx';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductRequest,
  addProductSuccess,
  addProductFailure,
  checkIdRequest,
  checkIdSuccess,
  checkIdFailure,
  updateProductRequest,
  updateProductFailure, deleteProductRequest, deleteProductFailure,
} from '../actions/ProductActions.tsx';
import {Product} from '../../types/Product.tsx';

// FETCH PRODUCTS
export const fetchProducts = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await productApi.get('/products');
      const {data} = response?.data;
      dispatch(fetchProductsSuccess(data));
    } catch (error: any) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};

// ADD PRODUCTS
export const addProduct = (product: Product) => {
  return async (dispatch: Dispatch) => {
    dispatch(addProductRequest());

    console.log(product)

    try {
      const response = await productApi.post('/products', product);
      const {data: addedProduct, message} = response.data;
      dispatch(addProductSuccess(addedProduct));
      return {success: true, message};
    } catch (error: any) {
      console.log(error);
      let errorMessage = 'Ocurrió un error inesperado.';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      dispatch(addProductFailure(errorMessage));
      return {success: false, message: errorMessage};
    }
  };
};

// UPDATE PRODUCTS
export const updateProduct = (product: Product) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateProductRequest());

    const {id} = product;

    try {
      const response = await productApi.put(`/products/${id}`, product);
      const {data: updateProduct, message} = response.data;
      return {success: true, message, product: updateProduct};
    } catch (error: any) {
      let errorMessage = 'Ocurrió un error inesperado.';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      dispatch(updateProductFailure(errorMessage));
      return {success: false, message: errorMessage};
    }
  };
};

// DELETE PRODUCTS
export const deleteProduct = (product: Product) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteProductRequest());

    const {id} = product;
    console.log(id)

    try {
      const response = await productApi.delete(`/products/${id}`);
      const { message} = response.data;
      return {success: true, message};
    } catch (error: any) {
      let errorMessage = 'Ocurrió un error inesperado.';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      console.log(errorMessage);
      dispatch(deleteProductFailure(errorMessage));
      return {success: false, message: errorMessage};
    }
  };
};


// CHECK ID PRODUCTS
export const checkProductId = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkIdRequest());

    try {
      const response = await productApi.get(`/products/verification/${id}`);
      const exists = response.data;
      dispatch(checkIdSuccess(exists));
      return exists;
    } catch (error: any) {
      dispatch(checkIdFailure(error.message));
      return false;
    }
  };
};
