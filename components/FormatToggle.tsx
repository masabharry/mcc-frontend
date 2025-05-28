import React from 'react';
import { View } from 'react-native';
import { ThemedButton } from './ThemedButton';

export default function FormatToggle({ value, onChange }) {
  const options = ['t10', 't15', 't6'];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 12 }}>
      {options.map(opt => (
        <ThemedButton
          key={opt}
          onPress={() => onChange(opt)}
          title={opt.toUpperCase()}
          type={value === opt ? 'primary' : 'transparent'}
        />
      ))}
    </View>
  );
}
