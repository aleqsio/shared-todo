import React, { useState } from 'react';
import { View, Clipboard } from 'react-native';
import { Text, Button, CheckBox } from '@ui-kitten/components';
import * as firebase from 'firebase';
import ToDoTask from './ToDoTask';
import AddTask from './AddTask';
import ImageTask from './ImageTask';

const Group = ({
  tasks,
  name,
  id,
  visible,
  toggleVisible,
  setGroupsEnrolled,
  groupsEnrolled,
}) => {
  const [allowModify, setAllowModify] = useState(false);
  const [shared, setShared] = useState(false);
  return (
    <View>
      <View style={styles.titleSection}>
        <Text category="h3">{name}</Text>
        <CheckBox
          checked={visible}
          onChange={toggleVisible}
          style={styles.checkbox}
          text="Pokaż zadania"
        />

        {!allowModify
          && (!shared ? (
            <Button
              style={styles.shareButton}
              status="warning"
              appearance="outline"
              onPress={() => {
                setShared(true);
                Clipboard.setString(id);
                setTimeout(() => {
                  setShared(false);
                }, 1000);
              }}
            >
              Udostępnij
            </Button>
          ) : (
            <Text status="warning" style={[styles.shareButton, { margin: 10 }]}>
              skopiowano
            </Text>
          ))}
        {!allowModify && (
          <Button
            style={styles.modifyButton}
            status="warning"
            appearance="outline"
            onPress={() => setAllowModify(true)}
          >
            Modyfikuj
          </Button>
        )}
        {allowModify && (
          <Button
            style={styles.modifyButton}
            status="success"
            appearance="outline"
            onPress={() => setAllowModify(false)}
          >
            Zakończ
          </Button>
        )}
        {allowModify && (
          <Button
            status="danger"
            style={styles.removeButton}
            appearance="outline"
            onPress={() => {
              setGroupsEnrolled({
                ...groupsEnrolled,
                [id]: false,
              });
              setAllowModify(false);
              store.addNotification({
                title: 'Opuszczono grupę!',
                message: 'Odśwież stronę aby zobaczyć efekt',
                type: 'info',
                insert: 'top',
                container: 'top-right',
                animationIn: ['animated', 'fadeIn'],
                animationOut: ['animated', 'fadeOut'],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                },
              });
            }}
          >
            Opuść grupę
          </Button>
        )}
        {allowModify && (
          <Button
            status="danger"
            style={styles.removeButton}
            appearance="outline"
            onPress={() => firebase.database().ref(`groups/${id}`).remove()}
          >
            Usuń grupę u wszystkich
          </Button>
        )}
      </View>
      {visible && (
        <>
          {Object.entries(tasks || {})
            .sort((a, b) => (a[1].deadline || '').localeCompare(b[1].deadline || ''))
            .map(([taskId, task]) => (task.name.startsWith('http') ? (
              <ImageTask
                key={taskId}
                {...task}
                id={taskId}
                groupId={id}
                allowModify={allowModify}
              />
            ) : (
              <ToDoTask
                key={taskId}
                {...task}
                id={taskId}
                groupId={id}
                allowModify={allowModify}
              />
            )))}
          <AddTask groupId={id} />
        </>
      )}
    </View>
  );
};
const styles = {
  titleSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  id: {
    color: '#bbb',
    marginLeft: 15,
  },
  checkbox: {
    margin: 15,
  },
  modifyButton: {
    marginLeft: 2,
  },
  shareButton: {
    marginLeft: 'auto',
  },
  removeButton: {
    marginLeft: 5,
  },
};
export default Group;
