import React from 'react';
import { View } from 'react-native';

const Card = ({ children }) => <View style={styles.container}>{children}</View>;
const styles = {
  container: {
    borderRadius: 5,
    padding: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: 'white',
    maxWidth: 650,
    elevation: 3,
  },
};
export default Card;
