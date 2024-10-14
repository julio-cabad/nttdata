import React, {useState} from 'react';
import Header from '../components/common/Header.tsx';
import {Keyboard, StyleSheet, View} from 'react-native';
import {blueColor, grayColor, yellowColor} from '../styles/Colors.tsx';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import FormTextInput from '../components/common/FormTextInput.tsx';
import SubmitButton from '../components/common/SubmitButton.tsx';
import {
  addProductSchema,
  initialProductsValues,
} from '../validations/Schemas.tsx';
import {StateType} from '../types/Product.tsx';

import 'dayjs/locale/es';
import DateInput from '../components/common/DateInput.tsx';
import DatePicker from '../components/common/DatePicker.tsx';
import {FormValues} from '../types/Forms.tsx';
import {useDispatch} from 'react-redux';
import {addProduct, checkProductId, fetchProducts} from '../store/thunks/ProductThunks.tsx';
import {AppDispatch} from '../store/Store.tsx';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import AlertMessage from '../components/common/AlertMessages.tsx';

interface ComponentProps {}

const AddProduct: React.FC<ComponentProps> = () => {
  const [loading, setLoading]: StateType<boolean> = useState(false);
  const [showCalendar, setShowCalendar]: StateType<boolean> = useState(false);
  const [error, setError]: StateType<boolean> = useState(false);
  const [alertMessages, setAlertMessages] = React.useState({
    openAlert: false,
    head: '',
    body: '',
    type: 1,
  });

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch: AppDispatch = useDispatch();

  const onHandleAlertConfirm = () => {
    setAlertMessages({...alertMessages, openAlert: false});
    !error && navigation.goBack();
  };

  const onSubmit = async (
    values: FormValues,
    {resetForm}: {resetForm: () => void},
  ) => {

    const idExists = await dispatch(checkProductId(values.id));

    if(idExists){
      setAlertMessages({
        ...alertMessages,
        openAlert: true,
        head: 'AVISO',
        body: 'El ID ya existe, elige otro.',
        type: 1,
      });
      setError(true);
      return
    }

    const result = await dispatch(addProduct(values));
    const {success, message} = result;

    if (success) {
      setAlertMessages({
        ...alertMessages,
        openAlert: true,
        head: 'AVISO',
        body: message,
        type: 2,
      });
      dispatch(fetchProducts());
      resetForm()
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
                  values={values}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  max={10}
                  editable
                />

                <FormTextInput
                  label="Nombre"
                  top={5}
                  field="name"
                  handleChange={handleChange}
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
                  values={values}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  max={2000}
                />

                <DateInput
                  label={'Fecha de liberación'}
                  top={5}
                  field={'date_release'}
                  values={values}
                  errors={errors}
                  onPress={() => setShowCalendar(!showCalendar)}
                  calendar={true}
                />

                <DateInput
                  label={'Fecha de liberación'}
                  top={5}
                  field={'date_revision'}
                  values={values}
                  errors={errors}
                  onPress={() => null}
                  calendar={false}
                />

                <SubmitButton
                  bgColor={yellowColor}
                  textColor={blueColor}
                  text="Enviar"
                  loading={loading}
                  top={35}
                  onPress={() => handleSubmit()}
                />

                <SubmitButton
                  bgColor={grayColor}
                  textColor={blueColor}
                  text="Reiniciar"
                  loading={loading}
                  top={15}
                  onPress={() => {
                    Keyboard.dismiss();
                    resetForm();
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
export default AddProduct;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    padding: 20,
  },
});
