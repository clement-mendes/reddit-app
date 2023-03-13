import { Searchbar, List, Avatar, Appbar } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { axiosApiInstance } from '../axios.config';
import { redditUrl } from '../redditUrl';
import Reddit from '../components/Reddit';
import redditImage from '../assets/Reddit.png';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  const [subreddit, setSubReddit] = useState([]);
  const [redditInfo, setRedditInfo] = useState(null);

  const searchReddit = async () => {
    await axiosApiInstance
      .post(`${redditUrl}api/search_subreddits/?query=${searchQuery}`)
      .then((data) => {
        setSubReddit(data?.data?.subreddits);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const infoReddit = async (name) => {
    await axiosApiInstance
      .get(`${redditUrl}r/${name}/about`)
      .then((data) => {
        setRedditInfo(data?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    searchReddit();
  }, [searchQuery]);

  return !redditInfo ? (
    <>
      <Appbar.Header>
        <Appbar.Content title="Redditech®" />
      </Appbar.Header>
      <Searchbar placeholder="Search reddits" onChangeText={onChangeSearch} value={searchQuery} style={styles.search}/>
      <ScrollView>
        {subreddit.map((item, index) => (
          <List.Item
            style={styles.list}
            key={index}
            title={`r/h${item?.name}`}
            description={`${item?.subscriber_count} members`}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={() => (
              <Avatar.Image
                size={40}
                source={item?.icon_img !== '' ? { uri: item?.icon_img } : redditImage}
              />
            )}
            onPress={() => infoReddit(item?.name)}
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
  search:{
    margin:10,
  }
});
