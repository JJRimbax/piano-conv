import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { Svg, Rect } from 'react-native-svg';

// Dimensions ajustées des touches pour que tout soit visible à l'écran et utilisables facilement
const WHITE_KEY_WIDTH = 40;
const WHITE_KEY_HEIGHT = 150;
const BLACK_KEY_WIDTH = 30; // Augmenter la taille des touches noires
const BLACK_KEY_HEIGHT = 100;

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
        <View style={styles.pianoContainer}>
          {notes.map((note, index) => (
            <View key={`key-${index}`} style={{ position: 'relative' }}>
              {/* Touche blanche ou noire */}
              <TouchableOpacity
                onPress={() => playNote(note.file, note.letter)}
              >
                <Svg
                  height={note.isBlack ? BLACK_KEY_HEIGHT : WHITE_KEY_HEIGHT}
                  width={note.isBlack ? BLACK_KEY_WIDTH : WHITE_KEY_WIDTH}
                >
                  <Rect
                    x="0"
                    y="0"
                    width={note.isBlack ? BLACK_KEY_WIDTH : WHITE_KEY_WIDTH}
                    height={note.isBlack ? BLACK_KEY_HEIGHT : WHITE_KEY_HEIGHT}
                    fill={note.isBlack ? 'black' : 'white'}
                    stroke="black"
                    strokeWidth="2"
                  />
                </Svg>
                {/* Afficher la lettre sur chaque touche */}
                <Text style={[styles.letter, note.isBlack && styles.blackLetter]}>
                  {note.letter}
                </Text>
              </TouchableOpacity>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  pianoContainer: {
    flexDirection: 'row', // Affichage en rangée pour le piano
    alignItems: 'flex-end',
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
    color: 'white', // Lettres blanches sur touches noires
  },
});
