import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { helpPage } from './style';
import HelpView from './HelpView';

function LoginHelp() {
  const { width } = Dimensions.get('window');

  return (
    <View style={helpPage.mainContainer}>
      <Text style={helpPage.redditText}>Redditech®</Text>
      <Carousel
        width={width}
        height={700}
        data={[...new Array(3).keys()]}
        pagingEnabled
        loop={false}
        renderItem={({ index }) => <HelpView number={index} />}
      />
    </View>
  );
}

export default LoginHelp;
