import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectError,
  selectLoading,
  selectProducts,
} from '../store/selectors/ProductSelectors.tsx';
import {fetchProducts} from '../store/thunks/ProductThunks.tsx';
import AlertMessage from '../components/common/AlertMessages.tsx';
import Header from '../components/common/Header.tsx';
import Label from '../components/common/Label.tsx';
import {blueColor, borderColor, yellowColor} from '../styles/Colors.tsx';
import {miIcon} from '../utils/Icons.tsx';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {selectDetailProduct} from '../store/actions/ProductActions.tsx';
import {Product, StateType} from '../types/Product.tsx';
import SubmitButton from '../components/common/SubmitButton.tsx';

interface ComponentProps {}

const ProductList: React.FC<ComponentProps> = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [alertMessages, setAlertMessages] = React.useState({
    openAlert: false,
    head: '',
    body: '',
    type: 1,
  });
  const [products_, setFilterProducts] = useState<Product[]>(products);
  const [search, setSearch]: StateType<string> = useState('');

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    error &&
      setAlertMessages({
        ...alertMessages,
        openAlert: true,
        head: 'AVISO',
        body: error,
        type: 1,
      });
  }, [error]);

  useEffect(() => {
    products && setFilterProducts(products);
  }, [products]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSearch = (text: string) => {
    setSearch(text);
    const filterProducts = products_.filter((item: Product) => {
      const itemData = `${item.name.toUpperCase()} ${item.id.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilterProducts(filterProducts);
    text === '' && setFilterProducts(products);
  };

  const onHandleAlertConfirm = () => {
    setAlertMessages({...alertMessages, openAlert: false});
  };

  const onHandleProductDetail = (product: any) => {
    navigation.navigate('ProductDetail');
    dispatch(selectDetailProduct(product));
  };

  const onHandleAddProduct = () => navigation.navigate('AddProduct');

  const renderItem = ({item}: {item: Product}) => {
    const {id, name} = item;

    return (
      <TouchableOpacity
        style={styles.buttonList}
        onPress={() => onHandleProductDetail(item)}>
        <View>
          <Label
            text={name}
            color={'#333'}
            font={'700'}
            size={14}
            left={0}
            top={0}
          />
          <Label
            text={id}
            color={'gray'}
            font={'400'}
            size={14}
            left={0}
            top={0}
          />
        </View>

        {miIcon('keyboard-arrow-right', 30, 'gray')}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.textInputSearch}
          placeholder={'Buscar'}
          onChangeText={handleSearch}
          value={search}
        />

        {products_ && (
          <View style={styles.listContainer}>
            <FlatList
              data={products_}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}

        <View style={styles.footContainer}>
          <SubmitButton
            bgColor={yellowColor}
            textColor={blueColor}
            text="Agregar"
            loading={false}
            top={0}
            onPress={onHandleAddProduct}
          />
        </View>
      </View>

      <AlertMessage
        alertMessages={alertMessages}
        setAlertMessages={setAlertMessages}
        onConfirm={onHandleAlertConfirm}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    padding: 20,
  },

  textInputSearch: {
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: borderColor,
    paddingHorizontal: 10,
  },

  listContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 10,
    padding: 7,
  },

  footContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonList: {
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
