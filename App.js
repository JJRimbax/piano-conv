import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import { Svg, Rect } from 'react-native-svg';

// Largeur et hauteur des touches
const WHITE_KEY_WIDTH = 40;
const WHITE_KEY_HEIGHT = 150;
const BLACK_KEY_WIDTH = 25;
const BLACK_KEY_HEIGHT = 90;

// Notes et fichiers audio (ajusté pour correspondre aux positions)
const notes = [
  { note: 'D3', file: require('./assets/notes/D3.mp3') },
  { note: 'Csharp3', file: require('./assets/notes/Csharp3.mp3') },
  { note: 'C3', file: require('./assets/notes/C3.mp3') },
  { note: 'B', file: require('./assets/notes/B.mp3') },
  { note: 'Asharp', file: require('./assets/notes/Asharp.mp3') },
  { note: 'A', file: require('./assets/notes/A.mp3') },
  { note: 'Gsharp', file: require('./assets/notes/Gsharp.mp3') },
  { note: 'G', file: require('./assets/notes/G.mp3') },
  { note: 'Fsharp', file: require('./assets/notes/Fsharp.mp3') },
  { note: 'F', file: require('./assets/notes/F.mp3') },
  { note: 'E', file: require('./assets/notes/E.mp3') },
  { note: 'Dsharp', file: require('./assets/notes/Dsharp.mp3') },
  { note: 'D', file: require('./assets/notes/D.mp3') },
  { note: 'Csharp', file: require('./assets/notes/Csharp.mp3') },
  { note: 'C', file: require('./assets/notes/C.mp3') },
  { note: 'B', file: require('./assets/notes/B.mp3') },
  { note: 'Asharp', file: require('./assets/notes/Asharp.mp3') },
  { note: 'A', file: require('./assets/notes/A.mp3') },
  { note: 'Gsharp', file: require('./assets/notes/Gsharp.mp3') },
  { note: 'G', file: require('./assets/notes/G.mp3') },
  { note: 'Fsharp', file: require('./assets/notes/Fsharp.mp3') },
  { note: 'F', file: require('./assets/notes/F.mp3') },
  { note: 'E', file: require('./assets/notes/E.mp3') },
  { note: 'Dsharp', file: require('./assets/notes/Dsharp.mp3') },
  { note: 'D', file: require('./assets/notes/D.mp3') },
  { note: 'Csharp', file: require('./assets/notes/Csharp.mp3') },
  { note: ' ', file: null }, // Espace pour la dernière touche
];

// Lettres assignées à chaque touche de droite à gauche
const letters = 'ZYXWVUTSRQPONMLKJIHGFEDCBA '.split('');

// Position des touches noires par rapport aux blanches
const blackKeyPositions = [1, 2, 4, 5, 6]; // Index des touches noires

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        placeholder="Joue les notes ici"
        editable={false} // Non modifiable directement
      />
      <View style={styles.pianoContainer}>
        {notes.map((note, index) => (
          <View key={`white-${index}`} style={{ position: 'relative' }}>
            {/* Touche blanche */}
            <TouchableOpacity
              onPress={() => playNote(note.file, letters[index])}
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
              {/* Afficher la lettre sur chaque touche blanche */}
              <Text style={styles.letter}>{letters[index]}</Text>
            </TouchableOpacity>

            {/* Ajouter une touche noire si nécessaire */}
            {blackKeyPositions.includes(index % 7) && (
              <TouchableOpacity
                style={{ position: 'absolute', top: 0, left: WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2 }}
                onPress={() => playNote(note.file, letters[index])}
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
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pianoContainer: {
    flexDirection: 'row-reverse', // Pour que les touches soient de droite à gauche
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
    bottom: 10,
    left: 10,
    fontSize: 18,
    color: 'black',
  },
});
