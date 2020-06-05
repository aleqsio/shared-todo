import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button, Input, Datepicker,
} from '@ui-kitten/components';
import * as firebase from 'firebase';

const AddTask = ({ groupId }) => {
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [inputVisible, setInputVisible] = useState(false);
  const addNewTask = () => {
    if (!inputVisible) {
      setInputVisible(true);
      return;
    }
    setInputVisible(false);
    date.setHours(23, 59, 59);
    firebase
      .database()
      .ref(`groups/${groupId}/tasks`)
      .push()
      .set({
        name: value,
        deadline: date.toISOString(),
      });
    setValue('');
    setDate(new Date());
  };
  return (
    <View style={styles.groupAdd}>
      {inputVisible && (
        <>
          <Input
            placeholder="Dodaj zadanie"
            value={value}
            style={styles.inputLeft}
            onChangeText={setValue}
          />
          <Datepicker
            placeholder="Termin"
            style={styles.input}
            date={date}
            onSelect={setDate}
          />
        </>
      )}
      <Button style={styles.button} onPress={addNewTask}>
        Dodaj
        {' '}
        {!inputVisible && 'zadanie'}
      </Button>

      {inputVisible && (
        <Button
          status="warning"
          onPress={() => {
            setValue('');
            setDate(new Date());
            setInputVisible(false);
          }}
        >
          Anuluj
        </Button>
      )}
    </View>
  );
};
const styles = {
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  groupAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  id: {
    color: '#bbb',
  },
  input: {
    marginRight: 15,
  },
  inputLeft: { flexGrow: 1, marginRight: 5 },
  button: { marginRight: 5 },
};
export default AddTask;
