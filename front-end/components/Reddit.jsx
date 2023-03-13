import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { IconButton, Button, Avatar, Text, Card, MD3Colors } from 'react-native-paper';
import { axiosApiInstance } from '../axios.config';
import { redditUrl } from '../redditUrl';

export default function Reddit({ redditInfo, setRedditInfo }) {
  const [learnMore, setLearnMore] = useState([]);
  const string = redditInfo?.banner_background_image;
  const url_banner = { uri: string.split('?')[0] };
  const [listOfPublications, setlistOfPublications] = useState([]);
  const [join, setJoin] = useState(redditInfo?.user_is_subscriber);
  const [after, setAfter] = useState('');

  const subscribe = async (sub) => {
    setJoin(!join);
    await axiosApiInstance
      .post(redditUrl + 'api/subscribe?sr=' + redditInfo?.name + '&action=' + sub)
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const listOfPost = async () => {
    await axiosApiInstance
      .get(redditUrl + 'r/' + redditInfo?.display_name + '/best?limit=4&after=' + after)
      .then((data) => {
        setlistOfPublications(listOfPublications.concat(data?.data?.data?.children));
        setAfter(data?.data?.data?.after);
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

  useEffect(() => {
    listOfPost();
  }, []);

  const like = async (vote, id) => {
    await axiosApiInstance
      .post(redditUrl + 'api/vote?id=' + id + '&dir=' + vote)
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.banner}>
        <ImageBackground source={url_banner} style={styles.banner_img}>
          <IconButton
            onPress={() => setRedditInfo(null)}
            icon="arrow-left"
            iconColor="purple"
            style={styles.retour}
          />
          {join ? (
            <Button mode="contained" onPress={() => subscribe('unsub')} style={styles.joindre}>
              Quitter
            </Button>
          ) : (
            <Button mode="elevated" onPress={() => subscribe('sub')} style={styles.joindre}>
              Joindre
            </Button>
          )}
        </ImageBackground>
        <View style={styles.top}>
          <Avatar.Image source={{ uri: redditInfo?.icon_img }} size={80} />
        </View>
      </View>
      <View style={styles.scroll}>
        <Text variant="titleLarge" style={styles.title}>
          {redditInfo?.display_name}
        </Text>
        <Text>{'Members online ' + redditInfo?.accounts_active}</Text>
        <Text>{'Members ' + redditInfo?.subscribers}</Text>
        <Text numberOfLines={3}>{redditInfo?.public_description}</Text>
      </View>

      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={() => listOfPost()}
        data={listOfPublications}
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
                    left={(props) => (
                      <Avatar.Image size={40} source={{ uri: redditInfo?.icon_img }} />
                    )}
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
                    left={() => <Avatar.Image size={40} source={{ uri: redditInfo?.icon_img }} />}
                  />
                  <Card.Content>
                    <Text variant="labelMedium" style={styles.label}>
                      {item?.data?.title}
                    </Text>
                    <Text variant="bodySmall">{item?.data?.selftext}</Text>
                  </Card.Content>
                  {item?.data?.url_overridden_by_dest && (
                    <Card.Cover
                      source={{
                        uri: item?.data?.preview?.images[0]?.source?.url.split('amp;').join(''),
                      }}
                      style={styles.image}
                    />
                  )}
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
                    ></IconButton>
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
  top: {
    position: 'absolute',
    bottom: 0,
    left: 20,
  },
  banner: {
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
  },
  banner_img: {
    flex: 0.9,
    width: '100%',
    opacity: 0.7,
  },
  joindre: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  retour: {
    position: 'absolute',
    top: 30,
  },
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
    height: 400,
  },
  scroll: {
    padding: 10,
  },
});
