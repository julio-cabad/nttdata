import React from 'react';
import {Text, View, TextInputProps, TextInput} from 'react-native';
import Label from './Label.tsx';
import {blueColor, grayColor} from '../../styles/Colors.tsx';

type PropsInput = TextInputProps & {
  label: string;
  top: number;
  max: number;
  field: string;
  handleChange: (field: string, text: string) => void;
  values: {[key: string]: string};
  setFieldValue: (field: string, value: any) => void;
  errors?: any;
  editable: boolean;
};

const FormTextInput = ({
  label,
  top,
  field,
  errors,
  handleChange,
  values,
  setFieldValue,
  max,
  editable,
  ...props
}: PropsInput): React.JSX.Element => {
  const handleChangeText = (text: string) => {
    handleChange(field, text);
    setFieldValue(field, text);
  };

  return (
    <View style={{marginTop: top, width: '100%'}}>
      <Label
        text={label}
        color={blueColor}
        font={'400'}
        size={11}
        left={5}
        top={0}
      />
      <TextInput
        style={{
          height: 45,
          borderColor: grayColor,
          borderWidth: 1,
          paddingHorizontal: 5,
          borderRadius: 5,
        }}
        value={values[field]}
        maxLength={max}
        editable={editable}
        onChangeText={handleChangeText}
        {...props}
      />
      {!!errors[field] !== undefined && (
        <Text style={{fontSize: 10, marginLeft: 3, color: 'red'}}>
          {errors[field]}
        </Text>
      )}
    </View>
  );
};

export default FormTextInput;
