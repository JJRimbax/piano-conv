import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, PanResponder } from 'react-native';
import { Audio } from 'expo-av';
import { Svg, Rect } from 'react-native-svg';

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

// Dimensions des touches
const WHITE_KEY_WIDTH = 50;
const WHITE_KEY_HEIGHT = 200;
const BLACK_KEY_WIDTH = 30;
const BLACK_KEY_HEIGHT = 120;

// Données combinées des touches avec lettres de A à Z
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
  { letter: ' ', note: 'D3', file: D3_mp3, type: 'white', index: 15 }, // Espace pour la dernière touche
];

export default function App() {
  const [text, setText] = useState('');
  const [pianoLayout, setPianoLayout] = useState(null);

  // Fonction pour jouer une note
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

  // Créer un PanResponder pour gérer les événements tactiles
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      if (!pianoLayout) {
        // Si le piano n'a pas encore été mesuré, ne rien faire
        return;
      }

      const touchX = evt.nativeEvent.pageX;
      const touchY = evt.nativeEvent.pageY;

      // Ajuster touchX et touchY par rapport à la position du piano
      const adjustedX = touchX - pianoLayout.x;
      const adjustedY = touchY - pianoLayout.y;

      // Vérifier si une touche noire est pressée
      const blackKeyPressed = keysData.find((key) => {
        if (key.type === 'black') {
          const keyLeft = (key.whiteIndex + 1) * WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2;
          const keyRight = keyLeft + BLACK_KEY_WIDTH;
          return (
            adjustedX >= keyLeft &&
            adjustedX <= keyRight &&
            adjustedY >= 0 &&
            adjustedY <= BLACK_KEY_HEIGHT
          );
        }
        return false;
      });

      if (blackKeyPressed) {
        playNote(blackKeyPressed.file, blackKeyPressed.letter);
      } else {
        // Vérifier quelle touche blanche est pressée
        const whiteKeyPressed = keysData.find((key) => {
          if (key.type === 'white') {
            const keyLeft = key.index * WHITE_KEY_WIDTH;
            const keyRight = keyLeft + WHITE_KEY_WIDTH;
            return (
              adjustedX >= keyLeft &&
              adjustedX <= keyRight &&
              adjustedY >= 0 &&
              adjustedY <= WHITE_KEY_HEIGHT
            );
          }
          return false;
        });

        if (whiteKeyPressed) {
          playNote(whiteKeyPressed.file, whiteKeyPressed.letter);
        }
      }
    },
  });

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.scrollContainer}
      scrollEnabled={true}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Joue les notes ici"
          editable={false}
        />
        <View
          style={styles.pianoContainer}
          {...panResponder.panHandlers}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            setPianoLayout({
              x: layout.x,
              y: layout.y,
            });
          }}
        >
          {/* Rendu des touches blanches */}
          {keysData
            .filter((key) => key.type === 'white')
            .map((key) => (
              <View
                key={`white-${key.index}`}
                style={[styles.whiteKey, { left: key.index * WHITE_KEY_WIDTH }]}
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
              </View>
            ))}

          {/* Rendu des touches noires */}
          {keysData
            .filter((key) => key.type === 'black')
            .map((key) => (
              <View
                key={`black-${key.whiteIndex}`}
                style={[
                  styles.blackKey,
                  {
                    left:
                      (key.whiteIndex + 1) * WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2,
                  },
                ]}
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
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  pianoContainer: {
    position: 'relative',
    width: WHITE_KEY_WIDTH * keysData.filter((key) => key.type === 'white').length,
    height: WHITE_KEY_HEIGHT,
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
    zIndex: 1,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    textAlign: 'center',
  },
  letter: {
    position: 'absolute',
    bottom: 5,
    fontSize: 12,
    color: 'black',
  },
  blackLetter: {
    color: 'white',
    position: 'absolute',
    bottom: 5,
    fontSize: 12,
  },
});
