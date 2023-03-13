import { Divider, Text, List, Avatar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { axiosApiInstance } from '../axios.config';
import { redditUrl } from '../redditUrl';

export default function APropos({ user, userInfo }) {
  const [trophiesList, setTrophiesList] = useState([]);

  const trophies = async () => {
    await axiosApiInstance
      .get(`${redditUrl}api/v1/me/trophies`)
      .then((data) => {
        setTrophiesList(data?.data?.data?.trophies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    trophies();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.container2}>
            <Text>{user?.link_karma}</Text>
            <Text>Karma pour publications</Text>
          </View>
          <View style={styles.container3}>
            <Text>{user?.comment_karma}</Text>
            <Text>Karma pour commentaire</Text>
          </View>
        </View>
        <View style={styles.container1}>
          <View style={styles.container2}>
            <Text>{user?.awardee_karma}</Text>
            <Text>Karma donné</Text>
          </View>
          <View style={styles.container3}>
            <Text>{user?.awarder_karma}</Text>
            <Text>Karma reçu</Text>
          </View>
        </View>
        <Divider />
      </View>
      <Text style={styles.description}>{userInfo?.subreddit?.public_description}</Text>
      <Divider />
      <Text style={styles.textTrophies}>Trophées</Text>
      {trophiesList.map((item, index) => (
        <List.Item
          style={styles.trophies}
          key={index}
          title={item?.data?.name}
          left={() => <Avatar.Image size={40} source={{ uri: item?.data?.icon_70 }} />}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
  },
  container1: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 10,
  },
  container2: {
    width: '50%',
  },
  container3: {
    width: '50%',
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
  },
  textTrophies: {
    marginTop: 10,
  },
  trophies: {},
});
