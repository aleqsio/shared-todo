import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import * as firebase from 'firebase';

const AddGroup = () => {
  const [value, setValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const addGroup = () => {
    if (!inputVisible) {
      setInputVisible(true);
      return;
    }
    setInputVisible(false);
    firebase
      .database()
      .ref('groups')
      .push()
      .set({
        name: value,
        tasks: [],
      });
    setValue('');
  };
  return (
    <View style={styles.container}>
      <Text>Jeżeli brakuje twojej groupy, możesz ją dodać</Text>
      <View style={styles.groupAdd}>
        {inputVisible && (
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
        {inputVisible && (
          <Button
            style={styles.button}
            status="warning"
            onPress={() => {
              setValue('');
              setInputVisible(false);
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
  container: {
  },
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
