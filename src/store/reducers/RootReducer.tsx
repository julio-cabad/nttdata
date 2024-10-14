import { combineReducers } from 'redux';
import {productReducer} from './ProductReducer.tsx';

export const rootReducer = combineReducers({
  products: productReducer,
});

export type rootState = ReturnType<typeof rootReducer>;
