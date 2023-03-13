import { Text, Card, Avatar, IconButton, MD3Colors } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { axiosApiInstance } from '../axios.config';
import { redditUrl } from '../redditUrl';
import redditImage from '../assets/Reddit.png';

export default function Publications({ user }) {
  const [listOfPublications, setlistOfPublications] = useState([]);
  const [learnMore, setLearnMore] = useState([]);

  const publications = async () => {
    await axiosApiInstance
      .get(`${redditUrl}user/${user?.name}/submitted`)
      .then((data) => {
        setlistOfPublications(data?.data?.data?.children);
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
    publications();
  }, []);

  const like = async (vote, id) => {
    await axiosApiInstance
      .post(redditUrl + 'api/vote?id=' + id + '&dir=' + vote)
      .then((data) => {
        publications();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {listOfPublications.map((item, index) => (
        <View style={styles.container} key={index}>
          <Card key={index} onPress={() => show(index)}>
            {learnMore !== index ? (
              <>
                <Card.Title
                  key={index}
                  title={`r/${item?.data?.subreddit}`}
                  subtitle={`u/${item?.data?.author}`}
                  left={() => <Avatar.Image size={40} source={redditImage} />}
                />
                <Text variant="titleSmall" numberOfLines={1} style={styles.title}>
                  {item?.data?.title}
                </Text>
              </>
            ) : (
              <>
                <Card.Title
                  key={index}
                  title={`r/${item?.data?.subreddit}`}
                  subtitle={`u/${item?.data?.author}`}
                  left={() => <Avatar.Image size={40} source={redditImage} />}
                />
                <Card.Content>
                  <Text variant="labelMedium" style={styles.label}>
                    {item?.data?.title}
                  </Text>
                  <Text variant="bodySmall">{item?.data?.selftext}</Text>
                </Card.Content>
                {item?.data?.url_overridden_by_dest && (
                  <Card.Cover
                    source={{ uri: item?.data?.url_overridden_by_dest }}
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
                  >
                    {item?.data?.num_comments}
                  </IconButton>
                  <Text style={styles.buttonScore}>{item?.data?.num_comments}</Text>
                </View>
              </>
            )}
          </Card>
        </View>
      ))}
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
    height: 400,
  },
});
