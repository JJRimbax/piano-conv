import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import { Audio } from 'expo-av';
import { Svg, Rect } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';

// Importation des fichiers audio
import C_mp3 from './assets/notes/C.mp3';
import Csharp_mp3 from './assets/notes/Csharp.mp3';
import D_mp3 from './assets/notes/D.mp3';
import Dsharp_mp3 from './assets/notes/Dsharp.mp3';
import E_mp3 from './assets/notes/E.mp3';
import F_mp3 from './assets/notes/F.mp3';
import Fsharp_mp3 from './assets/notes/Fsharp.mp3';
import G_mp3 from './assets/notes/G.mp3';
import Gsharp_mp3 from './assets/notes/Gsharp.mp3';
import A_mp3 from './assets/notes/A.mp3';
import Asharp_mp3 from './assets/notes/Asharp.mp3';
import B_mp3 from './assets/notes/B.mp3';
import C2_mp3 from './assets/notes/C2.mp3';
import Csharp2_mp3 from './assets/notes/Csharp2.mp3';
import D2_mp3 from './assets/notes/D2.mp3';
import Dsharp2_mp3 from './assets/notes/Dsharp2.mp3';
import E2_mp3 from './assets/notes/E2.mp3';
import F2_mp3 from './assets/notes/F2.mp3';
import Fsharp2_mp3 from './assets/notes/Fsharp2.mp3';
import G2_mp3 from './assets/notes/G2.mp3';
import Gsharp2_mp3 from './assets/notes/Gsharp2.mp3';
import A2_mp3 from './assets/notes/A2.mp3';
import Asharp2_mp3 from './assets/notes/Asharp2.mp3';
import B2_mp3 from './assets/notes/B2.mp3';
import C3_mp3 from './assets/notes/C3.mp3';
import Csharp3_mp3 from './assets/notes/Csharp3.mp3';
import D3_mp3 from './assets/notes/D3.mp3';

// Dimensions de l'écran
const { width: screenWidth } = Dimensions.get('window');
const TOTAL_WIDTH = screenWidth * 0.95;
const INPUT_WIDTH = TOTAL_WIDTH * 0.8;
const BUTTON_WIDTH = TOTAL_WIDTH * 0.2;

// Données des touches du piano
const keysData = [
  { letter: 'A', note: 'C', file: C_mp3, type: 'white', index: 0 },
  { letter: 'B', note: 'C#', file: Csharp_mp3, type: 'black', whiteIndex: 0 },
  { letter: 'C', note: 'D', file: D_mp3, type: 'white', index: 1 },
  { letter: 'D', note: 'D#', file: Dsharp_mp3, type: 'black', whiteIndex: 1 },
  { letter: 'E', note: 'E', file: E_mp3, type: 'white', index: 2 },
  { letter: 'F', note: 'F', file: F_mp3, type: 'white', index: 3 },
  { letter: 'G', note: 'F#', file: Fsharp_mp3, type: 'black', whiteIndex: 3 },
  { letter: 'H', note: 'G', file: G_mp3, type: 'white', index: 4 },
  { letter: 'I', note: 'G#', file: Gsharp_mp3, type: 'black', whiteIndex: 4 },
  { letter: 'J', note: 'A', file: A_mp3, type: 'white', index: 5 },
  { letter: 'K', note: 'A#', file: Asharp_mp3, type: 'black', whiteIndex: 5 },
  { letter: 'L', note: 'B', file: B_mp3, type: 'white', index: 6 },
  { letter: 'M', note: 'C2', file: C2_mp3, type: 'white', index: 7 },
  { letter: 'N', note: 'C#2', file: Csharp2_mp3, type: 'black', whiteIndex: 7 },
  { letter: 'O', note: 'D2', file: D2_mp3, type: 'white', index: 8 },
  { letter: 'P', note: 'D#2', file: Dsharp2_mp3, type: 'black', whiteIndex: 8 },
  { letter: 'Q', note: 'E2', file: E2_mp3, type: 'white', index: 9 },
  { letter: 'R', note: 'F2', file: F2_mp3, type: 'white', index: 10 },
  { letter: 'S', note: 'F#2', file: Fsharp2_mp3, type: 'black', whiteIndex: 10 },
  { letter: 'T', note: 'G2', file: G2_mp3, type: 'white', index: 11 },
  { letter: 'U', note: 'G#2', file: Gsharp2_mp3, type: 'black', whiteIndex: 11 },
  { letter: 'V', note: 'A2', file: A2_mp3, type: 'white', index: 12 },
  { letter: 'W', note: 'A#2', file: Asharp2_mp3, type: 'black', whiteIndex: 12 },
  { letter: 'X', note: 'B2', file: B2_mp3, type: 'white', index: 13 },
  { letter: 'Y', note: 'C3', file: C3_mp3, type: 'white', index: 14 },
  { letter: 'Z', note: 'C#3', file: Csharp3_mp3, type: 'black', whiteIndex: 14 },
  { letter: ' ', note: 'D3', file: D3_mp3, type: 'white', index: 15 },
];

const numWhiteKeys = keysData.filter((key) => key.type === 'white').length;
const WHITE_KEY_WIDTH = TOTAL_WIDTH / numWhiteKeys;
const WHITE_KEY_HEIGHT = 200;
const BLACK_KEY_WIDTH = WHITE_KEY_WIDTH * 0.6;
const BLACK_KEY_HEIGHT = WHITE_KEY_HEIGHT * 0.6;

export default function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    // Verrouiller l'orientation en paysage
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  const playNote = async (file, letter) => {
    if (file) {
      const { sound } = await Audio.Sound.createAsync(file);
      try {
        await sound.playAsync();
        setText((prevText) => prevText + letter);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Fichier audio non défini pour la touche', letter);
    }
  };

  const clearText = () => {
    setText('');
  };

  return (
    <LinearGradient
      colors={['#FFDEE9', '#B5FFFC']}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        {/* Titre */}
        <Text style={styles.title}>🎵 Mélo-dire 🎶</Text>

        {/* Zone de texte */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            placeholder="Joue les notes ici"
            editable={false}
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={clearText} style={styles.clearButton}>
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Piano */}
        <View style={styles.pianoContainer}>
          {/* Touches Blanches */}
          {keysData
            .filter((key) => key.type === 'white')
            .map((key) => (
              <Pressable
                key={`white-${key.index}`}
                style={[
                  styles.whiteKey,
                  { left: key.index * WHITE_KEY_WIDTH },
                ]}
                onPress={() => playNote(key.file, key.letter)}
              >
                <Svg height={WHITE_KEY_HEIGHT} width={WHITE_KEY_WIDTH}>
                  <Rect
                    x="0"
                    y="0"
                    width={WHITE_KEY_WIDTH}
                    height={WHITE_KEY_HEIGHT}
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                  />
                </Svg>
                <Text style={styles.letter}>{key.letter}</Text>
              </Pressable>
            ))}

          {/* Touches Noires */}
          {keysData
            .filter((key) => key.type === 'black')
            .map((key, idx) => (
              <Pressable
                key={`black-${key.whiteIndex}-${idx}`}
                style={[
                  styles.blackKey,
                  {
                    left:
                      (key.whiteIndex + 1) * WHITE_KEY_WIDTH -
                      BLACK_KEY_WIDTH / 2,
                  },
                ]}
                onPress={() => playNote(key.file, key.letter)}
              >
                <Svg height={BLACK_KEY_HEIGHT} width={BLACK_KEY_WIDTH}>
                  <Rect
                    x="0"
                    y="0"
                    width={BLACK_KEY_WIDTH}
                    height={BLACK_KEY_HEIGHT}
                    fill="black"
                  />
                </Svg>
                <Text style={styles.blackLetter}>{key.letter}</Text>
              </Pressable>
            ))}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  title: {
    // Utilisation d'une police système avec des styles pour une apparence musicale
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    fontSize: 40,
    color: '#4B0082', // Indigo pour une meilleure visibilité
    marginBottom: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: INPUT_WIDTH,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    color: '#333',
  },
  clearButton: {
    marginLeft: 10,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 25,
    width: BUTTON_WIDTH - 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pianoContainer: {
    position: 'relative',
    width: TOTAL_WIDTH,
    height: WHITE_KEY_HEIGHT,
    alignSelf: 'center',
  },
  whiteKey: {
    position: 'absolute',
    width: WHITE_KEY_WIDTH,
    height: WHITE_KEY_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  blackKey: {
    position: 'absolute',
    width: BLACK_KEY_WIDTH,
    height: BLACK_KEY_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  letter: {
    position: 'absolute',
    bottom: 5,
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  blackLetter: {
    position: 'absolute',
    bottom: 5,
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});
