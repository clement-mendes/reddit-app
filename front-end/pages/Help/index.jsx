import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import HelpIcon from '../../assets/help.png';
import MyButton from '../../components/MyButton';

function Help() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.mainContainer}>
        <Text style={styles.redditText}>Redditech ®</Text>
        <View style={styles.imageContainer}>
          <Image source={HelpIcon} />
          <Text style={{ ...styles.login, color: theme.colors.fonts }}>Help</Text>
        </View>
        <Text style={styles.mainText}>
          Vous avez besoin d’aider pour vous connecter à votre compte ?
        </Text>
        <MyButton text="Commencer" action={() => navigation.navigate('Help Login')} />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ color: theme.colors.secondary }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Help;
