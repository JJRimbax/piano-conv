import React from 'react';
import { View } from 'react-native';
import { Svg, Rect } from 'react-native-svg';

const WHITE_KEY_WIDTH = 40;
const WHITE_KEY_HEIGHT = 150;
const BLACK_KEY_WIDTH = 25;
const BLACK_KEY_HEIGHT = 90;

const whiteKeys = Array(7).fill(null);  // 7 touches blanches
const blackKeyPositions = [1, 2, 4, 5, 6]; // Positions des touches noires

const Spacer = ({ width = 0 }) => <View style={{ width }} />; // Espacement simple

export default function App() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', padding: 20 }}>
      {/* Affichage des touches blanches */}
      {whiteKeys.map((_, index) => (
        <View key={`white-${index}`} style={{ position: 'relative' }}>
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
          {/* Ajout de la touche noire si nécessaire */}
          {blackKeyPositions.includes(index) && (
            <View style={{ position: 'absolute', left: WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2 }}>
              <Svg height={BLACK_KEY_HEIGHT} width={BLACK_KEY_WIDTH}>
                <Rect
                  x="0"
                  y="0"
                  width={BLACK_KEY_WIDTH}
                  height={BLACK_KEY_HEIGHT}
                  fill="black"
                />
              </Svg>
            </View>
          )}
          {/* Espacement entre les touches */}
          <Spacer width={1} />
        </View>
      ))}
    </View>
  );
}
