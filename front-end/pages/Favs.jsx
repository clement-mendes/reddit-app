import { List, Avatar, Appbar } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import redditImage from '../assets/Reddit.png';
import Reddit from '../components/Reddit';
import { axiosApiInstance } from '../axios.config';
import { redditUrl } from '../redditUrl';

export default function Favs() {
  const [favsReddit, setFavsReddit] = useState([]);
  const [redditInfo, setRedditInfo] = useState(null);

  const favs = async () => {
    await axiosApiInstance
      .get(`${redditUrl}subreddits/mine/subscriber`)
      .then((data) => {
        setFavsReddit(data?.data?.data?.children);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    favs();
  }, []);

  const infoReddit = async (name) => {
    await axiosApiInstance
      .get(redditUrl + 'r/' + name + '/about')
      .then((data) => {
        setRedditInfo(data?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    favs();
  }, [redditInfo]);

  return !redditInfo ? (
    <>
      <Appbar.Header>
        <Appbar.Content title="Redditech®" />
      </Appbar.Header>
      <ScrollView>
        {favsReddit.map((item, index) => (
          <List.Item
            style={styles.list}
            key={index}
            title={'r/h' + item?.data?.display_name}
            description={item?.data?.subscribers + ' members'}
            left={(props) => <Avatar.Image size={40} source={{ uri: item?.data?.icon_img }} />}
            onPress={() => infoReddit(item?.data?.display_name)}
          />
        ))}
      </ScrollView>
    </>
  ) : (
    <Reddit redditInfo={redditInfo} setRedditInfo={setRedditInfo} />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 10,
  },
});
