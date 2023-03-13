import { useDispatch } from 'react-redux';
import { Avatar, Button, Text, SegmentedButtons, Appbar } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useToken } from '../hooks/useToken';
import { logout } from '../reducer/userSlice';
import { axiosApiInstance } from '../axios.config';
import { redditUrl } from '../redditUrl';
import Publications from '../components/Publications';
import Commentaire from '../components/Commentaire';
import APropos from '../components/APropos';
import EditProfile from '../components/EditProfile';

export default function Profile() {
  const dispatch = useDispatch();
  const { removeToken } = useToken();
  const [user, setUser] = useState([]);
  const [value, setValue] = useState('');
  const [modify, setModify] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const [avatar, setAvatar] = useState('');

  const string = avatar;
  const urlAvatar = { uri: string.split('?')[0] };

  const logoutUser = () => {
    removeToken();
    dispatch(logout());
  };

  const profileInfo = async () => {
    await axiosApiInstance
      .get(`${redditUrl}api/v1/me`)
      .then((data) => {
        setUser(data?.data);
        setAvatar(data?.data?.subreddit?.icon_img);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const about = async () => {
    await axiosApiInstance
      .get(`${redditUrl}user/${user?.name}/about`)
      .then((data) => {
        setuserInfo(data?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderSwitch = (item) => {
    switch (item) {
      case 'publications':
        return <Publications user={user} />;
      case 'commentaire':
        return <Commentaire user={user} />;
      case 'a propos':
        return <APropos user={user} userInfo={userInfo} />;
      default:
        return (
          <View style={styles.default}>
            <Text style={styles.defaultText} variant="titleMedium">
              Retrouve ici tout les informations concernant ton compte !
            </Text>
          </View>
        );
    }
  };

  useEffect(() => {
    profileInfo();
  }, []);

  useEffect(() => {
    profileInfo();
  }, [modify]);

  useEffect(() => {
    about();
  }, [user]);

  return !modify ? (
    <>
      <Appbar.Header>
        <Appbar.Content title="Redditech®" />
      </Appbar.Header>
      <View style={styles.banner}>
        <View style={styles.top}>
          <Avatar.Image source={urlAvatar} size={100} style={styles.imageProfile} />
          <Button icon="pencil" mode="outlined" onPress={() => setModify(true)}>
            modifier
          </Button>
        </View>
        <Text variant="titleLarge" style={styles.name}>
          {userInfo?.subreddit?.title}
        </Text>
        <Text style={styles.abonne}>{user.num_friends} abonné</Text>
      </View>
      <SegmentedButtons
        style={styles.nav}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'publications',
            label: 'Publications',
          },
          {
            value: 'commentaire',
            label: 'Commentaire',
          },
          {
            value: 'a propos',
            label: 'A Propos',
          },
        ]}
      />
      <ScrollView style={styles.scroll}>{renderSwitch(value)}</ScrollView>
      <View style={styles.logoutContainer}>
        <Button onPress={logoutUser}>Logout</Button>
      </View>
    </>
  ) : (
    <EditProfile
      user={user}
      userInfo={userInfo}
      modify={modify}
      setModify={setModify}
      url_avatar={urlAvatar}
    />
  );
}

const styles = StyleSheet.create({
  img: {},
  top: {
    flex: 0.7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  banner: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    flex: 0.3,
    width: '95%',
  },
  nav: {
    paddingLeft: 2,
    paddingRight: 2,
  },
  scroll: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  abonne: {
    width: '95%',
    marginBottom: 10,
  },
  logoutContainer: {
    alignItems: 'center',
  },
  default: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultText: {
    textAlign: 'center',
  },
});
