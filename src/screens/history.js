import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import UserList from '../components/userList';
import {Context as DetailsContext} from '../context/HistoryContext';

const History = ({navigation}) => {
  const {state} = useContext(DetailsContext);
  console.log(state.userVisited);
  return state.userVisited.length ? (
    <View style={styles.container}>
      <UserList navigation={navigation} data={state.userVisited} />
    </View>
  ) : (
    <Text>No users profile visited yet</Text>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  userName: {
    fontWeight: 'bold',
    marginLeft: 16,
  },
});
