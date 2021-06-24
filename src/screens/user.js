import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';

const User = ({route}) => {
  const {username} = route.params;
  const [data, setData] = useState();
  const [repo, setRepo] = useState();
  const [gists, setGists] = useState();
  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(res => setRepo(res.data))
      .catch(err => console.log(err));
    axios
      .get(`https://api.github.com/users/${username}/gists`)
      .then(res => setGists(res.data))
      .catch(err => console.log(err));
  }, [username]);
  return data && repo && gists ? (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: data.avatar_url,
          }}
        />
        <Text style={styles.userName}>{data.name}</Text>
      </View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Repos</Text>
      </View>

      <FlatList
        data={repo}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.html_url}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.heading}>
        <Text style={styles.headingText}>Gists</Text>
      </View>

      <FlatList
        data={gists}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.url}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  ) : (
    <ActivityIndicator size="large" color="#000" />
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
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
  heading: {
    marginVertical: 4,
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
