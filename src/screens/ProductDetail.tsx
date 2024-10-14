import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Label from '../components/common/Label.tsx';
import Header from '../components/common/Header.tsx';
import {blueColor, grayColor} from '../styles/Colors.tsx';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/Store.tsx';
import SubmitButton from '../components/common/SubmitButton.tsx';
import {StateType} from '../types/Product.tsx';
import ConfirmModal from '../components/common/ConfirmModal.tsx';
import {deleteProduct, fetchProducts} from '../store/thunks/ProductThunks.tsx';
import AlertMessage from '../components/common/AlertMessages.tsx';

interface ComponentProps {}

const ProductDetail: React.FC<ComponentProps> = () => {
  const productDetail = useSelector(
    (state: RootState) => state.products.selectedDetailProduct,
  );

  const {date_release, date_revision, description, id, logo, name} =
    productDetail;

  const [confirmModal, setConfirmModal]: StateType<any> = useState({
    visible: false,
    tittle: '',
  });
  const [error, setError]: StateType<boolean> = useState(false);
  const [alertMessages, setAlertMessages] = React.useState({
    openAlert: false,
    head: '',
    body: '',
    type: 0,
  });

  const dispatch: AppDispatch = useDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dateRelease = date_release.split('T')[0];
  const dateRevision = date_revision.split('T')[0];

  const handleBack = () => navigation.goBack();

  const onHandleAlertConfirm = () => {
    setAlertMessages({...alertMessages, openAlert: false});
    !error && navigation.goBack();
  };

  const onHandleShowConfirmModal = () => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      tittle: `Esta seguro de eliminar el productdo ${name}`,
    });
  };

  const onHandleDeleteConfirm = async () => {

    const result = await dispatch(deleteProduct(productDetail));

    const {success, message} = result;

    if (success) {
      setConfirmModal({...alertMessages, visible: false});
      setAlertMessages({
        ...alertMessages,
        openAlert: true,
        head: 'AVISO',
        body: message,
        type: 2,
      });
      dispatch(fetchProducts());
    } else {
      setConfirmModal({...alertMessages, visible: false});
      setAlertMessages({
        ...alertMessages,
        openAlert: true,
        head: 'AVISO',
        body: message,
        type: 1,
      });
      setError(true);
    }
  };


  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <View style={[styles.detailContainer, {marginTop: 30}]}>
            <View>
              <Label
                text={`ID: ${id}`}
                color={'#333'}
                font={'700'}
                size={18}
                left={0}
                top={0}
              />
              <Label
                text={'Información extra'}
                color={'gray'}
                font={'400'}
                size={12}
                left={0}
                top={0}
              />
            </View>
            <TouchableOpacity onPress={handleBack}>
              <Label
                text={'Volver'}
                color={blueColor}
                font={'400'}
                size={12}
                left={0}
                top={0}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.detailContainer, {marginTop: 55}]}>
            <Label
              text={'Nombre'}
              color={'gray'}
              font={'400'}
              size={14}
              left={0}
              top={0}
            />

            <Label
              text={name}
              color={'#333'}
              font={'700'}
              size={14}
              left={0}
              top={0}
            />
          </View>

          <View style={[styles.detailContainer, {marginTop: 5}]}>
            <Label
              text={'Descripción'}
              color={'gray'}
              font={'400'}
              size={14}
              left={0}
              top={0}
            />

            <Label
              text={description}
              color={'#333'}
              font={'700'}
              size={14}
              left={0}
              top={0}
            />
          </View>

          <Label
            text={'Logo'}
            color={'gray'}
            font={'400'}
            size={14}
            left={0}
            top={5}
          />
          <View style={styles.imageContainer}>
            <Image
              source={{uri: logo}}
              style={{width: 260, height: 150}}
              resizeMode="stretch"
            />
          </View>

          <View style={[styles.detailContainer, {marginTop: 5}]}>
            <Label
              text={`Fecha de liberación`}
              color={'gray'}
              font={'400'}
              size={12}
              left={0}
              top={0}
            />
            <Label
              text={dateRelease}
              color={'#333'}
              font={'700'}
              size={12}
              left={0}
              top={0}
            />
          </View>

          <View style={[styles.detailContainer, {marginTop: 5}]}>
            <Label
              text={`Fecha de revisión`}
              color={'gray'}
              font={'400'}
              size={12}
              left={0}
              top={0}
            />
            <Label
              text={dateRevision}
              color={'#333'}
              font={'700'}
              size={12}
              left={0}
              top={0}
            />
          </View>
        </View>

        <View style={styles.footContainer}>
          <SubmitButton
            bgColor={grayColor}
            textColor={blueColor}
            text="Editar"
            loading={false}
            top={0}
            onPress={() => navigation.navigate('UpdateProduct')}
          />

          <SubmitButton
            bgColor="red"
            textColor="white"
            text="Eliminar"
            loading={false}
            top={15}
            onPress={onHandleShowConfirmModal}
          />
        </View>
      </View>

      <ConfirmModal
        confirmModal={confirmModal}
        onConfirm={onHandleDeleteConfirm}
        onCancel={() => setConfirmModal({...confirmModal, visible: false})}
        height={'40%'}
      />

      <AlertMessage
        alertMessages={alertMessages}
        setAlertMessages={setAlertMessages}
        onConfirm={onHandleAlertConfirm}
      />
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bodyContainer: {
    height: 'auto',
    width: '100%',
  },

  detailContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  footContainer: {
    width: '100%',
    height: 'auto',
  },
});
