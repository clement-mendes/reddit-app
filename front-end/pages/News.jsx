import {
  Appbar,
  Menu,
  Text,
  Card,
  IconButton,
  Avatar,
  MD3Colors,
  ActivityIndicator,
} from 'react-native-paper';
import { Video } from 'expo-av';
import { View, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { axiosApiInstance } from '../axios.config';
import { redditUrl } from '../redditUrl';
import redditImage from '../assets/Reddit.png';

export default function News() {
  const [visible, setVisible] = useState(true);
  const [subReddits, setSubReddits] = useState([]);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [learnMore, setLearnMore] = useState([]);
  const [liked, setLiked] = useState(null);
  const [filterOption, setFilterOption] = useState('best');
  const [after, setAfter] = useState('');

  const filter = async (filtre) => {
    setVisible(false);
    await axiosApiInstance
      .get(redditUrl + filtre + '?limit=6&after=' + after)
      .then((data) => {
        setLearnMore([]);
        setAfter(data?.data?.data?.after);
        setSubReddits(subReddits.concat(data?.data?.data?.children));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const show = (index) => {
    if (learnMore === index) {
      setLearnMore([]);
    } else {
      setLearnMore(index);
    }
  };

  const like = async (vote, id) => {
    await axiosApiInstance
      .post(redditUrl + 'api/vote?id=' + id + '&dir=' + vote)
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  // const subRedditInfo = async (subRedditName) => {
  //     await axiosApiInstance.get(redditUrl + "r/" + subRedditName + "/about")
  //         .then((data) => {
  //             icon_img.push(data?.data?.data?.icon_img);
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         })
  // }

  useEffect(() => {
    filter(filterOption);
  }, [filterOption]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Redditech®" />
      </Appbar.Header>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="filter-variant" color="black" onPress={openMenu} />}
      >
        <Menu.Item
          onPress={() => {
            setSubReddits([]), setFilterOption('best');
          }}
          title="Best"
        />
        <Menu.Item
          onPress={() => {
            setSubReddits([]), setFilterOption('hot');
          }}
          title="hot"
        />
        <Menu.Item
          onPress={() => {
            setSubReddits([]), setFilterOption('new');
          }}
          title="New"
        />
        <Menu.Item
          onPress={() => {
            setSubReddits([]), setFilterOption('top');
          }}
          title="Top"
        />
        <Menu.Item
          onPress={() => {
            setSubReddits([]), setFilterOption('rising');
          }}
          title="Rising"
        />
      </Menu>

      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={() => filter(filterOption)}
        data={subReddits}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item, index }) => (
          <View style={styles.container} key={index}>
            <Card key={index} onPress={() => show(index)}>
              {learnMore !== index ? (
                <>
                  <Card.Title
                    key={index}
                    title={'r/' + item?.data?.subreddit}
                    subtitle={'u/' + item?.data?.author}
                    left={(props) => <Avatar.Image size={40} source={redditImage} />}
                  />
                  <Text variant="titleSmall" numberOfLines={1} style={styles.title}>
                    {item?.data?.title}
                  </Text>
                </>
              ) : (
                <>
                  <Card.Title
                    key={index}
                    title={'r/' + item?.data?.subreddit}
                    subtitle={'u/' + item?.data?.author}
                    left={(props) => <Avatar.Image size={40} source={redditImage} />}
                  />
                  <Card.Content>
                    <Text variant="labelMedium" style={styles.label}>
                      {item?.data?.title}
                    </Text>
                    <Text variant="bodySmall">{item?.data?.selftext}</Text>
                  </Card.Content>
                  {
                    // eslint-disable-next-line no-nested-ternary
                    item?.data?.is_video === false ? (
                      item?.data?.thumbnail_height !== null ? (
                        <Card.Cover style={styles.image} source={{ uri: item?.data?.url_overridden_by_dest }} />
                      ) : null
                    ) : (
                      <Video
                        style={styles.video}
                        source={{ uri: item?.data?.media.reddit_video.fallback_url }}
                        isLooping
                        shouldPlay
                        onLoadStart={() => (
                          <ActivityIndicator size="large" color={MD3Colors.primary10} />
                        )}
                        // TODO loading
                      />
                    )
                  }
                  <View style={styles.button}>
                    <IconButton
                      style={styles.buttonLike}
                      icon={item?.data?.likes ? 'arrow-up-bold' : 'arrow-up-bold-outline'}
                      iconColor={MD3Colors.error50}
                      size={25}
                      onPress={() => {
                        item?.data?.likes
                          ? like('0', item?.data?.name)
                          : like('1', item?.data?.name);
                      }}
                    />
                    <Text style={styles.buttonScore}>{item?.data?.score}</Text>
                    <IconButton
                      style={styles.buttonDislike}
                      icon={
                        item?.data?.likes === false ? 'arrow-down-bold' : 'arrow-down-bold-outline'
                      }
                      iconColor={MD3Colors.error50}
                      size={25}
                      onPress={() => {
                        item?.data?.likes === false
                          ? like('0', item?.data?.name)
                          : like('-1', item?.data?.name);
                      }}
                    />
                    <IconButton
                      style={styles.button}
                      icon="comment-outline"
                      iconColor={MD3Colors.error50}
                      size={25}
                      onPress={() => console.log('Pressed')}
                    >
                      {item?.data?.num_comments}
                    </IconButton>
                    <Text style={styles.buttonScore}>{item?.data?.num_comments}</Text>
                  </View>
                </>
              )}
            </Card>
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  title: {
    paddingLeft: 20,
    paddingRight: 10,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  description: {
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
  },
  buttonLike: {
    borderColor: 'black',
  },
  buttonScore: {},
  buttonDislike: {
    borderColor: 'black',
  },
  image: {
    height: 200,
  },
  video: {
    height: 600,
    width: '100%',
  },
});
