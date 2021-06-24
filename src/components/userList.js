import React, {useContext} from 'react';
import {Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Context as DetailsContext} from '../context/HistoryContext';
const UserList = ({navigation, data, addToHistory = false}) => {
  const {state, setUserVisited} = useContext(DetailsContext);
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            if (addToHistory) {
              setUserVisited(state.userVisited, item);
            }
            navigation.navigate('Details', {username: item.login});
          }}
          style={styles.userContainer}>
          <Avatar
            rounded
            size="medium"
            source={{
              uri: item.avatar_url,
            }}
          />
          <Text style={styles.userName}>{item.login}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
};

export default UserList;

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
