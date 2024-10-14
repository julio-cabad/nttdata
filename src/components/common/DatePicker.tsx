import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, Modal, StyleSheet, View} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import {blueColor} from '../../styles/Colors.tsx';

dayjs.locale('es');

interface ComponentProps {
  visibleDatePicker: boolean;
  setFieldValue: (field: string, value: any) => void;
  height: string;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}

const DatePicker: React.FC<ComponentProps> = ({
  visibleDatePicker,
  setFieldValue,
  setShowCalendar,
  height,
}) => {
  const [date, setDate] = useState(dayjs());
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visibleDatePicker) {
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
  }, [visibleDatePicker]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
  });

  const modalHeight =
    Dimensions.get('window').height * (parseInt(height) / 100);

  const minDate = dayjs().subtract(0, 'day').startOf('day');

  const onDateChange = (date: any) => {
    setDate(date);
    const dateRelease = dayjs(date).format('YYYY-MM-DD');
    const dateRevision = dayjs(date).add(1, 'year').format('YYYY-MM-DD');
    setFieldValue('date_revision', dateRevision);
    setFieldValue('date_release', dateRelease);
    setShowCalendar(false);
  };

  return (
    <Modal transparent={true} visible={visibleDatePicker} animationType="fade">
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
          <DateTimePicker
            mode="single"
            locale="es"
            date={date}
            minDate={minDate}
            onChange={params => onDateChange(params.date)}
            headerButtonColor={blueColor}
            selectedItemColor={blueColor}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default DatePicker;

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

});
