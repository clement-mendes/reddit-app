import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import LoginHelp from './pages/Help/Login';
import Login from './pages/Login';
import Help from './pages/Help';
import Home from './pages/Home';
import { login } from './reducer/userSlice';
import { useToken } from './hooks/useToken';
import { theme } from './constant/theme';

export default function App() {
  const user = useSelector((state) => state.user);
  const Stack = createStackNavigator();
  const { exist } = useToken();
  const dispatch = useDispatch();

  useEffect(() => {
    if (exist) {
      dispatch(login());
    }
  }, [dispatch, exist]);

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        {user.isLogged ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="Help Login" component={LoginHelp} options={{headerShown: true}}/>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}
