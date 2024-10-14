import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconCI from 'react-native-vector-icons/MaterialIcons';

const mciIcon = (name: string, size: number, color: string) => (
  <IconMCI name={name} size={size} color={color} />
);

const miIcon = (name: string, size: number, color: string) => (
  <IconCI name={name} size={size} color={color} />
);

export {mciIcon, miIcon};
