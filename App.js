import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import { Svg, Rect } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
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


const screenWidth = Dimensions.get('window').width;


const TOTAL_WIDTH = screenWidth * 0.9;
const INPUT_WIDTH = TOTAL_WIDTH * 0.8; 
const BUTTON_WIDTH = TOTAL_WIDTH * 0.2;

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
    <View style={styles.appContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Joue les notes ici"
          editable={false}
        />
        <TouchableOpacity onPress={clearText} style={styles.clearButton}>
          <MaterialIcons name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.pianoContainer}>
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
        {keysData
          .filter((key) => key.type === 'black')
          .map((key) => (
            <Pressable
              key={`black-${key.whiteIndex}`}
              style={[
                styles.blackKey,
                {
                  left:
                    (key.whiteIndex + 1) * WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2,
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
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end', 
    alignItems: 'center',
    paddingBottom: 20, 
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: TOTAL_WIDTH,
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
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
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
  },
  blackKey: {
    position: 'absolute',
    width: BLACK_KEY_WIDTH,
    height: BLACK_KEY_HEIGHT,
    alignItems: 'center',
    zIndex: 1,
  },
  letter: {
    position: 'absolute',
    bottom: 5,
    fontSize: 12,
    color: 'black',
  },
  blackLetter: {
    position: 'absolute',
    bottom: 5,
    fontSize: 12,
    color: 'white',
  },
});
