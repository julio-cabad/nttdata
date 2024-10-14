import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import ProductList from '../../src/screens/ProductList';
import {Store, UnknownAction} from 'redux'; // Cambia la ruta según tu estructura de carpetas


// Configuración de la tienda de Redux mock
const mockStore = configureStore([]);

const mockProducts = [
  { id: '1', name: 'Product 1' },
  { id: '2', name: 'Product 2' },
];

jest.mock('../store/thunks/ProductThunks.tsx', () => ({
  fetchProducts: jest.fn(),
}));

describe('ProductList', () => {
  let store:
    | MockStoreEnhanced<unknown, {}>
    | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({
      products: mockProducts,
      loading: false,
      error: null,
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

  test('should render the header and search input', () => {
    const { getByPlaceholderText } = renderComponent();
    expect(getByPlaceholderText('Buscar')).toBeTruthy();
  });

  test('should display products in the list', () => {
    const { getByText } = renderComponent();
    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Product 2')).toBeTruthy();
  });

  test('should filter products based on search input', async () => {
    const { getByPlaceholderText, queryByText } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Buscar'), 'Product 1');

    await waitFor(() => {
      expect(queryByText('Product 2')).toBeNull(); // Product 2 should not be visible
    });

   // expect(getByText('Product 1')).toBeTruthy(); // Product 1 should still be visible
  });

  test('should show alert message when there is an error', () => {
    store = mockStore({
      products: [],
      loading: false,
      error: 'Something went wrong',
    });

    const { getByText } = render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(getByText('AVISO')).toBeTruthy(); // Assuming the alert message has a header of 'AVISO'
  });

  test('should navigate to ProductDetail on product click', () => {
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    fireEvent.press(getByText('Product 1'));

    expect(navigation.navigate).toHaveBeenCalledWith('ProductDetail');
  });

  // Puedes agregar más pruebas según sea necesario
});
