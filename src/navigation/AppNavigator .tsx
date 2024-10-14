import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import ProductList from '../screens/ProductList.tsx';
import {NavigationContainer} from '@react-navigation/native';
import ProductDetail from '../screens/ProductDetail.tsx';
import AddProduct from '../screens/AddProduct.tsx';
import UpdateProduct from '../screens/UpdateProduct.tsx';

interface ComponentProps {}

const Stack = createStackNavigator();

const Routes: React.FC<ComponentProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'ListFinancialProducts'}
        screenOptions={{
          headerShown: false,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: false,
          headerMode: 'float',
        }}>
        <Stack.Screen name="ListFinancialProducts" component={ProductList} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
