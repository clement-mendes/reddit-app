import { BottomNavigation, Appbar, Dialog, Portal, Text } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import Profile from './Profile';
import Search from './Search';
import Favs from './Favs';
import News from './News';

export default function Home() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);

  const [routes] = useState([
    { key: 'news', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'search', title: 'Search', focusedIcon: 'magnify' },
    {
      key: 'favs',
      title: 'Favs',
      focusedIcon: 'bookmark-box-multiple',
      unfocusedIcon: 'bookmark-box-multiple-outline',
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account-circle',
      unfocusedIcon: 'account-circle-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    news: News,
    search: Search,
    favs: Favs,
    profile: Profile,
  });

  return (
    <>
      
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
}
