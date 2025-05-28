import React from 'react';
import { View } from 'react-native';
import { ThemedButton } from './ThemedButton';

export default function RankingToggle({ value, onChange }) {
  const options = ['Player', 'Team'];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 12 }}>
      {options.map(option => (
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
