import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Avatar, SearchBar} from 'react-native-elements';
import UserList from '../components/userList';
import axios from 'axios';
const Home = ({navigation}) => {
  const [data, setData] = useState();
  const [query, setQuery] = useState();
  useEffect(() => {
    axios
      .get('https://api.github.com/users')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const fetchSearchData = () => {
    if (query) {
      axios
        .get(`https://api.github.com/search/users?q=${query}`)
        .then(res => {
          setData(res.data.items);
        })
        .catch(err => console.log(err));
    }
  };
  return data ? (
    <View style={styles.container}>
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={text => setQuery(text)}
          searchIcon={{onPress: () => fetchSearchData()}}
          value={query}
        />
      </View>
      <UserList navigation={navigation} data={data} addToHistory={true} />
    </View>
  ) : (
    <ActivityIndicator size="large" color="#000" />
  );
};

export default Home;

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
