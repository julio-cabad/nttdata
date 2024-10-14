import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Label from './Label.tsx';

type PropsButton = TouchableOpacityProps & {
  bgColor: string;
  textColor: string;
  text: string;
  loading: boolean;
  top: number;
};
const SubmitButton = ({
  bgColor,
  textColor,
  text,
  loading,
  top,
  ...props
}: PropsButton): React.JSX.Element => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, {backgroundColor: bgColor, marginTop: top}]}
      {...props}>
      {loading && <ActivityIndicator color={'#FFF'} size={'small'} />}
      <Label
        color={textColor}
        font={'600'}
        left={loading ? 5 : 0}
        size={16}
        text={text}
        top={0}
      />
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 45,
  },
});
