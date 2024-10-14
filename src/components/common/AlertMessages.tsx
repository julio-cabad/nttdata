import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {mciIcon} from '../../utils/Icons.tsx';
import {yellowColor} from '../../styles/Colors.tsx';

interface ComponentProps {
  alertMessages: any;
  onConfirm: () => void;
  setAlertMessages: React.Dispatch<React.SetStateAction<any>>;
}

const windowWidth = Dimensions.get('window').width;

const AlertMessage: React.FC<ComponentProps> = ({
  alertMessages,
  setAlertMessages,
  onConfirm,
}) => {
  const {openAlert, head, body, type} = alertMessages;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openAlert}
      onRequestClose={() => {
        setAlertMessages({...alertMessages, openAlert: false});
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {type === 1 && mciIcon('close-circle-outline', 34, 'red')}
          {type === 2 && mciIcon('check-circle-outline', 34, yellowColor)}
          <Text style={styles.headText}>{head}</Text>
          <Text style={styles.bodyText}>{body}</Text>
          <TouchableOpacity style={styles.button} onPress={onConfirm}>
            <Text style={styles.textButton}>{'Aceptar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    width: windowWidth - 30,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 7,
  },

  bodyText: {
    marginTop: 7,
    textAlign: 'center',
    color: 'gray',
    fontSize: 12,
    flexShrink: 1,
  },

  button: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#d3d3d5',
    padding: 5,
    marginTop: 7,
  },

  textButton: {
    marginTop: 7,
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    flexShrink: 1,
    fontWeight: '800',
  },
});
