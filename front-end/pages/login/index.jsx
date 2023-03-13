import React, { useEffect } from 'react';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import * as AuhtSession from 'expo-auth-session';
import { Text, useTheme } from 'react-native-paper';
import { View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Link } from '@react-navigation/native';
import { useToken } from '../../hooks/useToken';
import MyButton from '../../components/MyButton';
import Lock from '../../assets/lock.png';
import styles from './styles';
import { login } from '../../reducer/userSlice';

maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
  tokenEndPoint: 'https://www.reddit.com/api/v1/access_token',
};

const redirectUri = AuhtSession.makeRedirectUri({
  preferLocalhost: true,
  native: 'exp://localhost:19000',
});

export default function Oauth() {
  const [request, response, promptAsync] = AuhtSession.useAuthRequest(
    {
      clientId: 'yS4_fY3E1BDQhY151ybJaw',
      scopes: ['*'],
      redirectUri,
      responseType: AuhtSession.ResponseType.Token,
    },
    discovery
  );
  const { storeToken } = useToken();
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response?.type === 'success') {
      // eslint-disable-next-line camelcase
      const { access_token } = response.params;

      // eslint-disable-next-line camelcase
      if (!access_token) return;

      storeToken(access_token);
      dispatch(login());
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.mainContainer}>
        <Text style={styles.redditText}>Redditech ®</Text>
        <View style={styles.imageContainer}>
          <Image source={Lock} />
          <Text style={{ ...styles.login, color: theme.colors.fonts }}>Login</Text>
        </View>
        <Text style={{ ...styles.mainText, color: theme.colors.fonts }}>
          Connectez-vous de manière sécurisée avec votre compte Reddit
        </Text>
        <MyButton
          text="Continuer avec Reddit"
          disabled={!request}
          leftIcon="reddit"
          action={() => promptAsync({ redirectUri })}
        />
        <Link to={{ screen: 'Help' }} style={{ color: theme.colors.secondary }}>
          <Text>Besoin d'aide</Text>
        </Link>
      </View>
    </View>
  );
}
