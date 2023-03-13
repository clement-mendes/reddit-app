import { StyleSheet } from 'react-native';
import { theme } from '../../constant/theme';

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.secondary,
    height: '100%',
    opacity: 1,
    position: 'relative',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: -7, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    transform: [{ rotate: '-45deg' }, { translateY: 0 }, { translateX: 70 }],
    width: '70%',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
  },
  imageContainer: { alignItems: 'center', display: 'flex' },
  login: { fontSize: 30, fontWeight: '500', marginTop: 30 },
  mainContainer: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'space-around',
    position: 'absolute',
  },
  mainText: { fontSize: 18, marginTop: 80, textAlign: 'center' },
  redditText: { fontSize: 35, marginTop: 150 },
});

export default styles;
