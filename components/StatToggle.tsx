import React from 'react';
import { View } from 'react-native';
import { ThemedButton } from './ThemedButton';

export default function StatToggle({ value, onChange }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 12 }}>
      {['Batting', 'Bowling'].map(option => (
        <ThemedButton
          key={option}
          onPress={() => onChange(option)}
          title={option}
          type={value === option ? 'primary' : 'transparent'}
        />
      ))}
    </View>
  );
}
