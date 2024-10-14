import React, {useEffect, useState} from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import SubmitButton from './SubmitButton.tsx';
import {blueColor, grayColor, yellowColor} from '../../styles/Colors.tsx';

interface ComponentProps {
  confirmModal: {
    visible: boolean;
    tittle: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
  height: string
}

const ConfirmModal: React.FC<ComponentProps> = ({
  confirmModal,
  onConfirm,
  onCancel,
  height,
}) => {
  const {visible, tittle} = confirmModal;
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
  });

  const modalHeight =
    Dimensions.get('window').height * (parseInt(height) / 100);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{translateY}],
              height: modalHeight,
            },
          ]}>
          <View style={styles.handle} />
          <Text style={styles.modalText}>
            ¿ {tittle} ?
          </Text>

          <SubmitButton
            bgColor={yellowColor}
            textColor={blueColor}
            text="Confirmar"
            loading={false}
            top={0}
            onPress={onConfirm}
          />

          <SubmitButton
            bgColor={grayColor}
            textColor={blueColor}
            text="Cancelar"
            loading={false}
            top={15}
            onPress={onCancel}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },

  confirmButton: {
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
