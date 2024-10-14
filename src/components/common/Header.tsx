import React from 'react';
import {StyleSheet, View} from 'react-native';
import Label from './Label.tsx';
import {mciIcon} from '../../utils/Icons.tsx';
import {blueColor, borderColor} from '../../styles/Colors.tsx';

interface ComponentProps {}

const Header: React.FC<ComponentProps> = () => {
  return (
    <View
      style={styles.containerHead}>
      {mciIcon('cash-multiple', 22, blueColor)}
      <Label
        text={'BANCO'}
        color={blueColor}
        font={'800'}
        size={22}
        left={7}
        top={0}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerHead: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    flexDirection: 'row',
    height: 70,
  }})
