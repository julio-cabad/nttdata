import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SELECT_PRODUCT,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
  CHECK_ID_REQUEST,
  CHECK_ID_SUCCESS,
  CHECK_ID_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from '../actions/ProductActions.tsx';

interface ProductState {
  loading: boolean;
  products: any[];
  selectedDetailProduct: any | null;
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  selectedDetailProduct: null,
  error: null,
};

const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ADD PRODUCTS
    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
        error: null,
      };

    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // UPDATE PRODUCTS
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
        error: null,
      };

    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // DELETE PRODUCT

    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
        error: null,
      };

    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // VERIFICATION PRODUCT

    case CHECK_ID_REQUEST:
      return {...state, loading: true, error: null};
    case CHECK_ID_SUCCESS:
      return {...state, loading: false, idExists: action.payload};
    case CHECK_ID_FAILURE:
      return {...state, loading: false, error: action.payload};

    // GET PRODUCT DETAIL

    case SELECT_PRODUCT:
      return {
        ...state,
        selectedDetailProduct: action.payload,
      };

    default:
      return state;
  }
};

export {productReducer};
