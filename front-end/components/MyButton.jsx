import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

function MyButton({ leftIcon, action, text, disabled }) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.mainContainer,
        backgroundColor: disabled ? theme.colors.backdrop : theme.colors.secondary,
      }}
      activeOpacity={disabled ? 1 : 0.6}
      onPress={disabled ? null : action}
    >
      <Icon name={leftIcon} size={30} color={theme.colors.fonts} />
      <Text style={{ ...styles.text, color: theme.colors.fonts }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 5,
    shadowColor: '#190B28',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default MyButton;
