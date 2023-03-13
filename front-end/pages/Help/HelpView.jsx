import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import ImageEtape1 from '../../assets/help1.png';
import ImageEtape2 from '../../assets/help2.png';
import ImageEtape3 from '../../assets/check.png';
import { Link } from '@react-navigation/native';

function HelpView({ number }) {
  const imagesList = [ImageEtape1, ImageEtape2, ImageEtape3];
  const [explain, setExplain] = useState('');

  useEffect(() => {
    if (number === 0) {
      setExplain('Acceptez que l’application accède à vos informations');
    } else if (number === 1) {
      setExplain('Acceptez les conditions d’utilisation de Reddit');
    } else {
      setExplain('Vous êtes connecté');
    }
  }, [number]);

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 30,
      }}
    >
      <Image source={imagesList[number]} style={{ resizeMode: 'cover' }} />
      <Text>Etape {number + 1}</Text>
      <Text>{explain}</Text>
      
      
    </View>
  );
}

export default HelpView;
