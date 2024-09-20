import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { Svg, Rect } from 'react-native-svg';

// Dimensions des touches ajustées
const WHITE_KEY_WIDTH = 50;
const WHITE_KEY_HEIGHT = 200;
const BLACK_KEY_WIDTH = 30; 
const BLACK_KEY_HEIGHT = 120;

// Notes associées aux fichiers et aux lettres
const notes = [
  { letter: 'A', note: 'C', file: require('./assets/notes/C.mp3'), isBlack: false },
  { letter: 'B', note: 'C#', file: require('./assets/notes/Csharp.mp3'), isBlack: true },
  { letter: 'C', note: 'D', file: require('./assets/notes/D.mp3'), isBlack: false },
  { letter: 'D', note: 'D#', file: require('./assets/notes/Dsharp.mp3'), isBlack: true },
  { letter: 'E', note: 'E', file: require('./assets/notes/E.mp3'), isBlack: false },
  { letter: 'F', note: 'F', file: require('./assets/notes/F.mp3'), isBlack: false },
  { letter: 'G', note: 'F#', file: require('./assets/notes/Fsharp.mp3'), isBlack: true },
  { letter: 'H', note: 'G', file: require('./assets/notes/G.mp3'), isBlack: false },
  { letter: 'I', note: 'G#', file: require('./assets/notes/Gsharp.mp3'), isBlack: true },
  { letter: 'J', note: 'A', file: require('./assets/notes/A.mp3'), isBlack: false },
  { letter: 'K', note: 'A#', file: require('./assets/notes/Asharp.mp3'), isBlack: true },
  { letter: 'L', note: 'B', file: require('./assets/notes/B.mp3'), isBlack: false },
  { letter: 'M', note: 'C2', file: require('./assets/notes/C2.mp3'), isBlack: false },
  { letter: 'N', note: 'C#2', file: require('./assets/notes/Csharp2.mp3'), isBlack: true },
  { letter: 'O', note: 'D2', file: require('./assets/notes/D2.mp3'), isBlack: false },
  { letter: 'P', note: 'D#2', file: require('./assets/notes/Dsharp2.mp3'), isBlack: true },
  { letter: 'Q', note: 'E2', file: require('./assets/notes/E2.mp3'), isBlack: false },
  { letter: 'R', note: 'F2', file: require('./assets/notes/F2.mp3'), isBlack: false },
  { letter: 'S', note: 'F#2', file: require('./assets/notes/Fsharp2.mp3'), isBlack: true },
  { letter: 'T', note: 'G2', file: require('./assets/notes/G2.mp3'), isBlack: false },
  { letter: 'U', note: 'G#2', file: require('./assets/notes/Gsharp2.mp3'), isBlack: true },
  { letter: 'V', note: 'A2', file: require('./assets/notes/A2.mp3'), isBlack: false },
  { letter: 'W', note: 'A#2', file: require('./assets/notes/Asharp2.mp3'), isBlack: true },
  { letter: 'X', note: 'B2', file: require('./assets/notes/B2.mp3'), isBlack: false },
  { letter: 'Y', note: 'C3', file: require('./assets/notes/C3.mp3'), isBlack: false },
  { letter: 'Z', note: 'C#3', file: require('./assets/notes/Csharp3.mp3'), isBlack: true },
  { letter: ' ', note: 'D3', file: require('./assets/notes/D3.mp3'), isBlack: false }, // Touche espace
];

// Indices des touches noires dans une octave
const blackKeyPositions = [1, 3, 6, 8, 10];

export default function App() {
  const [text, setText] = useState(''); // État pour le TextInput

  // Fonction pour jouer une note
  const playNote = async (file, letter) => {
    if (file) {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(file);
        await soundObject.playAsync();
        // Met à jour l'input avec la lettre associée
        setText(prevText => prevText + letter);
      } catch (error) {
        console.error(error);
      }
    } else {
      setText(prevText => prevText + letter); // Pour la touche espace
    }
  };

  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Joue les notes ici"
          editable={false} // Non modifiable directement
        />
        {/* Container des touches blanches */}
        <View style={styles.pianoContainer}>
          {notes.map((note, index) => (
            !note.isBlack && (
              <TouchableOpacity key={`white-${index}`} onPress={() => playNote(note.file, note.letter)}>
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
                <Text style={styles.letter}>{note.letter}</Text>
              </TouchableOpacity>
            )
          ))}
        </View>
        {/* Container des touches noires */}
        <View style={styles.blackKeyContainer}>
          {notes.map((note, index) => (
            note.isBlack && blackKeyPositions.includes(index % 12) && (
              <View
                key={`black-${index}`}
                style={{
                  ...styles.blackKey,
                  // Ajuster la position des touches noires pour qu'elles soient rapprochées
                  left: WHITE_KEY_WIDTH * (index - 0.35),
                }}
              >
                <TouchableOpacity onPress={() => playNote(note.file, note.letter)}>
                  <Svg height={BLACK_KEY_HEIGHT} width={BLACK_KEY_WIDTH}>
                    <Rect
                      x="0"
                      y="0"
                      width={BLACK_KEY_WIDTH}
                      height={BLACK_KEY_HEIGHT}
                      fill="black"
                    />
                  </Svg>
                  <Text style={styles.blackLetter}>{note.letter}</Text>
                </TouchableOpacity>
              </View>
            )
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  pianoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  blackKeyContainer: {
    position: 'absolute',
    left: 10,
    top: 70, // Superposé en haut des touches blanches
    flexDirection: 'row',
    zIndex: 1,
  },
  blackKey: {
    position: 'absolute',
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
    left: '35%',
    fontSize: 12,
    color: 'black',
  },
  blackLetter: {
    color: 'white',
    position: 'absolute',
    bottom: 5,
    left: '35%',
    fontSize: 12,
  },
});
