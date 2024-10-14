import React from 'react';
import {Text} from 'react-native';

interface ComponentProps {
  text: string;
  color: string;
  font: string;
  size: number;
  left: number;
  top: number;
  bottom?: number; // Hacer que bottom sea opcional
}

const Label: React.FC<ComponentProps> = ({
  text,
  color,
  font,
  size,
  left,
  top,
  bottom,
}) => {
  return (
    <Text // @ts-ignore
      style={{
        color,
        fontWeight: font,
        fontSize: size,
        marginLeft: left,
        marginTop: top,
        marginBottom: bottom ?? 0,
        flexShrink: 1,
      }}
      allowFontScaling={false}>
      {text}
    </Text>
  );
};

export default Label;
