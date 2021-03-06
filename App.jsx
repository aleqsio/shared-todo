import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Spinner, Text } from '@ui-kitten/components';
import * as firebase from 'firebase';
import { useList, useListVals } from 'react-firebase-hooks/database';
import AddGroup from './components/AddGroup';
import Group from './components/Group';
import Card from './components/Card';
import useLocalStorage from './utils/useLocalStorage';
import EnrollToGroup from './components/EnrollToGroup';

const firebaseConfig = {
  apiKey: 'AIzaSyDMuhkJjKYlkr4abNkVuokjjLV4JGguIqM',
  databaseURL: 'https://shared-todo-2a728.firebaseio.com/',
};
firebase.initializeApp(firebaseConfig);

const Root = ({ groups }) => {
  const [groupsVisible, setGroupsVisible] = useLocalStorage(
    'groups-visible',
    {},
  );
  const [groupsEnrolled, setGroupsEnrolled] = useLocalStorage(
    'groupsEnrolled',
    {},
  );
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.middleContainer}>
      {/* <View style={styles.middleContainer}> */}
      {groups
        .filter((group) => groupsEnrolled[group.id] === true)
        .sort((a, b) => -groupsVisible[a.id] + groupsVisible[b.id])
        .map((group) => (
          <View key={group.id}>
            <Card>
              <Group
                {...group}
                visible={groupsVisible[group.id]}
                setGroupsEnrolled={setGroupsEnrolled}
                groupsEnrolled={groupsEnrolled}
                toggleVisible={() => {
                  setGroupsVisible({
                    ...groupsVisible,
                    [group.id]: !groupsVisible[group.id],
                  });
                }}
              />
            </Card>
          </View>
        ))}
      <Card>
        <AddGroup
          setGroupsEnrolled={setGroupsEnrolled}
          groupsEnrolled={groupsEnrolled}
        />
      </Card>
      <Card>
        <EnrollToGroup
          setGroupsEnrolled={setGroupsEnrolled}
          groupsEnrolled={groupsEnrolled}
        />
      </Card>
      {/* </View> */}
    </ScrollView>
  );
};

const App = () => {
  const [values, loading, error] = useListVals(
    firebase.database().ref('groups'),
    { keyField: 'id' },
  );
  // console.log(values);
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      {loading ? <Spinner /> : <Root groups={values || []} />}
    </ApplicationProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    minHeight: '100%',
    width: '100%',
    flexShrink: 0,
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  middleContainer: {
    // marginLeft: 'auto',
    // marginRight: 'auto',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});
export default App;
