import {
  Text,
  Avatar,
  IconButton,
  TouchableRipple,
  MD3Colors,
  TextInput,
  Switch,
} from 'react-native-paper';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { axiosApiInstance } from '../axios.config';
import { redditUrl } from '../redditUrl';

export default function EditProfile({ user, setModify, userInfo, url_avatar }) {
  const [text, setText] = useState(userInfo?.subreddit?.public_description);
  const [pseudo, setPseudo] = useState(userInfo?.subreddit?.title);
  const [isSwitchOn1, setIsSwitchOn1] = useState(user?.pref_nightmode);
  const [isSwitchOn2, setIsSwitchOn2] = useState(user?.pref_top_karma_subreddits);
  const [isSwitchOn, setIsSwitchOn] = useState(user?.subreddit?.accept_followers);
  const [isSwitchOn3, setIsSwitchOn3] = useState(user?.over_18);
  const [isSwitchOn4, setIsSwitchOn4] = useState(user?.pref_no_profanity);
  const [isSwitchOn5, setIsSwitchOn5] = useState(user?.pref_show_twitter);


  const [image, setImage] = useState(null);

  const string = userInfo?.subreddit?.banner_img;
  const urlBanner = { uri: string.split('?')[0] };

  const followers = async () => {
    setIsSwitchOn(!isSwitchOn);
    await axiosApiInstance
      .patch(`${redditUrl}api/v1/me/prefs`, { enable_followers: !isSwitchOn })
      .catch((error) => {
        console.log(error);
      });
  };

  const afficherCommunaute = async () => {
    setIsSwitchOn2(!isSwitchOn2);
    await axiosApiInstance
      .patch(`${redditUrl}api/v1/me/prefs`, { top_karma_subreddits: !isSwitchOn2 })
      .catch((error) => {
        console.log(error);
      });
  };

  const modeNuit = async () => {
    setIsSwitchOn1(!isSwitchOn1);
    await axiosApiInstance
      .patch(`${redditUrl}api/v1/me/prefs`, { nightmode: !isSwitchOn1 })
      .catch((error) => {
        console.log(error);
      });
  };

  const nfsw = async () => {
    setIsSwitchOn3(!isSwitchOn3);
    await axiosApiInstance
      .patch(`${redditUrl}api/v1/me/prefs`, { over_18: !isSwitchOn3 })
      .catch((error) => {
        console.log(error);
      });
  };

  const blaspheme = async () => {
    setIsSwitchOn4(!isSwitchOn4);
    await axiosApiInstance
      .patch(`${redditUrl}api/v1/me/prefs`, { no_profanity: !isSwitchOn4 })
      .catch((error) => {
        console.log(error);
      });
  };

  const twitter = async () => {
    setIsSwitchOn5(!isSwitchOn5);
    await axiosApiInstance
      .patch(`${redditUrl}api/v1/me/prefs`, { show_twitter: !isSwitchOn5 })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.banner}>
        <ImageBackground source={urlBanner} style={styles.banner_img}>
        </ImageBackground>
        <IconButton
          style={styles.close}
          icon="close"
          iconColor={MD3Colors.error100}
          size={30}
          onPress={() => setModify(false)}
        />
        <View style={styles.top}>
          <Avatar.Image source={url_avatar} size={80} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.scroll}>
          <View style={styles.scrollView}>
            <Text> Nom d'affichage (facultatif)</Text>
          </View>
          <TextInput
            value={pseudo}
            onChangeText={(newPseudo) => setPseudo(newPseudo)}
            style={styles.textInput}
            mode="outlined"
            multiline
            disabled={true}

          />
          <View style={styles.scrollView}>
            <Text>A Propos (facultatif)</Text>
          </View>
          <TextInput
            disabled={true}
            value={text}
            onChangeText={(newText) => setText(newText)}
            style={styles.textInput}
            mode="outlined"
            multiline
          />
          <View style={styles.visibilite}>
            <Text>NFSW</Text>
            <Switch value={isSwitchOn3} onValueChange={() => nfsw()} />
          </View>
          <View style={styles.visibilite}>
            <Text>Autoriser les personnes à vous suivre</Text>
            <Switch value={isSwitchOn} onValueChange={() => followers()} />
          </View>
          <View style={styles.visibilite}>
            <Text>Afficher les communautés actives</Text>
            <Switch value={isSwitchOn2} onValueChange={() => afficherCommunaute()} />
          </View>
          <View style={styles.visibilite}>
            <Text>Mode nuit</Text>
            <Switch value={isSwitchOn1} onValueChange={() => modeNuit()} />
          </View>
          <View style={styles.visibilite}>
            <Text>Pas de blasphème</Text>
            <Switch value={isSwitchOn4} onValueChange={() => blaspheme()} />
          </View>
          <View style={styles.visibilite}>
            <Text>Montrer twitter</Text>
            <Switch value={isSwitchOn5} onValueChange={() => twitter()} />
          </View>
        </View>
      </ScrollView>
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
  },
  close: {
    position: 'absolute',
    top: 30,
    right: 0,
  },
  scroll: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '90%',
    flex: 1,
    marginTop: 10,
  },
  textInput: {
    width: '90%',
    marginTop: 10,
  },
  visibilite: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
