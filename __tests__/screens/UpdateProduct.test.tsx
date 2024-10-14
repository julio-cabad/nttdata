// __tests__/UpdateProduct.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';
import UpdateProduct from '../../src/screens/UpdateProduct'; // Ajusta la ruta al componente
import { fetchProducts, updateProduct } from '../../src/store/thunks/ProductThunks';

const mockStore = configureStore([]);

jest.mock('../store/thunks/ProductThunks.tsx', () => ({
  fetchProducts: jest.fn(),
  updateProduct: jest.fn(),
}));

jest.mock('../store/actions/ProductActions.tsx', () => ({
  selectDetailProduct: jest.fn(),
}));


const mockProductDetail = {
  id: '1',
  name: 'Producto 1',
  description: 'Descripción del producto 1',
  logo: 'url-del-logo',
  date_release: '2024-01-01',
  date_revision: '2024-01-01',
};

describe('UpdateProduct', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      products: { selectedDetailProduct: mockProductDetail },
    });
  });

  it('renders correctly and handles form submission', async () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <UpdateProduct />
        </NavigationContainer>
      </Provider>
    );


    expect(getByText('Actualizar producto')).toBeTruthy();
    // @ts-ignore
    expect(getByLabelText('ID')).toHaveProp('editable', false);
    // @ts-ignore
    expect(getByLabelText('Nombre')).toHaveProp('editable', true);


    fireEvent.changeText(getByLabelText('Nombre'), 'Producto Actualizado');
    fireEvent.changeText(getByLabelText('Descripción'), 'Nueva descripción');


    (updateProduct as jest.Mock).mockResolvedValueOnce({
      success: true,
      message: 'Producto actualizado con éxito',
      product: { ...mockProductDetail, name: 'Producto Actualizado' },
    });

    fireEvent.press(getByText('Enviar'));


    await waitFor(() => {
      expect(updateProduct).toHaveBeenCalledWith({
        id: '1',
        name: 'Producto Actualizado',
        description: 'Nueva descripción',
        logo: 'url-del-logo',
        date_release: '2024-01-01',
        date_revision: '2024-01-01',
      });
      expect(fetchProducts).toHaveBeenCalled();
    });


    expect(getByText('AVISO')).toBeTruthy();
    expect(getByText('Producto actualizado con éxito')).toBeTruthy();
  });

  it('handles error during submission', async () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <UpdateProduct />
        </NavigationContainer>
      </Provider>
    );


    fireEvent.changeText(getByLabelText('Nombre'), 'Producto Actualizado');


    (updateProduct as jest.Mock).mockResolvedValueOnce({
      success: false,
      message: 'Error al actualizar el producto',
      product: null,
    });

    fireEvent.press(getByText('Enviar'));


    await waitFor(() => {
      expect(updateProduct).toHaveBeenCalled();
    });


    expect(getByText('AVISO')).toBeTruthy();
    expect(getByText('Error al actualizar el producto')).toBeTruthy();
  });
});
