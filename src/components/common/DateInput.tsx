import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Label from './Label.tsx';
import {blueColor, grayColor} from '../../styles/Colors.tsx';
import {mciIcon} from '../../utils/Icons.tsx';


interface ComponentProps {
  label: string;
  top: number;
  field: string;
  values: {[key: string]: string};
  errors?: any;
  onPress: () => void;
  calendar: boolean;
}

const DateInput: React.FC<ComponentProps> = ({
  label,
  top,
  field,
  errors,
  values,
  onPress,
  calendar,
}) => {
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
      <View
        style={{
          height: 45,
          borderColor: grayColor,
          borderWidth: 1,
          paddingHorizontal: 5,
          borderRadius: 5,
          width: '100%',
          flexDirection: 'row',
        }}>
        <View
          style={{width: calendar ? '85%' : '100%', justifyContent: 'center'}}>
          <Label
            text={values[field]}
            color={'#333'}
            font={'400'}
            size={14}
            left={0}
            top={0}
          />
        </View>
        {calendar && (
          <TouchableOpacity
            onPress={onPress}
            style={{
              height: 45,
              width: '15%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            {mciIcon('calendar-month', 30, blueColor)}
          </TouchableOpacity>
        )}
      </View>
      {!!errors[field] !== undefined && (
        <Text style={{fontSize: 10, marginLeft: 3, color: 'red'}}>
          {errors[field]}
        </Text>
      )}
    </View>
  );
};

export default DateInput;
