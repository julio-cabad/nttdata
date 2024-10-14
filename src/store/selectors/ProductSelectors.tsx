import { rootState } from '../reducers/rootReducer';

export const selectProducts = (state: rootState) => state.products.products;
export const selectLoading = (state: rootState) => state.products.loading;
export const selectError = (state: rootState) => state.products.error;
