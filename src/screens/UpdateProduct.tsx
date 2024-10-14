import React, {useEffect, useState} from 'react';
import Header from '../components/common/Header.tsx';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/Store.tsx';
import {StateType} from '../types/Product.tsx';
import {FormValues} from '../types/Forms.tsx';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {addProductSchema} from '../validations/Schemas.tsx';
import FormTextInput from '../components/common/FormTextInput.tsx';
import DateInput from '../components/common/DateInput.tsx';
import SubmitButton from '../components/common/SubmitButton.tsx';
import {blueColor, grayColor, yellowColor} from '../styles/Colors.tsx';
import DatePicker from '../components/common/DatePicker.tsx';
import AlertMessage from '../components/common/AlertMessages.tsx';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import dayjs from 'dayjs';
import {fetchProducts, updateProduct} from '../store/thunks/ProductThunks.tsx';
import {selectDetailProduct} from '../store/actions/ProductActions.tsx';
import {useDispatch} from 'react-redux';
import Label from '../components/common/Label.tsx';

interface ComponentProps {}

const UpdateProduct: React.FC<ComponentProps> = () => {
  const productDetail = useSelector(
    (state: RootState) => state.products.selectedDetailProduct,
  );

  const [initialProductsValues, setInitialProductsValues] =
    useState<FormValues>(productDetail);
  const [showCalendar, setShowCalendar]: StateType<boolean> = useState(false);
  const [error, setError]: StateType<boolean> = useState(false);
  const [alertMessages, setAlertMessages] = React.useState({
    openAlert: false,
    head: '',
    body: '',
    type: 0,
  });

  useEffect(() => {
    setInitialProductsValues({
      ...productDetail,
      date_release: dayjs(productDetail.date_release).format('YYYY-MM-DD'),
      date_revision: dayjs(productDetail.date_revision).format('YYYY-MM-DD'),
    });
  }, [productDetail]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch: AppDispatch = useDispatch();

  const onHandleAlertConfirm = () => {
    setAlertMessages({...alertMessages, openAlert: false});
    !error && navigation.goBack();
  };

  const onSubmit = async (values: FormValues) => {
    const result = await dispatch(updateProduct(values));

    const {success, message, product} = result;

    if (success) {
      setAlertMessages({
        ...alertMessages,
        openAlert: true,
        head: 'AVISO',
        body: message,
        type: 2,
      });
      dispatch(selectDetailProduct(product));
      dispatch(fetchProducts());
    } else {
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

        <View style={[styles.detailContainer, {marginBottom: 30}]}>

          <Label
            text={`Actualizar producto`}
            color={blueColor}
            font={'700'}
            size={22}
            left={0}
            top={0}
          />

          <TouchableOpacity onPress={()=>navigation.goBack()}>
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

        <KeyboardAwareScrollView
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps="always"
          scrollEventThrottle={10}
          extraHeight={20}
          contentContainerStyle={{flexGrow: 1}}
          resetScrollToCoords={{x: 0, y: 0}}>
          <Formik
            validationSchema={addProductSchema}
            initialValues={initialProductsValues}
            enableReinitialize
            onSubmit={onSubmit}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              setFieldValue,
              resetForm,
            }) => (
              <View>
                <FormTextInput
                  label="ID"
                  top={0}
                  field="id"
                  handleChange={handleChange}
                  // @ts-ignore
                  values={values}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  max={10}
                  editable={false}
                />

                <FormTextInput
                  label="Nombre"
                  top={5}
                  field="name"
                  handleChange={handleChange}
                  // @ts-ignore
                  values={values}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  max={100}
                  editable
                />

                <FormTextInput
                  label="Descripción"
                  top={5}
                  field="description"
                  handleChange={handleChange}
                  // @ts-ignore
                  values={values}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  max={200}
                  editable
                />

                <FormTextInput
                  label="Logo"
                  top={5}
                  field="logo"
                  handleChange={handleChange}
                  editable
                  // @ts-ignore
                  values={values}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  max={2000}
                />

                <DateInput
                  label={'Fecha de liberación'}
                  top={5}
                  field={'date_release'}
                  // @ts-ignore
                  values={values}
                  errors={errors}
                  onPress={() => setShowCalendar(!showCalendar)}
                  calendar={true}
                />

                <DateInput
                  label={'Fecha de liberación'}
                  top={5}
                  field={'date_revision'}
                  // @ts-ignore
                  values={values}
                  errors={errors}
                  onPress={() => null}
                  calendar={false}
                />

                <SubmitButton
                  bgColor={yellowColor}
                  textColor={blueColor}
                  text="Enviar"
                  loading={false}
                  top={35}
                  onPress={() => handleSubmit()}
                />

                <SubmitButton
                  bgColor={grayColor}
                  textColor={blueColor}
                  text="Reiniciar"
                  loading={false}
                  top={15}
                  onPress={() => {
                    Keyboard.dismiss();
                    resetForm({values: initialProductsValues});
                  }}
                />

                <DatePicker
                  visibleDatePicker={showCalendar}
                  setFieldValue={setFieldValue}
                  setShowCalendar={setShowCalendar}
                  height={'80%'}
                />
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
      <AlertMessage
        alertMessages={alertMessages}
        setAlertMessages={setAlertMessages}
        onConfirm={onHandleAlertConfirm}
      />
    </View>
  );
};

export default UpdateProduct;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    padding: 20,
  },

  detailContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

});
