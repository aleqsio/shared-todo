import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import * as firebase from 'firebase';
import useLocalStorage from '../utils/useLocalStorage';
import { store } from 'react-notifications-component';

const AddGroup = () => {
  const [value, setValue] = useState('');
  const [addGroupVisible, setAddGroupVisible] = useState(false);
  const [groupsEnrolled, setGroupsEnrolled] = useLocalStorage(
    'groupsEnrolled',
    {},
  );
  const addGroup = () => {
    if (!addGroupVisible) {
      setAddGroupVisible(true);
      return;
    }
    setAddGroupVisible(false);
    const db = firebase.database()
      .ref('groups');
    db.push()
      .then((snap) => {
        setGroupsEnrolled({
          ...groupsEnrolled,
          [snap.key]: true,
        });
        snap.set({
          name: value,
          tasks: [],
        });
      });
    setValue('');
    store.addNotification({
      title: 'Dodano grupę!',
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
      <Text>Jeżeli brakuje twojej grupy, możesz ją dodać</Text>
      <View style={styles.groupAdd}>
        {addGroupVisible && (
          <Input
            placeholder="Dodaj grupę"
            value={value}
            style={styles.input}
            onChangeText={setValue}
          />
        )}
        <Button style={styles.button} onPress={addGroup}>
          Dodaj
        </Button>
        {addGroupVisible && (
          <Button
            style={styles.button}
            status="warning"
            onPress={() => {
              setValue('');
              setAddGroupVisible(false);
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
export default AddGroup;
