import React from 'react';
import { View } from 'react-native';

export const Spacer = ({ width = 0, height = 0 }) => (
  <View style={{ width, height }} />
);
