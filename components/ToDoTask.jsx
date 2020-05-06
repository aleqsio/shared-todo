import React from 'react';
import { View, Alert } from 'react-native';
import { CheckBox, Text, Button } from '@ui-kitten/components';
import TimeAgo from 'javascript-time-ago';
import pl from 'javascript-time-ago/locale/pl';
import * as firebase from 'firebase';
import useLocalStorage from '../utils/useLocalStorage';

TimeAgo.addLocale(pl);
const timeAgo = new TimeAgo('pl-PL');
const TASK_APPROACHING = 3 * 24 * 60 * 60 * 1000;
const ToDoTask = ({
  name, deadline, id, groupId, allowModify,
}) => {
  const [checked, setChecked] = useLocalStorage(`task-${id}`, false);
  const deleteTask = () => {
    firebase
      .database()
      .ref(`groups/${groupId}/tasks/${id}`)
      .remove();
  };
  return (
    <View style={styles.container}>
      <CheckBox
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
        style={styles.checkbox}
      />
      <Text style={[styles.name, checked && styles.checked]} category="s1">
        {name}
      </Text>
      <Text
        style={[styles.deadline]}
        status={
          new Date(deadline).getTime()
            < new Date().getTime() + TASK_APPROACHING && 'danger'
        }
        category="p1"
      >
        {JSON.stringify(new Date(deadline))
          && new Date(deadline)
          && timeAgo.format(new Date(deadline))}
      </Text>
      {allowModify && (
      <Button
        style={styles.button}
        status="danger"
        appearance="outline"
        onPress={deleteTask}
      >
        Usuń zadanie u wszystkich
      </Button>
      )}
    </View>
  );
};
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  deadline: {
    margin: 15,
    // color: '#bbb',
  },
  checkbox: {
    margin: 15,
  },
  checked: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  button: {
    marginLeft: 'auto',
  },
  name: {
    // fontWeight: 'bold',
    fontSize: '1.3em',
  },
};
export default ToDoTask;
