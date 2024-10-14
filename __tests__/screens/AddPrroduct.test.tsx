import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import thunk from 'redux-thunk';
import AddProduct from '../../src/screens/AddProduct';
import {
  checkProductId,
  addProduct,
  fetchProducts,
} from '../../src/store/thunks/ProductThunks';
import {Store, UnknownAction} from 'redux';

// Mock the navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

// Mock the thunks
jest.mock('../../src/store/thunks/ProductThunks', () => ({
  checkProductId: jest.fn(),
  addProduct: jest.fn(),
  fetchProducts: jest.fn(),
}));

// @ts-ignore
const mockStore = configureStore([thunk]);

describe('AddProduct Component', () => {
  let store:
    | MockStoreEnhanced<unknown, {}>
    | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <AddProduct />
      </Provider>,
    );

    expect(getByText('ID')).toBeTruthy();
    expect(getByText('Nombre')).toBeTruthy();
    expect(getByText('Descripción')).toBeTruthy();
    expect(getByText('Logo')).toBeTruthy();
    expect(getByText('Fecha de liberación')).toBeTruthy();
    expect(getByText('Enviar')).toBeTruthy();
    expect(getByText('Reiniciar')).toBeTruthy();
  });

  it('submits the form with valid data', async () => {
    (checkProductId as jest.Mock).mockResolvedValue(false);
    (addProduct as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Product added successfully',
    });

    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <AddProduct />
      </Provider>,
    );

    fireEvent.changeText(getByTestId('id-input'), '12345');
    fireEvent.changeText(getByTestId('name-input'), 'Test Product');
    fireEvent.changeText(
      getByTestId('description-input'),
      'This is a test product',
    );
    fireEvent.changeText(
      getByTestId('logo-input'),
      'http://example.com/logo.png',
    );
    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(checkProductId).toHaveBeenCalledWith('12345');
      expect(addProduct).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '12345',
          name: 'Test Product',
          description: 'This is a test product',
          logo: 'http://example.com/logo.png',
        }),
      );
      expect(fetchProducts).toHaveBeenCalled();
    });
  });

  it('shows error message when product ID already exists', async () => {
    (checkProductId as jest.Mock).mockResolvedValue(true);

    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <AddProduct />
      </Provider>,
    );

    fireEvent.changeText(getByTestId('id-input'), '12345');
    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(checkProductId).toHaveBeenCalledWith('12345');
      expect(getByText('El ID ya existe, elige otro.')).toBeTruthy();
    });
  });

  it('resets the form when reset button is pressed', () => {
    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <AddProduct />
      </Provider>,
    );

    fireEvent.changeText(getByTestId('id-input'), '12345');
    fireEvent.changeText(getByTestId('name-input'), 'Test Product');
    fireEvent.press(getByText('Reiniciar'));

    expect(getByTestId('id-input').props.value).toBe('');
    expect(getByTestId('name-input').props.value).toBe('');
  });
});
