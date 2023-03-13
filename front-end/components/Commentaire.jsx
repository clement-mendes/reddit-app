import { Text, Divider } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { axiosApiInstance } from '../axios.config';
import { redditUrl } from '../redditUrl';

export default function Commentaire({ user }) {
  const [listOfCommentaires, setlistOfCommentaires] = useState([]);

  const commentaires = async () => {
    await axiosApiInstance
      .get(`${redditUrl}user/${user?.name}/comments`)
      .then((data) => {
        setlistOfCommentaires(data?.data?.data?.children);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    commentaires();
  }, []);

  return (
    <View style={styles.view}>
      {listOfCommentaires.map((item) => (
        <>
          <Divider />
          <Text variant="titleMedium">{item?.data?.link_title}</Text>
          <Text variant="bodySmall">{`r/${item?.data?.subreddit}`}</Text>
          <Text variant="titleMedium">{item?.data?.body}</Text>
          <Divider />
        </>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 10,
  },
});
