import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import useLocalStorage from '../utils/useLocalStorage';
import { store } from 'react-notifications-component';

const EnrollToGroup = () => {
  const [enrollValue, setEnrollValue] = useState('');
  const [enrollGroupVisible, setEnrollGroupVisible] = useState(false);
  const [groupsEnrolled, setGroupsEnrolled] = useLocalStorage(
    'groupsEnrolled',
    {},
  );
  const enrollToGroup = () => {
    if (!enrollGroupVisible) {
      setEnrollGroupVisible(true);
      return;
    }
    setEnrollGroupVisible(false);
    setGroupsEnrolled({
      ...groupsEnrolled,
      [enrollValue]: true,
    });
    setEnrollValue('');
    store.addNotification({
      title: 'Dołączono do grupy!',
      message: 'Odśwież stronę aby zobaczyć efekt',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };
  return (
    <View style={styles.container}>
      <Text>Dołącz do istniejącej grupy</Text>
      <View style={styles.groupAdd}>
        {enrollGroupVisible && (
          <Input
            placeholder="Dołącz do grupy"
            value={enrollValue}
            style={styles.input}
            onChangeText={setEnrollValue}
          />
        )}
        <Button style={styles.button} onPress={enrollToGroup}>
          Dołącz
        </Button>
        {enrollGroupVisible && (
          <Button
            style={styles.button}
            status="warning"
            onPress={() => {
              setEnrollValue('');
              setEnrollGroupVisible(false);
            }}
          >
            Anuluj
          </Button>
        )}
      </View>
    </View>
  );
};
const styles = {
  container: {},
  groupAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
  },
  id: {
    color: '#bbb',
  },
  input: {
    marginRight: 15,
    flex: 1,
  },
  button: { marginRight: 5 },
};
export default EnrollToGroup;
